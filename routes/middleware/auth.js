const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ msg: 'Authorization denied. Token missing.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded);
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({ msg: 'Authorization denied. Invalid token.' });
    }
};
