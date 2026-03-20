/**
 * @file index.js
 * @description Master API router
 */
const express = require('express');
const { getAllCourses, getCoursesByDomain } = require('../controllers/pathway.controller');

const uploadRouter = require('./upload.routes');
const analysisRouter = require('./analysis.routes');
const pathwayRouter = require('./pathway.routes');

const router = express.Router();

router.use('/upload', uploadRouter);
router.use('/analysis', analysisRouter);
router.use('/pathway', pathwayRouter);

/** GET /api/courses */
router.get('/courses', getAllCourses);

/** GET /api/courses/:domain */
router.get('/courses/:domain', getCoursesByDomain);

module.exports = router;
