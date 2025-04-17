const express = require('express');
const router = express.Router();

const albumController = require('../controllers/AlbumController');

// Get info page home
router.get('/album/:categoryName', (req, res) => albumController.getAlbumByName(req, res));

router.get('/suggested-songs', (req, res) => albumController.getSuggestSong(req, res));

module.exports = router;
