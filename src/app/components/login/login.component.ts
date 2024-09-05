import { Component } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  showPassword: boolean = false;

  faEye: IconProp = faEye;
  faEyeSlash: IconProp = faEyeSlash;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });

  get email(): AbstractControl | null {
    return this.loginForm.get("email");
  }

  get password(): AbstractControl | null {
    return this.loginForm.get("password");
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  //* TOGGLE PASSWORD
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  public login() {
    this.authService.login(this.loginForm.value).subscribe();
  }

  public registration() {
    this.authService.registration(this.loginForm.value).subscribe();
  }

  public loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
