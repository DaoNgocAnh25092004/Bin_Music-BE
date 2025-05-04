const FavoriteModel = require('../models/Favorite');
const MusicModel = require('../models/Music');

class FavoriteController {
    // [GET] /favorite/:userId
    async getFavoritesByUser(req, res) {
        try {
            const { userId } = req.params;

            const favoriteDoc = await FavoriteModel.findOne({ userId }).populate('songIds');

            if (!favoriteDoc) {
                return res.status(200).json({ songs: [] }); // Trả mảng rỗng nếu chưa có danh sách
            }

            return res.status(200).json({ songs: favoriteDoc.songIds });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] /favorite/full-song/:userId
    async getFullFavoriteSongs(req, res) {
        try {
            const { userId } = req.params;

            // Tìm bản ghi yêu thích của user
            const favoriteDoc = await FavoriteModel.findOne({ userId });

            if (!favoriteDoc || !favoriteDoc.songIds.length) {
                return res.status(200).json({ songs: [] });
            }

            // Lấy đầy đủ thông tin bài hát từ MusicModel
            const songs = await MusicModel.find({ _id: { $in: favoriteDoc.songIds } });

            return res.status(200).json({ songs });
        } catch (error) {
            console.error('Lỗi khi lấy danh sách bài hát yêu thích đầy đủ:', error);
            return res.status(500).json({ message: error.message });
        }
    }

    // [POST] /favorite/add
    async addToFavorite(req, res) {
        try {
            const { userId, songId } = req.body;

            // Tìm bản ghi yêu thích của user
            let favoriteDoc = await FavoriteModel.findOne({ userId });

            if (!favoriteDoc) {
                // Nếu chưa có thì tạo mới
                favoriteDoc = await FavoriteModel.create({
                    userId,
                    songIds: [songId],
                });
            } else {
                // Nếu đã tồn tại, kiểm tra trùng
                if (favoriteDoc.songIds.includes(songId)) {
                    return res.status(400).json({ message: 'Bạn đã yêu thích bài hát này rồi.' });
                }

                // Thêm songId vào mảng
                favoriteDoc.songIds.push(songId);
                await favoriteDoc.save();
            }

            // Tăng lượt yêu thích bài hát
            await MusicModel.findByIdAndUpdate(songId, { $inc: { favoriteCount: 1 } });

            return res.status(201).json({ message: 'Đã thêm vào yêu thích.' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [DELETE] /favorite/remove
    async removeFromFavorite(req, res) {
        try {
            const { userId, songId } = req.body;
            console.log('🚀 ~ FavoriteController ~ removeFromFavorite ~ userId:', userId);

            // Tìm bản ghi yêu thích của user
            const favoriteDoc = await FavoriteModel.findOne({ userId });

            if (!favoriteDoc) {
                return res.status(404).json({ message: 'Không tìm thấy danh sách yêu thích.' });
            }

            // Kiểm tra xem songId có trong danh sách không
            const index = favoriteDoc.songIds.indexOf(songId);
            if (index === -1) {
                return res.status(400).json({ message: 'Bài hát không tồn tại trong danh sách yêu thích.' });
            }

            // Gỡ bài hát khỏi mảng
            favoriteDoc.songIds.splice(index, 1);
            await favoriteDoc.save();

            // Giảm lượt yêu thích bài hát
            await MusicModel.findByIdAndUpdate(songId, { $inc: { favoriteCount: -1 } });

            return res.status(200).json({ message: 'Đã xoá khỏi yêu thích.' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new FavoriteController();
