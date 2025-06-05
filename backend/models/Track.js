const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: String,
  duration: { type: Number, required: true }, // in seconds
  genre: String,
  audioUrl: { type: String, required: true },
  imageUrl: String,
  externalId: String, // ID from Jamendo API
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', trackSchema);