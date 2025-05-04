const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const FavoriteSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        songIds: [
            {
                type: Types.ObjectId,
                ref: 'Music',
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    },
);

module.exports = mongoose.model('Favorite', FavoriteSchema);
