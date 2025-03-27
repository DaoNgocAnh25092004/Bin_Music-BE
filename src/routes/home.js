const express = require('express');
const router = express.Router();

const albumController = require('../controllers/AlbumController');

// Get info page home
router.get('/album/:categoryName', (req, res) => albumController.getHome(req, res));

module.exports = router;
