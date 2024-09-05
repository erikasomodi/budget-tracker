import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
})
export class HomePageComponent implements OnInit, OnDestroy {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  userId$: Observable<string | null>;

  updateSubscription?: Subscription;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.userId$ = this.authService.userId$;
  }

  ngOnInit(): void {}
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }

  public async logout() {
    console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
  }

  navigateToReg() {
    this.router.navigate(["/registration"]);
  }
  public updateUser() {
    this.updateSubscription = this.userId$.subscribe((userId) => {
      if (userId) {
        this.router.navigate(["registrationWithGoogle", userId]);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
