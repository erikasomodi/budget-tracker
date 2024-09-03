import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  public userEmail$ = this.authService.userEmail$;
  private dark = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public async logout() {
    console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
  }
  toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', newTheme);
    this.dark = newTheme === 'dark'; // Update the theme state
  }

  getButtonClasses(): string {
    return this.dark ? 'btn-outline-light' : 'btn-outline-dark'; // Corrected class names
  }
}
