import express from 'express';
import { auth } from '../middleware/auth.js';
import Deck from '../models/Deck.js';
import Flashcard from '../models/Flashcard.js';

const router = express.Router();

// GET /api/decks - list decks (mine + default)
router.get('/', auth, async (req, res) => {
  try {
    const { mine } = req.query; // ?mine=true chỉ lấy của user
    let query = {};
    if (mine === 'true') {
      query.ownerId = req.user._id;
    } else {
      // Lấy deck người dùng + default
      query = {
        $or: [
          { ownerId: req.user._id },
          { isDefault: true },
        ],
      };
    }
    const decks = await Deck.find(query).select('-cardIds');
    res.json(decks);
  } catch (error) {
    console.error('List deck error:', error);
    res.status(500).json({ message: 'Failed to fetch decks.' });
  }
});

// GET deck detail with cards
router.get('/:id', auth, async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id)
      .populate('cardIds');
    if (!deck) return res.status(404).json({ message: 'Deck not found' });
    // Kiểm tra quyền
    if (!deck.isDefault && !deck.ownerId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(deck);
  } catch (error) {
    console.error('Get deck error:', error);
    res.status(500).json({ message: 'Failed to fetch deck.' });
  }
});

// POST /api/decks - create deck
router.post('/', auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const deck = await Deck.create({
      title,
      description,
      ownerId: req.user._id,
      cardIds: [],
    });
    res.status(201).json(deck);
  } catch (error) {
    console.error('Create deck error:', error);
    res.status(500).json({ message: 'Failed to create deck.' });
  }
});

// POST /api/decks/:id/merge - merge other decks into new deck
router.post('/:id/merge', auth, async (req, res) => {
  try {
    const { deckIds, newTitle } = req.body; // deckIds array to merge with current deck id param? Actually create new deck merging deckIds[]
    if (!Array.isArray(deckIds) || deckIds.length === 0) {
      return res.status(400).json({ message: 'deckIds required' });
    }
    // collect card ids
    const decks = await Deck.find({ _id: { $in: deckIds } });
    const cardSet = new Set();
    decks.forEach(d => d.cardIds.forEach(c => cardSet.add(String(c))));

    const newDeck = await Deck.create({
      title: newTitle || 'Merged Deck',
      ownerId: req.user._id,
      cardIds: Array.from(cardSet),
    });
    res.status(201).json(newDeck);
  } catch (error) {
    console.error('Merge deck error:', error);
    res.status(500).json({ message: 'Failed to merge decks.' });
  }
});

// POST /api/decks/:id/flashcards - add flashcard(s) to deck
router.post('/:id/flashcards', auth, async (req, res) => {
  try {
    const { cardId, front, back } = req.body; // either provide cardId or front/back to create new
    const deck = await Deck.findById(req.params.id);
    if (!deck) return res.status(404).json({ message: 'Deck not found' });
    if (!deck.ownerId.equals(req.user._id)) return res.status(403).json({ message: 'Forbidden' });

    let flashcardId = cardId;
    if (!flashcardId) {
      // Create new card
      if (!front || !back) {
        return res.status(400).json({ message: 'front/back required to create new card' });
      }
      const card = await Flashcard.create({
        front,
        back,
        ownerId: req.user._id,
      });
      flashcardId = card._id;
    }

    if (!deck.cardIds.includes(flashcardId)) {
      deck.cardIds.push(flashcardId);
      await deck.save();
    }
    res.json(deck);
  } catch (error) {
    console.error('Add flashcard to deck error:', error);
    res.status(500).json({ message: 'Failed to add flashcard.' });
  }
});

export default router; 