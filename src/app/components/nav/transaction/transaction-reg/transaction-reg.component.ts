import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../../../services/user.service";
import { TransactionModel } from "../../../../../models/transaction.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: "app-transaction-reg",
  templateUrl: "./transaction-reg.component.html",
  styleUrl: "./transaction-reg.component.scss",
})
export class TransactionRegComponent implements OnInit {
  userId!: string | null | undefined;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get("id");
    });
  }
  addTransaction() {
    const newTransaction: TransactionModel = {
      transactionName: "Example Transaction",
      transactionAmount: 100,
      transactionDate: new Date().toISOString(),
      transactionCategory: "Example Category",
      transactionMethod: "Example Method",
    };

    this.userService
      .addTransactionToUser(this.userId, newTransaction)
      .subscribe({
        next: () => {
          console.log("Transaction added to user successfully.");
        },
        error: (err) => {
          console.error("Error adding transaction:", err);
        },
      });
  }
}
