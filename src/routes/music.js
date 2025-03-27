const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../middlewares/authMiddleware');
const { multerUpload } = require('../middlewares/multerUploadMiddleware');
const musicController = require('../controllers/MusicController');
const validateMusic = require('../validators/musicValidator');
const validateRequest = require('../middlewares/validateRequest');

router.post(
    '/create',
    isAuthorized,
    multerUpload.fields([
        { name: 'audio', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
    ]),
    validateMusic,
    validateRequest,
    (req, res) => musicController.create(req, res),
);

router.get('/list', isAuthorized, (req, res) => musicController.list(req, res));

router.get('/search', (req, res) => musicController.search(req, res));

module.exports = router;
