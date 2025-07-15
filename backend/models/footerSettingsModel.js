import mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
  label: String,
  url: String,
});

const SocialSchema = new mongoose.Schema({
  iconClass: String,
  url:       String,
});

const FooterSettingsSchema = new mongoose.Schema({
  description: { type: String, default: 'There are many variations of Lorem Ipsum...' },
  contact: {
    address: String,
    phone:   String,
    email:   String,
  },
  shortLinks: [LinkSchema],
  helpLinks:  [LinkSchema],
  followLinks:[SocialSchema],
  bottomLinks:[LinkSchema],
}, { timestamps: true });

export default mongoose.models.FooterSettings 
  || mongoose.model('FooterSettings', FooterSettingsSchema);