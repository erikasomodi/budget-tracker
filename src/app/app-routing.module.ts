import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePageComponent } from "./components/home-page/home-page.component";
import { LoginComponent } from "./components/login/login.component";

import { RegistrationComponent } from "./components/registration/registration.component";

import { TransactionRegComponent } from "./components/transaction/transaction-reg/transaction-reg.component";

import { BudgetTrackerComponent } from "./components/budget-tracker/budget-tracker.component";
import { UserDetailsComponent } from "./components/users/user-details/user-details.component";
import { UsersComponent } from "./components/users/users.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "home-page", pathMatch: "full" },
  { path: "home-page", component: HomePageComponent },

  { path: "login", component: LoginComponent },
  {
    path: "registration",
    component: RegistrationComponent,
    children: [{ path: ":id", component: RegistrationComponent }],
  },
  {
    path: "users",
    component: UsersComponent,
    children: [
      { path: ":id", component: UserDetailsComponent },
      { path: ":id/edit", component: RegistrationComponent },
    ],
  },

  {
    path: "transaction-reg",
    component: TransactionRegComponent,
    children: [{ path: ":id", component: TransactionRegComponent }],
  },

  { path: "budget", component: BudgetTrackerComponent },

  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
