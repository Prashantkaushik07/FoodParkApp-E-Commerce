// routes/sliderRoutes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Slider from '../models/sliderModel.js';
import { getSlider, createSlider, updateSlider } from '../controllers/sliderController.js';

const router = express.Router();

// Ensure uploads/sliders exists
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'sliders');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer storage config — files go to uploads/sliders
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `slider-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// GET /api/slider
router.get('/', getSlider);

// POST /api/slider — create new slider
router.post(
  '/',
  upload.single('img'),
  async (req, res) => {
    try {
      const { text, subtitle, description, discount } = req.body;
      if (!text || !discount || !req.file) {
        return res.status(400).json({ message: 'Text, discount and image are required.' });
      }
      // Store the relative path in DB
      const img = path.join('uploads', 'sliders', req.file.filename);
      const newSlider = await createSlider({ text, subtitle, description, discount, img });
      res.status(201).json({ slider: newSlider });
    } catch (err) {
      console.error('Error creating slider:', err);
      res.status(500).json({ message: 'Error creating slider' });
    }
  }
);

// PUT /api/slider/:id — update existing slider
router.put(
  '/:id',
  upload.single('img'),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { text, subtitle, description, discount } = req.body;
      const updates = {};
      if (text)     updates.text     = text;
      if (discount) updates.discount = discount;
      if (subtitle)    updates.subtitle    = subtitle;
      if (description) updates.description = description;
      if (req.file) {
        updates.img = path.join('uploads', 'sliders', req.file.filename);
      }

      const updated = await updateSlider({ id, updates });
      if (!updated) {
        return res.status(404).json({ message: 'Slider not found' });
      }
      res.json({ slider: updated });
    } catch (err) {
      console.error('Error updating slider:', err);
      res.status(500).json({ message: 'Error updating slider' });
    }
  }
);

// DELETE /api/slider/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Slider.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.json({ message: 'Deleted', id });
  } catch (err) {
    console.error('Error deleting slider:', err);
    res.status(500).json({ message: 'Error deleting slider' });
  }
});

export default router;
