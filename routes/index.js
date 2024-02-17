const express = require('express');
const todoController = require('../controllers/todoController');
const userController = require('../controllers/userController');

const router = express.Router();


router.get('/todos/:userEmail', todoController.getAllTodos);
router.post('/todos', todoController.createTodo);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
