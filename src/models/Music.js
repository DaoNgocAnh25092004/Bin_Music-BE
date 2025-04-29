const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Music = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        listArtist: [
            {
                name: { type: String, required: true },
                role: { type: String, required: true },
            },
        ],
        genres: {
            type: Array,
            required: true,
        },
        audioUrl: {
            type: String,
            required: true,
        },
        thumbnailUrl: {
            type: String,
            required: true,
        },
        favoriteCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Music', Music);
