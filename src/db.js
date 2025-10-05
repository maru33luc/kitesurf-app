const { Pool } = require('pg');
let url = process.env.DATABASE_URL || '';
url = url.toString().trim();
if (!url) {
  console.warn('DATABASE_URL not set. Use .env or set environment variable.');
}

// Configuración para Render (requiere SSL)
const isProduction = url.includes('render.com');
const pool = new Pool({
  connectionString: url,
  ssl: isProduction ? { rejectUnauthorized: false } : false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect()
};
