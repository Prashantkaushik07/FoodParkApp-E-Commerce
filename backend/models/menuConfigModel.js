import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  label:    String,
  to:       String,  // e.g. "/about"
  dropdown: [      // optional sub-menu
    { label: String, to: String }
  ]
});

const cartItemSchema = new mongoose.Schema({
  img:    String,
  title:  String,
  size:   String,
  extras: [String],
  price:  String,
  oldPrice: String
});

const reservationSchema = new mongoose.Schema({
  text: String,
  modalOptions: { backdrop: String, keyboard: Boolean }
});

const menuConfigSchema = new mongoose.Schema({
  brand: { src: String, alt: String },
  items: [itemSchema],
  searchEnabled: Boolean,
  cartIconCount: Number,
  cartItems: [cartItemSchema],
  reservation: reservationSchema
}, { timestamps: true });

export default mongoose.models.MenuConfig 
  || mongoose.model('MenuConfig', menuConfigSchema);
