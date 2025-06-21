import express from 'express';
import { auth } from '../middleware/auth.js';
import { generateGrammarExplanation } from '../services/aiService.js';

const router = express.Router();

// POST /api/ai/explain-grammar
// Generates a detailed explanation for a grammar point.
// Protected route, user must be logged in.
router.post('/explain-grammar', auth, async (req, res) => {
  const { grammarPoint, currentExplanation } = req.body;

  if (!grammarPoint || !currentExplanation) {
    return res.status(400).json({ message: 'Grammar point and current explanation are required.' });
  }

  try {
    const aiExplanation = await generateGrammarExplanation(grammarPoint, currentExplanation);
    res.json({ explanation: aiExplanation });
  } catch (error) {
    console.error('AI explanation error:', error);
    res.status(500).json({ message: 'Failed to generate AI explanation.' });
  }
});

export default router; 