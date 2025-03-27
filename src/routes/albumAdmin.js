const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const validateAlbum = require('../validators/albumValidator');
const { multerUpload } = require('../middlewares/multerUploadMiddleware');
const albumAdminController = require('../controllers/AlbumAdminController');

router.post('/create', isAuthorized, multerUpload.single('urlImageAlbum'), validateAlbum, validateRequest, (req, res) =>
    albumAdminController.create(req, res),
);

module.exports = router;
