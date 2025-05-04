const { uploadFile } = require('../providers/CloudinaryProvider');
const PLaylistModel = require('../models/Playlist');
const MusicModel = require('../models/Music');

class PlaylistController {
    // [POST] /playlist/create
    async createPlaylist(req, res) {
        try {
            const { userId, name, songs } = req.body;

            const newPlaylist = await PLaylistModel.create({
                userId,
                name,
                songs,
            });

            return res.status(201).json({ message: 'Tạo playlist thành công!', playlistId: newPlaylist._id });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] /playlist/get-all
    async getAllPlaylist(req, res) {
        try {
            const playlists = await PLaylistModel.find({});

            // Map through playlists to add song images
            const playlistsWithImages = await Promise.all(
                playlists.map(async (playlist) => {
                    let songImages = [];
                    if (playlist.songs && playlist.songs.length < 4 && playlist.songs.length > 0) {
                        const firstSong = await MusicModel.findById(playlist.songs[0]);
                        if (firstSong) {
                            songImages = [firstSong.thumbnailUrl];
                        }
                    } else {
                        songImages = await Promise.all(
                            (playlist.songs || []).slice(0, 4).map(async (songId) => {
                                const song = await MusicModel.findById(songId);
                                return song ? song.thumbnailUrl : null;
                            }),
                        );
                    }
                    return {
                        ...playlist._doc,
                        songImages: songImages.filter((url) => url !== null),
                    };
                }),
            );

            return res.status(200).json({ playlists: playlistsWithImages });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [GET] /get-detail/:id
    async getPlaylistDetail(req, res) {
        try {
            const { id } = req.params;

            const playlist = await PLaylistModel.findById(id).populate('songs').exec();
            if (!playlist) {
                return res.status(404).json({ message: 'Không tìm thấy playlist' });
            }

            // Radom 10 music not in playlist
            const randomSongs = await MusicModel.aggregate([
                { $match: { _id: { $nin: playlist.songs.map((song) => song._id) } } },
                { $sample: { size: 10 } },
            ]);

            return res.status(200).json({ playlist, randomSongs });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    // [POST] /playlist/add-song
    async addSongToPlaylist(req, res) {
        try {
            const { playlistId, songId } = req.body;

            const playlist = await PLaylistModel.findById(playlistId);
            if (!playlist) {
                return res.status(404).json({ message: 'Không tìm thấy playlist' });
            }

            // Check if the song is already in the playlist
            if (playlist.songs.includes(songId)) {
                return res.status(400).json({ message: 'Bài hát đã có trong playlist' });
            }

            playlist.songs.push(songId);
            await playlist.save();

            // Get info of the new song added
            const newSong = await MusicModel.findById(songId);

            return res.status(200).json({ newSong });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new PlaylistController();
