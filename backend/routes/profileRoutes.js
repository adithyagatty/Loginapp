// routes/profileRoutes.js
const express = require('express');
const { getProfile, updateProfile , deleteProfile } = require('../controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware'); // Protect the profile routes

const router = express.Router();

router.get('/getprofile', authMiddleware,getProfile); // Protected route
router.put('/updateprofile', authMiddleware, updateProfile); // Protected route
router.delete('/deleteprofile', authMiddleware, deleteProfile); 


module.exports = router;
