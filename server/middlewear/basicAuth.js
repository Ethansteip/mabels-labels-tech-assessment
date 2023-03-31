/*
*
* basicAuth - Verifies that the request contains an authorization header.
*
*/
const ErrorMessage = require('../errors/ErrorMessage.js');

const isAuthorized = (req, res, next) => {

  const auth = req.headers.authorization;

  if (!auth) {
    res.status(403);
    res.setHeader('WWW-Authenticate', 'Basic');
    const error = new ErrorMessage(403);
    res.json(error);
  }

  const authenticate = new Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');
  const user = authenticate[0];
  const pass = authenticate[1];

  if (user === 'admin' && pass === 'password') {
    next();
  } else {
    res.status(403);
    res.setHeader('WWW-Authenticate', 'Basic');
    const error = new ErrorMessage(403);
    res.json(error);
  }
};

module.exports = {isAuthorized};