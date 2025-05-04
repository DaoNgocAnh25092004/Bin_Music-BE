const express = require('express');
const router = express.Router();
const { isAuthorized } = require('../middlewares/authMiddleware');
const playlistController = require('../controllers/PlaylistController');

router.post('/create', isAuthorized, (req, res) => playlistController.createPlaylist(req, res));

router.post('/add-song', isAuthorized, (req, res) => playlistController.addSongToPlaylist(req, res));

router.get('/get-all', isAuthorized, (req, res) => playlistController.getAllPlaylist(req, res));

router.get('/get-detail/:id', isAuthorized, (req, res) => playlistController.getPlaylistDetail(req, res));

module.exports = router;
