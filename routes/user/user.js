const express = require('express');
const router = express.Router();
const UserController = require('./UserController');
const authMiddleware = require('../middleware/auth');

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/profile/:username', UserController.getUserProfile);
router.put('/profile/:username', authMiddleware, UserController.updateUserProfile);
router.get('/users', UserController.getAllUsers);
router.get('/getuser', authMiddleware, UserController.getUser);
router.post('/follow/:userId', authMiddleware, UserController.followUser);
router.post('/unfollow/:userId', authMiddleware, UserController.unfollowUser);

module.exports = router;
