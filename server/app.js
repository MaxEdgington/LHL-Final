// declarations
require('dotenv').config();
const cors = require('cors');
const { ENVIROMENT, PORT } = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// routes import 
const tasksRoutes = require('./routes/tasks');

console.log('Tasks Routes Imported'); // This will log when the tasks routes are imported.

const catsRoutes = require('./routes/catsRoutes');

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// corsObject to whitelist ORIGIN with appropriate credentials

console.log('CORS Origin: ', process.env.ORIGIN);

const corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
  credentials: true,
  ContentType: 'json'
};


// NPM install cors , setup cors from code from lecture (project kickoff lecture)
app.use(cors(corsOptions));
app.use('/cats', catsRoutes);
app.use('/api/tasks', tasksRoutes); // Adjust the path as per your project’s URL structure.
console.log('Tasks Routes Setup'); // This will log when the tasks routes are set up.

app.get('/', (req, res) => {
  res.json({ greetings: 'hello world' });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));