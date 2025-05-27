const db = require('../config/database');

class Exercise {
  static async getAll() {
    const result = await db.query('SELECT * FROM exercises');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM exercises WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(lesson_id, type, content) {
    const result = await db.query(
      'INSERT INTO exercises (lesson_id, type, content) VALUES ($1, $2, $3) RETURNING *',
      [lesson_id, type, content]
    );
    return result.rows[0];
  }

  static async update(id, lesson_id, type, content) {
    const result = await db.query(
      'UPDATE exercises SET lesson_id = $1, type = $2, content = $3 WHERE id = $4 RETURNING *',
      [lesson_id, type, content, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM exercises WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Exercise; 