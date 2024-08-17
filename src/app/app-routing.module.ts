import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./components/home-page/home-page.component";
import { LoginComponent } from "./components/login/login.component";

import { RegistrationComponent } from "./components/registration/registration.component";

import { TransactionRegComponent } from "./components/transaction/transaction-reg/transaction-reg.component";
import { TransactionListComponent } from "./components/transaction/transaction-list/transaction-list.component";

import { BudgetTrackerComponent } from "./components/budget-tracker/budget-tracker.component";
import { UserListComponent } from "./components/user-list/user-list.component";

const routes: Routes = [
  { path: "", redirectTo: "home-page", pathMatch: "full" },
  { path: "home-page", component: HomePageComponent },

  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "user-list", component: UserListComponent },

  { path: "transaction/transaction-reg", component: TransactionRegComponent },
  { path: "transaction/transaction-list", component: TransactionListComponent },

  { path: "budget", component: BudgetTrackerComponent },

  { path: "**", redirectTo: "home-page" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
