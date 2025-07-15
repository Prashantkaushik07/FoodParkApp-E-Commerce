// routes/teamSectionRoutes.js
import express from 'express';
import TeamSection from '../models/TeamSection.js';

const router = express.Router();

// Public: fetch current section text
router.get('/', async (req, res, next) => {
  try {
    let sec = await TeamSection.findOne();
    if (!sec) sec = await TeamSection.create({});
    res.json(sec);
  } catch (err) { next(err) }
});

// Admin: update (upsert)
router.put('/', /* authenticateAdmin, */ async (req, res, next) => {
  try {
    const { preTitle, title, description } = req.body;
    const opts = { upsert: true, new: true, setDefaultsOnInsert: true };
    const sec = await TeamSection.findOneAndUpdate(
      {}, { preTitle, title, description }, opts
    );
    res.json(sec);
  } catch (err) { next(err) }
});

export default router;
