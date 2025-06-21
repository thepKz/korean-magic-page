import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  grammarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grammar',
    required: true
  },
  quizType: {
    type: String,
    enum: ['translation', 'fill-blank', 'multiple-choice', 'grammar-match', 'usage-context', 'sentence-order'],
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  attempts: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

const studySessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number, // in seconds
    default: 0
  },
  grammarStudied: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grammar'
  }],
  quizResults: [quizResultSchema]
});

const achievementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  unlockedAt: {
    type: Date,
    default: Date.now
  }
});

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  savedGrammar: [{
    grammarId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grammar',
      required: true
    },
    savedAt: {
      type: Date,
      default: Date.now
    },
    mastered: {
      type: Boolean,
      default: false
    },
    masteredAt: Date
  }],
  quizStats: {
    total: {
      type: Number,
      default: 0
    },
    correct: {
      type: Number,
      default: 0
    },
    streak: {
      type: Number,
      default: 0
    },
    bestStreak: {
      type: Number,
      default: 0
    },
    averageTime: {
      type: Number,
      default: 0
    }
  },
  studySessions: [studySessionSchema],
  totalStudyTime: {
    type: Number,
    default: 0 // in seconds
  },
  currentLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  achievements: [achievementSchema],
  weeklyGoal: {
    target: {
      type: Number,
      default: 300 // 5 minutes per day * 7 days = 35 minutes per week
    },
    current: {
      type: Number,
      default: 0
    },
    weekStart: {
      type: Date,
      default: Date.now
    }
  },
  lastActiveAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes
userProgressSchema.index({ 'savedGrammar.grammarId': 1 });
userProgressSchema.index({ lastActiveAt: -1 });

// Update last active time on save
userProgressSchema.pre('save', function(next) {
  this.lastActiveAt = new Date();
  next();
});

export default mongoose.model('UserProgress', userProgressSchema);