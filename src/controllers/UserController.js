const User = require('../models/User');
const { verifyTokenGoogle } = require('../middlewares/googleAuth');
const { generateToken } = require('../providers/JwtProvider');
const { verifyToken } = require('../providers/JwtProvider');
const ms = require('ms');

class UserController {
    // [POST] /api/user/login-google
    async loginGoogle(req, res) {
        try {
            const { credential } = req.body;

            // Check if token is empty
            if (!credential) {
                return res.status(400).json({ message: 'Credential is required' });
            }

            // Verify token from Google
            const payload = await verifyTokenGoogle(credential);
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
                    role: 'user',
                    authProviders: [{ provider: 'google', providerId: googleId }],
                    password: null,
                    isActive: true,
                });

                await user.save();
            }

            // Info user
            const userInfo = {
                userId: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
                avatar: user.avatar,
            };

            // Create access token and refresh token
            const accessToken = await generateToken(userInfo, process.env.ACCESS_TOKEN_SECRET, '1h');

            const refreshToken = await generateToken(userInfo, process.env.REFRESH_TOKEN_SECRET, '14 days');

            // Save access token by cookie
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                age: ms('14 days'),
            });

            // Save refresh token by cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                age: ms('14 days'),
            });

            // If use local storage then send token and info user to client
            return res.status(200).json({
                user: userInfo,
                // accessToken,
                // refreshToken,
            });
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    // [Delete] /api/user/logout
    async logout(req, res) {
        try {
            // Clear access token
            res.clearCookie('accessToken');

            // Clear refresh token
            res.clearCookie('refreshToken');

            return res.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            return res.status(500).json({ message: 'Error logging out' });
        }
    }

    // [PUT] /api/user/refresh-token
    async refreshToken(req, res) {
        try {
            // TH1: Get the refresh token from cookie
            const refreshTokenFromCookie = req.cookies?.refreshToken;

            // TH2: Get the refresh token from body when call API (local storage)
            // const refreshTokenFromBody = req.body?.refreshToken;

            // Verify refresh token. If it is valid, then create a new access token
            const refreshTokenPayload = await verifyToken(
                refreshTokenFromCookie,
                // refreshTokenFromBody
                process.env.REFRESH_TOKEN_SECRET,
            );

            // Save info unique user, so can get to decode, save query DB to get info user
            const userInfo = {
                userId: refreshTokenPayload.userId,
                name: refreshTokenPayload.name,
                role: refreshTokenPayload.role,
                email: refreshTokenPayload.email,
                avatar: refreshTokenPayload.avatar,
            };

            // Create access token
            const accessToken = await generateToken(userInfo, process.env.ACCESS_TOKEN_SECRET, '1h');

            // Send access token by cookie
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                age: ms('14 days'),
            });

            // Return new access token for FE need to save in local storage
            return res.status(200).json({
                user: userInfo,
                // accessToken,
            });
        } catch (error) {
            return res.status(401).json({ message: 'Refresh access token fail!' });
        }
    }

    // [GET] /api/user/info-user
    async infoUser(req, res) {
        try {
            const accessTokenFromCookie = req.cookies?.accessToken;

            return res.status(200).json({ message: 'ok' });
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
}

module.exports = new UserController();
