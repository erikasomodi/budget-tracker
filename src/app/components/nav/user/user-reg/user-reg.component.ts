import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserService } from "../../../../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { UserModel } from "../../../../../models/user.model";

@Component({
  selector: "app-user-reg",
  templateUrl: "./user-reg.component.html",
  styleUrl: "./user-reg.component.scss",
})
export class UserRegComponent implements OnInit {
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  userRegForm: FormGroup = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.pattern("^[A-ZÁÉÍÓÖŐÚÜŰ].*"),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.min(0),
      Validators.max(120),
    ]),
    married: new FormControl(false, Validators.required),
    numberOfChildren: new FormControl("", [
      Validators.required,
      Validators.min(0),
    ]),
    startBudget: new FormControl("", [Validators.required, Validators.min(0)]),
    monthlySalary: new FormControl("", [
      Validators.required,
      Validators.min(0),
    ]),
    transactions: new FormControl(null),
  });

  updateUserId?: string;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        const userId = params.get("id");
        if (userId) {
          this.userService.getUserWithGetDoc(userId).subscribe({
            next: (data) => {
              this.userRegForm.patchValue(data);
              this.updateUserId = data.id;
            },
          });
        }
      },
    });
  }

  submitRegForm() {
    // console.log(this.userRegForm.value);
    if (!this.userRegForm.invalid) {
      const newUser: UserModel = this.userRegForm.value;
      if (this.updateUserId) {
        newUser.id = this.updateUserId;
        this.userService.updateUser(newUser).subscribe({
          next: () => {
            this.toastr.success("User update is successful!");
            this.router.navigate(["users_list"]);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        console.log(this.userRegForm.value);
        const newUser: UserModel = this.userRegForm.value;
        this.userService.addUser(newUser).subscribe({
          next: (docRef) => {
            console.log("User saved with ID:", docRef["id"]);
            this.toastr.success("You have registered a NEW user.");
            this.router.navigate(["users_list"]);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
  // GETTEREK
  //* egyszerűsíti a html-be kiolvasást
  get name() {
    return this.userRegForm.get("name");
  }

  get age() {
    return this.userRegForm.get("age");
  }

  get married() {
    return this.userRegForm.get("married");
  }

  get numberOfChildren() {
    return this.userRegForm.get("numberOfChildren");
  }

  get startBudget() {
    return this.userRegForm.get("startBudget");
  }

  get monthlySalary() {
    return this.userRegForm.get("monthlySalary");
  }
}
