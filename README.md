# 🏛️ Korean Grammar Museum - 한국어 문법 박물관

A comprehensive Korean language learning platform designed specifically for Vietnamese learners, featuring interactive grammar lessons, AI-powered tutoring, and gamified learning experiences.

## 🌟 Features

### 📚 Core Learning Features
- **Interactive Grammar Lessons**: 50+ TOPIK 3 level grammar points with detailed explanations
- **Multi-language Support**: Korean, English, and Vietnamese translations
- **6 Quiz Types**: Translation, fill-in-the-blank, multiple choice, grammar matching, usage context, and sentence ordering
- **Personal Notebook**: Save and organize your favorite grammar points
- **Progress Tracking**: Detailed analytics of your learning journey

### 🎮 Gamification
- **4 Game Modes**: Speed Quiz, Memory Match, Sentence Builder, Grammar Race
- **Achievement System**: Unlock badges and rewards for milestones
- **Study Streaks**: Track daily learning habits
- **Leaderboards**: Compete with other learners

### 🤖 AI-Powered Features
- **AI Chatbot Tutor**: Get personalized explanations and practice
- **Smart Quiz Generation**: AI creates custom questions based on your progress
- **Adaptive Learning**: Personalized study plans based on your weaknesses
- **Voice Practice**: Speech recognition for pronunciation improvement

### 📊 Advanced Analytics
- **Learning Analytics**: Detailed insights into your study patterns
- **Performance Metrics**: Track accuracy, speed, and improvement over time
- **Study Goals**: Set and track weekly/monthly learning objectives
- **Admin Dashboard**: Comprehensive system monitoring and user management

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- OpenAI API key (for AI features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/korean-grammar-museum.git
cd korean-grammar-museum
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd server
npm install
```

4. **Set up environment variables**
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Korean Grammar Museum

# Backend (server/.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/korean-grammar-museum
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=your-openai-api-key-here
```

5. **Seed the database**
```bash
cd server
npm run seed
```

6. **Start the development servers**
```bash
# Terminal 1: Start backend
cd server
npm run dev

# Terminal 2: Start frontend
npm run dev
```

7. **Open your browser**
Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
korean-grammar-museum/
├── src/                          # Frontend React app
│   ├── components/              # React components
│   │   ├── WelcomeScreen.tsx
│   │   ├── MuseumEntrance.tsx
│   │   ├── GrammarRooms.tsx
│   │   ├── PersonalNotebook.tsx
│   │   ├── StudyProgress.tsx
│   │   ├── GrammarGame.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AchievementSystem.tsx
│   │   ├── AuthModal.tsx
│   │   ├── StudyPlan.tsx
│   │   ├── StudyStreak.tsx
│   │   └── VoicePractice.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   └── useProgress.ts
│   ├── types/                   # TypeScript types
│   │   └── grammar.ts
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # Entry point
├── server/                      # Backend Node.js app
│   ├── models/                  # MongoDB models
│   │   ├── User.js
│   │   ├── Grammar.js
│   │   └── UserProgress.js
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── grammar.js
│   │   ├── user.js
│   │   ├── progress.js
│   │   ├── quiz.js
│   │   └── ai.js
│   ├── middleware/              # Express middleware
│   │   └── auth.js
│   ├── scripts/                 # Utility scripts
│   │   └── seedData.js
│   └── server.js                # Server entry point
├── API_ROUTES.md               # API documentation
├── DEVELOPMENT_ROADMAP.md      # Development roadmap
└── PROJECT_SETUP.md           # Detailed setup guide
```

## 🔧 Available Scripts

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Backend
```bash
npm run dev          # Start development server with nodemon
npm run start        # Start production server
npm run seed         # Seed database with initial data
```

### Combined
```bash
npm run start:all    # Start both frontend and backend
```

## 📱 Features Overview

### 🎯 Learning Modes
1. **Study Mode**: Browse and learn grammar points with examples
2. **Quiz Mode**: Test your knowledge with various question types
3. **Game Mode**: Learn through interactive games
4. **Review Mode**: Revisit saved grammar points

### 🏆 Achievement System
- **Study Achievements**: Complete lessons, study streaks
- **Quiz Achievements**: Accuracy milestones, speed records
- **Special Achievements**: Perfect scores, consistency rewards
- **Rarity Levels**: Common, Rare, Epic, Legendary

### 📊 Progress Tracking
- **Study Time**: Track total and daily study time
- **Accuracy Rates**: Monitor quiz performance over time
- **Streak Counters**: Daily study and correct answer streaks
- **Grammar Mastery**: Track which grammar points you've learned

### 🤖 AI Features
- **Chatbot Tutor**: Ask questions and get explanations
- **Smart Recommendations**: Personalized study suggestions
- **Adaptive Difficulty**: Questions adjust to your skill level
- **Voice Recognition**: Practice pronunciation with feedback

## 🌐 API Routes

The backend provides a comprehensive REST API. See [API_ROUTES.md](./API_ROUTES.md) for detailed documentation.

### Key Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/grammar` - Get grammar points
- `POST /api/progress/quiz-result` - Record quiz results
- `POST /api/ai/chat` - AI chatbot interaction

## 🔒 Authentication & Security

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Rate Limiting**: Prevent API abuse
- **CORS Configuration**: Secure cross-origin requests
- **Input Validation**: Comprehensive data validation

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6) - Trust, learning
- **Secondary**: Purple (#8B5CF6) - Creativity, engagement
- **Accent**: Yellow (#F59E0B) - Achievement, success
- **Success**: Green (#10B981) - Correct answers, progress
- **Warning**: Orange (#F97316) - Attention, caution
- **Error**: Red (#EF4444) - Mistakes, alerts

### Typography
- **Korean Text**: Noto Sans KR
- **English Text**: Inter
- **Code/Romanization**: Monospace

### Components
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **Smooth Animations**: Framer Motion for fluid interactions
- **Responsive Design**: Mobile-first approach
- **Dark Theme**: Easy on the eyes for extended study sessions

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style

## 📈 Roadmap

See [DEVELOPMENT_ROADMAP.md](./DEVELOPMENT_ROADMAP.md) for detailed development plans.

### Phase 1: Foundation ✅
- Basic React app structure
- Grammar display system
- Interactive quiz system
- Progress tracking
- Game modes
- Responsive design

### Phase 2: Backend Integration 🔄
- Node.js/Express backend
- MongoDB database
- User authentication
- API endpoints
- Cloud data synchronization

### Phase 3: Advanced Features 📋
- AI-powered tutoring
- Voice recognition
- Advanced analytics
- Mobile optimization
- Gamification enhancements

### Phase 4: Premium Features 🔮
- Subscription management
- Advanced learning tools
- Community features
- Business intelligence

## 🐛 Troubleshooting

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

3. **Environment Variables**
- Ensure all required environment variables are set
- Check `.env` file format and location

4. **Build Errors**
- Clear node_modules and reinstall dependencies
- Check TypeScript errors and fix them

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Korean Language Resources**: Various TOPIK preparation materials
- **Design Inspiration**: Modern language learning platforms
- **Community**: Korean language learners and teachers
- **Open Source**: All the amazing libraries that made this possible

## 📞 Support

- **Email**: support@koreangrammarmuseum.com
- **Discord**: [Community Server](https://discord.gg/korean-grammar)
- **Documentation**: [Wiki](https://github.com/your-username/korean-grammar-museum/wiki)
- **Issues**: [GitHub Issues](https://github.com/your-username/korean-grammar-museum/issues)

---

**Happy Learning! 🎉 한국어 공부 화이팅! 💪**

Made with ❤️ for Korean language learners worldwide.