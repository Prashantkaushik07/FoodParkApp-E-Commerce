// models/TeamSection.js
import mongoose from 'mongoose';

const teamSectionSchema = new mongoose.Schema({
  preTitle:    { type: String, default: 'Our Team' },
  title:       { type: String, default: 'Meet Our Expert Chefs' },
  description: { type: String, default: 'Our dedicated chefs bringing delicious flavors to your table.' },
}, { timestamps: true });

// We only ever keep one TeamSection document
export default mongoose.models.TeamSection
  || mongoose.model('TeamSection', teamSectionSchema);
