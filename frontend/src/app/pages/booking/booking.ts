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
import { ActivatedRoute } from '@angular/router';

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
    ReactiveFormsModule
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
  instructors = [
    { id: 1, name: 'Ana' },
    { id: 2, name: 'Marcos' },
    { id: 3, name: 'Lucía' }
  ];

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {}

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
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // TODO: Call booking service once backend is ready
    console.log('Booking request', this.form.value);
    alert('¡Reserva enviada! Te contactaremos para confirmar.');
  }
}
