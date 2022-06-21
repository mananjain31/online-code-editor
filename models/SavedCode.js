const mongoose = require('mongoose');
const SavedCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Must Specify The Code']
    },
    language: {
        type: String,
        enum: ['java', 'python3', 'node'],
        required: [true, 'Must Specify The Language']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SavedCode', SavedCodeSchema);