import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { BudgetTrackerComponent } from "./components/budget-tracker/budget-tracker.component";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  { path: "home-page", component: HomePageComponent },
  { path: "login", component: LoginComponent },
  { path: "registration", component: RegistrationComponent },
  { path: "transactions", component: TransactionsComponent },
  { path: "budget", component: BudgetTrackerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
