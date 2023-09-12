const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    repliesCount: { type: Number, default: 0 },
    edited: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Tweet', tweetSchema);
