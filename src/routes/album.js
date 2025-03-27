const express = require('express');
const router = express.Router();

const albumController = require('../controllers/AlbumController');

router.get('/:id', (req, res) => albumController.getInfo(req, res));

module.exports = router;
