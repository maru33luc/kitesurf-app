import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Navbar } from '../../../shared/navbar/navbar';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    Navbar
  ],
  template: `
    <app-navbar></app-navbar>
    <div class="users-container">
      <h2>Gestión de Usuarios</h2>
      <mat-table [dataSource]="users">
        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Nombre</mat-header-cell>
          <mat-cell *matCellDef="let user">{{user.name}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="email">
          <mat-header-cell *matHeaderCellDef>Email</mat-header-cell>
          <mat-cell *matCellDef="let user">{{user.email}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="role">
          <mat-header-cell *matHeaderCellDef>Rol</mat-header-cell>
          <mat-cell *matCellDef="let user">{{user.role}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Acciones</mat-header-cell>
          <mat-cell *matCellDef="let user">
            <button mat-icon-button color="primary" (click)="editUser(user)">
              <mat-icon>edit</mat-icon>
            </button>
            <button mat-icon-button color="warn" (click)="deleteUser(user)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>
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

    .users-container {
      padding: 100px 2rem 2rem;
      position: relative;
      z-index: 1;
      max-width: 1400px;
      margin: 0 auto;
    }

    h2 {
      margin-bottom: 2rem;
      background: linear-gradient(135deg, #fff, var(--ocean-1));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2.5rem;
    }

    mat-table {
      width: 100%;
      background: rgba(255, 255, 255, 0.05) !important;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: var(--radius-xl);
      backdrop-filter: blur(12px);
      overflow: hidden;
    }

    .mat-column-actions {
      width: 140px;
      text-align: center;
    }
  `]
})
export class AdminUsersComponent implements OnInit {
  displayedColumns = ['name', 'email', 'role', 'actions'];
  users: any[] = [];

  constructor() {}

  ngOnInit() {
    // TODO: Cargar usuarios desde el servicio
  }

  editUser(user: any) {
    // TODO: Implementar edición de usuario
  }

  deleteUser(user: any) {
    // TODO: Implementar eliminación de usuario
  }
}