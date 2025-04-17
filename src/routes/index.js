const userRoutes = require('./user');
const zingRoutes = require('./zing');
const musicRoutes = require('./music');
const albumAdminRoutes = require('./albumAdmin');
const homeRoutes = require('./home');
const albumRoutes = require('./album');
const categoryAlbum = require('./categoryAlbum');
const lyricRoutes = require('./lyric');
const aiRoutes = require('./Ai');

function route(app) {
    // API public
    app.use('/api/user', userRoutes);
    app.use('/api/zing', zingRoutes);
    app.use('/api/home', homeRoutes);
    app.use('/api/album', albumRoutes);
    app.use('/api/lyric', lyricRoutes);
    app.use('/api/ai', aiRoutes);

    // Api private admin
    app.use('/api/admin/music', musicRoutes);
    app.use('/api/admin/album', albumAdminRoutes);
    app.use('/api/admin/category-album', categoryAlbum);
}

module.exports = route;
