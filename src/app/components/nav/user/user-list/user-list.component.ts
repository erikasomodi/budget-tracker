import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserService } from "../../../../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { UserModel } from "../../../../../models/user.model";
import { Observable } from "rxjs";

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
      this.router.navigate(["movies_list", id]);
    }
  }
}
