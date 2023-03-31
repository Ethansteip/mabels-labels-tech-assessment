/*
*
* requestAuth - helper functions to help detect and raise errors.
*
*/

const ErrorMessage = require('../errors/ErrorMessage.js');

const checkForNameAndStatus = (req, res, name, status) => {

  // Verifies that at least the name value is provided in the request. Status will default to "todo" and comments can be null.
  if (!name) {
    res.status(400);
    const error = new ErrorMessage(400);
    res.json(error);
    return true;
  }

  // Allow only acceptable status values.
  const statusArray = ['todo', 'inprogress', 'complete'];

  if (!statusArray.includes(status)) {
    const error = new ErrorMessage(400);
    res.json(error);
    return true;
  }
  return false;

};

// Check that we are not passing a string to /todo/{id}.
const checkForString = (res, id) => {
  
  if (isNaN(id)) {
    res.status(404);
    const error = new ErrorMessage(404);
    res.json(error);
    return true;
  }
  return false;
};

// Check if the response from the db query on /todo/{id} returns an empty object.
const checkForEmptyArray = (res, data) => {
  if (data.length === 0) {
    res.status(404);
    const error = new ErrorMessage(404);
    res.json(error);
    return true;
  }
  return false;
};

module.exports = {checkForNameAndStatus, checkForString, checkForEmptyArray};