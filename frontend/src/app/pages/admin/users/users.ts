import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
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
    .users-container {
      padding: 20px;
    }

    h2 {
      margin-bottom: 20px;
    }

    mat-table {
      width: 100%;
    }

    .mat-column-actions {
      width: 100px;
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