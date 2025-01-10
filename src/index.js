const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const bodyParser = require('body-parser');
const app = express();

// Use port from file .env
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// // Import route
const route = require('./routes');

// // Import db
const db = require('./config/db');

// Connect to db
db.connect();

// XMLHttpRequest, fetch, axios, ajax... to javascript from server

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Route init
route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
