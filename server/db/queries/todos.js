// Require the database connection
const db = require('../../configs/db.config');

// Gets a list of all To-Dos from datastore.
const getAllTodos = () => {
  return db.query('SELECT * FROM todos;').then(data => {
    return data.rows;
  });
};

// Crates an new To-Do item in datastore and returns the newly created record.
const createNewTodo = (name, comment, status = 'todo') => {

  return db.query('INSERT INTO todos (name, comment, status) VALUES ($1, $2, $3) RETURNING *;', [name, comment, status])
    .then(data => {
      return data.rows;
    });
};

// Gets a specific To-Do item with id from datastore.
const getTodoById = id => {
  return db.query('SELECT * FROM todos WHERE id = $1;', [id]).then(data => {
    return data.rows;
  });
};

module.exports = {getAllTodos, createNewTodo, getTodoById};
