// models/counterSettingsModel.js
import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  icon:  { type: String, required: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
});

const CounterSettingsSchema = new mongoose.Schema({
  counters: {
    type: [CounterSchema],
    default: [
      { icon: 'fas fa-burger-soda', value: '85,000', label: 'Customer Served' },
      { icon: 'fal fa-hat-chef',     value: '120',     label: 'Experienced Chefs' },
      { icon: 'far fa-handshake',    value: '72,000',  label: 'Happy Customers' },
      { icon: 'far fa-trophy',       value: '30',      label: 'Winning Awards' },
    ],
  },
}, { timestamps: true });

export default mongoose.models.CounterSettings
  || mongoose.model('CounterSettings', CounterSettingsSchema);
