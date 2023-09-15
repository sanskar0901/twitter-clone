const express = require('express');
const router = express.Router();
const TweetController = require('./TweetController');
const authMiddleware = require('../middleware/auth');
const fileUpload = require('express-fileupload');
router.use(fileUpload());

// Define routes for tweet operations
router.post('/create', authMiddleware, TweetController.createTweet);
router.put('/edit/:tweetId', authMiddleware, TweetController.editTweet);
router.delete('/delete/:tweetId', authMiddleware, TweetController.deleteTweet);
router.get('/user/:userId', TweetController.getUserTweets);
router.get('/timeline', authMiddleware, TweetController.getTimeline);
router.get('/all', TweetController.getAllTweet)

module.exports = router;
