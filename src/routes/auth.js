const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'name, email and password required' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const { rows } = await db.query(
      'INSERT INTO users(name, email, phone, password_hash, role) VALUES($1,$2,$3,$4,$5) RETURNING id, name, email, phone, role',
      [name, email, phone || null, hash, role || 'student']
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === '23505') { // unique violation
      return res.status(400).json({ error: 'email already registered' });
    }
    res.status(500).json({ error: 'db error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  if (rows.length === 0) return res.status(401).json({ error: 'invalid credentials' });
  const user = rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '8h' });
  res.json({ token });
});

module.exports = router;
