import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'staff' | 'admin';
}

interface LoginResponse {
  token: string;
}

interface RegisterResponse {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  private readonly API_URL = 'http://localhost:3000/api/auth';
  private _user$ = new BehaviorSubject<AuthUser | null>(this.getStoredUser());

  readonly user$ = this._user$.asObservable();

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(email: string, password: string): Observable<AuthUser> {
    return new Observable<AuthUser>(observer => {
      this.http.post<LoginResponse>(`${this.API_URL}/login`, { email, password }).subscribe({
        next: (response) => {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.TOKEN_KEY, response.token);
          }
          // Decode token to get user info
          const user: AuthUser = this.decodeToken(response.token);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          }
          this._user$.next(user);
          observer.next(user);
          observer.complete();
        },
        error: (error) => {
          console.error('Login error:', error);
          observer.error(error);
        }
      });
    });
  }

  register(name: string, email: string, phone: string, password: string, role: string = 'student'): Observable<AuthUser> {
    return new Observable<AuthUser>(observer => {
      this.http.post<RegisterResponse>(`${this.API_URL}/register`, { 
        name,
        email,
        phone,
        password,
        role 
      }).subscribe({
        next: (response) => {
          const user: AuthUser = {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role as 'student' | 'staff' | 'admin'
          };
          // Auto-login after registration
          this.login(email, password).subscribe({
            next: (loggedUser) => {
              observer.next(loggedUser);
              observer.complete();
            },
            error: (err) => observer.error(err)
          });
        },
        error: (error) => {
          console.error('Register error:', error);
          observer.error(error);
        }
      });
    });
  }

  private decodeToken(token: string): AuthUser {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      return { id: 0, name: '', email: '', role: 'student' };
    }
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this._user$.next(null);
  }

  getUser(): AuthUser | null {
    return this._user$.value;
  }

  private getStoredUser(): AuthUser | null {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(this.USER_KEY) : null;
      return raw ? JSON.parse(raw) as AuthUser : null;
    } catch {
      return null;
    }
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
}

