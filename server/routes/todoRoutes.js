const router = require('express').Router();
const todos = require('../db/queries/todos');
const auth = require('../middlewear/basicAuth');
const ErrorMessage = require('../errors/ErrorMessage.js');

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
  let {name, comment, status} = req.body;
  console.log("Status: ", status);

  // Verifies that at least the name value is provided. Status will default to "todo" and comments can be null.
  if (!name) {
    res.status(400);
    const error = new ErrorMessage(400);
    res.json(error);
    return;
  }

  if (status === undefined) {
    status = 'todo';
  }
  // Allow only acceptable status values.
  const statusArray = ['todo', 'inprogress', 'complete'];

  if (!statusArray.includes(status)) {
    const error = new ErrorMessage(400);
    res.json(error);
    return;
  }

  todos.createNewTodo(name, comment, status).then(data => {
    res.setHeader("Content-Type", "application/json");
    res.status(201);
    res.json(data[0]);
  });
});

// Get a specific To-Do
router.get('/todo/:id', (req, res) => {

  const id = req.params.id;
  console.log("id type: ", typeof parseInt(id));



  todos.getTodoById(id).then(data => {
    if (data.length === 0) {
      res.status(404);
      const error = new ErrorMessage(404);
      res.json(error);
      return;
    }
    res.status(200);
    res.json(data[0]);
  });
});

router.get('/todo', (req, res) => {
  const error = new ErrorMessage(404);
  res.json(error);
  return;
});

module.exports = router;