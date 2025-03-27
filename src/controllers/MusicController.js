const { uploadFile } = require('../providers/CloudinaryProvider');
const MusicModel = require('../models/Music');
const LyricsModel = require('../models/Lyric');

class MusicController {
    // [POST] admin/music/create
    async create(req, res) {
        try {
            const { name, listArtist, genres, lyric } = req.body;

            // Upload file lên Cloudinary
            const audioFile = await uploadFile(req.files.audio[0].buffer, 'music_audios', 'video');
            const thumbnailFile = await uploadFile(req.files.thumbnail[0].buffer, 'music_thumbnails', 'image');

            const newMusic = await MusicModel.create({
                name,
                listArtist: JSON.parse(listArtist),
                genres: JSON.parse(genres),
                audioUrl: audioFile.url,
                thumbnailUrl: thumbnailFile.url,
            });

            if (lyric) {
                await LyricsModel.create({
                    musicId: newMusic._id,
                    lyric: lyric,
                });
            }

            return res.status(201).json({ message: 'Tạo bài hát thành công!' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] admin/music/list
    async list(req, res) {
        try {
            let { page = 1, limit = 3 } = req.query;
            page = parseInt(page);
            limit = parseInt(limit);

            const musics = await MusicModel.find()
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await MusicModel.countDocuments();

            return res.status(200).json({
                data: musics,
                hasMore: total > page * limit,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] admin/music/search
    async search(req, res) {
        try {
            let { page = 1, limit = 5, name = '', artist = '' } = req.query;
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
