// declarations
require('dotenv').config();
const {ENVIROMENT, PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// import routes
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Middlewear setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/', todoRoutes);


app.get('/', (req, res) => {
  res.json({greetings: 'Welcome to Ethans To-do application'});
});

app.listen(PORT, () => console.log(`Server is listening on port: http://localhost${PORT}`));