const multer = require('multer');
const { LIMIT_IMAGE_FILE_SIZE, ALLOWED_IMAGE_FILE_TYPES, LIMIT_AUDIO_FILE_SIZE, ALLOWED_AUDIO_FILE_TYPES } = require('../utils/validators');

const customFileFilter = (req, file, callback) => {
    if (ALLOWED_IMAGE_FILE_TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else if (ALLOWED_AUDIO_FILE_TYPES.includes(file.mimetype)) {
        callback(null, true);
    } else {
        callback(new Error('Invalid file type. Only JPEG, PNG, JPG, MP3, and WAV files are allowed.'));
    }
};

// Cấu hình Multer với đúng giới hạn file size
const multerUpload = multer({
    limits: {
        fileSize: (req, file, cb) => {
            if (ALLOWED_IMAGE_FILE_TYPES.includes(file.mimetype)) {
                cb(null, LIMIT_IMAGE_FILE_SIZE);
            } else if (ALLOWED_AUDIO_FILE_TYPES.includes(file.mimetype)) {
                cb(null, LIMIT_AUDIO_FILE_SIZE);
            } else {
                cb(new Error('Invalid file type.'));
            }
        },
    },
    fileFilter: customFileFilter,
});

module.exports = { multerUpload };
