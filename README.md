# Kitesurf School - Booking System

## Project Overview

This is a full-stack booking system for a kitesurf school, consisting of:

- **Backend:** Node.js + Express API with PostgreSQL database for managing bookings, sessions, students, instructors, and equipment.
- **Frontend:** Angular 20 application providing a user interface for booking classes, admin dashboard, and management features.

---

## Backend

### Features

- REST API for managing bookings, sessions, students, instructors, and equipment.
- Admin routes protected by authentication middleware.
- PostgreSQL database with schema enforcing booking constraints and relationships.
- Prevention of overbooking using transactions and row-level locking.
- Docker Compose setup for easy local PostgreSQL deployment.

### Setup

1. Copy `.env.example` to `.env` and configure `DATABASE_URL`, `SMTP_*`, and `PORT`.
2. Start PostgreSQL with Docker Compose:

   ```bash
   docker compose up -d
   ```

3. Run database migrations:

   ```bash
   npm run migrate
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

### API Endpoints

- `POST /api/bookings/students` - Register a student.
- `GET /api/bookings/sessions` - List future sessions with occupancy.
- `POST /api/bookings` - Create a booking.
- Admin routes (require staff role):
  - `GET /api/admin/bookings`
  - `GET /api/admin/sessions`

---

## Frontend

### Features

- Angular 20 application with routing for landing, booking, and admin pages.
- Admin dashboard with stats, bookings management, user management, and calendar.
- Booking flow for students to reserve classes.
- Responsive UI using Angular Material components.

### Setup

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser at `http://localhost:4200/`.

### Available Scripts

- `npm start` - Run the Angular development server.
- `npm run build` - Build the project for production.
- `npm test` - Run unit tests with Karma.
- `npm run serve:ssr:frontend` - Serve the server-side rendered app.

---

## Running the Full System

1. Start the backend server as described above.
2. Start the frontend development server.
3. Access the frontend UI at `http://localhost:4200/`.
4. Use the UI to browse sessions, book classes, and manage admin features.

---

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string.
- `PORT` - Backend server port (default 3000).
- `SMTP_*` - SMTP settings for email notifications.

---

## Docker

Use Docker Compose to start the PostgreSQL database:

```bash
docker compose up -d
```

---

## Testing

- Backend tests can be added and run with appropriate test scripts.
- Frontend unit tests run with:

```bash
npm test
```

---

## Next Steps

- Implement authentication for the admin panel.
- Add synchronization with WhatsApp/Instagram via webhooks.
- Enhance frontend UI with calendar and instructor/equipment selection.

---

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Express Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
