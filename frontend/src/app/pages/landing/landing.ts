import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Navbar
  ],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class LandingComponent {
  public currentYear = new Date().getFullYear();

  constructor() {
    // Puedes agregar lógica de inicialización aquí si es necesario
  }
}
