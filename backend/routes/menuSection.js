import express from 'express';
import MenuSection from '../models/MenuSection.js';
const router = express.Router();

// GET singleton
router.get('/', async (req, res, next) => {
  try {
    const section = await MenuSection.findOne() || {};
    res.json({ section });
  } catch (e) { next(e) }
});

// POST upsert
router.post('/', async (req, res, next) => {
  try {
    const payload = {
      subtitle:    req.body.subtitle,
      title:       req.body.title,
      description: req.body.description,
    };
    const section = await MenuSection.findOneAndUpdate(
      {}, payload, { upsert: true, new: true }
    );
    res.json({ section });
  } catch (e) { next(e) }
});

export default router;
