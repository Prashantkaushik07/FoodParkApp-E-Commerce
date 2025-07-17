import express from 'express';
import MenuSection from '../models/MenuSection.js';

const router = express.Router();

// ─── GET singleton ──────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const section = await MenuSection.findOne() || {};
    res.json({ section });
  } catch (e) {
    console.error('GET /menu-section error:', e);
    next(e);
  }
});

// ─── POST upsert ────────────────────────────────
router.post('/', async (req, res, next) => {
  try {
    const { subtitle, title, description } = req.body;

    if (!subtitle || !title || !description) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const section = await MenuSection.findOneAndUpdate(
      {},
      { subtitle, title, description },
      { upsert: true, new: true }
    );

    res.json({ section });
  } catch (e) {
    console.error('POST /menu-section error:', e);
    next(e);
  }
});

export default router;
