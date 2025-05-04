const express = require('express');
const router = express.Router();

const favoriteController = require('../controllers/FavoriteController');

router.get('/:userId', (req, res) => favoriteController.getFavoritesByUser(req, res));

router.get('/full-song/:userId', (req, res) => favoriteController.getFullFavoriteSongs(req, res));

router.post('/add', (req, res) => favoriteController.addToFavorite(req, res));

router.delete('/remove', (req, res) => favoriteController.removeFromFavorite(req, res));

module.exports = router;
