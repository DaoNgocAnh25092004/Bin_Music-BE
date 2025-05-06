const corsOptions = {
    origin: ['http://localhost:3000', 'https://bin-music-fe.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
