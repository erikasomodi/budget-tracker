import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UserRegComponent } from "./components/user/user-reg/user-reg.component";
import { UserComponent } from "./components/user/user.component";
import { UserListComponent } from "./components/user/user-list/user-list.component";
import { TransactionRegComponent } from "./components/transaction/transaction-reg/transaction-reg.component";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { TransactionListComponent } from "./components/transaction/transaction-list/transaction-list.component";
import { HomePageComponent } from "./components/home-page/home-page.component";

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: "users_registration", component: UserRegComponent },
  {
    path: "users_list",
    component: UserComponent,
    children: [
      { path: ":id", component: UserListComponent },
      { path: ":id/edit", component: UserRegComponent },
      { path: ":id/transactions", component: TransactionRegComponent },
    ],
  },
  { path: "new_transactions", component: TransactionRegComponent },
  {
    path: "transactions_list",
    component: TransactionComponent,
    children: [
      { path: ":id", component: TransactionListComponent },
      { path: ":id/edit", component: TransactionRegComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
