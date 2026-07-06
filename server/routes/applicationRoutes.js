const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')
const Application = require('../models/Application');

// Get worker's own applications
router.get('/', protect, async (req, res) => {
    try {
        const applications = await Application.find({ workerId: req.user._id })
            .populate('jobId', 'title location budget deadline')
            .populate('workerId', 'name email phone rating');   
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get all applications for a specific job
router.get('/job/:jobId', protect, async (req, res) => {
    try {
        const applications = await Application.find({ jobId: req.params.jobId })
            .populate('workerId', 'name email phone rating profession');
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get one application by id
router.get('/:id', protect, async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Apply for a job
router.post('/', protect, async (req, res) => {
    const { jobId, message, proposedRate } = req.body;
    try {
        // Check if already applied
        const existingApplication = await Application.findOne({ 
            jobId, 
            workerId: req.user._id 
        });
        if (existingApplication) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        const newApplication = new Application({
            jobId,
            workerId: req.user._id,
            message,
            status: 'pending_review',
            proposedRate
        });

        const savedApplication = await newApplication.save();
        res.status(201).json(savedApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error creating application' });
    }
});

// Accept or reject application
router.put('/:id', protect, async (req, res) => {
    const { status } = req.body;
    try {
        const application = await Application.findById(req.params.id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        application.status = status;
        const updatedApplication = await application.save();
        res.json(updatedApplication);
    } catch (error) {
        res.status(400).json({ message: 'Error updating application' });
    }
});

module.exports = router;