// backend/models/Testimonial.js
import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  location:    { type: String, default: '' },
  avatarUrl:   { type: String, required: true },   // e.g. "/uploads/testimonials/abc.jpg"
  quote:       { type: String, required: true },
  rating:      { type: Number, min: 0, max: 5, default: 5 },
  order:       { type: Number, default: 0 },       // for sorting
}, { timestamps: true });

export default mongoose.models.Testimonial
  || mongoose.model('Testimonial', testimonialSchema);
