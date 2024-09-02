import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.scss",
})
export class HomePageComponent implements OnInit {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }

  public async logout() {
    await this.authService.logout();
  }

  navigateToReg() {
    this.router.navigate(["/registration"]);
  }
}
