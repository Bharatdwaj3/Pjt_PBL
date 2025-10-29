// server/models/PG.js
const mongoose = require('mongoose');

const PGSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  location: { type: String },
  price: { type: Number, required: true },
  roomTypes: [{ type: String }], // e.g., ["Single","Double"]
  amenities: [{ type: String }], // e.g., ["Wifi","AC"]
  images: [{ type: String }], // store image URLs or paths (e.g., /uploads/filename.jpg)
  ownerContact: { type: String, required: true }, // Owner's contact number
  ownerName: { type: String, required: true }, // Owner's name
  coordinates: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PG', PGSchema);
