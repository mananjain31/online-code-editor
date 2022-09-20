const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    const user =
        (await User.findOne({ email })) || (await User.findOne({ username }));
    if (user) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    const newUser = new User({
        username,
        email,
        password,
    });
    try {
        await newUser.save();
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Invalid Credentials",
        });
    }
    res.status(201).json({
        success: true,
        message: "User created successfully",
    });
};

exports.signin = async (req, res) => {
    const { username, password } = req.body;
    const user =
        (await User.findOne({ email: username })) ||
        (await User.findOne({ username: username }));

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User does not exist",
        });
    }
    const isValid = await user.validatePassword(password);
    if (!isValid) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
        });
    }
    const jwt_payload = {
        username: user.username,
        email: user.email,
    };
    const token = jwt.sign(jwt_payload, process.env.SECRET);
    res.cookie("token", token).status(200).json({
        success: true,
        message: "User signed in successfully",
        token,
    });
};

exports.logout = (req, res) => {
    res.clearCookie("token").status(200).json({
        success: true,
        message: "User signed out successfully",
    });
};
