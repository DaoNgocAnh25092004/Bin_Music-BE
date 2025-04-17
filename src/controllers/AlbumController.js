const AlbumModel = require('../models/Album');
const CategoryAlbumModel = require('../models/CategoryAlbum');
const MusicModel = require('../models/Music');

class AlbumController {
    //[Get] /album/:categoryName
    async getAlbumByName(req, res) {
        try {
            const { categoryName } = req.params;

            const category = await CategoryAlbumModel.findOne({ name: decodeURIComponent(categoryName) });
            if (!category) {
                return res.status(404).json({ message: 'Không tìm thấy danh mục' });
            }

            const albums = await AlbumModel.find({ category: category._id }).select('name urlImageAlbum').exec();

            return res.status(200).json({ albums });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] /suggested-songs
    async getSuggestSong(req, res) {
        try {
            const limit = parseInt(req.query.limit) || 9;
            const songs = await MusicModel.aggregate([{ $sample: { size: limit } }]);
            res.json({ success: true, songs });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lỗi server', error });
        }
    }

    //[Get] /album/:id
    async getInfo(req, res) {
        try {
            const { id } = req.params;

            const album = await AlbumModel.findById(id).populate('songs').exec();
            if (!album) {
                return res.status(404).json({ message: 'Không tìm thấy album' });
            }

            return res.status(200).json({ album });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AlbumController();
