import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  public loggedInStatus$ = this.authService.loggedInStatus$;
  public userEmail$ = this.authService.userEmail$;
  public userRole$ = this.authService.userRole$;
  public faAdjust = faAdjust;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  public async logout() {
    // console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
    this.router.navigate(['/login']);
  }

  // téma váltás kiszervezve service-be
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // gomb színének beállítása
  getButtonClasses(): string {
    return this.themeService.getButtonClasses();
  }
}
