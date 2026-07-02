const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const Review = require('../models/Review');

// Get all reviews for workers
router.get('/worker/:workerId', async (req, res) => {
    try {
        const reviews = await Review.find({ workerId: req.params.workerId });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// client can leave a review for a worker after the job is completed
router.post('/', protect, async (req, res) => {
    const { workerId, jobId, rating, comment } = req.body;
    try {
        // Check if the client has already left a review for this job
        const existingReview = await Review.findOne({ jobId, clientId: req.user._id });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already left a review for this job' });
        }

        const newReview = new Review({
            workerId,
            clientId: req.user._id,
            jobId,
            rating,
            comment
        });

        const savedReview = await newReview.save();
        res.status(201).json(savedReview);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;