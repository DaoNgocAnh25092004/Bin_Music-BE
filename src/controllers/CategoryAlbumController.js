const CategoryAlbumModel = require('../models/CategoryAlbum');

class CategoryAlbumController {
    //[POST] admin/category-album/create
    async create(req, res) {
        try {
            const { name, description } = req.body;

            await CategoryAlbumModel.create({
                name,
                description,
            });

            return res.status(201).json({ message: 'Tạo thể loại album thành công!' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    //[GET] admin/category-album/get-all
    async get(req, res) {
        try {
            const categories = await CategoryAlbumModel.find({}, 'name description');
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new CategoryAlbumController();
