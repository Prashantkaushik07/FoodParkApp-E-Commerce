// models/Chef.js
import mongoose from 'mongoose';

const chefSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  position:   { type: String, default: 'Senior Chef' },
  imageUrl:   { type: String, required: true },
  order:      { type: Number, default: 0 },      // for ordering in the UI
  socials: [{                                     // optional: social links
    platform: { type: String },
    url:      { type: String },
  }],
}, { timestamps: true });

export default mongoose.models.Chef || mongoose.model('Chef', chefSchema);
