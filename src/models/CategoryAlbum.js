const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('CategoryAlbum', categorySchema, 'category-albums');
