
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-firebase-project';
  
  constructor(private authService: AuthService) {
    this.authService.checkAuthState();
  }
}


