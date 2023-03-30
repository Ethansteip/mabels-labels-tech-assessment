const router = require('express').Router();
const todos = require('../db/queries/todos');

// Returns an object of all todos.
router.get('/todos', (req, res) => {
  todos.getAllTodos().then(data => {
    console.log(data);
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(data);
  });
});

// Returns an object of a specific todo based on the id.
router.get('/todo/:id', (req, res) => {
  // validate the parameter, return 400 if not an int, then continue
  // if id canno't be found, return a 404.
  todos.getTodoById(req.params.id).then(data => {
    console.log(data);
    res.json(data[0]);
  });
});

module.exports = router;