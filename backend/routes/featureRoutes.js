// routes/featureRoutes.js
import express from 'express';
import Feature from '../models/featureModel.js';

const router = express.Router();

// GET all feature configs
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json({ features });
  } catch (err) {
    console.error('GET /api/features error:', err);
    res.status(500).json({ message: 'Error fetching features', error: err.message });
  }
});

// POST /api/features/ — create or upsert the singleton config
router.post('/', async (req, res) => {
  try {
    const data = req.body;
    // Upsert: update existing or create new
    const feature = await Feature.findOneAndUpdate(
      {},          // filter—empty selects the singleton
      data,        // the new data
      {
        new: true,        // return the updated doc
        upsert: true,     // create if not exists
        runValidators: true
      }
    );

    res.status(200).json({ feature });
  } catch (err) {
    console.error('POST /api/features error:', err);
    res.status(500).json({ message: 'Error creating or updating feature config', error: err.message });
  }
});

// PUT /api/features/:id — update specific config
router.put('/:id', async (req, res) => {
  try {
    const updated = await Feature.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Feature config not found' });
    res.json({ feature: updated });
  } catch (err) {
    console.error('PUT /api/features/:id error:', err);
    res.status(500).json({ message: 'Error updating feature config', error: err.message });
  }
});

// DELETE /api/features/:id — remove config
router.delete('/:id', async (req, res) => {
  try {
    await Feature.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /api/features/:id error:', err);
    res.status(500).json({ message: 'Error deleting feature config', error: err.message });
  }
});

export default router;
