import mongoose from 'mongoose';

const testimonialSectionSchema = new mongoose.Schema({
  preTitle:    { type: String, default: 'Testimonial' },
  title:       { type: String, default: 'Our Customer Feedback' },
  description: { type: String, default: 'Hear from our happy customers!' },
}, { timestamps: true });

export default mongoose.models.TestimonialSection
  || mongoose.model('TestimonialSection', testimonialSectionSchema);
