const db = require('../config/database');

const getAllExercises = async () => {
  const result = await db.query('SELECT * FROM exercises');
  return result.rows;
};

const getExerciseById = async (id) => {
  const result = await db.query('SELECT * FROM exercises WHERE id = $1', [id]);
  return result.rows[0];
};

const createExercise = async (lesson_id, type, content) => {
  const result = await db.query(
    'INSERT INTO exercises (lesson_id, type, content) VALUES ($1, $2, $3) RETURNING *',
    [lesson_id, type, content]
  );
  return result.rows[0];
};

const updateExercise = async (id, lesson_id, type, content) => {
  const result = await db.query(
    'UPDATE exercises SET lesson_id = $1, type = $2, content = $3 WHERE id = $4 RETURNING *',
    [lesson_id, type, content, id]
  );
  return result.rows[0];
};

const deleteExercise = async (id) => {
  const result = await db.query('DELETE FROM exercises WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise
}; 