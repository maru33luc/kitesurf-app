const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/bookings', async (req, res) => {
  const { rows } = await db.query('SELECT b.*, s.start, s.end, u.name as user_name, u.email as user_email, i.name as instructor_name FROM bookings b JOIN sessions s ON b.session_id = s.id JOIN users u ON b.user_id = u.id LEFT JOIN instructors i ON s.instructor_id = i.id ORDER BY b.created_at DESC');
  res.json(rows);
});

router.get('/sessions', async (req, res) => {
  const { rows } = await db.query('SELECT s.*, i.name as instructor_name, (SELECT count(*) FROM bookings b WHERE b.session_id = s.id) as booked FROM sessions s LEFT JOIN instructors i ON s.instructor_id = i.id ORDER BY s.start');
  res.json(rows);
});

router.get('/instructors', async (req, res) => {
  const { rows } = await db.query('SELECT id, name FROM instructors ORDER BY name');
  res.json(rows);
});

module.exports = router;
