import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  discount: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
});

const actionSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  url:  { type: String, required: true }
});

const dailyOfferSchema = new mongoose.Schema({
  small:    { type: String, required: true },
  title:    { type: String, required: true },
  subTitle: { type: String, required: true },
  offers:   { type: [offerSchema], default: [] },
  actions:  { type: [actionSchema], default: [] }
});

// only one document in the collection
export default mongoose.models.DailyOffer ||
       mongoose.model('DailyOffer', dailyOfferSchema);
