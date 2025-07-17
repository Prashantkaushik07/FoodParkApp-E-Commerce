import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// Ensure uploads/menu exists
const uploadDir = 'uploads/menu';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// ─── GET all items ─────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (e) {
    console.error('GET /menu-items error:', e);
    next(e);
  }
});

// ─── CREATE ────────────────────────────────────
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    let { name, category, price } = req.body;

    // If FormData, image is uploaded
    let image = req.body.image || '';
    if (req.file) {
      image = `/uploads/menu/${req.file.filename}`;
    }

    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category & price are required' });
    }

    const newItem = await MenuItem.create({ name, category, price, image });
    res.status(201).json(newItem);
  } catch (e) {
    console.error('POST /menu-items error:', e);
    next(e);
  }
});

// ─── UPDATE ────────────────────────────────────
router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    let updates = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
    };

    if (req.file) {
      updates.image = `/uploads/menu/${req.file.filename}`;
    } else if (req.body.image) {
      updates.image = req.body.image;
    }

    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updatedItem);
  } catch (e) {
    console.error('PUT /menu-items error:', e);
    next(e);
  }
});

// ─── DELETE ────────────────────────────────────
router.delete('/:id', async (req, res, next) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error('DELETE /menu-items error:', e);
    next(e);
  }
});

export default router;
