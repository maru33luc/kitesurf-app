import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    Navbar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class AdminDashboardComponent implements OnInit {
  stats = {
    pendingBookings: 0,
    totalBookings: 0,
    activeInstructors: 0,
    totalStudents: 0
  };

  constructor() {}

  ngOnInit() {
    // TODO: Cargar estadísticas desde el servicio
  }
}
