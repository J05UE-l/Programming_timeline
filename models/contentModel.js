const db = require('../config/database');

class Content {
  static async getAll() {
    const result = await db.query('SELECT * FROM content');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT * FROM content WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(course_modules) {
    const result = await db.query(
      'INSERT INTO content (course_modules) VALUES ($1) RETURNING *',
      [course_modules]
    );
    return result.rows[0];
  }

  static async update(id, course_modules) {
    const result = await db.query(
      'UPDATE content SET course_modules = $1 WHERE id = $2 RETURNING *',
      [course_modules, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM content WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

module.exports = Content; 