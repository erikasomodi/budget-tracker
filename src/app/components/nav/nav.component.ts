import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.scss",
})
export class NavComponent implements OnInit {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  public userEmail$ = this.authService.userEmail$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public async logout() {
    console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
  }
}
