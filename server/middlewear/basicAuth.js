/*
*
* basicAuth - Verifies that the request contains an authorization header.
*
*/
const isAuthorized = (req, res, next) => {

  const auth = req.headers.authorization;

  if (auth === 'Basic username:password') {
    next();
  } else {
    res.status(403);
    res.send('Access Forbidden');
  }
};

module.exports = {isAuthorized};