import { UserService } from "./../../services/user.service";
import { Component, OnInit } from "@angular/core";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  router: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsersWithGetDocs().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
      },
    });
  }

  onSelect(id?: string) {
    if (id) {
      this.router.navigate(["users", id]);
    }
  }
}
