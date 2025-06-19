# 🏛️ Korean Grammar Museum - Project Setup Guide

## 📋 Overview
Korean Grammar Museum là một ứng dụng học tiếng Hàn tương tác với hệ thống quiz, game và theo dõi tiến độ học tập.

## 🛠️ Tech Stack

### Frontend
- **React 18** với TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js** với Express
- **MongoDB** với Mongoose
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd korean-grammar-museum
```

### 2. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env file with your settings
nano .env

# Seed database with initial data
npm run seed

# Start development server
npm run dev
```

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS with Homebrew
brew install mongodb-community

# Start MongoDB service
sudo systemctl start mongodb  # Linux
brew services start mongodb-community  # macOS
```

#### Option B: MongoDB Atlas (Cloud)
1. Tạo account tại [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Tạo cluster mới
3. Lấy connection string
4. Cập nhật `MONGODB_URI` trong `.env`

## 📁 Project Structure

```
korean-grammar-museum/
├── src/                          # Frontend source
│   ├── components/              # React components
│   │   ├── WelcomeScreen.tsx
│   │   ├── MuseumEntrance.tsx
│   │   ├── GrammarRooms.tsx
│   │   ├── PersonalNotebook.tsx
│   │   ├── StudyProgress.tsx
│   │   └── GrammarGame.tsx
│   ├── types/                   # TypeScript types
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── server/                      # Backend source
│   ├── models/                  # MongoDB models
│   │   ├── User.js
│   │   ├── Grammar.js
│   │   └── UserProgress.js
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── grammar.js
│   │   ├── user.js
│   │   ├── progress.js
│   │   └── quiz.js
│   ├── middleware/              # Express middleware
│   │   └── auth.js
│   ├── scripts/                 # Utility scripts
│   │   └── seedData.js
│   └── server.js                # Server entry point
├── package.json                 # Frontend dependencies
└── PROJECT_SETUP.md            # This file
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  profile: {
    displayName: String,
    avatar: String,
    level: String, // 'beginner', 'intermediate', 'advanced'
    targetLevel: String
  },
  preferences: {
    language: String, // 'ko', 'en', 'vi'
    notifications: Boolean,
    studyReminder: Boolean
  },
  subscription: {
    type: String, // 'free', 'premium'
    expiresAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Grammar Collection
```javascript
{
  _id: ObjectId,
  id: String, // unique identifier
  korean: String,
  english: String,
  vietnamese: String,
  structure: String,
  examples: [{
    korean: String,
    english: String,
    vietnamese: String,
    romanization: String,
    audio: String
  }],
  usage: String,
  level: String, // 'beginner', 'intermediate', 'advanced'
  topikLevel: Number, // 1-6
  category: String, // 'verb', 'adjective', 'noun', etc.
  difficulty: Number, // 1-5
  tags: [String],
  relatedGrammar: [ObjectId],
  notes: String,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### UserProgress Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  savedGrammar: [{
    grammarId: ObjectId,
    savedAt: Date,
    mastered: Boolean,
    masteredAt: Date
  }],
  quizStats: {
    total: Number,
    correct: Number,
    streak: Number,
    bestStreak: Number,
    averageTime: Number
  },
  studySessions: [{
    date: Date,
    duration: Number, // seconds
    grammarStudied: [ObjectId],
    quizResults: [{
      grammarId: ObjectId,
      quizType: String,
      isCorrect: Boolean,
      timeSpent: Number,
      attempts: Number
    }]
  }],
  totalStudyTime: Number,
  currentLevel: String,
  achievements: [{
    id: String,
    name: String,
    description: String,
    unlockedAt: Date
  }],
  weeklyGoal: {
    target: Number,
    current: Number,
    weekStart: Date
  },
  lastActiveAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Korean Grammar Museum
```

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/korean-grammar-museum
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Grammar
- `GET /api/grammar` - Get all grammar points
- `GET /api/grammar/:id` - Get specific grammar point
- `GET /api/grammar/level/:level` - Get grammar by level
- `GET /api/grammar/random/:count` - Get random grammar points

### User Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress/save-grammar` - Save grammar point
- `DELETE /api/progress/save-grammar/:id` - Remove saved grammar
- `POST /api/progress/quiz-result` - Record quiz result
- `POST /api/progress/study-time` - Update study time

### Quiz
- `GET /api/quiz/generate` - Generate quiz questions
- `GET /api/quiz/generate/:type` - Generate specific quiz type

### User
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/stats` - Get user statistics

## 🎯 Features to Implement

### Phase 1 (Current)
- ✅ Basic grammar display
- ✅ Quiz system
- ✅ Progress tracking
- ✅ Local storage

### Phase 2 (Backend Integration)
- 🔄 User authentication
- 🔄 Cloud data sync
- 🔄 Advanced progress tracking
- 🔄 Achievement system

### Phase 3 (Advanced Features)
- 📝 Audio pronunciation
- 🎮 Advanced games
- 📊 Analytics dashboard
- 🏆 Leaderboards
- 💬 Community features

### Phase 4 (Premium Features)
- 🎯 Personalized learning paths
- 📱 Mobile app
- 🔊 Speech recognition
- 👨‍🏫 AI tutor
- 📈 Advanced analytics

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Heroku)
```bash
# Set environment variables
# Deploy server/ folder
```

### Database (MongoDB Atlas)
- Use cloud MongoDB for production
- Set up proper indexes
- Configure backup strategy

## 🔒 Security Considerations

1. **Authentication**
   - JWT tokens with expiration
   - Password hashing with bcrypt
   - Rate limiting on API endpoints

2. **Data Validation**
   - Input validation with express-validator
   - MongoDB injection prevention
   - CORS configuration

3. **Privacy**
   - User data encryption
   - GDPR compliance
   - Data retention policies

## 📱 Mobile Considerations

1. **Responsive Design**
   - Mobile-first approach
   - Touch-friendly interfaces
   - Offline capabilities

2. **Performance**
   - Code splitting
   - Image optimization
   - Caching strategies

## 🧪 Testing Strategy

1. **Frontend Testing**
   - Unit tests with Vitest
   - Component tests with React Testing Library
   - E2E tests with Playwright

2. **Backend Testing**
   - API tests with Jest/Supertest
   - Database tests with MongoDB Memory Server
   - Integration tests

## 📈 Analytics & Monitoring

1. **User Analytics**
   - Learning progress tracking
   - Quiz performance metrics
   - User engagement data

2. **System Monitoring**
   - API response times
   - Database performance
   - Error tracking

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

---

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   ```bash
   # Check if MongoDB is running
   sudo systemctl status mongodb
   
   # Start MongoDB
   sudo systemctl start mongodb
   ```

2. **Port Already in Use**
   ```bash
   # Kill process on port 5000
   lsof -ti:5000 | xargs kill -9
   ```

3. **CORS Issues**
   - Check FRONTEND_URL in backend .env
   - Verify API_URL in frontend .env

4. **JWT Token Issues**
   - Check JWT_SECRET in .env
   - Verify token expiration

### Getting Help

- 📧 Email: support@koreangrammarmuseum.com
- 💬 Discord: [Community Server]
- 📖 Documentation: [Wiki]
- 🐛 Issues: [GitHub Issues]

---

**Happy Learning! 🎉 한국어 공부 화이팅! 💪**