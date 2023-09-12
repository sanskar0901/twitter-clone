const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
const authRoutes = require('./routes/auth');
const tweetRoutes = require('./routes/tweets');
const userRoutes = require('./routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/tweets', tweetRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
