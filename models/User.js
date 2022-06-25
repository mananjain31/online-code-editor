const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { validateEmail } = require('../utils/validators');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Must Specify The Username Name'],
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: [
            validateEmail,
            "Please enter a valid email"
        ],
        required: [true, "Email required"]
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password required"]
    },
});


UserSchema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};


module.exports = mongoose.model('user', UserSchema);