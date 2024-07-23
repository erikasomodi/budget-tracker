import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { Observable } from "rxjs";
import { UserModel } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
})
export class UserListComponent implements OnInit {
  users: UserModel[] = [];
  users$!: Observable<UserModel[]>;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getUsersWithGetDocs().subscribe({
      next: (data: UserModel[]) => {
        this.users = data;
      },
    });
    this.users$ = this.userService.getUsersWithGetDocs();
  }
  onSelect(id?: string) {
    if (id) {
      this.router.navigate(["users_list", id, "transactions"]);
    }
  }
}
