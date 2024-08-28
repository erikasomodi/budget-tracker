import { Component } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
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

  public login() {
    this.authService.login(this.loginForm.value).subscribe();
  }

  public registration() {
    this.authService.registration(this.loginForm.value).subscribe();
  }

  public loginWithGoogle() {}
}
