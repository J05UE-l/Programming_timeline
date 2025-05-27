const db = require('../config/database');

class Question {
  static async getAll() {
    const result = await db.query('SELECT * FROM questions');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM questions WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(exercise_id, question_text, type, answer) {
    const result = await db.query(
      'INSERT INTO questions (exercise_id, question_text, type, answer) VALUES ($1, $2, $3, $4) RETURNING *',
      [exercise_id, question_text, type, answer]
    );
    return result.rows[0];
  }

  static async update(id, exercise_id, question_text, type, answer) {
    const result = await db.query(
      'UPDATE questions SET exercise_id = $1, question_text = $2, type = $3, answer = $4 WHERE id = $5 RETURNING *',
      [exercise_id, question_text, type, answer, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM questions WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Question; 