const db = require('./db');

const Todo = {
  getAllTodos: async (userEmail) => {
    try {
      const todos = await db.query('SELECT * FROM todos WHERE user_email = ?', [userEmail]);
      return todos.rows;
    } catch (err) {
      throw err;
    }
  },
  createTodo: async (todoData) => {
    try {
      const { user_email, title, progress, date } = todoData;
      const newTodo = await db.query('INSERT INTO todos (user_email, title, progress, date) VALUES ($1, $2, $3, $4) RETURNING *', [user_email, title, progress, date]);
      return newTodo.rows[0];
    } catch (err) {
      throw err;
    }
  },
  updateTodo: async (id, todoData) => {
    try {
      const { user_email, title, progress, date } = todoData;
      const updatedTodo = await db.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *', [user_email, title, progress, date, id]);
      return updatedTodo.rows[0];
    } catch (err) {
      throw err;
    }
  },
  deleteTodo: async (id) => {
    try {
      await db.query('DELETE FROM todos WHERE id = $1', [id]);
    } catch (err) {
      throw err;
    }
  }
};

module.exports = { Todo };
