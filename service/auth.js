const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretId = process.env.SECRET_ID;

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secretId);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretId);
    } catch (error) {
        console.error("JWT verification error:", error.message);
        return null;
    }
}

module.exports = {
    getUser,
    setUser
};
