import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,     // every offer needs an image URL
  },
  discount: {
    type: String,
    default: ''         // now optional
  },
  title: {
    type: String,
    default: ''         // now optional
  },
  desc: {
    type: String,
    default: ''         // now optional
  }
}, { _id: false });

const actionSchema = new mongoose.Schema({
  icon: {
    type: String,
    default: ''         // will be filled from existing DB
  },
  url: {
    type: String,
    default: ''         // admin panel only updates URL
  }
}, { _id: false });

const dailyOfferSchema = new mongoose.Schema({
  small: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  subTitle: {
    type: String,
    required: true
  },
  offers: {
    type: [offerSchema],
    default: []
  },
  actions: {
    type: [actionSchema],
    default: []
  }
});

// singleton model
export default mongoose.models.DailyOffer ||
       mongoose.model('DailyOffer', dailyOfferSchema);
