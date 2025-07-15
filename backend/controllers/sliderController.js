// controllers/sliderController.js
import Slider from '../models/sliderModel.js';

// GET /api/slider/
// — fetch all sliders, return { sliders: [...] }
export const getSlider = async (req, res) => {
  try {
    const sliders = await Slider.find();
    if (!sliders || sliders.length === 0) {
      return res.status(404).json({ message: "No sliders found" });
    }
    res.status(200).json({ sliders });
  } catch (error) {
    console.error("Error fetching sliders:", error);
    res.status(500).json({ message: "Error fetching slider data" });
  }
};

// — service: create a new slider —
// accepts an object { text, discount, img }
// returns the newly created Slider document
export const createSlider = async ({ text, subtitle, description, discount, img }) => {
  return Slider.create({ text, subtitle, description, discount, img });
};

// — service: update an existing slider —
// accepts an object { id, updates }
// returns the updated Slider document
export const updateSlider = async ({ id, updates }) => {
  return Slider.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
};
