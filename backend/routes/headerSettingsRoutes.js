import express from 'express';
import HeaderSettings from '../models/headerSettingsModel.js';

const router = express.Router();

// GET current settings (singleton)
router.get('/', async (req, res) => {
  let settings = await HeaderSettings.findOne() || {};

  // Merge pagesDropdown into "Pages" menu item if it exists
  if (settings.pagesDropdown && Array.isArray(settings.pagesDropdown)) {
    const pagesItem = settings.menuItems.find(m => m.label === 'Pages');
    if (pagesItem) {
      pagesItem.children = settings.pagesDropdown.map(d => ({
        label: d.label,
        to: d.url
      }));
    }
  }

  res.json({ settings });
});


// POST or PUT upsert
const upsertOpts = { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true };

const handleUpsert = async (req, res) => {
  try {
    // Merge only updated fields instead of overwriting the whole document
    const existing = await HeaderSettings.findOne() || {};
    const updatedData = {
      ...existing.toObject(),
      ...req.body
    };

    const settings = await HeaderSettings.findOneAndUpdate({}, updatedData, upsertOpts);
    res.json({ settings });
  } catch (err) {
    console.error('POST/PUT /header-settings error:', err);
    res.status(400).json({
      message: 'Validation error',
      errors: err.errors || err.message
    });
  }
};

router.post('/', handleUpsert);
router.put('/', handleUpsert);

export default router;
