// backend/routes/dailyOfferRoutes.js
import express from 'express'
import multer from 'multer'
import DailyOffer from '../models/dailyOfferModel.js'

const router = express.Router()
// multer with no disk storage: we just want to parse text fields
const upload = multer()

// GET stays the same…
router.get('/', async (req, res) => {
  const docs = await DailyOffer.find()
  res.json({ daily: docs[0] || null })
})

// POST: use upload.none() to parse text fields, leave images handling for later
router.post('/', upload.none(), async (req, res) => {
  try {
    // req.body now contains all your nested fields:
    // offers[0][discount], offers[0][title], …, actions[2][url], etc.

    const {
      small, title, subTitle,
      // NOTE: req.body.offers will be objects like { '0': { discount: '…', … }, '1': … }
      // depending on how your client serializes. You may need to re-format.
      offers: rawOffers,
      actions: rawActions
    } = req.body

    // Convert rawOffers keyed object → array of length 4
    const offers = [0,1,2,3].map(i => ({
      discount: rawOffers?.[i]?.discount   || '',
      title:    rawOffers?.[i]?.title      || '',
      desc:     rawOffers?.[i]?.desc       || '',
      img:      rawOffers?.[i]?.img        || '',
    }))

    // Convert rawActions keyed object → array of length 3
    const actions = [0,1,2].map(i => ({
      icon: rawActions?.[i]?.icon || '',
      url:  rawActions?.[i]?.url  || '',
    }))

    // Upsert into Mongo
    const doc = await DailyOffer.findOneAndUpdate({},
      { small, title, subTitle, offers, actions },
      { upsert: true, new: true, runValidators: true }
    )
    res.json({ daily: doc })
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Error saving daily offer', error: e.message })
  }
})

export default router
