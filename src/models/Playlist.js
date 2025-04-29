const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Playlist = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Playlist', Playlist);
