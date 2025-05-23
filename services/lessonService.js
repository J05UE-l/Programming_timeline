const db = require('../config/database');

const getAllLessons = async () => {
  const result = await db.query('SELECT * FROM lessons');
  return result.rows;
};

const getLessonById = async (id) => {
  const result = await db.query('SELECT * FROM lessons WHERE id = $1', [id]);
  return result.rows[0];
};

const createLesson = async (title, content_id, type, order) => {
  const result = await db.query(
    'INSERT INTO lessons (title, content_id, type, order) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content_id, type, order]
  );
  return result.rows[0];
};

const updateLesson = async (id, title, content_id, type, order) => {
  const result = await db.query(
    'UPDATE lessons SET title = $1, content_id = $2, type = $3, order = $4 WHERE id = $5 RETURNING *',
    [title, content_id, type, order, id]
  );
  return result.rows[0];
};

const deleteLesson = async (id) => {
  const result = await db.query('DELETE FROM lessons WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson
}; 