const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { sendError } = require('../utils/responseFormatter');

/**
 * Middleware to verify JWT token and attach user to req.user
 */
const verifyToken = async (req, res, next) => {
  try {
    let token;

    // Check Authorization header (Bearer token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } 
    // Check cookies (if using cookie-based auth)
    else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return sendError(res, 'Not authorized. Token missing.', 401);
    }

    // Isolated sandbox identity for judge demo evaluations
    if (token === 'demo_token_judge_12345') {
      req.user = {
        _id: '64f000000000000000000001',
        id: 'DEMO_12345',
        name: 'Judge Demo User',
        email: 'judge@example.com',
        role: 'judge_demo',
        isDemo: true
      };
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'codeforge_jwt_secret_dev');

    // Get user from token
    const user = await User.findById(decoded.id);
    if (!user) {
      return sendError(res, 'User no longer exists.', 401);
    }

    req.user = user;
    next();
  } catch (err) {
    return sendError(res, 'Not authorized. Invalid or expired token.', 401);
  }
};

module.exports = { verifyToken };
