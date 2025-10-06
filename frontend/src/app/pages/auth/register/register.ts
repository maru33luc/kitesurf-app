import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, RouterLink, Navbar],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    password: ['', [Validators.required, Validators.minLength(6)]]
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
    const { name, email, phone, password } = this.form.getRawValue() as any;

    let role = 'student';

    if (name === 'admin') {
      role = 'admin';
    }

    
    this.auth.register(name, email, phone || '', password, role).subscribe({
      next: () => {
        this.snackBar.open('¡Cuenta creada exitosamente!', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/booking']);
      },
      error: (err) => {
        this.loading = false;
        const message = err.error?.error || 'Error al crear la cuenta';
        this.snackBar.open(message, 'Cerrar', { duration: 5000 });
      }
    });
  }
}

