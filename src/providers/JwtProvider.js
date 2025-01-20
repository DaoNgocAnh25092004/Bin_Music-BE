const jwt = require('jsonwebtoken');

/*
 *  This function is create token - Need 3 params: userInfo, secretSignature, tokenLife
 *  userInfo: The information you want to encode in the token
 *  secretSignature: Signature to encode the token
 *  tokenLife: Time to live of the token
 */
const generateToken = async (userInfo, secretSignature, tokenLife) => {
    try {
        // Function Sign() of library jsonwebtoken - Algorithm use to encode token is HS256 (default is HS256)
        return jwt.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife });
    } catch (error) {
        throw new Error(error);
    }
};

/*
 *  This function check token - Need 2 params: token, secretSignature
 */
const verifyToken = async (token, secretSignature) => {
    try {
        return jwt.verify(token, secretSignature);
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
