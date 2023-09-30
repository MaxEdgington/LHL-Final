// declarations
require('dotenv').config()
const cors = require('cors');
const {ENVIROMENT, PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// routes import 
const catsRoutes = require('./routes/catsRoutes');

const app = express();

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

// corsObject to whitelist ORIGIN with appropriate credentials
const corsOptions = {
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  credentials: true,
  ContentType: 'json'
};


// NPM install cors , setup cors from code from lecture (project kickoff lecture)
app.use(cors(corsOptions));
app.use('/cats', catsRoutes)


app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));