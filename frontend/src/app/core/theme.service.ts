import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly ATTR = 'data-theme';
  private readonly STORAGE_KEY = 'app_theme';

  constructor(@Inject(DOCUMENT) private document: Document) {
    const saved = (typeof localStorage !== 'undefined'
      ? (localStorage.getItem(this.STORAGE_KEY) as 'light' | 'dark' | null)
      : null);
    if (saved) this.setTheme(saved);
  }

  toggleTheme(): void {
    const current = this.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: 'light' | 'dark') {
    this.document.documentElement.setAttribute(this.ATTR, theme);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  getTheme(): 'light' | 'dark' {
    return (this.document.documentElement.getAttribute(this.ATTR) as 'light' | 'dark') || 'light';
  }
}
