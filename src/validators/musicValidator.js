const { body, check } = require('express-validator');
const { LIMIT_IMAGE_FILE_SIZE, ALLOWED_IMAGE_FILE_TYPES, LIMIT_AUDIO_FILE_SIZE, ALLOWED_AUDIO_FILE_TYPES } = require('../utils/validators');

const validateMusic = [
    body('name')
        .notEmpty()
        .withMessage('Tên bài hát không được để trống.')
        .matches(/^[a-zA-ZÀ-Ỹà-ỹ0-9\s]+$/)
        .withMessage('Tên bài hát không được chứa ký tự đặc biệt.'),

    body('listArtist').custom((value, { req }) => {
        if (typeof value === 'string') {
            try {
                req.body.listArtist = JSON.parse(value);
            } catch (error) {
                throw new Error('Danh sách nghệ sĩ không hợp lệ.');
            }
        }
        if (!Array.isArray(req.body.listArtist) || req.body.listArtist.length < 1) {
            throw new Error('Danh sách nghệ sĩ không được để trống.');
        }
        return true;
    }),

    body('genres').custom((value, { req }) => {
        if (typeof value === 'string') {
            try {
                req.body.genres = JSON.parse(value);
            } catch (error) {
                throw new Error('Danh sách thể loại không hợp lệ.');
            }
        }
        if (!Array.isArray(req.body.genres) || req.body.genres.length < 1) {
            throw new Error('Vui lòng chọn ít nhất một thể loại.');
        }
        return true;
    }),

    body('lyric').optional().isString().withMessage('Lời bài hát phải là chuỗi.'),

    // Validate file uploads (sử dụng `check` vì body không thể kiểm tra files)
    check('audio').custom((_, { req }) => {
        if (!req.files || !req.files.audio) {
            throw new Error('Vui lòng chọn một file âm thanh.');
        }
        const file = req.files.audio[0];
        if (!ALLOWED_AUDIO_FILE_TYPES.includes(file.mimetype)) {
            throw new Error('File không hợp lệ. Chỉ chấp nhận định dạng: ' + ALLOWED_AUDIO_FILE_TYPES.join(', ') + '.');
        }
        if (file.size > LIMIT_AUDIO_FILE_SIZE) {
            throw new Error(`File quá lớn. Giới hạn ${LIMIT_AUDIO_FILE_SIZE / (1024 * 1024)}MB.`);
        }
        return true;
    }),

    check('thumbnail').custom((_, { req }) => {
        if (!req.files || !req.files.thumbnail) {
            throw new Error('Vui lòng chọn một file hình ảnh.');
        }
        const file = req.files.thumbnail[0];
        if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.mimetype)) {
            throw new Error('File không hợp lệ. Chỉ chấp nhận định dạng: ' + ALLOWED_IMAGE_FILE_TYPES.join(', ') + '.');
        }
        if (file.size > LIMIT_IMAGE_FILE_SIZE) {
            throw new Error(`File quá lớn. Giới hạn ${LIMIT_IMAGE_FILE_SIZE / (1024 * 1024)}MB.`);
        }
        return true;
    }),
];

module.exports = validateMusic;
