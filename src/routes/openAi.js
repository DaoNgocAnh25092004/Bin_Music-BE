const express = require('express');
const router = express.Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const openAiController = require('../controllers/OpenAiController');

router.post('/create', isAuthorized, (req, res) => openAiController.createPlaylist(req, res));

module.exports = router;
