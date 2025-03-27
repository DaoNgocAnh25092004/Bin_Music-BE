const AlbumModel = require('../models/Album');
const CategoryAlbumModel = require('../models/CategoryAlbum');
const { uploadFile } = require('../providers/CloudinaryProvider');

class AlbumAdminController {
    //[POST] /admin/album/create
    async create(req, res) {
        try {
            const { name, listMusic, category } = req.body;

            const urlImageAlbum = await uploadFile(req.file.buffer, 'album_thumbnails', 'image');

            await AlbumModel.create({
                name,
                urlImageAlbum: urlImageAlbum.url,
                songs: JSON.parse(listMusic),
                category,
            });
            return res.status(201).json({ message: 'Tạo album thành công!' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AlbumAdminController();
