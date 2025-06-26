const express = require('express');
const router = express.Router();

const userController = require('../controllers/authControllers');
const jobController = require('../controllers/jobControllers');
const applicationController = require('../controllers/applicationController');
const statsController = require('../controllers/statsController');
const profileController = require('../controllers/profileController');

const authMiddleware = require('../Middleware1/jwtMiddleware');

// User Routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/users', authMiddleware, userController.getUsersByRole);

// Job Routes
router.post('/jobs', authMiddleware, jobController.createJob);
router.get('/jobs', jobController.getJobs);
router.delete('/jobs/:id', authMiddleware, jobController.deleteJob);

// Application Routes
router.post('/jobs/:jobId/apply', authMiddleware, applicationController.applyToJob);
router.get('/jobs/:jobId/applications', authMiddleware, applicationController.getApplicationsForJob);
router.get('/applications', authMiddleware, applicationController.getApplicationsForCurrentUser);

// Stats
router.get('/dashboard/stats', authMiddleware, statsController.getDashboardStats);

// Profile
router.get('/profile', authMiddleware, profileController.getProfile);
router.post('/profile', authMiddleware, profileController.saveOrUpdateProfile);

// Feature Job
router.patch('/jobs/:id/feature', authMiddleware, jobController.markJobAsFeatured);

//Delete User (Admin only)
router.delete('/users/:id', authMiddleware, userController.deleteUser);

// Update application status (admin/employer only)
router.patch('/applications/:id/status', authMiddleware, applicationController.updateApplicationStatus);


module.exports = router;
