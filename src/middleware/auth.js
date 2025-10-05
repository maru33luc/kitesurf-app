const jwt = require('jsonwebtoken');

function auth(requiredRole) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'missing auth' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'invalid auth header' });
    const token = parts[1];
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
      req.user = payload;
      if (requiredRole && payload.role !== requiredRole) return res.status(403).json({ error: 'forbidden' });
      next();
    } catch (err) {
      return res.status(401).json({ error: 'invalid token' });
    }
  };
}

module.exports = auth;
