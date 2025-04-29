const axios = require('axios');
const MusicModel = require('../models/Music');

// Utility to escape regex special characters
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\\\]/g, '\\$&');
}

class AiController {
    // [POST] /api/gemini/create
    async createPlaylist(req, res) {
        try {
            const { genre, description, languages, songCount } = req.body;

            // 1. Fetch all songs from DB with relevant fields
            const allSongs = await MusicModel.find({}, 'name listArtist genres audioUrl thumbnailUrl');

            // 2. Build prompt string listing all songs
            const songListForPrompt = allSongs
                .map((song, idx) => {
                    const artists = song.listArtist.map((a) => a.name).join(', ');
                    const genres = song.genres.join(', ');
                    return `${idx + 1}. ${song.name} - ${artists} (${genres})`;
                })
                .join('\n');

            // 3. Compose AI prompt
            const prompt = `
Bạn là một trợ lý âm nhạc. Dưới đây là danh sách tất cả bài hát hiện có trong hệ thống:

${songListForPrompt}

Hãy chọn ra ${songCount} bài phù hợp với:
- Mô tả: ${description}
- Thể loại: ${genre}
- Ngôn ngữ: ${languages}

Chỉ chọn từ danh sách trên.
Trả về một JSON object với 2 trường:
- "title": tên playlist ngắn gọn
- "songs": mảng bài hát với các trường: title, artist
`;

            // 4. Call Google Gemini API
            const apiKey = process.env.GEMINI_API_KEY;
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                { contents: [{ parts: [{ text: prompt }] }] },
                { headers: { 'Content-Type': 'application/json' } },
            );

            // 5. Extract AI's raw suggestion text
            const raw = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            // 6. Clean markdown formatting & parse JSON object
            const cleaned = raw.replace(/```(?:json)?/g, '').trim();
            let playlistTitle = '';
            let suggested = [];

            try {
                const parsed = JSON.parse(cleaned);
                playlistTitle = parsed.title || '';
                suggested = parsed.songs || [];
            } catch (e) {
                console.error('Parse JSON error:', e);
            }

            // 7. Enrich suggestions with audioUrl and thumbnailUrl
            const result = [];
            for (const item of suggested) {
                const titlePattern = new RegExp(`^${escapeRegex(item.title)}$`, 'i');
                const artistList = item.artist.split(',').map((a) => a.trim().toLowerCase());

                const candidates = await MusicModel.find({ name: titlePattern }).select('name listArtist audioUrl thumbnailUrl genres');

                if (candidates.length) {
                    const match = candidates.find((doc) => {
                        const docArtists = doc.listArtist.map((a) => a.name.toLowerCase());
                        return artistList.every((a) => docArtists.includes(a));
                    });

                    if (match) {
                        const enrichedArtists = match.listArtist.map((artist) => ({
                            name: artist.name,
                            role: artist.role,
                        }));

                        result.push({
                            _id: match._id,
                            name: match.name,
                            listArtist: enrichedArtists,
                            genres: match.genres,
                            audioUrl: match.audioUrl,
                            thumbnailUrl: match.thumbnailUrl,
                        });
                    }
                }
            }

            return res.status(200).json({
                title: playlistTitle,
                songs: result,
            });
        } catch (error) {
            console.error('[AiController Error]', error);
            return res.status(500).json({ message: 'Đã có lỗi xảy ra', detail: error.message });
        }
    }
}

module.exports = new AiController();
