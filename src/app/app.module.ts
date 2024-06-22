import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp({"projectId":"angular-firebase-pm-ki","appId":"1:836797318054:web:6a4edf8d46344d7d1c4567","storageBucket":"angular-firebase-pm-ki.appspot.com","apiKey":"AIzaSyBexnStVHM2-f5lddPhgtxYPwfNh3gxNv8","authDomain":"angular-firebase-pm-ki.firebaseapp.com","messagingSenderId":"836797318054"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
