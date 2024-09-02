import { Injectable } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@angular/fire/auth";
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, catchError, from, tap } from "rxjs";

export interface userAuthData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedInStatus = new BehaviorSubject<boolean | null>(null);
  private googleAuthProvider = new GoogleAuthProvider();
  private userNameSubject = new BehaviorSubject<string>("");
  public userName$: Observable<string> = this.userNameSubject.asObservable();

  public get loggedInStatus$(): Observable<boolean | null> {
    return this.loggedInStatus.asObservable();
  }

  private userEmail: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  public get userEmail$(): Observable<string | null> {
    return this.userEmail.asObservable();
  }

  constructor(
    private router: Router,
    private auth: Auth,
    private toastr: ToastrService,
    private firestore: Firestore
  ) {}

  public checkAuthState(): void {
    this.auth.onAuthStateChanged({
      next: (user) => {
        if (user) {
          console.log("van user initkor: ", user);
          this.loggedInStatus.next(true);
          this.userEmail.next(user.email);
          this.setUserNameByEmail(user.email);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("CheckAuthState Completed");
      },
    });
  }
  private async setUserNameByEmail(email: string | null): Promise<void> {
    if (email) {
      const userName = await this.getUserNameByEmail(email);
      this.userNameSubject.next(userName);
    }
  }
  private async getUserNameByEmail(email: string): Promise<string> {
    const usersCollection = collection(this.firestore, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      return userData["name"] || "Unknown User";
    }
    return "Unknown User";
  }

  public registration(regData: userAuthData): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, regData.email, regData.password)
    ).pipe(
      tap(async (userCredential) => {
        this.loggedInStatus.next(false);
        // console.log("user adatok", userCredential);
        // console.log("Registered and logged in.");
        this.router.navigate([""]);
        const userName = await this.getUserNameByEmail(
          userCredential.user.email!
        );
        this.setUsername(userName);
        console.log(userCredential.user.uid);
      }),
      catchError((error) => {
        console.error(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }
  private setUsername(name: string): void {
    this.userNameSubject.next(name);
  }

  public login(loginData: userAuthData): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    ).pipe(
      tap(async (userCredential) => {
        this.loggedInStatus.next(true);
        this.userEmail.next(userCredential.user.email);
        const userName = await this.getUserNameByEmail(
          userCredential.user.email!
        );
        this.setUsername(userName);
        this.toastr.success("You logged in successfully");
        this.router.navigate(["budget"]);
      }),
      catchError((error) => {
        console.log(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  public async loginWithGoogle(): Promise<void> {
    const user = await signInWithPopup(this.auth, this.googleAuthProvider);
    console.log("You logged in successfully!");
    this.toastr.success("You logged in successfully");
    console.log(user);
    this.router.navigate(["budget"]);
  }

  async logout() {
    await this.auth.signOut();
    this.loggedInStatus.next(false);
    this.userEmail.next(null);
    this.userNameSubject.next("");
    this.toastr.success("You logged out successfully");
  }
}
