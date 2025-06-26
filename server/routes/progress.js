import express from 'express';
import { auth } from '../middleware/auth.js';
import Grammar from '../models/Grammar.js';
import UserProgress from '../models/UserProgress.js';

const router = express.Router();

// Get user progress
router.get('/', auth, async (req, res) => {
  try {
    let progress = await UserProgress.findOne({ userId: req.userId })
      .populate('savedGrammar.grammarId', 'korean english vietnamese structure usage usageVi explanation explanationVi examples')
      .populate('studySessions.grammarStudied', 'korean english level');

    if (!progress) {
      progress = new UserProgress({ userId: req.userId });
      await progress.save();
    }

    res.json(progress);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Error fetching progress' });
  }
});

// Save grammar point
router.post('/save-grammar', auth, async (req, res) => {
  try {
    const { grammarId } = req.body;

    const grammar = await Grammar.findById(grammarId);
    if (!grammar) {
      return res.status(404).json({ message: 'Grammar point not found' });
    }

    let progress = await UserProgress.findOne({ userId: req.userId });
    if (!progress) {
      progress = new UserProgress({ userId: req.userId });
    }

    // Check if already saved
    const alreadySaved = progress.savedGrammar.find(
      item => item.grammarId.toString() === grammarId
    );

    if (!alreadySaved) {
      progress.savedGrammar.push({ grammarId });
      await progress.save();
    }

    res.json({ message: 'Grammar point saved successfully' });
  } catch (error) {
    console.error('Save grammar error:', error);
    res.status(500).json({ message: 'Error saving grammar point' });
  }
});

// Remove saved grammar
router.delete('/save-grammar/:grammarId', auth, async (req, res) => {
  try {
    const { grammarId } = req.params;

    const progress = await UserProgress.findOne({ userId: req.userId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }

    progress.savedGrammar = progress.savedGrammar.filter(
      item => item.grammarId.toString() !== grammarId
    );

    await progress.save();
    res.json({ message: 'Grammar point removed successfully' });
  } catch (error) {
    console.error('Remove saved grammar error:', error);
    res.status(500).json({ message: 'Error removing saved grammar' });
  }
});

// Update quiz stats
router.post('/quiz-result', auth, async (req, res) => {
  try {
    const { grammarId, quizType, isCorrect, timeSpent } = req.body;

    let progress = await UserProgress.findOne({ userId: req.userId });
    if (!progress) {
      progress = new UserProgress({ userId: req.userId });
    }

    // Update quiz stats
    progress.quizStats.total += 1;
    if (isCorrect) {
      progress.quizStats.correct += 1;
      progress.quizStats.streak += 1;
      progress.quizStats.bestStreak = Math.max(
        progress.quizStats.bestStreak,
        progress.quizStats.streak
      );
    } else {
      progress.quizStats.streak = 0;
    }

    // Update average time
    const totalTime = progress.quizStats.averageTime * (progress.quizStats.total - 1) + timeSpent;
    progress.quizStats.averageTime = totalTime / progress.quizStats.total;

    // Add to current study session
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let todaySession = progress.studySessions.find(session => 
      session.date >= today
    );

    if (!todaySession) {
      todaySession = {
        date: new Date(),
        duration: 0,
        grammarStudied: [],
        quizResults: []
      };
      progress.studySessions.push(todaySession);
    }

    todaySession.quizResults.push({
      grammarId,
      quizType,
      isCorrect,
      timeSpent
    });

    await progress.save();
    res.json({ message: 'Quiz result recorded successfully' });
  } catch (error) {
    console.error('Quiz result error:', error);
    res.status(500).json({ message: 'Error recording quiz result' });
  }
});

// Update study time
router.post('/study-time', auth, async (req, res) => {
  try {
    const { duration, grammarIds = [] } = req.body;

    let progress = await UserProgress.findOne({ userId: req.userId });
    if (!progress) {
      progress = new UserProgress({ userId: req.userId });
    }

    progress.totalStudyTime += duration;

    // Update today's session
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let todaySession = progress.studySessions.find(session => 
      session.date >= today
    );

    if (!todaySession) {
      todaySession = {
        date: new Date(),
        duration: 0,
        grammarStudied: [],
        quizResults: []
      };
      progress.studySessions.push(todaySession);
    }

    todaySession.duration += duration;
    
    // Add studied grammar (avoid duplicates)
    grammarIds.forEach(grammarId => {
      if (!todaySession.grammarStudied.includes(grammarId)) {
        todaySession.grammarStudied.push(grammarId);
      }
    });

    await progress.save();
    res.json({ message: 'Study time updated successfully' });
  } catch (error) {
    console.error('Study time error:', error);
    res.status(500).json({ message: 'Error updating study time' });
  }
});

export default router;