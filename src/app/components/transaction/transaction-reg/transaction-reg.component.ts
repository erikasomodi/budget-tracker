import { Component, OnDestroy, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserModel } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Subscription } from "rxjs";
import {
  faBuildingColumns,
  faCar,
  faChartLine,
  faCreditCard,
  faGift,
  faHandHoldingDollar,
  faLaptop,
  faMoneyBill,
  faMoneyBillTrendUp,
  faPizzaSlice,
  faPlane,
  faSackDollar,
  faShirt,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../../services/auth.service";
import { TransactionModel } from "../../../models/transaction.model";

@Component({
  selector: "app-transaction-reg",
  templateUrl: "./transaction-reg.component.html",
  styleUrl: "./transaction-reg.component.scss",
})
export class TransactionRegComponent implements OnInit, OnDestroy {
  transactionForm!: FormGroup;
  currentDate: string = "";

  selectUser!: UserModel;
  LoginUserId!: string | null;

  updateTransactionId!: number | undefined;

  updateSubscription?: Subscription;
  authUserIdSubscription?: Subscription;
  saveSubscription?: Subscription;
  activatedParamsSubscription?: Subscription;
  activatedGetSubscription?: Subscription;

  transactionTypeOptions: { key: string; value: string }[] = [
    { key: "income", value: "Income" },
    { key: "expense", value: "Expense" },
  ];
  transactionMethodOptions: { key: string; value: string }[] = [
    { key: "cash", value: "Cash" },
    { key: "bank transfer", value: "Bank Transfer" },
    { key: "card", value: "Card" },
  ];
  transactionMethodOptionsWithIcons: {
    key: string;
    value: string;
    icon: IconProp;
  }[] = [
    { key: "cash", value: "Cash", icon: faMoneyBill },
    { key: "bank transfer", value: "Bank Transfer", icon: faBuildingColumns },
    { key: "card", value: "Card", icon: faCreditCard },
  ];
  transactionCategoryOptionsWithIconsIcomes: {
    key: string;
    value: string;
    icon: IconProp;
  }[] = [
    { key: "income", value: "Income", icon: faSackDollar },
    { key: "freeLance", value: "Freelance", icon: faHandHoldingDollar },
    { key: "investments", value: "Investments", icon: faMoneyBillTrendUp },
  ];
  transactionCategoryOptionsWithIconsExpenses: {
    key: string;
    value: string;
    icon: IconProp;
  }[] = [
    { key: "shopping", value: "Shopping", icon: faShirt },
    { key: "recreation", value: "Recreation", icon: faUmbrellaBeach },
    { key: "gifts", value: "Gifts", icon: faGift },
    { key: "food", value: "Food", icon: faPizzaSlice },
    { key: "electronic items", value: "Electronic items", icon: faLaptop },
    { key: "investments", value: "Investments", icon: faChartLine },
    { key: "travel", value: "Travel", icon: faCar },
    { key: "flight", value: "Flight", icon: faPlane },
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
      transactionDate: new FormControl("", [
        Validators.required,
        this.pastOrTodayDateValidator,
      ]),
      transactionCategory: new FormControl("", [Validators.required]),
      transactionMethod: new FormControl("", [Validators.required]),
    });

    this.authUserIdSubscription = this.authService.userId$.subscribe(
      (id: string | null) => {
        this.LoginUserId = id;
        console.log("Current User ID: ", this.LoginUserId);
        this.activatedParamsSubscription =
          this.activatedRoute.paramMap.subscribe({
            next: (params) => {
              const transactionIdString = params.get("id");
              console.log(transactionIdString);
              if (transactionIdString) {
                const transactionId = parseInt(transactionIdString, 10);
                if (!isNaN(transactionId)) {
                  this.updateTransactionId = transactionId;
                  console.log(this.updateTransactionId);
                  this.activatedGetSubscription = this.userService
                    .getTransactionWithGetDoc(this.LoginUserId!, transactionId)
                    .subscribe({
                      next: (data) => {
                        this.transactionForm.patchValue(data!);
                      },
                    });
                }
              }
            },
          });
      }
    );
    const today = new Date();
    this.currentDate = today.toISOString().split("T")[0];
  }

  addTransaction() {
    if (this.transactionForm.valid) {
      const newTransaction: TransactionModel = this.transactionForm.value;
      if (this.LoginUserId) {
        if (this.updateTransactionId) {
          newTransaction.id = this.updateTransactionId;
          this.updateSubscription = this.userService
            .updateTransaction(this.LoginUserId, newTransaction)
            .subscribe({
              next: () => {
                this.toastr.success("Transaction updated successfully!");
                this.transactionForm.reset();
                this.router.navigate(["/budget"]);
              },
              error: (err) => {
                console.log(err);
                this.toastr.error("Failed to update transaction.");
              },
            });
        } else {
          newTransaction.id = Date.now();
          this.saveSubscription = this.userService
            .addTransactionToUser(this.LoginUserId, newTransaction)
            .subscribe({
              next: () => {
                this.toastr.success("Transaction added successfully!");
                this.transactionForm.reset();
              },
              error: (err) => {
                console.log(err);
                this.toastr.error("Failed to add transaction.");
              },
            });
        }
      }
    }
  }

  // Move the validator function inside the class
  pastOrTodayDateValidator(control: AbstractControl): ValidationErrors | null {
    const today = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate > today) {
      return { futureDate: true };
    }
    return null;
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

  ngOnDestroy(): void {
    if (this.updateSubscription) {
      this.updateSubscription.unsubscribe();
    }
    if (this.authUserIdSubscription) {
      this.authUserIdSubscription.unsubscribe();
    }
    if (this.saveSubscription) {
      this.saveSubscription.unsubscribe();
    }
    if (this.activatedParamsSubscription) {
      this.activatedParamsSubscription.unsubscribe();
    }
    if (this.activatedGetSubscription) {
      this.activatedGetSubscription.unsubscribe();
    }
  }
}
