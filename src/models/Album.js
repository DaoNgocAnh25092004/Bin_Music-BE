const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Albums = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryAlbum' },
        urlImageAlbum: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Album', Albums);
