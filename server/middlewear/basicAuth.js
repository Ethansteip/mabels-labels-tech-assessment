/*
*
* basicAuth - Verifies that the request contains an authorization header.
*
*/
const ErrorMessage = require('../errors/ErrorMessage.js');

const isAuthorized = (req, res, next) => {

  const auth = req.headers.authorization;

  if (auth === 'Basic username:password') {
    next();
  } else {
    res.status(403);
    const error = new ErrorMessage(403);
    res.json(error);
  }
};

module.exports = {isAuthorized};