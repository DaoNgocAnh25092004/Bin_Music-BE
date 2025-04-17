const express = require('express');
const router = express.Router();

const lyricController = require('../controllers/LyricController');

router.get('/:id', (req, res) => lyricController.getLyric(req, res));

module.exports = router;
