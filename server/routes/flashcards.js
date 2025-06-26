import express from 'express';
import { auth } from '../middleware/auth.js';
import Flashcard from '../models/Flashcard.js';

const router = express.Router();

// Create a new flashcard (stand-alone)
router.post('/', auth, async (req, res) => {
  try {
    const { front, back, grammarRef, tags } = req.body;
    if (!front || !back) {
      return res.status(400).json({ message: 'Front and back are required.' });
    }
    const card = await Flashcard.create({
      front,
      back,
      grammarRef: grammarRef || null,
      ownerId: req.user._id,
      tags: tags || [],
    });
    res.status(201).json(card);
  } catch (error) {
    console.error('Create flashcard error:', error);
    res.status(500).json({ message: 'Failed to create flashcard.' });
  }
});

export default router; 