import express from 'express';
import MenuConfig from '../models/menuConfigModel.js';

const router = express.Router();

// GET the singleton
router.get('/', async (req, res) => {
  let cfg = await MenuConfig.findOne();
  if (!cfg) {
    // seed with defaults
    cfg = await MenuConfig.create({
      brand: { src: 'images/logo.png', alt: 'FoodPark' },
      items: [ 
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Pages', to: '#', dropdown: [
          { label: 'Menu Details', to: '/menu-details' },
          /* … */
        ] },
        /* … */
      ],
      searchEnabled: true,
      cartIconCount: 5,
      cartItems: [],
      reservation: { text: 'Reservation', modalOptions: { backdrop: 'static', keyboard: false } }
    });
  }
  res.json({ menuConfig: cfg });
});

// POST / create or replace
router.post('/', async (req, res) => {
  // upsert: overwrite entire config with req.body
  const cfg = await MenuConfig.findOneAndUpdate({}, req.body, {
    upsert: true, new: true, runValidators: true
  });
  res.json({ menuConfig: cfg });
});

export default router;
