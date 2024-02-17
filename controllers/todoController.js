const { Todo } = require('../models/todoModel');

const todoController = {
  getAllTodos: async (req, res) => {
    const { userEmail } = req.params;
    try {
      const todos = await Todo.getAllTodos(userEmail);
      res.json(todos);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  createTodo: async (req, res) => {
    const todoData = req.body;
    try {
      const newTodo = await Todo.createTodo(todoData);
      res.json(newTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  updateTodo: async (req, res) => {
    const { id } = req.params;
    const todoData = req.body;
    try {
      const updatedTodo = await Todo.updateTodo(id, todoData);
      res.json(updatedTodo);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  deleteTodo: async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.deleteTodo(id);
      res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = todoController;
