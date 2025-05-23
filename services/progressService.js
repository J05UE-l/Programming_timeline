const db = require('../config/database');

const getAllProgress = async () => {
  const result = await db.query('SELECT * FROM progress');
  return result.rows;
};

const getProgressById = async (id) => {
  const result = await db.query('SELECT * FROM progress WHERE id = $1', [id]);
  return result.rows[0];
};

const createProgress = async (user_id, lesson_id, completed) => {
  const result = await db.query(
    'INSERT INTO progress (user_id, lesson_id, completed) VALUES ($1, $2, $3) RETURNING *',
    [user_id, lesson_id, completed]
  );
  return result.rows[0];
};

const updateProgress = async (id, user_id, lesson_id, completed) => {
  const result = await db.query(
    'UPDATE progress SET user_id = $1, lesson_id = $2, completed = $3 WHERE id = $4 RETURNING *',
    [user_id, lesson_id, completed, id]
  );
  return result.rows[0];
};

const deleteProgress = async (id) => {
  const result = await db.query('DELETE FROM progress WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllProgress,
  getProgressById,
  createProgress,
  updateProgress,
  deleteProgress
}; 