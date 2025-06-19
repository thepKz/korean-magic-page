import express from 'express';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/profile', auth, [
  body('profile.displayName').optional().isLength({ max: 50 }).trim(),
  body('profile.level').optional().isIn(['beginner', 'intermediate', 'advanced']),
  body('profile.targetLevel').optional().isIn(['beginner', 'intermediate', 'advanced']),
  body('preferences.language').optional().isIn(['ko', 'en', 'vi']),
  body('preferences.notifications').optional().isBoolean(),
  body('preferences.studyReminder').optional().isBoolean()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update profile fields
    if (req.body.profile) {
      Object.assign(user.profile, req.body.profile);
    }

    // Update preferences
    if (req.body.preferences) {
      Object.assign(user.preferences, req.body.preferences);
    }

    await user.save();
    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Get user statistics
router.get('/stats', auth, async (req, res) => {
  try {
    const UserProgress = (await import('../models/UserProgress.js')).default;
    
    const progress = await UserProgress.findOne({ userId: req.userId })
      .populate('savedGrammar.grammarId', 'level');

    if (!progress) {
      return res.json({
        totalStudyTime: 0,
        grammarSaved: 0,
        quizStats: { total: 0, correct: 0, streak: 0, bestStreak: 0 },
        levelProgress: { beginner: 0, intermediate: 0, advanced: 0 }
      });
    }

    // Calculate level progress
    const levelProgress = progress.savedGrammar.reduce((acc, item) => {
      if (item.grammarId && item.grammarId.level) {
        acc[item.grammarId.level] = (acc[item.grammarId.level] || 0) + 1;
      }
      return acc;
    }, { beginner: 0, intermediate: 0, advanced: 0 });

    res.json({
      totalStudyTime: progress.totalStudyTime,
      grammarSaved: progress.savedGrammar.length,
      quizStats: progress.quizStats,
      levelProgress,
      achievements: progress.achievements,
      weeklyGoal: progress.weeklyGoal
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Error fetching user statistics' });
  }
});

export default router;