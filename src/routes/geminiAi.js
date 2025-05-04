const express = require('express');
const router = express.Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const aiController = require('../controllers/AiController');

router.post('/create', isAuthorized, (req, res) => aiController.createPlaylist(req, res));

module.exports = router;
