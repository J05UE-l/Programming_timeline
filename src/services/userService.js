// services/userService.js

const db = require('../config/database');

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT id, username, email, password FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error in getAllUsers:', error);
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
  try {
    const result = await db.query('SELECT id, username, email, password FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async (username, email, password) => {
  try {
    const query = `
      INSERT INTO users (username, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id, username, email, password
    `;
    const result = await db.query(query, [username, email, password]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in createUser:', error);
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUser = async (id, username, email, password) => {
  try {
    const result = await db.query(
      `UPDATE users 
       SET username = $1, 
           email = $2, 
           password = $3
       WHERE id = $4 
       RETURNING id, username, email, password`,
      [username, email, password, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
