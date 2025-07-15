import mongoose from 'mongoose';

const sliderSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: ''    // new field
  },
  description: {
    type: String,
    default: ''    // new field
  },
  img: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Slider || mongoose.model('Slider', sliderSchema);
