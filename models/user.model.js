const mongoose = require('mongoose');
const profileSchema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
    retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
    bio: String,
    location: String,
    website: String,
    birthday: Date,
    backgroundImage: String,
    createdAt: Date,
    updatedAt: Date,
};
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, unique: true },
    avatar: String,
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' },
    createdAt: Date,
    updatedAt: Date,
    profile: profileSchema,
});

module.exports = mongoose.model('User', userSchema);