// routes/adminRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';  // For hashing passwords
import Admin from '../models/Admin.js';  // Admin model for MongoDB

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return success message
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
