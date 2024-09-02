import { Injectable } from "@angular/core";
import {
  Auth,
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "@angular/fire/auth";
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
    private toastr: ToastrService
  ) {}

  public checkAuthState(): void {
    this.auth.onAuthStateChanged({
      next: (user) => {
        if (user) {
          console.log("van user initkor: ", user);
          this.loggedInStatus.next(true);
          this.userEmail.next(user.email);
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

  public registration(regData: userAuthData): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, regData.email, regData.password)
    ).pipe(
      tap((userCredential) => {
        // this.loggedInStatus.next(true);
        // console.log("user adatok", userCredential);
        // console.log("Registered and logged in.");
        // this.router.navigate([""]);
      }),
      catchError((error) => {
        console.error(error.message);
        return error;
      })
    ) as Observable<UserCredential>;
  }

  public login(loginData: userAuthData): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, loginData.email, loginData.password)
    ).pipe(
      tap((userCredential) => {
        this.loggedInStatus.next(true);
        this.userEmail.next(userCredential.user.email);
        // console.log("user adatok: ", userCredential);
        // console.log("You have logged in successfully");
        console.log("lefut a login");
        this.toastr.success("Logout successful");
        // this.router.navigate(["budget"]);
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
    console.log(user);
    this.router.navigate(["budget"]);
  }

  async logout() {
    await this.auth.signOut();
    this.loggedInStatus.next(false);
    this.userEmail.next(null);
    console.log("lefut a logout");
    this.toastr.success("Logout successful");
  }
}
