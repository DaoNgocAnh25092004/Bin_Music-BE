const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;
const route = require('./routes');
const db = require('./config/db');
const corsOptions = require('./config/cors');

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());

// Cors
app.use(cors(corsOptions));

// Cookie
app.use(cookieParser());

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
