const MusicModel = require('../models/Music');

class MusicController {
    // [GET] /music/:id
    async getById(req, res) {
        try {
            const { musicId } = req.params;
            const music = await MusicModel.findById(musicId);

            if (!music) {
                return res.status(404).json({ message: 'Bài hát không tồn tại!' });
            }

            return res.status(200).json(music);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] /music/search
    async search(req, res) {
        try {
            let { page = 1, limit = 10, name = '', artist = '' } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);

            const query = {
                $or: [
                    { name: { $regex: name, $options: 'i' } },
                    { listArtist: { $elemMatch: { name: { $regex: artist, $options: 'i' } } } },
                ],
            };

            const musics = await MusicModel.find(query, 'name listArtist thumbnailUrl')
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await MusicModel.countDocuments(query);

            return res.status(200).json({
                data: musics,
                total,
                hasMore: total > page * limit,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new MusicController();
