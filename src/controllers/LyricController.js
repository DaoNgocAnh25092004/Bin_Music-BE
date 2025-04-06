const LyricModel = require('../models/Lyric');

class LyricController {
    // [GET] /lyric/:id
    async getLyric(req, res) {
        try {
            const { id } = req.params;
            const lyric = await LyricModel.findOne({ musicId: id });

            if (!lyric) {
                return res.status(404).json({ message: 'Không tìm thấy lời bài hát!' });
            }
            return res.status(200).json({ lyric: lyric.lyric });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new LyricController();
