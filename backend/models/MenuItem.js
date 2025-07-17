import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Menu item name is required'],
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  badgeLabel: {
    type: String,
    trim: true,
    default: function() {
      return this.category || ''; // fallback if badgeLabel not provided
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  }
}, { timestamps: true });

// Avoid recompiling model during hot reload
export default mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
