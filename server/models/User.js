import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profile: {
    displayName: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner'
    },
    targetLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'intermediate'
    }
  },
  preferences: {
    language: {
      type: String,
      enum: ['ko', 'en', 'vi'],
      default: 'ko'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    studyReminder: {
      type: Boolean,
      default: false
    }
  },
  subscription: {
    type: {
      type: String,
      enum: ['free', 'premium'],
      default: 'free'
    },
    expiresAt: Date
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model('User', userSchema);