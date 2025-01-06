// controllers/profileController.js
const User = require('../models/User');

// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password'); // Exclude password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Find the user by ID (from the decoded token)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      user.username = username; // Update username if it's available
    }

    // Check if the new email is already taken (except the current user's email)
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already taken' });
      }
      user.email = email; // Update email if it's available
    }
    if (password) {
      user.password = password;
    }

    // Save the updated user to the database
    await user.save();

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Get the user based on the decoded userId

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the user from the database
    await User.findByIdAndDelete(req.userId);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile, deleteProfile };
