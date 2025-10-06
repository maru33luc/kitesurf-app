const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookings');
const auth = require('../middleware/auth');

// List sessions (public)
router.get('/sessions', ctrl.listSessions);

// List instructors (public)
router.get('/instructors', ctrl.listInstructors);

// Create a booking (prevents overbooking) - requires auth
router.post('/', auth(), ctrl.createBooking);

module.exports = router;
