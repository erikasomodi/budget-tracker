import { UserService } from "./../../../services/user.service";
import { UserModel } from "./../../../models/user.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-user-details",
  templateUrl: "./user-details.component.html",
  styleUrl: "./user-details.component.scss",
})
export class UserDetailsComponent implements OnInit {
  public user?: UserModel;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        const userId = params.get("id");
        if (userId) {
          this.userService.getUserWithGetDoc(userId).subscribe({
            next: (data) => (this.user = data),
          });
        }
      },
    });
  }

  onDeleteUser(id?: string | null | undefined): void {
    if (id && confirm(`Do you wanna delete user with id: ${id}?`)) {
      this.userService.deletUser(id).subscribe({
        next: () => this.router.navigate(["users"]),
      });
    }
  }

  onUpdateUser(id?: string | null | undefined): void {
    if (id) {
      this.router.navigate(["users", id, "edit"]);
    }
  }
}
