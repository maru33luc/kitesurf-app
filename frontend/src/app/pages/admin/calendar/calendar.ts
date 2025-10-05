import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="calendar-container">
      <h2>Calendario de Clases</h2>
      <div class="calendar-navigation">
        <button mat-icon-button (click)="previousMonth()">
          <mat-icon>chevron_left</mat-icon>
        </button>
        <h3>{{ currentMonth }} {{ currentYear }}</h3>
        <button mat-icon-button (click)="nextMonth()">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>
      <div class="calendar-grid">
        <!-- TODO: Implementar vista de calendario -->
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      padding: 20px;
    }

    .calendar-navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }

    h2 {
      margin-bottom: 20px;
    }

    .calendar-grid {
      min-height: 400px;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 20px;
    }
  `]
})
export class AdminCalendarComponent implements OnInit {
  currentMonth = '';
  currentYear = 0;

  constructor() {
    const now = new Date();
    this.currentMonth = now.toLocaleString('es', { month: 'long' });
    this.currentYear = now.getFullYear();
  }

  ngOnInit() {
    // TODO: Cargar eventos del calendario
  }

  previousMonth() {
    // TODO: Implementar navegación al mes anterior
  }

  nextMonth() {
    // TODO: Implementar navegación al mes siguiente
  }
}