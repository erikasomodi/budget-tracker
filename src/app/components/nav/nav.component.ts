import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  public userEmail$ = this.authService.userEmail$;
  private dark = true;
  public faAdjust = faAdjust;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  public async logout() {
    console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
  }

  // téma váltás
  toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', newTheme);
    this.dark = newTheme === 'dark';
  }

  // gomb színének beállítása
  getButtonClasses(): string {
    return this.dark ? 'btn-outline-light' : 'btn-outline-dark';
  }
}
