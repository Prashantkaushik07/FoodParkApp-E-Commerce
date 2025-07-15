import express  from 'express';
import multer   from 'multer';
import path     from 'path';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// ─── image upload setup ─────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/menu'),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});
const upload = multer({ storage });

// ─── GET all items ───────────────────────────────────────────────
router.get('/', async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json({ items });
  } catch (e) { next(e) }
});

// ─── CREATE ──────────────────────────────────────────────────────
router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    const { name, category, price } = req.body;
    const imagePath = `/uploads/menu/${req.file.filename}`;
    const item = await MenuItem.create({ name, category, price, image: imagePath });
    res.status(201).json(item);
  } catch (e) { next(e) }
});

// ─── UPDATE ──────────────────────────────────────────────────────
router.put('/:id', upload.single('image'), async (req, res, next) => {
  try {
    const updates = { name: req.body.name, category: req.body.category, price: req.body.price };
    if (req.file) updates.image = `/uploads/menu/${req.file.filename}`;
    const item = await MenuItem.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(item);
  } catch (e) { next(e) }
});

// ─── DELETE ──────────────────────────────────────────────────────
router.delete('/:id', async (req, res, next) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (e) { next(e) }
});

export default router;
