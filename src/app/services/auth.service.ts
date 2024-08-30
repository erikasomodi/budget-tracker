import { Injectable } from "@angular/core";
import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@angular/fire/auth";
import { Router } from "@angular/router";
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

  public get loggedInStatus$(): Observable<boolean | null> {
    return this.loggedInStatus.asObservable();
  }

  constructor(private router: Router, private auth: Auth) {}

  public checkAuthState(): void {
    this.auth.onAuthStateChanged({
      next: (user) => {
        if (user) {
          console.log("van user initkor: ", user);
          this.loggedInStatus.next(true);
        }
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log("completed");
      },
    });
  }

  public registration(regData: userAuthData): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, regData.email, regData.password)
    ).pipe(
      tap((userCredential) => {
        this.loggedInStatus.next(true);
        console.log("user adatok", userCredential);
        console.log("Registered and logged in.");
        this.router.navigate([""]);
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
        console.log("user adatok: ", userCredential);

        this.loggedInStatus.next(true);

        console.log("You have logged in successfully");

        this.router.navigate([""]);
      }),

      catchError((error) => {
        console.log(error.message);

        return error;
      })
    ) as Observable<UserCredential>;
  }

  async logout() {
    await this.auth.signOut();
    this.loggedInStatus.next(false);
  }
}
