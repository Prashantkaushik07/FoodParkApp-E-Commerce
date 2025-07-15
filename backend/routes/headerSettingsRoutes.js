import express from 'express';
import HeaderSettings from '../models/headerSettingsModel.js';

const router = express.Router();

// GET current settings (singleton)
router.get('/', async (req, res) => {
  const settings = await HeaderSettings.findOne() || {};
  res.json({ settings });
});

// POST or PUT upsert
const upsertOpts = { upsert: true, new: true, runValidators: true };
const handleUpsert = async (req, res) => {
  try {
    const settings = await HeaderSettings.findOneAndUpdate({}, req.body, upsertOpts);
    res.json({ settings });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Validation error', errors: err.errors });
  }
};

router.post('/', handleUpsert);
router.put('/',  handleUpsert);

export default router;
