import { UserService } from "../../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../../models/user.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  constructor(private userService: UserService, private router: Router) {}

  //csak manuálisan elindídásra kérjük le az adatokat
  ngOnInit(): void {
    this.userService.getUsersWithGetDocs().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
      },
    });
  }

  onSelect(id?: string | null | undefined) {
    if (id) {
      this.router.navigate(["users", id]);
    }
  }
}
