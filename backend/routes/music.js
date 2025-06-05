const express = require('express');
const router = express.Router();
const axios = require('axios');
const Track = require('../models/Track');
const auth = require('../middlewares/auth');

// Fetch tracks from Jamendo API
router.get('/tracks', async (req, res) => {
  try {
    const { query, genre, limit = 20 } = req.query;
    let url = `https://api.jamendo.com/v3.0/tracks/?client_id=${process.env.JAMENDO_CLIENT_ID}&format=json&limit=${limit}`;
    
    if (query) url += `&search=${encodeURIComponent(query)}`;
    if (genre) url += `&tags=${encodeURIComponent(genre)}`;
    
    const response = await axios.get(url);
    const tracks = response.data.results.map(track => ({
      title: track.name,
      artist: track.artist_name,
      duration: track.duration,
      audioUrl: track.audio,
      imageUrl: track.image,
      externalId: track.id
    }));

    // Save or update tracks in database
    await Promise.all(tracks.map(async trackData => {
      await Track.findOneAndUpdate(
        { externalId: trackData.externalId },
        trackData,
        { upsert: true, new: true }
      );
    }));

    res.json(tracks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching tracks' });
  }
});

// Get track by ID
router.get('/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;