const { verifyToken } = require('../providers/JwtProvider');

// Get and verify the token from the FE
const isAuthorized = async (req, res, next) => {
    // TH1: Get access token from cookie
    const accessTokenFromCookie = req.cookies?.accessToken;

    if (!accessTokenFromCookie) {
        return res.status(401).json({ message: 'Unauthorized? (Token not found cookies)' });
    }

    try {
        // Step 01: Verify access token
        const accessTokenPayload = await verifyToken(
            accessTokenFromCookie,
            // accessTokenFromHeader
            process.env.ACCESS_TOKEN_SECRET,
        );

        // Step 02: If access token is valid then save info verify  "req.jwtDecoded", to use in the next
        req.jwtDecoded = accessTokenPayload;

        // Step 03: Next
        next();
    } catch (error) {
        // TH1: if access token it is expired then return 410 - GONE for FE to call refresh token
        if (error.message?.includes('jwt expired')) {
            res.status(410).json({ message: 'Token expired! Need to refresh token.' });
            return;
        }
        // TH2: if access token is invalid then return 401 - Unauthorized for FE logout
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // // TH2: Get access token from header (local storage)
    // const accessTokenFromHeader = req.headers.authorization.substring("Bearer ".length), remove bearer;
    // console.log('🚀 ~ isAuthorized ~ accessTokenFromHeader:', accessTokenFromHeader);

    // if (!accessTokenFromHeader) {
    //     return res.status(401).json({ message: 'Unauthorized (Token not found headers)' });
    // }
};

module.exports = { isAuthorized };
