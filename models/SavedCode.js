const mongoose = require('mongoose');
const SavedCodeSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: [true, "Must Specify the Code File Name"]
    },
    code: {
        type: String,
        required: [true, 'Must Specify the Code']
    },
    selectedLanguage: {
        type: String,
        enum: ['java', 'python3', 'node'],
        required: [true, 'Must Specify the Language']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Must Specify the User']
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SavedCode', SavedCodeSchema);