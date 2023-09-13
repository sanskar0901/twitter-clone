const User = require('../../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports = {

    // register user
    registerUser: async (req, res) => {
        try {
            const { name, email, username, password, cpass } = req.body;

            if (password != cpass) {
                return res.status(400).json({ message: "password and conform password not match" })
            }
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ message: 'Username or email is already in use' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const newUser = new User({
                name,
                email,
                username,
                password: hashedPassword,
                role: 'user',
                createdAt: new Date(),
                updatedAt: new Date(),
                profile: {
                    bio: "",
                    location: "",
                    website: "",
                    birthday: "",
                    backgroundImage: "",
                    following: [],
                    followers: [],
                    likes: [],
                    retweets: [],
                    tweets: [],
                }
            });
            await newUser.save();

            const token = jwt.sign({ user: newUser._id }, JWT_SECRET_KEY, {
                expiresIn: "30d",
            });
            return res.status(201).json({ message: 'User registered successfully', user: newUser, token });
        } catch (error) {
            console.error('Error during user registration:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },




    // login user
    loginUser: async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            const token = jwt.sign({ user: user._id }, JWT_SECRET_KEY, {
                expiresIn: "30d",
            });

            res.status(200).json({ token, user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    //Get user
    getUser: async (req, res) => {
        try {
            const user = req.user;
            const userdata = await User.findById(user);
            res.status(200).json({ username: userdata.username, name: userdata.name, avatar: userdata.avatar });

        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get user profile
    getUserProfile: async (req, res) => {
        try {
            const { username } = req.params;

            const user = await User.findOne({ username })
                .populate('profile.following', 'username')
                .populate('profile.followers', 'username');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user.profile);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    // Update user profile
    updateUserProfile: async (req, res) => {
        try {
            const { username } = req.params;
            const {
                bio,
                location,
                website,
                birthday,
                backgroundImage,
            } = req.body;

            const user = await User.findOne({ username });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (bio) user.profile.bio = bio;
            if (location) user.profile.location = location;
            if (website) user.profile.website = website;
            if (birthday) user.profile.birthday = birthday;
            if (backgroundImage) user.profile.backgroundImage = backgroundImage;


            await user.save();

            res.status(200).json({ message: 'Profile updated successfully', user });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },




    // Get a list of all users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find({}, '_id name username avatar');

            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },




    // Follow a user
    followUser: async (req, res) => {
        try {
            const { userId } = req.params;

            const userToFollow = await User.findById(userId);
            if (!userToFollow) {
                return res.status(404).json({ error: 'User not found' });
            }

            const currentUserId = req.user;
            console.log(currentUserId);

            if (currentUserId === userId) {
                return res.status(400).json({ error: 'Cannot follow yourself' });
            }

            const currentUser = await User.findById(currentUserId).populate('profile');
            if (currentUser.profile.following.includes(userId)) {
                return res.status(400).json({ error: 'Already following this user' });
            }

            currentUser.profile.following.push(userId);
            await currentUser.save();

            userToFollow.profile.followers.push(currentUserId);
            await userToFollow.save();

            return res.status(200).json({ message: 'User followed successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },




    // Unfollow a user
    unfollowUser: async (req, res) => {
        try {
            const currentUserID = req.user;

            const unfollowUserID = req.params.userId;

            const currentUser = await User.findById(currentUserID);
            const userToUnfollow = await User.findById(unfollowUserID);

            if (!currentUser || !userToUnfollow) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (!currentUser.profile.following.includes(unfollowUserID)) {
                return res.status(400).json({ message: 'You are not following this user' });
            }

            currentUser.profile.following = currentUser.profile.following.filter(
                (userId) => userId.toString() !== unfollowUserID
            );
            userToUnfollow.profile.followers = userToUnfollow.profile.followers.filter(
                (userId) => userId.toString() !== currentUserID
            );

            await currentUser.save();
            await userToUnfollow.save();

            return res.status(200).json({ message: 'You have unfollowed the user' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};
