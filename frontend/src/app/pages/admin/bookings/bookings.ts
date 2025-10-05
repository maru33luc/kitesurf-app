import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    Navbar
  ],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css'
})
export class AdminBookingsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'date', 'time', 'studentName', 'level', 'status', 'actions'];
  dataSource = [];

  constructor() {}

  ngOnInit() {
    // TODO: Implementar carga de reservas desde el servicio
  }

  approveBooking(id: number) {
    // TODO: Implementar aprobación de reserva
  }

  cancelBooking(id: number) {
    // TODO: Implementar cancelación de reserva
  }

  viewDetails(id: number) {
    // TODO: Implementar vista de detalles
  }
}