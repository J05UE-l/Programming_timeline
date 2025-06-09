const lessonService = require('../services/lessonService');

const getAllLessons = async (req, res) => {
  try {
    const lessons = await lessonService.getAllLessons();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (lesson) {
      res.status(200).json(lesson);
    } else {
      res.status(404).json({ error: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLesson = async (req, res) => {
  try {
    const { title, content_id, type, order } = req.body;
    const newLesson = await lessonService.createLesson(title, content_id, type, order);
    res.status(201).json(newLesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLesson = async (req, res) => {
  try {
    const { title, content_id, type, order } = req.body;
    const updatedLesson = await lessonService.updateLesson(req.params.id, title, content_id, type, order);
    if (updatedLesson) {
      res.status(200).json(updatedLesson);
    } else {
      res.status(404).json({ error: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const deletedLesson = await lessonService.deleteLesson(req.params.id);
    if (deletedLesson) {
      res.status(200).json(deletedLesson);
    } else {
      res.status(404).json({ error: 'Lesson not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
}; 