import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserModel } from "../../models/user.model";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.scss",
})
export class RegistrationComponent implements OnInit, OnDestroy {
  userForm!: FormGroup;
  saveSubscription?: Subscription;
  showPassword: boolean = false;
  faEye: IconProp = faEye;
  faEyeSlash: IconProp = faEyeSlash;

  constructor(private userService: UserService, private router: Router) {}

  //plusz validátorok még kellenek!
  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [
        Validators.required,
        this.adminEmailValidator,
      ]),
      password: new FormControl("", [
        Validators.required,
        this.adminEmailValidator,
      ]),
      age: new FormControl("", [Validators.required]),
      married: new FormControl("", [Validators.required]),
      numberOfChildren: new FormControl(null, [Validators.required]),
      startBudget: new FormControl("", [Validators.required]),
      monthlySalary: new FormControl("", [Validators.required]),
    });
  }

  //* TOGGLE PASSWORD
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  //* CREATE USER

  saveUser(): void {
    if (this.userForm.valid) {
      const user: UserModel = this.userForm.value;
      this.saveSubscription = this.userService.createUser(user).subscribe({
        next: () => {
          console.log("User created!");
          this.router.navigate(["/home"]);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.userForm.reset();
    }
  }

  //* CUSTOM VALIDATOR

  adminEmailValidator(control: AbstractControl): ValidationErrors | null {
    const controlValue = control.value as string;

    if (controlValue != null) {
      return controlValue.match(/admin/i)
        ? { email: { value: control.value + "Error: contain admin" } }
        : null;
    }
    return null;
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

  ngOnDestroy(): void {
    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }
  }
}
