const express = require('express');
const router = express.Router();

const musicController = require('../controllers/MusicController');

router.get('/search', (req, res) => musicController.search(req, res));

router.get('/:musicId', (req, res) => musicController.getById(req, res));

module.exports = router;
