const express = require('express');
const router = express.Router();

const { isAuthorized } = require('../middlewares/authMiddleware');
const { multerUpload } = require('../middlewares/multerUploadMiddleware');
const musicAdminController = require('../controllers/MusicAdminController');
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
    (req, res) => musicAdminController.create(req, res),
);

router.get('/list', isAuthorized, (req, res) => musicAdminController.list(req, res));

router.get('/search', (req, res) => musicAdminController.search(req, res));

module.exports = router;
