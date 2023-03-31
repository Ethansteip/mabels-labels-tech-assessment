const router = require('express').Router();
const todos = require('../db/queries/todos');
const reqAuth = require('../utils/requestAuth');
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
  // If a todo status was not passed in the request body, set default status to 'todo'.
  if (status === undefined) {
    status = 'todo';
  }
  if (!reqAuth.checkForNameAndStatus(req, res, name, status)) {
    todos.createNewTodo(name, comment, status).then(data => {
      res.setHeader("Content-Type", "application/json");
      res.status(201);
      res.json(data[0]);
    });
  }
});

// Get a specific To-Do
router.get('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (!reqAuth.checkForString(res, id)) {
    todos.getTodoById(id).then(data => {
      if (!reqAuth.checkForEmptyArray(res, data)) {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json(data[0]);
      }
    });
  }
});

// Update a todo
router.put('/todo/:id', auth.isAuthorized, (req, res) => {
  let {name, comment, status} = req.body;
  const id = parseInt(req.params.id);

  if (!reqAuth.checkForNameAndStatus(req, res, name, status)) {
    if (!reqAuth.checkForString(res, id)) {
      todos.updateTodoById(name, comment, status, id).then(data => {
        if (!reqAuth.checkForEmptyArray(res, data)) {
          res.setHeader("Content-Type", "application/json");
          res.status(200);
          res.json(data[0]);
        }
      });
    }
  }
});

// Delete a todo
router.delete('/todo/:id', auth.isAuthorized, (req, res) => {
  const id = parseInt(req.params.id);

  if (!reqAuth.checkForString(res, id)) {
    todos.deleteTodoById(id).then(data => {
      if (!reqAuth.checkForEmptyArray(res, data)) {
        res.setHeader("Content-Type", "application/json");
        res.status(200);
        res.json({message: `To-Do with an id of ${id} was deleted successfully!`});
      }
    });
  }
});

// Just in case someone doesn't pass an id param to the /todo/{id} route.
router.get('/todo', (req, res) => {
  const error = new ErrorMessage(404);
  res.json(error);
  return;
});

module.exports = router;