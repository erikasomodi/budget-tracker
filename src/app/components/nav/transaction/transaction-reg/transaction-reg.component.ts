import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../../../services/user.service";
import { ToastrService } from "ngx-toastr";
import { TransactionModel } from "../../../../../models/transaction.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserModel } from "../../../../../models/user.model";
import { transition } from "@angular/animations";

@Component({
  selector: "app-transaction-reg",
  templateUrl: "./transaction-reg.component.html",
  styleUrl: "./transaction-reg.component.scss",
})
export class TransactionRegComponent implements OnInit {
  updateUserId?: string;
  selectUser!: UserModel;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) // private  newTransaction: TransactionModel;
  {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        const userId = params.get("id");
        if (userId) {
          this.userService.getUserWithGetDoc(userId).subscribe({
            next: (data) => {
              console.log(data.id);

              this.updateUserId = data.id;
              console.log(this.updateUserId);
              this.selectUser = data;
              console.log(this.selectUser);
            },
          });
        }
      },
    });
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
            this.router.navigate(["users_list"]);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }
}
