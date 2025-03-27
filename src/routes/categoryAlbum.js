const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const validateCategoryAlbum = require('../validators/categoryAlbumValidator');
const categoryAlbumController = require('../controllers/CategoryAlbumController');

router.post('/create', isAuthorized, validateCategoryAlbum, validateRequest, (req, res) => categoryAlbumController.create(req, res));
router.get('/get-all', isAuthorized, validateRequest, (req, res) => categoryAlbumController.get(req, res));

module.exports = router;
