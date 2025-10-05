import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

export interface AuthUser {
  id: number;
  username: string;
  role: 'student' | 'staff' | 'admin';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private _user$ = new BehaviorSubject<AuthUser | null>(this.getStoredUser());

  readonly user$ = this._user$.asObservable();

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Observable<AuthUser> {
    // TODO: Replace with real API call
    const fakeToken = 'demo-token';
    const user: AuthUser = { id: 1, username, role: username === 'admin' ? 'admin' : 'student' };
    localStorage.setItem(this.TOKEN_KEY, fakeToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._user$.next(user);
    return of(user);
  }

  register(username: string, email: string, password: string): Observable<AuthUser> {
    // TODO: Replace with real API call
    return this.login(username, password);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._user$.next(null);
  }

  getUser(): AuthUser | null {
    return this._user$.value;
  }

  private getStoredUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }
}
