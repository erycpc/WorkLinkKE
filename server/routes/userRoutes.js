const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

const User = require('../models/User');

// Get all users
router.get('/me', protect, async (req, res) => {
    res.json(req.user);
});

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;