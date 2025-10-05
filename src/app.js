require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookingsRouter = require('./routes/bookings');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/bookings', bookingsRouter);
app.use('/api/auth', authRouter);
// protect admin routes
app.use('/api/admin', authMiddleware('staff'), adminRouter);

const port = process.env.PORT || 3000;
// quick DB connectivity check
const db = require('./db');
db.query('SELECT 1').then(() => {
	app.listen(port, () => console.log(`Server listening on ${port}`));
}).catch(err => {
	console.error('DB connection failed on startup', err);
	process.exit(1);
});
