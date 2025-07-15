import mongoose from 'mongoose';

const menuSectionSchema = new mongoose.Schema({
  subtitle:    { type: String, default: 'Food Menu' },
  title:       { type: String, default: 'Our Popular Delicious Foods' },
  description: { type: String, default: 'Freshly prepared meals for every occasion.' },
}, { timestamps: true });

export default mongoose.models.MenuSection
  || mongoose.model('MenuSection', menuSectionSchema);
