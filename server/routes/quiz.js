import express from 'express';
import Grammar from '../models/Grammar.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Generate quiz questions
router.get('/generate', async (req, res) => {
  try {
    const { 
      level = 'intermediate', 
      count = 10, 
      type = 'mixed',
      grammarIds 
    } = req.query;

    let query = { isActive: true };
    
    if (grammarIds) {
      query._id = { $in: grammarIds.split(',') };
    } else {
      query.level = level;
    }

    const grammar = await Grammar.find(query);
    
    if (grammar.length === 0) {
      return res.status(404).json({ message: 'No grammar points found' });
    }

    // Shuffle and limit
    const shuffled = grammar.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(parseInt(count), grammar.length));

    const questions = selected.map(g => generateQuizQuestion(g, type));
    
    res.json({ questions });
  } catch (error) {
    console.error('Generate quiz error:', error);
    res.status(500).json({ message: 'Error generating quiz questions' });
  }
});

// Generate specific quiz type
router.get('/generate/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const { level = 'intermediate', count = 5 } = req.query;

    const grammar = await Grammar.find({ 
      level, 
      isActive: true 
    }).limit(parseInt(count) * 2); // Get more to have variety

    if (grammar.length === 0) {
      return res.status(404).json({ message: 'No grammar points found' });
    }

    const shuffled = grammar.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(parseInt(count), grammar.length));

    const questions = selected.map(g => generateQuizQuestion(g, type));
    
    res.json({ questions });
  } catch (error) {
    console.error('Generate specific quiz error:', error);
    res.status(500).json({ message: 'Error generating quiz questions' });
  }
});

// Helper function to generate quiz questions
function generateQuizQuestion(grammar, type) {
  const questionTypes = [
    'translation', 'fill-blank', 'multiple-choice', 
    'grammar-match', 'usage-context', 'sentence-order'
  ];

  const selectedType = type === 'mixed' 
    ? questionTypes[Math.floor(Math.random() * questionTypes.length)]
    : type;

  const baseQuestion = {
    id: `${grammar._id}_${selectedType}_${Date.now()}`,
    grammarId: grammar._id,
    type: selectedType,
    grammar: {
      korean: grammar.korean,
      english: grammar.english,
      structure: grammar.structure,
      level: grammar.level
    }
  };

  switch (selectedType) {
    case 'translation':
      return {
        ...baseQuestion,
        question: `Translate to Korean: "${grammar.examples[0]?.english || grammar.english}"`,
        correctAnswer: grammar.examples[0]?.korean || grammar.korean,
        explanation: `This uses the grammar pattern: ${grammar.structure}`
      };

    case 'fill-blank':
      const example = grammar.examples[0];
      if (example) {
        const grammarPart = grammar.korean.split('/')[0];
        const blankSentence = example.korean.replace(
          new RegExp(grammarPart, 'g'), 
          '____'
        );
        return {
          ...baseQuestion,
          question: `Fill in the blank: ${blankSentence}`,
          correctAnswer: grammarPart,
          explanation: `The correct answer is "${grammarPart}" which means "${grammar.english}"`
        };
      }
      break;

    case 'multiple-choice':
      const wrongOptions = [
        '에서', '부터', '까지', '처럼', '같이', '마다', '조차', '만큼', '보다', '대신'
      ].filter(opt => !grammar.korean.includes(opt))
       .sort(() => Math.random() - 0.5)
       .slice(0, 3);

      return {
        ...baseQuestion,
        question: `Which grammar pattern means "${grammar.english}"?`,
        options: [grammar.korean, ...wrongOptions].sort(() => Math.random() - 0.5),
        correctAnswer: grammar.korean,
        explanation: `"${grammar.korean}" is used ${grammar.usage.toLowerCase()}`
      };

    case 'grammar-match':
      return {
        ...baseQuestion,
        question: `What does "${grammar.korean}" mean in English?`,
        options: [
          grammar.english,
          'To express ability',
          'To show direction', 
          'To indicate possession'
        ].sort(() => Math.random() - 0.5),
        correctAnswer: grammar.english,
        explanation: `"${grammar.korean}" translates to "${grammar.english}"`
      };

    case 'usage-context':
      return {
        ...baseQuestion,
        question: `When do you use "${grammar.korean}"?`,
        options: [
          grammar.usage,
          'To express past actions',
          'To show location',
          'To indicate time'
        ].sort(() => Math.random() - 0.5),
        correctAnswer: grammar.usage,
        explanation: `"${grammar.korean}" is specifically used ${grammar.usage.toLowerCase()}`
      };

    case 'sentence-order':
      if (grammar.examples[0]) {
        const words = grammar.examples[0].korean.split(' ');
        const shuffledWords = [...words].sort(() => Math.random() - 0.5);
        return {
          ...baseQuestion,
          question: `Arrange these words in the correct order:`,
          words: shuffledWords,
          correctAnswer: grammar.examples[0].korean,
          explanation: `The correct sentence is: ${grammar.examples[0].korean} (${grammar.examples[0].english})`
        };
      }
      break;

    default:
      return baseQuestion;
  }

  return baseQuestion;
}

export default router;