import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-user-reg",
  templateUrl: "./user-reg.component.html",
  styleUrl: "./user-reg.component.scss",
})
export class UserRegComponent implements OnInit {
  ngOnInit(): void {}
}
