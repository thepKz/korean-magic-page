import express from 'express';
import Grammar from '../models/Grammar.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all grammar points
router.get('/', async (req, res) => {
  try {
    const { level, topikLevel, category, search, page = 1, limit = 50 } = req.query;
    
    let query = { isActive: true };
    
    if (level) query.level = level;
    if (topikLevel) query.topikLevel = parseInt(topikLevel);
    if (category) query.category = category;
    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const grammar = await Grammar.find(query)
      .populate('relatedGrammar', 'korean english level')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ level: 1, topikLevel: 1, korean: 1 });

    const total = await Grammar.countDocuments(query);

    res.json({
      grammar,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get grammar error:', error);
    res.status(500).json({ message: 'Error fetching grammar points' });
  }
});

// Get grammar by ID
router.get('/:id', async (req, res) => {
  try {
    const grammar = await Grammar.findById(req.params.id)
      .populate('relatedGrammar', 'korean english level');
    
    if (!grammar) {
      return res.status(404).json({ message: 'Grammar point not found' });
    }

    res.json(grammar);
  } catch (error) {
    console.error('Get grammar by ID error:', error);
    res.status(500).json({ message: 'Error fetching grammar point' });
  }
});

// Get grammar by level (for specific level pages)
router.get('/level/:level', async (req, res) => {
  try {
    const { level } = req.params;
    const grammar = await Grammar.find({ 
      level, 
      isActive: true 
    }).sort({ topikLevel: 1, korean: 1 });

    res.json(grammar);
  } catch (error) {
    console.error('Get grammar by level error:', error);
    res.status(500).json({ message: 'Error fetching grammar by level' });
  }
});

// Get random grammar for practice
router.get('/random/:count', async (req, res) => {
  try {
    const count = Math.min(parseInt(req.params.count) || 5, 20);
    const { level } = req.query;
    
    let matchStage = { isActive: true };
    if (level) matchStage.level = level;

    const grammar = await Grammar.aggregate([
      { $match: matchStage },
      { $sample: { size: count } }
    ]);

    res.json(grammar);
  } catch (error) {
    console.error('Get random grammar error:', error);
    res.status(500).json({ message: 'Error fetching random grammar' });
  }
});

export default router;