import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomePageComponent,
    RegistrationComponent,
    BudgetTrackerComponent,
    LoginComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ToastrModule.forRoot()],
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
