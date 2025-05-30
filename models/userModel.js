const db = require('../config/db');

class User {
  static async getAll() {
    const result = await db.query('SELECT id, username, email, password FROM users');
    return result.rows;
  }

  static async getById(id) {
    const result = await db.query('SELECT id, username, email, password FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async create(data) {
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, password',
      [data.username, data.email, data.password]
    );
    return result.rows[0];
  }

  static async update(id, data) {
    const result = await db.query(
      'UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, username, email, password',
      [data.username, data.email, data.password, id]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return result.rowCount > 0;
  }
}

module.exports = User;
