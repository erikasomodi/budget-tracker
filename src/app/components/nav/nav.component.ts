import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";
import { ThemeService } from "../../services/theme.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent implements OnInit, OnDestroy {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  public userEmail$ = this.authService.userEmail$;
  userId$: Observable<string | null>;
  private dark = true;
  public faAdjust = faAdjust;

  updateSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.userId$ = this.authService.userId$;
  }

  ngOnInit(): void {}

  public updateUser() {
    this.updateSubscription = this.userId$.subscribe((userId) => {
      if (userId) {
        this.router.navigate(["registrationWithGoogle", userId]);
      }
    });
  }

  public async logout() {
    console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
  }

  // téma váltás kiszervezve service-be
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // gomb színének beállítása
  getButtonClasses(): string {
    return this.themeService.getButtonClasses();
  }

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
  }
}
