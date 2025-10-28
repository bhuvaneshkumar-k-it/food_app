const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
  deliveryTime: { type: String, required: true },
  menuItems: [{
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, default: true }
  }]
}, { timestamps: true });

const Hotel = mongoose.model('Hotel', hotelSchema);

// Get all hotels
router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single hotel
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: 'Hotel not found' });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;