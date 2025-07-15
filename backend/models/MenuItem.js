import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  category:   { type: String, default: '' },
  price:      { type: Number, required: true },
  image:      { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.MenuItem
  || mongoose.model('MenuItem', menuItemSchema);
