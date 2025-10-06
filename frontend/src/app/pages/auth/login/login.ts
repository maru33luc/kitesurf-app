import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, RouterLink, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submit() {
    if (this.form.invalid) { 
      this.form.markAllAsTouched(); 
      return; 
    }
    
    this.loading = true;
    const { email, password } = this.form.getRawValue() as any;
    
    this.auth.login(email, password).subscribe({
      next: () => {
        this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 2000 });
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.loading = false;
        const message = err.error?.error || 'Credenciales inválidas';
        this.snackBar.open(message, 'Cerrar', { duration: 5000 });
      }
    });
  }
}
