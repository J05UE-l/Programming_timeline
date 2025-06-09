const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');
const db = require('../config/database');

router.get('/', progressController.getAllProgress);
router.get('/:id', progressController.getProgressById);
router.post('/', progressController.createProgress);
router.put('/:id', progressController.updateProgress);
router.delete('/:id', progressController.deleteProgress);

// Get user progress for all lessons
router.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        
        // Query to get user progress with lesson information
        const query = `
            SELECT 
                l.id as lesson_id,
                l.title,
                COALESCE(p.completed, false) as completed
            FROM lessons l
            LEFT JOIN progress p ON l.id = p.lesson_id AND p.user_id = $1
            ORDER BY l.title
        `;
        
        const result = await db.query(query, [userId]);
        
        res.json({
            success: true,
            progress: result.rows
        });
        
    } catch (error) {
        console.error('Error fetching user progress:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch user progress'
        });
    }
});

// Update user progress for a specific lesson
router.post('/update', async (req, res) => {
    try {
        const { userId, lessonId, completed } = req.body;
        
        // Check if progress record exists
        const checkQuery = 'SELECT id FROM progress WHERE user_id = $1 AND lesson_id = $2';
        const checkResult = await db.query(checkQuery, [userId, lessonId]);
        
        if (checkResult.rows.length > 0) {
            // Update existing record
            const updateQuery = 'UPDATE progress SET completed = $1 WHERE user_id = $2 AND lesson_id = $3';
            await db.query(updateQuery, [completed, userId, lessonId]);
        } else {
            // Insert new record
            const insertQuery = 'INSERT INTO progress (user_id, lesson_id, completed) VALUES ($1, $2, $3)';
            await db.query(insertQuery, [userId, lessonId, completed]);
        }
        
        res.json({
            success: true,
            message: 'Progress updated successfully'
        });
        
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update progress'
        });
    }
});

module.exports = router; 