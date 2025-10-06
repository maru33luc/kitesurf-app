import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';
import { BookingService } from '../../core/services/booking.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatNativeDateModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    Navbar
  ],
  templateUrl: './booking.html',
  styleUrl: './booking.css'
})
export class BookingComponent implements OnInit {
  form!: FormGroup;
  levels = [
    { value: 'beginner', label: 'Principiante' },
    { value: 'intermediate', label: 'Intermedio' },
    { value: 'advanced', label: 'Avanzado' }
  ];
  instructors: any[] = [];
  timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00'
  ];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const levelFromQuery = this.route.snapshot.queryParamMap.get('level');
    this.form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      date: [null, Validators.required],
      time: ['', Validators.required],
      level: [this.levels.find(l => l.value === levelFromQuery)?.value ?? '', Validators.required],
      instructorId: [null, Validators.required],
      notes: ['']
    });

    // Load instructors from database
    this.loadInstructors();
  }

  loadInstructors() {
    this.bookingService.getInstructors().subscribe({
      next: (instructors) => {
        this.instructors = instructors;
      },
      error: (err) => {
        console.error('Error loading instructors:', err);
        this.snackBar.open('Error al cargar instructores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formData = this.form.value;

    // Create booking (requires authentication)
    this.bookingService.createBooking({
      session_id: 1, // TODO: Get from selected session
      equipment_id: undefined
    }).subscribe({
      next: (booking) => {
        this.snackBar.open('¡Reserva confirmada! Te enviamos un email.', 'Cerrar', { 
          duration: 5000 
        });
        this.loading = false;
        setTimeout(() => this.router.navigate(['/landing']), 2000);
      },
      error: (err) => {
        console.error('Error creating booking:', err);
        const message = err.error?.error || 'Error al crear la reserva. Debes estar logueado.';
        this.snackBar.open(message, 'Cerrar', { 
          duration: 5000 
        });
        this.loading = false;
        // Redirect to login if not authenticated
        if (err.status === 401) {
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        }
      }
    });
  }
}
