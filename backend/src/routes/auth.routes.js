const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../middleware/auth.middleware');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const router = express.Router();

/**
 * GET /api/auth/google
 * Initiates Google OAuth login flow.
 */
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['openid', 'profile', 'email'],
    session: false
  })
);

/**
 * GET /api/auth/google/callback
 * Handles Google OAuth callback and issues a JWT.
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    session: false, 
    failureRedirect: '/login?auth=failed' 
  }),
  (req, res) => {
    try {
      if (!req.user) {
        return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?auth=failed`);
      }

      // Create JWT with essential user info
      const token = jwt.sign(
        { 
          id: req.user._id, 
          email: req.user.email, 
          name: req.user.name, 
          avatar: req.user.avatar,
          role: req.user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Redirect to frontend callback route with token
      const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
      res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    } catch (err) {
      console.error('Auth callback error:', err);
      const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
      res.redirect(`${frontendUrl}/login?auth=failed`);
    }
  }
);

/**
 * GET /api/auth/me
 * Returns the currently authenticated user's profile.
 */
router.get('/me', verifyToken, (req, res) => {
  return sendSuccess(res, { user: req.user }, 'User profile retrieved successfully');
});

/**
 * GET /api/auth/status
 * Simplified check if user is logged in.
 */
router.get('/status', (req, res) => {
  if (req.user || req.cookies?.jwt) {
    try {
      const token = req.cookies.jwt;
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET);
        return sendSuccess(res, { isLoggedIn: true }, 'Authenticated');
      }
    } catch (err) {
      // Token invalid
    }
  }
  return sendSuccess(res, { isLoggedIn: false }, 'Not authenticated');
});

/**
 * POST /api/auth/logout
 * Logs out the user and clears the JWT cookie.
 */
router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
  return sendSuccess(res, null, 'Logged out successfully');
});

module.exports = router;
