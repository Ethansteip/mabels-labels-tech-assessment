// Require the database connection
const db = require('../../configs/db.config');

const getAllTodos = () => {
  return db.query('SELECT * FROM todos').then(data => {
    return data.rows;
  });
};

const getTodoById = id => {
  return db.query('SELECT * FROM todos WHERE id = $1', [id]).then(data => {
    return data.rows;
  });
};

module.exports = {getAllTodos, getTodoById};
