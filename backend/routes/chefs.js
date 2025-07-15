// backend/routes/chefs.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Chef from '../models/Chef.js';

const router = express.Router();

// — multer config: put files in uploads/chefs, keep original extension —
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(process.cwd(), 'uploads/chefs');
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    // e.g. "chef-1623435234-1234.jpg"
    const ext = path.extname(file.originalname);
    cb(null, `chef-${Date.now()}${Math.floor(Math.random()*1e4)}${ext}`);
  }
});
const upload = multer({ storage });

// — PUBLIC READ —  
router.get('/', async (req, res) => {
  const chefs = await Chef.find().sort('order');
  res.json(chefs);
});

// — ADMIN: CREATE —  
router.post(
  '/', 
  upload.single('image'),
  /* optional: authenticateAdmin, */
  async (req, res, next) => {
    try {
      const { name, position, order, socials } = req.body;
      // Build a URL relative to your static mount:
      const imageUrl = `/uploads/chefs/${req.file.filename}`;
      const chef = await Chef.create({
        name,
        position,
        order: Number(order),
        socials: socials ? JSON.parse(socials) : [],
        imageUrl
      });
      res.status(201).json(chef);
    } catch (err) {
      next(err);
    }
  }
);

// — ADMIN: UPDATE —  
router.put(
  '/:id', 
  upload.single('image'),
  /* authenticateAdmin, */
  async (req, res, next) => {
    try {
      const update = {
        name: req.body.name,
        position: req.body.position,
        order: Number(req.body.order),
        socials: req.body.socials ? JSON.parse(req.body.socials) : []
      };
      if (req.file) {
        update.imageUrl = `/uploads/chefs/${req.file.filename}`;
      }
      const chef = await Chef.findByIdAndUpdate(req.params.id, update, { new: true });
      res.json(chef);
    } catch (err) {
      next(err);
    }
  }
);

// — ADMIN: DELETE —  
router.delete(
  '/:id',
  /* authenticateAdmin, */
  async (req, res, next) => {
    try {
      // Optionally: delete the image file from disk too
      const chef = await Chef.findById(req.params.id);
      if (chef?.imageUrl) {
        const filePath = path.join(process.cwd(), chef.imageUrl);
        fs.unlink(filePath, () => {/*ignore errors*/});
      }
      await Chef.findByIdAndDelete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
