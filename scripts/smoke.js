const fetch = require('node-fetch');
const base = (process.env.BASE_URL || 'http://localhost:3000').toString().trim();

async function run() {
  console.log('Running smoke tests against', base);
  try {
    // create or login admin user to obtain JWT
    let res = await fetch(base + '/api/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'admin', password: 'adminpass', role: 'staff' }) });
    if (res.status === 500) {
      // maybe already exists, try login
      res = await fetch(base + '/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'admin', password: 'adminpass' }) });
    }
    const reg = await res.json();
    let token = reg.token;
    if (!token) {
      // if register returned user object, login to get token
      const r2 = await fetch(base + '/api/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: 'admin', password: 'adminpass' }) });
      const login = await r2.json();
      token = login.token;
    }
    console.log('Obtained token:', !!token);

    // create student
    const rand = Math.floor(Math.random() * 10000);
    res = await fetch(base + '/api/bookings/students', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ name: 'Test Student', email: `test${rand}@example.com` }) });
    const student = await res.json();
    if (student.error) {
      throw new Error(`Failed to create student: ${student.error}`);
    }
    console.log('Created student', student.id);

    // list sessions
    res = await fetch(base + '/api/bookings/sessions');
    const sessions = await res.json();
    console.log('Sessions:', sessions.length);

    if (sessions.length > 0) {
      const session = sessions[0];
      res = await fetch(base + '/api/bookings', { method: 'POST', headers: { 'content-type': 'application/json', 'authorization': `Bearer ${token}` }, body: JSON.stringify({ student_id: student.id, session_id: session.id }) });
      const result = await res.json();
      if (result.error) {
        throw new Error(`Failed to create booking: ${result.error}`);
      }
      console.log('Created booking:', result.id);
    } else {
      console.log('No sessions to test booking against. Create sessions in DB and re-run.');
    }
  } catch (err) {
    console.error('smoke error', err);
  }
}

run();
