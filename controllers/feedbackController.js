const feedbackService = require('../services/feedbackService');

const getAllFeedback = async (req, res) => {
  try {
    const feedback = await feedbackService.getAllFeedback();
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFeedbackById = async (req, res) => {
  try {
    const feedback = await feedbackService.getFeedbackById(req.params.id);
    if (feedback) {
      res.status(200).json(feedback);
    } else {
      res.status(404).json({ error: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { user_id, lesson_id, comment } = req.body;
    const newFeedback = await feedbackService.createFeedback(user_id, lesson_id, comment);
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFeedback = async (req, res) => {
  try {
    const { user_id, lesson_id, comment } = req.body;
    const updatedFeedback = await feedbackService.updateFeedback(req.params.id, user_id, lesson_id, comment);
    if (updatedFeedback) {
      res.status(200).json(updatedFeedback);
    } else {
      res.status(404).json({ error: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await feedbackService.deleteFeedback(req.params.id);
    if (deletedFeedback) {
      res.status(200).json(deletedFeedback);
    } else {
      res.status(404).json({ error: 'Feedback not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
}; 