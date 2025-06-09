const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('pages/index', {
    pageTitle: 'Home - Programming Timeline'
  });
});

// Lessons page route
router.get('/lessons', (req, res) => {
  res.render('pages/lessons', {
    pageTitle: 'Lessons - Programming Timeline',
    style: '<link rel="stylesheet" href="/css/lessons.css">'
  });
});

// Challenges page route
router.get('/challenges', (req, res) => {
  res.render('pages/challenges', {
    pageTitle: 'Challenges - Programming Timeline',
    style: '<link rel="stylesheet" href="/css/challenges.css">'
  });
});

// Courses page route
router.get('/courses', (req, res) => {
  res.render('pages/courses', {
    pageTitle: 'Courses - Programming Timeline',
    style: '<link rel="stylesheet" href="/css/courses.css">',
    additionalJS: ['/js/courses-manager.js']
  });
});

module.exports = router;
