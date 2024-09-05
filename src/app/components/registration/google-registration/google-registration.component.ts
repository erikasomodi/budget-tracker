import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";

import { Observable, Subscription, tap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../services/user.service";
import { AuthService } from "../../../services/auth.service";
import { UserModel } from "../../../models/user.model";

@Component({
  selector: "app-google-registration",
  templateUrl: "./google-registration.component.html",
  styleUrls: ["./google-registration.component.scss"],
})
export class GoogleRegistrationComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;

  userId$: Observable<string | null>;
  userId: string | null = null;
  userIdSubscription?: Subscription;

  userEmail$: Observable<string | null>;
  userEmail: string | null = null;
  userEmailSubscription?: Subscription;

  userRole$: Observable<string>;
  userRole: string = "guest";
  userRoleSubscription?: Subscription;

  updateUserId?: string | null;
  originalUser?: UserModel;

  updateSubscription?: Subscription;
  saveSubscription?: Subscription;
  activatedParamsSubscription?: Subscription;
  activatedGetSubscription?: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.userId$ = this.authService.userId$;
    this.userEmail$ = this.authService.userEmail$;
    this.userRole$ = this.authService.userRole$;
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl(""),
      password: new FormControl("***SECRET***"),
      age: new FormControl("", [Validators.required]),
      married: new FormControl("", [Validators.required]),
      numberOfChildren: new FormControl(null, [Validators.required]),
      startBudget: new FormControl("", [Validators.required]),
      monthlySalary: new FormControl("", [Validators.required]),
      role: new FormControl("guest"),
    });

    this.userIdSubscription = this.userId$.subscribe((userId) => {
      this.userId = userId;
      console.log(`user id a komponensben: `, this.userId);
    });

    this.userEmailSubscription = this.userEmail$.subscribe((userEmail) => {
      this.userEmail = userEmail;
      console.log(`user email a komponensben: `, this.userEmail);
    });

    this.userRoleSubscription = this.userRole$.subscribe((userRole) => {
      this.userRole = userRole;
      this.userForm.patchValue({ role: userRole });
      console.log(`user role a komponensben: `, this.userRole);
    });

    //* SHOW OF UPDATED DATA
    this.activatedParamsSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const userId = params.get("id");
        if (userId) {
          this.updateUserId = userId;
          this.activatedGetSubscription = this.userService
            .getUserWithGetDoc(userId)
            .subscribe({
              next: (data) => {
                this.userForm.patchValue(data);
                this.originalUser = data;
              },
            });
        }
      },
    });
  }

  handleSubmit() {
    if (this.userForm.valid && this.updateUserId) {
      this.updateUser();
    } else if (this.userForm.valid) {
      const user: UserModel = this.userForm.value;

      user.email = this.userEmail;
      this.saveSubscription = this.userService
        .createUserWithId(this.userId, user)
        .subscribe({
          next: () => {
            console.log("User created!");
            this.toastr.success(`${user.name}'s registration was successful!`);
            this.router.navigate(["home-page"]);
          },
          error: (error) => {
            console.log(error);
          },
        });
      this.userForm.reset();
      console.log(user.id);
      console.log(user.email);
      console.log(user.password);
    } else {
    }
  }

  updateUser(): void {
    const formValues: UserModel = this.userForm.value;
    this.userService.getUserWithGetDoc(this.updateUserId).subscribe((data) => {
      console.log("Ez a kiolvasott user:", data);
      const updateUser: UserModel = {
        ...data,
        ...formValues,
      };
      console.log("Ez a frissitett user:", updateUser);

      this.updateSubscription = this.userService
        .updateUser(updateUser)
        .subscribe({
          next: () => {
            this.toastr.success("User updated successfully!");
            this.router.navigate(["users"]);
          },
          error: (error) => {
            console.log(error);
            this.toastr.error("User update failed!");
          },
        });
      this.userForm.reset();
      this.updateUserId = undefined;
    });
  }
  //* GETTEREK

  get name(): AbstractControl | null {
    return this.userForm.get("name");
  }
  get email(): AbstractControl | null {
    return this.userForm.get("email");
  }
  get password(): AbstractControl | null {
    return this.userForm.get("password");
  }
  get age(): AbstractControl | null {
    return this.userForm.get("age");
  }
  get married(): AbstractControl | null {
    return this.userForm.get("married");
  }
  get numberOfChildren(): AbstractControl | null {
    return this.userForm.get("numberOfChildren");
  }
  get startBudget(): AbstractControl | null {
    return this.userForm.get("startBudget");
  }
  get monthlySalary(): AbstractControl | null {
    return this.userForm.get("monthlySalary");
  }
  get role(): AbstractControl | null {
    return this.userForm.get("role");
  }

  ngOnDestroy(): void {
    if (this.userEmailSubscription) {
      this.userEmailSubscription.unsubscribe();
    }
    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }
  }
}
