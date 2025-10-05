const db = require('../db');
const nodemailer = require('nodemailer');

async function createStudent(req, res) {
  const { name, email, phone } = req.body;
  if (!name) return res.status(400).json({ error: 'name required' });
  try {
    const { rows } = await db.query('INSERT INTO students(name,email,phone) VALUES($1,$2,$3) RETURNING *', [name, email, phone]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'db error' });
  }
}

async function listSessions(req, res) {
  const { rows } = await db.query('SELECT s.*, i.name as instructor_name, (SELECT count(*) FROM bookings b WHERE b.session_id = s.id) as booked FROM sessions s LEFT JOIN instructors i ON s.instructor_id = i.id WHERE s.start >= now() ORDER BY s.start');
  res.json(rows);
}

// Booking payload: { student_id, session_id, equipment_id }
async function createBooking(req, res) {
  const { student_id, session_id, equipment_id } = req.body;
  if (!student_id || !session_id) return res.status(400).json({ error: 'student_id and session_id required' });

  const client = await db.getClient();
  try {
    await client.query('BEGIN');

    // Lock session row to check capacity safely
    const sessRes = await client.query('SELECT * FROM sessions WHERE id = $1 FOR UPDATE', [session_id]);
    if (sessRes.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'session not found' });
    }
    const session = sessRes.rows[0];

    const countRes = await client.query('SELECT count(*)::int AS cnt FROM bookings WHERE session_id = $1', [session_id]);
    const booked = countRes.rows[0].cnt;
    if (booked >= session.capacity) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'session full' });
    }

    // Prevent duplicate booking for same student & session (unique constraint also helps)
    const existing = await client.query('SELECT * FROM bookings WHERE session_id = $1 AND student_id = $2', [session_id, student_id]);
    if (existing.rowCount > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ error: 'student already booked this session' });
    }

    const insert = await client.query('INSERT INTO bookings(session_id, student_id, equipment_id) VALUES($1,$2,$3) RETURNING *', [session_id, student_id, equipment_id]);

    await client.query('COMMIT');

    const booking = insert.rows[0];

    // Send confirmation (email stub)
    sendConfirmationEmail(student_id, booking).catch(err => console.error('confirmation error', err));

    res.status(201).json(booking);
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('booking error', err);
    res.status(500).json({ error: 'booking failed' });
  } finally {
    client.release();
  }
}

async function sendConfirmationEmail(student_id, booking) {
  // basic lookup
  const { rows } = await db.query('SELECT * FROM students WHERE id = $1', [student_id]);
  if (!rows[0]) return;
  const student = rows[0];

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: student.email,
    subject: 'Kitesurf booking confirmation',
    text: `Your booking is confirmed: session ${booking.session_id}`
  });
  console.log('confirmation sent', info && info.messageId);
}

module.exports = { createStudent, listSessions, createBooking };
