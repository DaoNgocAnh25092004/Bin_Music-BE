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

// Middleware
app.use(express.json());

// Cors
app.use(cors(corsOptions));

// Cookie
app.use(cookieParser());

// Cache-Control
app.use(cacheMiddleware);

// Connect to db
db.connect();

// XMLHttpRequest, fetch, axios, ajax... to javascript from server
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route init
route(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
