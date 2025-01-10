const User = require('../models/User');
const { verifyToken } = require('../middlewares/googleAuth');

class UserController {
    // [POST] /api/user/login-google
    async loginGoogle(req, res) {
        try {
            const { credential } = req.body;

            // Verify token from Google
            const payload = await verifyToken(credential);
            const { name, email, picture: avatar, sub: googleId } = payload;

            // Find user by email or Google ID
            let user = await User.findOne({
                $or: [{ email }, { 'authProviders.providerId': googleId }],
            });

            // If user not found, create a new user
            if (!user) {
                user = new User({
                    name,
                    email,
                    avatar,
                    authProviders: [{ provider: 'google', providerId: googleId }],
                    password: null,
                    isActive: true,
                });

                await user.save();
            }

            return res.status(200).json(user);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }
}

module.exports = new UserController();
