import express from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import DailyOffer from '../models/dailyOfferModel.js';

const router = express.Router();

// ensure upload dir exists
const UPLOAD_DIR = path.join(process.cwd(), 'uploads', 'daily-offers');
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${file.fieldname.replace(/[\[\]]/g, '_')}${ext}`;
    cb(null, name);
  }
});
const upload = multer({ storage });

// PUBLIC GET (for front‑end display)
router.get('/', async (req, res) => {
  try {
    const doc = await DailyOffer.findOne();
    res.json({ daily: doc || null });
  } catch (e) {
    console.error('GET /daily-offer error:', e.message);
    res.status(500).json({ message: 'Error fetching daily offer' });
  }
});

// ADMIN POST (with up to 4 image uploads)
// ADMIN POST (accept JSON first, then images)
router.post('/', upload.array('images', 4), async (req, res) => {
  try {
    // Parse JSON payload from text field
    const payload = JSON.parse(req.body.data);
    const { small, title, subTitle, offers, actions } = payload;

    // Update image paths if new images uploaded
    req.files.forEach((file, i) => {
      offers[i].img = `/uploads/daily-offers/${file.filename}`;
    });

    // Merge with existing images if no new image uploaded
    const existing = await DailyOffer.findOne();
    offers.forEach((o, i) => {
      if (!o.img && existing?.offers?.[i]?.img) {
        o.img = existing.offers[i].img;
      }
    });

    // Save to DB
    const doc = await DailyOffer.findOneAndUpdate(
      {},
      { small, title, subTitle, offers, actions },
      { upsert: true, new: true, runValidators: true }
    );

    res.json({ daily: doc });
  } catch (e) {
    console.error('POST /daily-offer error:', e.message, e.stack);
    res.status(500).json({ message: 'Error saving daily offer', error: e.message });
  }
});

export default router;
