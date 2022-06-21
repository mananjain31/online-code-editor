const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email }) || await User.findOne({ username });
    if (user) {
        return res.status(400).json({
            success: false,
            message: 'User already exists'
        });
    }
    const newUser = new User({
        username,
        email,
        password
    });
    await newUser.save();
    res.json({
        success: true,
        message: 'User created successfully'
    });
}

exports.signin = async (req, res) => {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email }) || await User.findOne({ username });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: 'User does not exist'
        });
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
        return res.status(401).json({
            success: false,
            message: 'Invalid password'
        });
    }
    const jwt_payload = {
        username: user.username
    }
    const token = jwt.sign(jwt_payload, process.env.SECRET);
    res.cookie('token', token)
        .status(200).json({
            success: true,
            message: 'User signed in successfully'
        });
}