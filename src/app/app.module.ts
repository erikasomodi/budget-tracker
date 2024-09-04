import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";

import { NavComponent } from "./components/nav/nav.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { BudgetTrackerComponent } from "./components/budget-tracker/budget-tracker.component";
import { LoginComponent } from "./components/login/login.component";
import { ToastrModule } from "ngx-toastr";
import { TransactionRegComponent } from "./components/transaction/transaction-reg/transaction-reg.component";

import { ButtonComponent } from "./components/shared/button/button.component";
import { ButtonSwitcherComponent } from "./components/shared/button-switcher/button-switcher.component";
import { SelectComponent } from "./components/shared/select/select.component";
import { UserListComponent } from "./components/users/user-list/user-list.component";
import { UserDetailsComponent } from "./components/users/user-details/user-details.component";
import { UserFilterComponent } from "./components/users/user-filter/user-filter.component";
import { UsersComponent } from "./components/users/users.component";
import { InputComponent } from "./components/shared/input/input.component";
import { TransactionItemComponent } from "./components/budget-tracker/transaction-item/transaction-item.component";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ChartComponent } from './components/budget-tracker/chart/chart.component';
import { GoogleRegistrationComponent } from './components/registration/google-registration/google-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    RegistrationComponent,
    BudgetTrackerComponent,
    LoginComponent,
    TransactionRegComponent,
    ButtonComponent,
    ButtonSwitcherComponent,
    SelectComponent,
    UserListComponent,
    UserDetailsComponent,
    UserFilterComponent,
    UsersComponent,
    InputComponent,
    TransactionItemComponent,
    PageNotFoundComponent,
    ChartComponent,
    GoogleRegistrationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
  ],
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: "AIzaSyAc9vgYmywgGJHWefTdt2KPuIwsfkRAHTU",
        authDomain: "angular-firebase-project-alpha.firebaseapp.com",
        projectId: "angular-firebase-project-alpha",
        storageBucket: "angular-firebase-project-alpha.appspot.com",
        messagingSenderId: "552703926716",
        appId: "1:552703926716:web:981086f1b6e2b319ae0bb9",
        measurementId: "G-NHCKBRYHJF",
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
