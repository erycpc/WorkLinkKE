const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware')

const Job = require('../models/Job')

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  public
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('clientId', 'name email phone location')
    res.json(jobs)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
});

router.post('/', protect, async (req, res) => {
    const { title, description, profession, experienceLevel, skillsRequired, location, budgetType, budget, deadline, status } = req.body;
    try {
        const newJob = new Job({
            title,
            description,
            profession,
            experienceLevel,
            skillsRequired,
            location,
            budgetType,
            budget,
            deadline,
            status,
            clientId: req.user._id // Assuming the user is authenticated and their ID is available in req.user
        });

        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (err) {
        res.status(400).json({ message: 'Error creating job' });
    }
});

// @desc    Get a job by ID
// @route   GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('clientId', 'name email phone location')
    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }
    res.json(job)
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
});

router.put('/:id', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if the authenticated user is the owner of the job
        if (job.clientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this job' });
        }

        // Update job fields
        Object.assign(job, req.body);
        const updatedJob = await job.save();
        res.json(updatedJob);
    } catch (err) {
        res.status(400).json({ message: 'Error updating job' });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Check if the authenticated user is the owner of the job
        if (job.clientId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this job' });
        }

        await Job.findByIdAndDelete(req.params.id)
        res.json({ message: 'Job removed' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;