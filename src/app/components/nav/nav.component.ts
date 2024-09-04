import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme.service';

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

  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {}

  public async logout() {
    console.log(this.loggedInStatus$.subscribe());
    await this.authService.logout();
  }

  // téma váltás kiszervezve service-be
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // gomb színének beállítása
  getButtonClasses(): string {
    return this.dark ? 'btn-outline-light' : 'btn-outline-dark';
  }
}
