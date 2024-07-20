import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { UserComponent } from './components/nav/user/user.component';
import { UserRegComponent } from './components/nav/user/user-reg/user-reg.component';
import { UserDetailsComponent } from './components/nav/user/user-details/user-details.component';
import { TransactionComponent } from './components/nav/transaction/transaction.component';
import { TransactionRegComponent } from './components/nav/transaction/transaction-reg/transaction-reg.component';
import { TransactionDetailsComponent } from './components/nav/transaction/transaction-details/transaction-details.component';

@NgModule({
  declarations: [AppComponent, MainComponent, NavComponent, UserComponent, UserRegComponent, UserDetailsComponent, TransactionComponent, TransactionRegComponent, TransactionDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule,FormsModule,BrowserAnimationsModule,HttpClientModule],
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
