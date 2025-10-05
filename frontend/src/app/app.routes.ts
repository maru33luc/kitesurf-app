import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './pages/admin/dashboard/dashboard';
import { AdminBookingsComponent } from './pages/admin/bookings/bookings';

export const routes: Routes = [
  { 
    path: 'admin',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'bookings', component: AdminBookingsComponent },
      // TODO: Agregar rutas para usuarios y calendario cuando estén implementados
      { 
        path: 'users',
        loadComponent: () => import('./pages/admin/users/users').then(m => m.AdminUsersComponent)
      },
      { 
        path: 'calendar',
        loadComponent: () => import('./pages/admin/calendar/calendar').then(m => m.AdminCalendarComponent)
      }
    ]
  },
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { 
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing').then(m => m.LandingComponent)
  },
  { 
    path: 'booking',
    loadComponent: () => import('./pages/booking/booking').then(m => m.BookingComponent)
  }
];
