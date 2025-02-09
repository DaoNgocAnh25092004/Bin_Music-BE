const mongoose = require('mongoose');

async function connect() {
    try {
        console.log(process.env.MONGODB_URI);
        await mongoose.connect('mongodb+srv://binmusic:QR1nT1cAKFsz46Yf@cluster0-daongocanh.ttyz0.mongodb.net/bin_music', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
