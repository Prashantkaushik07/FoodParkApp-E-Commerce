// backend/routes/testimonials.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Testimonial from '../models/Testimonial.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(process.cwd(),'uploads','testimonials');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    cb(null, `testi-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// — PUBLIC: list all —
router.get('/', async (req, res, next) => {
  try {
    const all = await Testimonial.find().sort('order');
    res.json(all);
  } catch (e) { next(e) }
});

// — ADMIN: create —
router.post(
  '/', upload.single('avatar'),
  /* authenticateAdmin, */
  async (req, res, next) => {
    try {
      const { name, location, quote, rating, order } = req.body;
      const avatarUrl = `/uploads/testimonials/${req.file.filename}`;
      const newOne = await Testimonial.create({ name, location, quote, rating:Number(rating), order:Number(order), avatarUrl });
      res.status(201).json(newOne);
    } catch (e) { next(e) }
  }
);

// — ADMIN: update —
router.put(
  '/:id', upload.single('avatar'),
  /* authenticateAdmin, */
  async (req, res, next) => {
    try {
      const u = {
        name: req.body.name,
        location: req.body.location,
        quote: req.body.quote,
        rating: Number(req.body.rating),
        order: Number(req.body.order),
      };
      if (req.file) {
        u.avatarUrl = `/uploads/testimonials/${req.file.filename}`;
      }
      const updated = await Testimonial.findByIdAndUpdate(req.params.id, u, { new: true });
      res.json(updated);
    } catch (e) { next(e) }
  }
);

// — ADMIN: delete —
router.delete('/:id', /* authenticateAdmin, */ async (req, res, next) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (e) { next(e) }
});

export default router;
