const Tweet = require('../../models/tweets.model');
const User = require('../../models/user.model');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
cloudinary.config({
    cloud_name: 'dfpztfd9z',
    api_key: '759898287683162',
    api_secret: process.env.CLOUDENARY
});

module.exports = {


    // Create a new tweet
    createTweet: async (req, res) => {
        try {
            const { text, imgurl } = req.body;
            const userId = req.user;
            // Check if a file was uploaded

            // If no image was uploaded, create the tweet without an image
            const newTweet = new Tweet({
                author: userId,
                text,
                imgurl,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            const currentUser = await User.findById(userId);
            currentUser.profile.tweets.push(newTweet._id);
            await currentUser.save();

            const savedTweet = await newTweet.save();
            res.status(201).json(savedTweet);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while creating the tweet.' });
        }
    },




    // Edit an existing tweet
    editTweet: async (req, res) => {
        try {
            const { tweetId } = req.params;

            const tweet = await Tweet.findById(tweetId);

            if (!tweet) {
                return res.status(404).json({ error: 'Tweet not found' });
            }

            if (tweet.author.toString() !== req.user) {
                return res.status(403).json({ error: 'Unauthorized: You do not have permission to edit this tweet' });
            }
            tweet.text = req.body.text;
            tweet.updatedAt = new Date();

            const updatedTweet = await tweet.save();

            res.json(updatedTweet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while editing the tweet' });
        }
    },




    // Delete a tweet
    deleteTweet: async (req, res) => {
        try {
            const tweetId = req.params.tweetId;

            const tweet = await Tweet.findById(tweetId);

            if (!tweet) {
                return res.status(404).json({ message: 'Tweet not found' });
            }

            if (tweet.author.toString() !== req.user) {
                return res.status(403).json({ message: 'You do not have permission to delete this tweet' });
            }

            await tweet.deleteOne({ _id: tweetId });


            const user = await User.findOne({ _id: req.user });
            user.profile.tweets.pull(tweetId);
            await user.save();

            return res.status(200).json({ message: 'Tweet deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },




    // Get tweets by a specific user
    getUserTweets: async (req, res) => {
        try {
            const { userId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }


            if (!user.profile || !user.profile.tweets || user.profile.tweets.length === 0) {
                return res.status(200).json({ message: 'User has no tweets' });
            }

            const tweets = await Tweet.find({ _id: { $in: user.profile.tweets } });

            res.status(200).json({ tweets });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },




    // Get the user's timeline (tweets from followed users)
    getTimeline: async (req, res) => {
        try {
            // Get the current user's ID from the authenticated request (provided by your auth middleware)
            const userId = req.user;

            // Find the user document in the database using the user ID

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const followingIds = user.profile.following;

            const timelineTweets = await Tweet.find({ author: { $in: followingIds } })
                .sort({ updatedAt: -1 })
                .populate('author', ['username', 'name', 'avatar']);

            res.json(timelineTweets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    // Get all tweets
    getAllTweet: async (req, res) => {
        try {
            const tweets = await Tweet.find().sort({ updatedAt: -1 }).populate('author', ['username', 'name', 'avatar']);
            res.json(tweets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};
