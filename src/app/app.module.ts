import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

<<<<<<< HEAD
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { NavComponent } from "./components/nav/nav.component";
import { HomePageComponent } from "./components/home-page/home-page.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { TransactionsComponent } from "./components/transactions/transactions.component";
import { BudgetTrackerComponent } from "./components/budget-tracker/budget-tracker.component";
import { LoginComponent } from "./components/login/login.component";
=======
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NavComponent } from './components/nav/nav.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BudgetTrackerComponent } from './components/budget-tracker/budget-tracker.component';
import { LoginComponent } from './components/login/login.component';
import { ToastrModule } from 'ngx-toastr';
>>>>>>> 83856d085ede2fa042d3ee040b9d336defd1c0a5

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    RegistrationComponent,
    BudgetTrackerComponent,
    LoginComponent,
  ],
<<<<<<< HEAD
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
=======
  imports: [BrowserModule, AppRoutingModule, ToastrModule.forRoot()],
>>>>>>> 83856d085ede2fa042d3ee040b9d336defd1c0a5
  providers: [
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyAc9vgYmywgGJHWefTdt2KPuIwsfkRAHTU',
        authDomain: 'angular-firebase-project-alpha.firebaseapp.com',
        projectId: 'angular-firebase-project-alpha',
        storageBucket: 'angular-firebase-project-alpha.appspot.com',
        messagingSenderId: '552703926716',
        appId: '1:552703926716:web:981086f1b6e2b319ae0bb9',
        measurementId: 'G-NHCKBRYHJF',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
