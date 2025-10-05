export interface User {
  id: number;
  username: string;
  role: 'student' | 'staff' | 'admin';
}

export interface Instructor {
  id: number;
  name: string;
  email: string;
  specialties?: string[];
  rating?: number;
  availability?: TimeSlot[];
}

export interface Student {
  id: number;
  name: string;
  email: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
  completedLessons?: number;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  available: boolean;
}

export interface Booking {
  id: number;
  sessionId: number;
  studentId: number;
  instructorId: number;
  equipmentId?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  student?: Student;
  instructor?: Instructor;
}

export interface Session {
  id: number;
  start: Date;
  end: Date;
  capacity: number;
  booked: number;
  instructorId: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructor?: Instructor;
  weather?: WeatherInfo;
}

export interface WeatherInfo {
  windSpeed: number;
  windDirection: string;
  temperature: number;
  conditions: string;
}

export interface Equipment {
  id: number;
  name: string;
  type: 'kite' | 'board' | 'harness' | 'wetsuit';
  size?: string;
  available: boolean;
  condition: 'new' | 'good' | 'fair';
}

export interface BookingRequest {
  sessionId: number;
  studentId: number;
  equipmentId?: number;
  notes?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}