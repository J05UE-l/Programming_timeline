const progressService = require('../services/progressService');

const getAllProgress = async (req, res) => {
  try {
    const progress = await progressService.getAllProgress();
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProgressById = async (req, res) => {
  try {
    const progress = await progressService.getProgressById(req.params.id);
    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(404).json({ error: 'Progress not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createProgress = async (req, res) => {
  try {
    const { user_id, lesson_id, completed } = req.body;
    const newProgress = await progressService.createProgress(user_id, lesson_id, completed);
    res.status(201).json(newProgress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { user_id, lesson_id, completed } = req.body;
    const updatedProgress = await progressService.updateProgress(req.params.id, user_id, lesson_id, completed);
    if (updatedProgress) {
      res.status(200).json(updatedProgress);
    } else {
      res.status(404).json({ error: 'Progress not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProgress = async (req, res) => {
  try {
    const deletedProgress = await progressService.deleteProgress(req.params.id);
    if (deletedProgress) {
      res.status(200).json(deletedProgress);
    } else {
      res.status(404).json({ error: 'Progress not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
}; 