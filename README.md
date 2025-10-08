# Kitesurf School - Booking System

## Project Overview

This is a full-stack booking system for a kitesurf school, consisting of:

* **Backend:** Node.js + Express API with PostgreSQL database for managing bookings, sessions, students, instructors, and equipment.
* **Frontend:** Angular 20 application providing a user interface for booking classes, admin dashboard, and management features.

The system includes JWT-based authentication with user roles (student, staff, admin), email notifications, calendar management, and a responsive UI.

---

## Authentication

The application uses JWT (JSON Web Tokens) for secure authentication. Users can register and log in with roles: student, staff, or admin.

* **Backend:** Uses `jsonwebtoken` for token generation and verification, `bcrypt` for password hashing.
* **Frontend:** Angular service handles login, registration, and token storage in localStorage.
* **Middleware:** Protects routes based on user roles (e.g., admin-only access to management features).

---

## Backend

### Features

* REST API for managing bookings, sessions, students, instructors, and equipment.
* JWT-based authentication with user roles (student, staff, admin) and password hashing.
* Email notifications using Nodemailer for booking confirmations and updates.
* Admin routes protected by authentication middleware.
* PostgreSQL database with schema enforcing booking constraints and relationships.
* Prevention of overbooking using transactions and row-level locking.
* Docker Compose setup for easy local PostgreSQL deployment.

### Setup

1. Copy `.env.example` to `.env` and configure `DATABASE_URL`, `SMTP_*`, and `PORT`.

2. Start PostgreSQL with Docker Compose:

   ```bash
   docker compose up -d
   ```

3. Run the database schema to create tables and import the dump file:

   ```bash
   docker exec -i <container_name> psql -U postgres -d kitesurfdb < kitesurfdb_dump.sql
   ```

   Replace `<container_name>` with the actual name of your container. You can check it using:

   ```bash
   docker ps
   ```

   For example:

   ```bash
   docker exec -i kitesurf-db psql -U postgres -d kitesurfdb < kitesurfdb_dump.sql
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

#### Authentication

* `POST /api/auth/register` - Register a new user (student, staff, or admin).
* `POST /api/auth/login` - Authenticate user and return JWT token.

#### Bookings

* `POST /api/bookings/students` - Register a student (legacy, use auth/register).
* `GET /api/bookings/sessions` - List future sessions with occupancy.
* `POST /api/bookings` - Create a booking (requires authentication).

#### Admin (require staff or admin role)

* `GET /api/admin/bookings` - Get all bookings.
* `GET /api/admin/sessions` - Get all sessions.
* `GET /api/admin/users` - Get all users (admin only).

---

## Frontend

### Features

* Angular 20 application with routing for landing, booking, and admin pages.
* JWT-based authentication with login/register forms and role-based access.
* Admin dashboard with stats, bookings management, user management, and calendar view.
* Interactive calendar for scheduling and viewing sessions.
* Booking flow for students to reserve classes with real-time availability.
* Responsive UI using Angular Material components, optimized for mobile and desktop.

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

* `npm start` - Run the Angular development server.
* `npm run build` - Build the project for production.
* `npm test` - Run unit tests with Karma.
* `npm run serve:ssr:frontend` - Serve the server-side rendered app.

---

## Running the Full System

1. Start the backend server as described above.
2. Start the frontend development server.
3. Access the frontend UI at `http://localhost:4200/`.
4. Use the UI to browse sessions, book classes, and manage admin features.

---

## Environment Variables

* `DATABASE_URL` - PostgreSQL connection string.
* `JWT_SECRET` - Secret key for JWT token signing (use a strong, random string).
* `PORT` - Backend server port (default 3000).
* `SMTP_HOST` - SMTP server host for email notifications.
* `SMTP_PORT` - SMTP server port.
* `SMTP_USER` - SMTP username.
* `SMTP_PASS` - SMTP password.

---

## Docker

Use Docker Compose to start the PostgreSQL database:

```bash
docker compose up -d
```

Then import the SQL dump file into the database:

```bash
docker exec -i <container_name> psql -U postgres -d kitesurfdb < kitesurfdb_dump.sql
```

---

## Deployment

### Backend

* Deploy to a cloud platform like Heroku, Railway, or AWS.
* Ensure environment variables are set in the deployment environment.
* Use a process manager like PM2 for production.

### Frontend

* Build the Angular app for production: `npm run build`.
* Deploy the `dist/frontend` folder to Vercel, Netlify, or any static hosting service.
* Configure the API base URL in `environment.prod.ts` to point to the deployed backend.

---

## Testing

* Backend tests can be added and run with appropriate test scripts.
* Frontend unit tests run with:

```bash
npm test
```

---

## Next Steps

* Add comprehensive backend and frontend tests (unit, integration, e2e).
* Implement monitoring and logging (e.g., Winston for logging, Sentry for error tracking).
* Add rate limiting and security enhancements (helmet, CORS configuration).
* Implement password reset functionality via email.
* Add synchronization with WhatsApp/Instagram via webhooks for marketing.
* Enhance frontend UI with instructor/equipment selection in booking flow.
* Add user profile management and booking history.

---

## Additional Resources

* [Angular CLI Documentation](https://angular.dev/tools/cli)
* [Express Documentation](https://expressjs.com/)
* [PostgreSQL Documentation](https://www.postgresql.org/docs/)
