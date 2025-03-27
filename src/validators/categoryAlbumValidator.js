const { body } = require('express-validator');

const validateAlbum = [
    body('name')
        .notEmpty()
        .withMessage('Tên thể loại album không được để trống.')
        .matches(/^[a-zA-ZÀ-Ỹà-ỹ0-9\s]+$/)
        .withMessage('Tên thể loại album không được chứa ký tự đặc biệt.'),

    body('description')
        .notEmpty()
        .withMessage('Mô tả thể loại album không được để trống.')
        .matches(/^[a-zA-ZÀ-Ỹà-ỹ0-9\s]+$/)
        .withMessage('Mô tả thể loại album không được chứa ký tự đặc biệt.'),
];

module.exports = validateAlbum;
