const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  // Remove the 'Bearer ' part of the token if present
  const tokenWithoutBearer = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
