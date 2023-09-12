const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    repliesCount: Number,
    edited: Boolean,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: Date,
    updatedAt: Date,
});

module.exports = mongoose.model('Tweet', tweetSchema);
