-- Schema for kitesurf booking system
BEGIN;

CREATE TABLE IF NOT EXISTS instructors (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'staff'
);

CREATE TABLE IF NOT EXISTS equipment (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT,
  available BOOLEAN DEFAULT true
);

-- A session is a scheduled slot (date + start + end) with capacity and optional instructor
CREATE TABLE IF NOT EXISTS sessions (
  id SERIAL PRIMARY KEY,
  start timestamptz NOT NULL,
  "end" timestamptz NOT NULL,
  capacity int NOT NULL DEFAULT 1,
  instructor_id int REFERENCES instructors(id) ON DELETE SET NULL,
  level TEXT
);

-- bookings reference a session and a student; ensure unique student per session
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  session_id int REFERENCES sessions(id) ON DELETE CASCADE,
  student_id int REFERENCES students(id) ON DELETE CASCADE,
  equipment_id int REFERENCES equipment(id),
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(session_id, student_id)
);

-- Index to quickly check session occupancy
CREATE INDEX IF NOT EXISTS idx_bookings_session ON bookings(session_id);

COMMIT;
