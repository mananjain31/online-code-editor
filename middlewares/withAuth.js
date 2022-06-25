const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.SECRET;
const withAuth = async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).send('Unauthorized: No token provided');
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        // console.log(new Date(decoded.iat));
        const { username } = decoded;
        req.user = await User.findOne({ username });
        next();
    }
    catch (err) {
        return res.status(401).send('Unauthorized: Invalid token');
    }

}
module.exports = withAuth;