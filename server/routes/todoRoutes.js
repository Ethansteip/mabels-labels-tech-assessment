const router = require('express').Router();
const todos = require('../db/queries/todos');
const auth = require('../middlewear/basicAuth');

// Gets a list of all To-Dos
router.get('/todos', (req, res) => {
  todos.getAllTodos().then(data => {
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    res.json(data);
  });
});

// Create a new To-Do item
router.post('/todo', auth.isAuthorized, (req, res) => {
  const {name, comment , status} = req.body;
  todos.createNewTodo(name, comment, status).then(data => {
    res.setHeader("Content-Type", "application/json");
    res.status(201);
    res.json(data[0]);
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