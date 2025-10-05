import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-admin-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    Navbar
  ],
  template: `
    <app-navbar></app-navbar>
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
    :host {
      display: block;
      min-height: 100vh;
      background: 
        radial-gradient(ellipse at top, rgba(127, 90, 240, 0.1), transparent),
        radial-gradient(ellipse at bottom, rgba(18, 194, 233, 0.1), transparent),
        linear-gradient(135deg, #0B1020 0%, #0E1528 100%);
      position: relative;
    }

    :host::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=2070&auto=format&fit=crop') center/cover;
      opacity: 0.04;
      pointer-events: none;
    }

    .calendar-container {
      padding: 100px 2rem 2rem;
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      margin-bottom: 2rem;
      background: linear-gradient(135deg, #fff, var(--violet));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2.5rem;
    }

    .calendar-navigation {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-lg);
      backdrop-filter: blur(12px);
    }

    .calendar-navigation h3 {
      color: #fff;
      font-size: 1.5rem;
      margin: 0;
      text-transform: capitalize;
    }

    .calendar-grid {
      min-height: 500px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(12px);
      padding: 2rem;
      box-shadow: var(--shadow-card);
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