import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from "@angular/fire/auth";
import { getFirestore, provideFirestore } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { UserComponent } from "./components/user/user.component";
import { UserRegComponent } from "./components/user/user-reg/user-reg.component";
import { UserDetailsComponent } from "./components/user/user-details/user-details.component";
import { TransactionComponent } from "./components/transaction/transaction.component";
import { TransactionRegComponent } from "./components/transaction/transaction-reg/transaction-reg.component";
import { TransactionDetailsComponent } from "./components/transaction/transaction-details/transaction-details.component";
import { UserListComponent } from "./components/user/user-list/user-list.component";
import { TransactionListComponent } from "./components/transaction/transaction-list/transaction-list.component";
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
       NavComponent,
    UserComponent,
    UserRegComponent,
    UserDetailsComponent,
    TransactionComponent,
    TransactionRegComponent,
    TransactionDetailsComponent,
    UserListComponent,
    TransactionListComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
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