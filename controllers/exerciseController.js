const exerciseService = require('../services/exerciseService');

const getAllExercises = async (req, res) => {
  try {
    const exercises = await exerciseService.getAllExercises();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExerciseById = async (req, res) => {
  try {
    const exercise = await exerciseService.getExerciseById(req.params.id);
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createExercise = async (req, res) => {
  try {
    const { lesson_id, type, content } = req.body;
    const newExercise = await exerciseService.createExercise(lesson_id, type, content);
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { lesson_id, type, content } = req.body;
    const updatedExercise = await exerciseService.updateExercise(req.params.id, lesson_id, type, content);
    if (updatedExercise) {
      res.status(200).json(updatedExercise);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const deletedExercise = await exerciseService.deleteExercise(req.params.id);
    if (deletedExercise) {
      res.status(200).json(deletedExercise);
    } else {
      res.status(404).json({ error: 'Exercise not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
}; 