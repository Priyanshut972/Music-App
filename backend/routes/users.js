const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');

// @route    GET api/users/me
// @desc     Get current user's profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('playlists', 'name description')
      .populate('favorites', 'title artist');
      
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/users/me
// @desc     Update user profile
// @access   Private
router.put('/me', [
  auth,
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email } = req.body;

  try {
    let user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'Email already in use' });
      }
    }

    user.username = username;
    user.email = email;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('playlists', 'name description isPublic')
      .populate('favorites', 'title artist imageUrl');
      
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/users/favorites/:trackId
// @desc     Add/remove track from favorites
// @access   Private
router.put('/favorites/:trackId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const trackId = req.params.trackId;
    const isFavorite = user.favorites.includes(trackId);
    
    if (isFavorite) {
      user.favorites = user.favorites.filter(fav => fav.toString() !== trackId);
    } else {
      user.favorites.push(trackId);
    }
    
    await user.save();
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/users/favorites
// @desc     Get user's favorite tracks
// @access   Private
router.get('/favorites/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites', 'title artist duration audioUrl imageUrl');
      
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json(user.favorites);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;