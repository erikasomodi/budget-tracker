import { AuthService, userAuthData } from "./../../services/auth.service";
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
import { ActivatedRoute, Router } from "@angular/router";
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

  updateUserId?: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

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

    //* SHOW OF REGISTRATION DATA
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const userId = params.get("id");
        if (userId) {
          this.updateUserId = userId;
          this.userService.getUserWithGetDoc(userId).subscribe({
            next: (data) => {
              this.userForm.patchValue(data);
              this.updateUserId = data.id;
            },
          });
        }
      },
    });
  }

  //* TOGGLE PASSWORD
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  //* CREATE USER

  handleSubmit() {
    if (this.userForm.valid) {
      const regData = this.userForm.value;
      this.authService.registration(regData).subscribe({
        next: (userCredential) => {
          console.log("User registered:", userCredential);
          this.router.navigate([""]); // Navigate to the desired route after registration
        },
        error: (error) => {
          console.error("Registration error:", error);
        },
        complete: () => {
          console.log("Registration completed");
        },
      });
    } else {
      console.error("Form is invalid");
    }
    this.saveUser();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const user: UserModel = this.userForm.value;
      if (this.updateUserId) {
        user.id = this.updateUserId;
        this.userService.updateUser(user).subscribe({
          next: () => {
            this.router.navigate(["users"]);
          },
        });
      } else {
        this.saveSubscription = this.userService.createUser(user).subscribe({
          next: () => {
            console.log("User created!");
            // this.router.navigate(["/home"]);
          },
          error: (error) => {
            console.log(error);
          },
        });
        this.userForm.reset();
      }
    }
  }

  //* USER REGISTRATION, LOGIN
  public registration() {
    if (this.userForm.valid) {
      const loginData: userAuthData = {
        email: this.userForm.get("email")?.value,
        password: this.userForm.get("password")?.value,
      };
      this.authService.registration(loginData).subscribe();
    }
  }

  public login() {
    if (this.userForm.valid) {
      const loginData: userAuthData = {
        email: this.userForm.get("email")?.value,
        password: this.userForm.get("password")?.value,
      };
      this.authService.login(loginData).subscribe();
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
