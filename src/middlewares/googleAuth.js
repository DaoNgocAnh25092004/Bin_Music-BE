const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verifyTokenGoogle(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        return ticket.getPayload();
    } catch (err) {
        throw new Error('Invalid Google token');
    }
}

module.exports = { verifyTokenGoogle };
