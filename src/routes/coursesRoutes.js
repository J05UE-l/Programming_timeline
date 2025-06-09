const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all courses
router.get('/api', async (req, res) => {
    try {
        const query = 'SELECT id, title, description, difficulty FROM courses ORDER BY title';
        const result = await db.query(query);
        
        res.json({
            success: true,
            courses: result.rows
        });
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch courses'
        });
    }
});

// Create new course
router.post('/api', async (req, res) => {
    try {
        const { title, description, difficulty } = req.body;
        
        if (!title || !description || !difficulty) {
            return res.status(400).json({
                success: false,
                error: 'Title, description, and difficulty are required'
            });
        }
        
        const query = `
            INSERT INTO courses (id, title, description, difficulty) 
            VALUES (gen_random_uuid(), $1, $2, $3) 
            RETURNING id, title, description, difficulty
        `;
        
        const result = await db.query(query, [title, description, difficulty]);
        
        res.status(201).json({
            success: true,
            course: result.rows[0],
            message: 'Course created successfully'
        });
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create course'
        });
    }
});

// Update course
router.put('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, difficulty } = req.body;
        
        if (!title || !description || !difficulty) {
            return res.status(400).json({
                success: false,
                error: 'Title, description, and difficulty are required'
            });
        }
        
        const query = `
            UPDATE courses 
            SET title = $1, description = $2, difficulty = $3 
            WHERE id = $4 
            RETURNING id, title, description, difficulty
        `;
        
        const result = await db.query(query, [title, description, difficulty, id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }
        
        res.json({
            success: true,
            course: result.rows[0],
            message: 'Course updated successfully'
        });
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update course'
        });
    }
});

// Delete course
router.delete('/api/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const query = 'DELETE FROM courses WHERE id = $1 RETURNING id, title';
        const result = await db.query(query, [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: 'Course not found'
            });
        }
        
        res.json({
            success: true,
            message: `Course "${result.rows[0].title}" deleted successfully`
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete course'
        });
    }
});

module.exports = router; 