import mongoose from 'mongoose';

const headerSettingsSchema = new mongoose.Schema({
  logo:            { type: String, default: '/images/logo.png' },
  topbar: {
    email: { type: String, default: 'you@example.com' },
    phone: { type: String, default: '+00000000' },
  },
  social: {
    type: [
      {
        name:      { type: String, default: '' },
        iconClass: { type: String, default: '' },
        url:       { type: String, default: '' },
      }
    ],
    default: []
  },
  menuItems: {
    type: [
      { label: { type: String, default: '' }, to: { type: String, default: '' } }
    ],
    default: []
  },
  pagesDropdown: {
    type: [
      { label: { type: String, default: '' }, url:   { type: String, default: '' } }
    ],
    default: []
  },
  searchPlaceholder: { type: String, default: 'Search…' },
  cartCount:         { type: Number, default: 0 },
  userLink:          { type: String, default: '/signin' },
  reservation: {
    buttonText:  { type: String, default: 'Reservation' },
    link:        { type: String, default: '#' },
    placeholders: {
      name:  { type: String, default: 'Name' },
      phone: { type: String, default: 'Phone' },
      date:  { type: String, default: 'Date' },
    },
    timeSlots:     { type: [String], default: [] },
    personOptions: { type: [String], default: [] },
  }
}, { timestamps: true });

export default mongoose.models.HeaderSettings
  || mongoose.model('HeaderSettings', headerSettingsSchema);
