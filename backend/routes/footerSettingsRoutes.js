// backend/routes/admin/footerSettingsRoutes.js
import express from 'express';
import FooterSettings from '../models/footerSettingsModel.js';

const router = express.Router();

// PUBLIC: fetch for front-end
router.get('/public', async (req, res) => {
  const settings = await FooterSettings.findOne();
  res.json({ settings });
});

// ADMIN: fetch current settings
// (no auth middleware applied here yet)
router.get('/', async (req, res) => {
  const settings = await FooterSettings.findOne();
  res.json({ settings });
});

// ADMIN: upsert all at once
router.post('/', async (req, res) => {
  const payload = req.body;
  const settings = await FooterSettings.findOneAndUpdate(
    {},
    payload,
    { upsert: true, new: true }
  );
  res.json({ settings });
});

export default router;
