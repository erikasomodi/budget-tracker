import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserModel } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import {
  faChartLine,
  faGift,
  faLaptop,
  faMoneyBill,
  faPizzaSlice,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-transaction-reg",
  templateUrl: "./transaction-reg.component.html",
  styleUrl: "./transaction-reg.component.scss",
})
export class TransactionRegComponent implements OnInit {
  updateUserId!: string | null;
  selectUser!: UserModel;
  transactionForm!: FormGroup;
  saveSub?: Subscription;

  transactionTypeOptions: { key: string; value: string }[] = [
    { key: "income", value: "Income" },
    { key: "expense", value: "Expense" },
  ];
  transactionMethodOptions: { key: string; value: string }[] = [
    { key: "cash", value: "Cash" },
    { key: "bank transfer", value: "Bank Transfer" },
    { key: "card", value: "Card" },
  ];
  transactionCategoryOptions: { key: string; value: string; icon: IconProp }[] =
    [
      { key: "shopping", value: "Shopping", icon: faShirt },
      { key: "gifts", value: "Gifts", icon: faGift },
      { key: "food", value: "Food", icon: faPizzaSlice },
      { key: "income", value: "Income", icon: faMoneyBill },
      { key: "freeLance", value: "Freelance", icon: faMoneyBill },
      { key: "investments", value: "Investments", icon: faMoneyBill },
      { key: "electronic items", value: "Electronic items", icon: faLaptop },
      { key: "investments", value: "Investments", icon: faChartLine },
    ];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.transactionForm = new FormGroup({
      transactionName: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
      transactionType: new FormControl("", [Validators.required]),
      transactionAmount: new FormControl(null, [
        Validators.required,
        Validators.min(1),
      ]),
      transactionDate: new FormControl("", [Validators.required]),
      transactionCategory: new FormControl("", [Validators.required]),
      transactionMethod: new FormControl("", [Validators.required]),
    });

    this.authService.userId$.subscribe((id: string | null) => {
      this.updateUserId = id;
      console.log("Current User ID: ", this.updateUserId);
    });
    // this.activatedRoute.paramMap.subscribe({
    //   next: (params: ParamMap) => {
    //     const userId = params.get("id");
    //     if (userId) {
    //       this.userService.getUserWithGetDoc(userId).subscribe({
    //         next: (data) => {
    //           console.log(data.id);
    //           this.updateUserId = data.id;
    //           console.log(this.updateUserId);
    //           this.selectUser = data;
    //           console.log(this.selectUser);
    //         },
    //       });
    //     }
    //   },
    // });
  }
  newTransaction = {
    id: Date.now(),
    transactionName: "Grocery Shopping",
    transactionAmount: 50.25,
    transactionDate: "2024-07-23",
    transactionCategory: "Food",
    transactionMethod: "Credit Card",
  };
  // console.log(newTransaction);

  addTransaction() {
    if (this.updateUserId) {
      this.userService
        .addTransactionToUser(this.updateUserId, this.newTransaction)
        .subscribe({
          next: () => {
            this.toastr.success("Add a new transaction is successful!");
            console.log(this.selectUser);
            console.log(this.selectUser.transactions);
            // this.router.navigate(["users_list"]);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  get transactionName() {
    return this.transactionForm.get("transactionName") as FormControl;
  }

  get transactionType() {
    return this.transactionForm.get("transactionType") as FormControl;
  }

  get transactionAmount() {
    return this.transactionForm.get("transactionAmount") as FormControl;
  }

  get transactionDate() {
    return this.transactionForm.get("transactionDate") as FormControl;
  }

  get transactionCategory() {
    return this.transactionForm.get("transactionCategory") as FormControl;
  }

  get transactionMethod() {
    return this.transactionForm.get("transactionMethod") as FormControl;
  }
}
