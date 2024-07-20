import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./components/main/main.component";
import { UserRegComponent } from "./components/nav/user/user-reg/user-reg.component";
import { UserDetailsComponent } from "./components/nav/user/user-details/user-details.component";
import { TransactionRegComponent } from "./components/nav/transaction/transaction-reg/transaction-reg.component";
import { TransactionDetailsComponent } from "./components/nav/transaction/transaction-details/transaction-details.component";
import { UserComponent } from "./components/nav/user/user.component";
import { TransactionComponent } from "./components/nav/transaction/transaction.component";

const routes: Routes = [
  { path: "home", component: MainComponent },
  { path: "users_registration", component: UserRegComponent },
  {
    path: "users_list",
    component: UserComponent,
    children: [
      { path: ":id", component: UserDetailsComponent },
      { path: ":id/edit", component: UserRegComponent },
    ],
  },
  { path: "new_transactions", component: TransactionRegComponent },
  {
    path: "transactions_list",
    component: TransactionComponent,
    children: [
      { path: ":id", component: TransactionDetailsComponent },
      { path: ":id/edit", component: TransactionRegComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
