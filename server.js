require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/config/database');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

// Middleware for parsing form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(expressLayouts);
app.set('layout', 'layout/main');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Static files
app.use(express.static(path.join(__dirname, 'src/public')));
app.use('/css', express.static(path.join(__dirname, 'src/views/css')));
app.use('/js', express.static(path.join(__dirname, 'src/public/js')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Routes
app.use('/', require('./src/routes/frontRoutes'));
app.use('/users', require('./src/routes/userRoutes'));
app.use('/questions', require('./src/routes/questionRoutes'));
app.use('/exercises', require('./src/routes/exerciseRoutes'));
app.use('/lessons', require('./src/routes/lessonRoutes'));
app.use('/courses', require('./src/routes/coursesRoutes'));
app.use('/content', require('./src/routes/contentRoutes'));
app.use('/progress', require('./src/routes/progressRoutes'));

// Error handling
app.use((req, res, next) => {
    res.status(404).render('layout/main', {
        pageTitle: '404 Not Found',
        body: '../pages/404'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('layout/main', {
        pageTitle: 'Error',
        body: '../pages/error'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
