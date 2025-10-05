const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookings');
const auth = require('../middleware/auth');

// Create student (register)
router.post('/students', ctrl.createStudent);

// List sessions
router.get('/sessions', ctrl.listSessions);

// Create a booking (prevents overbooking) - requires auth
router.post('/', auth(), ctrl.createBooking);

module.exports = router;
