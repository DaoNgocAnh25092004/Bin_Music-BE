const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
require('dotenv').config(); // Load biến môi trường từ .env

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Hàm upload file lên Cloudinary
const uploadFile = (fileBuffer, folderName, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: folderName,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            },
        );

        // Kiểm tra dữ liệu đầu vào
        if (!fileBuffer) {
            return reject(new Error('File buffer is empty!'));
        }

        // Stream dữ liệu lên Cloudinary
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
};

module.exports = { uploadFile };
