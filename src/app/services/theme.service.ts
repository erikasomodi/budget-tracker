import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = true;

  constructor() {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-bs-theme', savedTheme);
      this.dark = savedTheme === 'dark';
    }
  }
  // téma váltás
  toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-bs-theme', newTheme);
    this.dark = newTheme === 'dark';
    localStorage.setItem('selectedTheme', newTheme);
  }
  // téma lekérdezése
  isDarkTheme() {
    return this.dark;
  }
  // gomb színének beállítása
  getButtonClasses(): string {
    return this.dark ? 'btn-outline-light' : 'btn-outline-dark';
  }
}
