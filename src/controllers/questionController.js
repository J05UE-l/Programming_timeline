const questionService = require('../services/questionService');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (question) {
      res.status(200).json(question);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createQuestion = async (req, res) => {
  try {
    const { exercise_id, question_text, type, answer } = req.body;
    const newQuestion = await questionService.createQuestion(exercise_id, question_text, type, answer);
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const { exercise_id, question_text, type, answer } = req.body;
    const updatedQuestion = await questionService.updateQuestion(req.params.id, exercise_id, question_text, type, answer);
    if (updatedQuestion) {
      res.status(200).json(updatedQuestion);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const deletedQuestion = await questionService.deleteQuestion(req.params.id);
    if (deletedQuestion) {
      res.status(200).json(deletedQuestion);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
}; 