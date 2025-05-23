const db = require('../config/database');

const getAllFeedback = async () => {
  const result = await db.query('SELECT * FROM feedback');
  return result.rows;
};

const getFeedbackById = async (id) => {
  const result = await db.query('SELECT * FROM feedback WHERE id = $1', [id]);
  return result.rows[0];
};

const createFeedback = async (user_id, lesson_id, comment) => {
  const result = await db.query(
    'INSERT INTO feedback (user_id, lesson_id, comment) VALUES ($1, $2, $3) RETURNING *',
    [user_id, lesson_id, comment]
  );
  return result.rows[0];
};

const updateFeedback = async (id, user_id, lesson_id, comment) => {
  const result = await db.query(
    'UPDATE feedback SET user_id = $1, lesson_id = $2, comment = $3 WHERE id = $4 RETURNING *',
    [user_id, lesson_id, comment, id]
  );
  return result.rows[0];
};

const deleteFeedback = async (id) => {
  const result = await db.query('DELETE FROM feedback WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllFeedback,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback
}; 