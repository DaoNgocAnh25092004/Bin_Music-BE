const express = require('express');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const route = require('./routes');
const db = require('./config/db');
const corsOptions = require('./config/cors');
const cacheMiddleware = require('./config/cache');

const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3001;

// Cors
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Cookie
app.use(cookieParser());

// XMLHttpRequest, fetch, axios, ajax... to javascript from server
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

// Cache-Control
app.use(cacheMiddleware);

// Connect to db
db.connect();

// Route init
route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
