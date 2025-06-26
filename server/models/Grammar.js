import mongoose from 'mongoose';

const exampleSchema = new mongoose.Schema({
  korean: {
    type: String,
    required: true
  },
  english: {
    type: String,
    required: true
  },
  vietnamese: {
    type: String,
    default: ''
  },
  romanization: {
    type: String,
    required: true
  },
  audio: {
    type: String,
    default: ''
  }
});

const grammarSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  korean: {
    type: String,
    required: true
  },
  english: {
    type: String,
    required: true
  },
  vietnamese: {
    type: String,
    default: ''
  },
  structure: {
    type: String,
    required: true
  },
  examples: [exampleSchema],
  usage: {
    type: String,
    required: true
  },
  usageVi: {
    type: String,
    default: ''
  },
  explanation: {
    type: String,
    default: ''
  },
  explanationVi: {
    type: String,
    default: ''
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  topikLevel: {
    type: Number,
    min: 1,
    max: 6,
    default: 3
  },
  category: {
    type: String,
    enum: ['verb', 'adjective', 'noun', 'particle', 'ending', 'expression'],
    default: 'expression'
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  tags: [{
    type: String,
    trim: true
  }],
  relatedGrammar: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grammar'
  }],
  notes: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
grammarSchema.index({ level: 1, topikLevel: 1 });
grammarSchema.index({ korean: 'text', english: 'text', vietnamese: 'text' });
grammarSchema.index({ tags: 1 });

export default mongoose.model('Grammar', grammarSchema);