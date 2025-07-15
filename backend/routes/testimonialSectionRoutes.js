import express from 'express';
import TestimonialSection from '../models/TestimonialSection.js';

const router = express.Router();

// Public read
router.get('/', async (req, res, next) => {
  try {
    let sec = await TestimonialSection.findOne();
    if (!sec) sec = await TestimonialSection.create({});
    res.json(sec);
  } catch (err) { next(err) }
});

// Admin upsert
router.put('/', /* authenticateAdmin, */ async (req, res, next) => {
  try {
    const { preTitle, title, description } = req.body;
    const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
    const sec = await TestimonialSection.findOneAndUpdate(
      {}, { preTitle, title, description }, opts
    );
    res.json(sec);
  } catch (err) { next(err) }
});

export default router;
