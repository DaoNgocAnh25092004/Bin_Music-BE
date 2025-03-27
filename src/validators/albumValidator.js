const { body, check } = require('express-validator');
const { LIMIT_IMAGE_FILE_SIZE, ALLOWED_IMAGE_FILE_TYPES } = require('../utils/validators');

const validateAlbum = [
    body('name').notEmpty().withMessage('Tên album không được để trống.'),

    body('category').notEmpty().withMessage('Thể loại không được để trống.'),

    body('listMusic').custom((listMusic) => {
        if (typeof listMusic === 'string') {
            try {
                listMusic = listMusic.split(','); // Chuyển từ chuỗi thành mảng
            } catch (e) {
                throw new Error('Danh sách bài hát không hợp lệ.');
            }
        }

        if (!Array.isArray(listMusic) || listMusic.length < 2) {
            throw new Error('Phải có ít nhất 2 bài hát trong 1 album.');
        }
        return true;
    }),

    check('urlImageAlbum').custom((_, { req }) => {
        const file = req.file;
        if (!file) {
            throw new Error('Vui lòng chọn một file hình ảnh.');
        }
        if (!ALLOWED_IMAGE_FILE_TYPES.includes(file.mimetype)) {
            throw new Error('File không hợp lệ. Chỉ chấp nhận định dạng: ' + ALLOWED_IMAGE_FILE_TYPES.join(', ') + '.');
        }
        if (file.size > LIMIT_IMAGE_FILE_SIZE) {
            throw new Error(`File quá lớn. Giới hạn ${LIMIT_IMAGE_FILE_SIZE / (1024 * 1024)}MB.`);
        }
        return true;
    }),
];

module.exports = validateAlbum;
