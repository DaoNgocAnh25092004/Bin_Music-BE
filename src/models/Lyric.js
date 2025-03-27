const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Lyric = new Schema(
    {
        musicId: {
            type: Schema.Types.ObjectId,
            ref: 'Music',
            required: true,
        },
        lyric: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Lyric', Lyric);
