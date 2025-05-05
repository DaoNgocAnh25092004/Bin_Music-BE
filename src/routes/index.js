const userRoutes = require('./user');
const zingRoutes = require('./zing');
const musicAdminRoutes = require('./musicAdmin');
const albumAdminRoutes = require('./albumAdmin');
const homeRoutes = require('./home');
const albumRoutes = require('./album');
const categoryAlbum = require('./categoryAlbum');
const lyricRoutes = require('./lyric');
const aiRoutes = require('./geminiAi');
const playlistRoutes = require('./playlist');
const favoriteRoutes = require('./favorite');
const musicRoutes = require('./music');

function route(app) {
    // API public
    app.use('/api/user', userRoutes);
    app.use('/api/zing', zingRoutes);
    app.use('/api/home', homeRoutes);
    app.use('/api/album', albumRoutes);
    app.use('/api/lyric', lyricRoutes);
    app.use('/api/favorite', favoriteRoutes);
    app.use('/api/music', musicRoutes);

    // API private login
    app.use('/api/ai', aiRoutes);
    app.use('/api/playlist', playlistRoutes);

    // Api private admin
    app.use('/api/admin/music', musicAdminRoutes);
    app.use('/api/admin/album', albumAdminRoutes);
    app.use('/api/admin/category-album', categoryAlbum);
}

module.exports = route;
