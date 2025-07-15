// models/featureModel.js
import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  icon:    { type: String, default: '' },
  title:   { type: String, default: '' },
  desc:    { type: String, default: '' },
});

const featureSchema = new mongoose.Schema({
  small:    { type: String, required: true },
  title:    { type: String, required: true },
  subTitle: { type: String, required: true },
  cards:    { type: [cardSchema], default: [] },
}, { timestamps: true });

export default mongoose.models.Feature || mongoose.model('Feature', featureSchema);
