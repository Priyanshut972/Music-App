const express = require('express');
const router = express.Router();
const Playlist = require('../models/Playlist');
const auth = require('../middlewares/auth');

// Create playlist
router.post('/', auth, async (req, res) => {
  try {
    const { name, description, isPublic } = req.body;
    const playlist = new Playlist({
      name,
      description,
      createdBy: req.user.id,
      isPublic
    });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's playlists
router.get('/user', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ createdBy: req.user.id })
      .populate('tracks')
      .populate('createdBy', 'username');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add track to playlist
router.put('/:id/add-track', auth, async (req, res) => {
  try {
    const { trackId } = req.body;
    const playlist = await Playlist.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      { $addToSet: { tracks: trackId } },
      { new: true }
    ).populate('tracks');
    
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;