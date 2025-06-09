const db = require('../config/database');

const getAllQuestions = async () => {
  const result = await db.query('SELECT * FROM questions');
  return result.rows;
};

const getQuestionById = async (id) => {
  const result = await db.query('SELECT * FROM questions WHERE id = $1', [id]);
  return result.rows[0];
};

const createQuestion = async (exercise_id, question_text, type, answer) => {
  const result = await db.query(
    'INSERT INTO questions (exercise_id, question_text, type, answer) VALUES ($1, $2, $3, $4) RETURNING *',
    [exercise_id, question_text, type, answer]
  );
  return result.rows[0];
};

const updateQuestion = async (id, exercise_id, question_text, type, answer) => {
  const result = await db.query(
    'UPDATE questions SET exercise_id = $1, question_text = $2, type = $3, answer = $4 WHERE id = $5 RETURNING *',
    [exercise_id, question_text, type, answer, id]
  );
  return result.rows[0];
};

const deleteQuestion = async (id) => {
  const result = await db.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion
}; 