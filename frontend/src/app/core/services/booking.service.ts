import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  id?: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Session {
  id: number;
  start: string;
  duration: number;
  level: string;
  capacity: number;
  instructor_id: number;
  instructor_name?: string;
  booked?: number;
}

export interface Booking {
  id?: number;
  session_id: number;
  user_id?: number; // Optional because it comes from auth token
  equipment_id?: number;
  created_at?: string;
}

export interface Instructor {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Create student
  createStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${this.apiUrl}/bookings/students`, student);
  }

  // List available sessions
  listSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrl}/bookings/sessions`);
  }

  // Create booking
  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, booking);
  }

  // Get instructors (public endpoint)
  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/bookings/instructors`);
  }
}
