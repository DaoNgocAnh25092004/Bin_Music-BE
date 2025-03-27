const AlbumModel = require('../models/Album');
const CategoryAlbumModel = require('../models/CategoryAlbum');

class AlbumController {
    //[Get] /album/:categoryName
    async getHome(req, res) {
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
