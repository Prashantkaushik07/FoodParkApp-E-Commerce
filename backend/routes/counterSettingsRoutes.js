// routes/admin/counterSettingsRoutes.js
import express from 'express';
import CounterSettings from '../models/counterSettingsModel.js';


const router = express.Router();

// PUBLIC: fetch for Front-End
router.get('/public', async (req, res) => {
  const settings = await CounterSettings.findOne();
  return res.json({ settings: settings?.counters || [] });
});

// ADMIN: get current settings
router.get('/', async (req, res) => {
  const settings = await CounterSettings.findOne();
  res.json({ counters: settings?.counters || [] });
});

// ADMIN: upsert all counters at once
router.post('/',  async (req, res) => {
  const { counters } = req.body;
  const settings = await CounterSettings.findOneAndUpdate(
    {},
    { counters },
    { upsert: true, new: true }
  );
  res.json({ counters: settings.counters });
});

export default router;
