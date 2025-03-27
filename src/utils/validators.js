const LIMIT_IMAGE_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_IMAGE_FILE_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

const LIMIT_AUDIO_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_AUDIO_FILE_TYPES = ['audio/mpeg', 'audio/wav, audio/mp3'];

module.exports = {
    LIMIT_IMAGE_FILE_SIZE,
    ALLOWED_IMAGE_FILE_TYPES,
    LIMIT_AUDIO_FILE_SIZE,
    ALLOWED_AUDIO_FILE_TYPES,
};
