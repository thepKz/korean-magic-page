# 🚀 Korean Grammar Museum - API Routes Documentation

## 📋 Overview
Complete API documentation for the Korean Grammar Museum backend server.

**Base URL**: `http://localhost:5000/api`  
**Version**: 1.0.0  
**Last Updated**: January 2024

---

## 🔐 Authentication Routes

### POST `/auth/register`
**Description**: Register a new user account  
**Method**: `POST`  
**Authentication**: None required  

**Request Body**:
```json
{
  "username": "string (3-30 chars)",
  "email": "string (valid email)",
  "password": "string (min 6 chars)"
}
```

**Response**:
```json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com",
    "profile": {
      "displayName": "",
      "level": "beginner",
      "targetLevel": "intermediate"
    }
  }
}
```

**Status Codes**:
- `201`: User created successfully
- `400`: Validation error or user already exists
- `500`: Server error

---

### POST `/auth/login`
**Description**: Authenticate user and get access token  
**Method**: `POST`  
**Authentication**: None required  

**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "username": "username",
    "email": "email@example.com"
  }
}
```

**Status Codes**:
- `200`: Login successful
- `400`: Invalid credentials
- `500`: Server error

---

## 📚 Grammar Routes

### GET `/grammar`
**Description**: Get all grammar points with optional filtering  
**Method**: `GET`  
**Authentication**: None required  

**Query Parameters**:
- `level` (optional): `beginner` | `intermediate` | `advanced`
- `topikLevel` (optional): `1-6`
- `category` (optional): `verb` | `adjective` | `noun` | `particle` | `ending` | `expression`
- `search` (optional): Search term for text search
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50, max: 100)

**Example**: `/api/grammar?level=intermediate&page=1&limit=20`

**Response**:
```json
{
  "grammar": [
    {
      "id": "int-1",
      "korean": "N 밖에 + 부정",
      "english": "Only / Nothing but",
      "vietnamese": "chỉ…",
      "structure": "Noun + 밖에 + negative verb",
      "examples": [
        {
          "korean": "오빠밖에 사랑하지 않아요.",
          "english": "I only love my older brother.",
          "vietnamese": "Tôi chỉ yêu anh trai thôi.",
          "romanization": "Oppabakke saranghaji anayo."
        }
      ],
      "usage": "Used to express 'only' or 'nothing but' with negative verbs",
      "level": "intermediate",
      "topikLevel": 3,
      "category": "particle",
      "difficulty": 3,
      "tags": ["restriction", "limitation", "negative"]
    }
  ],
  "pagination": {
    "current": 1,
    "pages": 3,
    "total": 53
  }
}
```

---

### GET `/grammar/:id`
**Description**: Get specific grammar point by ID  
**Method**: `GET`  
**Authentication**: None required  

**Response**:
```json
{
  "id": "int-1",
  "korean": "N 밖에 + 부정",
  "english": "Only / Nothing but",
  "structure": "Noun + 밖에 + negative verb",
  "examples": [...],
  "usage": "Used to express 'only' or 'nothing but' with negative verbs",
  "level": "intermediate",
  "relatedGrammar": [
    {
      "korean": "만",
      "english": "only",
      "level": "beginner"
    }
  ]
}
```

---

### GET `/grammar/level/:level`
**Description**: Get grammar points by specific level  
**Method**: `GET`  
**Authentication**: None required  
**Parameters**: `level` - `beginner` | `intermediate` | `advanced`

---

### GET `/grammar/random/:count`
**Description**: Get random grammar points for practice  
**Method**: `GET`  
**Authentication**: None required  
**Parameters**: `count` - Number of random items (max: 20)  
**Query Parameters**: `level` (optional) - Filter by level

---

## 🎯 Quiz Routes

### GET `/quiz/generate`
**Description**: Generate quiz questions  
**Method**: `GET`  
**Authentication**: None required  

**Query Parameters**:
- `level` (optional): Grammar level filter
- `count` (optional): Number of questions (default: 10, max: 20)
- `type` (optional): `mixed` | specific quiz type
- `grammarIds` (optional): Comma-separated grammar IDs

**Response**:
```json
{
  "questions": [
    {
      "id": "q_12345",
      "grammarId": "int-1",
      "type": "translation",
      "question": "Translate to Korean: 'I only love my older brother.'",
      "correctAnswer": "오빠밖에 사랑하지 않아요.",
      "explanation": "This uses the grammar pattern: N 밖에 + 부정",
      "grammar": {
        "korean": "N 밖에 + 부정",
        "english": "Only / Nothing but",
        "structure": "Noun + 밖에 + negative verb",
        "level": "intermediate"
      }
    }
  ]
}
```

---

### GET `/quiz/generate/:type`
**Description**: Generate specific type of quiz questions  
**Method**: `GET`  
**Authentication**: None required  
**Parameters**: `type` - `translation` | `fill-blank` | `multiple-choice` | `grammar-match` | `usage-context` | `sentence-order`

---

## 👤 User Routes

### GET `/user/profile`
**Description**: Get current user profile  
**Method**: `GET`  
**Authentication**: Required (Bearer token)  

**Response**:
```json
{
  "id": "user_id",
  "username": "username",
  "email": "email@example.com",
  "profile": {
    "displayName": "Display Name",
    "avatar": "avatar_url",
    "level": "intermediate",
    "targetLevel": "advanced"
  },
  "preferences": {
    "language": "ko",
    "notifications": true,
    "studyReminder": false
  },
  "subscription": {
    "type": "free",
    "expiresAt": null
  }
}
```

---

### PUT `/user/profile`
**Description**: Update user profile  
**Method**: `PUT`  
**Authentication**: Required (Bearer token)  

**Request Body**:
```json
{
  "profile": {
    "displayName": "New Display Name",
    "level": "advanced"
  },
  "preferences": {
    "language": "en",
    "notifications": false
  }
}
```

---

### GET `/user/stats`
**Description**: Get user statistics  
**Method**: `GET`  
**Authentication**: Required (Bearer token)  

**Response**:
```json
{
  "totalStudyTime": 7200,
  "grammarSaved": 25,
  "quizStats": {
    "total": 150,
    "correct": 128,
    "streak": 5,
    "bestStreak": 15
  },
  "levelProgress": {
    "beginner": 2,
    "intermediate": 20,
    "advanced": 3
  },
  "achievements": [
    {
      "id": "first_quiz",
      "name": "첫 퀴즈",
      "description": "첫 번째 퀴즈 완료",
      "unlockedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "weeklyGoal": {
    "target": 300,
    "current": 180,
    "weekStart": "2024-01-15T00:00:00Z"
  }
}
```

---

## 📈 Progress Routes

### GET `/progress`
**Description**: Get user progress data  
**Method**: `GET`  
**Authentication**: Required (Bearer token)  

**Response**:
```json
{
  "userId": "user_id",
  "savedGrammar": [
    {
      "grammarId": "int-1",
      "savedAt": "2024-01-15T10:30:00Z",
      "mastered": false,
      "masteredAt": null
    }
  ],
  "quizStats": {
    "total": 50,
    "correct": 42,
    "streak": 3,
    "bestStreak": 8,
    "averageTime": 15.5
  },
  "studySessions": [
    {
      "date": "2024-01-15T00:00:00Z",
      "duration": 1800,
      "grammarStudied": ["int-1", "int-2"],
      "quizResults": [
        {
          "grammarId": "int-1",
          "quizType": "translation",
          "isCorrect": true,
          "timeSpent": 12,
          "attempts": 1
        }
      ]
    }
  ],
  "totalStudyTime": 7200,
  "achievements": [...],
  "weeklyGoal": {...}
}
```

---

### POST `/progress/save-grammar`
**Description**: Save a grammar point to user's collection  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  

**Request Body**:
```json
{
  "grammarId": "int-1"
}
```

---

### DELETE `/progress/save-grammar/:grammarId`
**Description**: Remove saved grammar point  
**Method**: `DELETE`  
**Authentication**: Required (Bearer token)  

---

### POST `/progress/quiz-result`
**Description**: Record quiz result  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  

**Request Body**:
```json
{
  "grammarId": "int-1",
  "quizType": "translation",
  "isCorrect": true,
  "timeSpent": 15
}
```

---

### POST `/progress/study-time`
**Description**: Update study time  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  

**Request Body**:
```json
{
  "duration": 300,
  "grammarIds": ["int-1", "int-2"]
}
```

---

## 🤖 AI Routes

### POST `/ai/chat`
**Description**: Chat with AI tutor  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  
**Rate Limit**: 20 requests per 15 minutes  

**Request Body**:
```json
{
  "message": "Can you explain the difference between 은/는 and 이/가?",
  "context": {
    "currentGrammar": "int-1",
    "userLevel": "intermediate"
  }
}
```

**Response**:
```json
{
  "response": "Great question! The particles 은/는 and 이/가 are both subject markers, but they have different uses...",
  "suggestions": [
    "Tell me more about topic particles",
    "Give me examples with 은/는",
    "What about object particles?"
  ]
}
```

---

### POST `/ai/generate-quiz`
**Description**: Generate AI-powered quiz questions  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  
**Rate Limit**: 10 requests per 15 minutes  

**Request Body**:
```json
{
  "grammarId": "int-1",
  "difficulty": "medium",
  "count": 5,
  "type": "mixed"
}
```

---

### POST `/ai/study-plan`
**Description**: Generate personalized study plan  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  

**Request Body**:
```json
{
  "currentLevel": "intermediate",
  "targetLevel": "advanced",
  "timeAvailable": 30,
  "weakAreas": ["particles", "verb-endings"]
}
```

---

### POST `/ai/explain`
**Description**: Get AI explanation for grammar point  
**Method**: `POST`  
**Authentication**: Required (Bearer token)  

**Request Body**:
```json
{
  "grammarId": "int-1",
  "question": "Why do we use 밖에 with negative verbs?"
}
```

---

## 🔧 System Routes

### GET `/health`
**Description**: System health check  
**Method**: `GET`  
**Authentication**: None required  

**Response**:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T14:30:00Z",
  "environment": "development",
  "version": "1.0.0",
  "services": {
    "database": "connected",
    "ai": "configured"
  },
  "uptime": 86400,
  "memory": {
    "rss": 45678592,
    "heapTotal": 32456789,
    "heapUsed": 23456789
  }
}
```

---

### GET `/docs`
**Description**: API documentation  
**Method**: `GET`  
**Authentication**: None required  

---

## 📊 Rate Limiting

| Endpoint Category | Limit | Window |
|------------------|-------|---------|
| General API | 100 requests | 15 minutes |
| AI Endpoints | 20 requests | 15 minutes |
| Authentication | 5 requests | 15 minutes |

## 🔒 Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 📝 Error Responses

All error responses follow this format:

```json
{
  "error": "Error Type",
  "message": "Human readable error message",
  "details": ["Additional error details if applicable"]
}
```

### Common Error Codes

- `400`: Bad Request - Invalid input data
- `401`: Unauthorized - Missing or invalid token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server-side error

## 🚀 Getting Started

1. **Start the server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Test the API**:
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Register a user**:
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
   ```

4. **Get grammar points**:
   ```bash
   curl http://localhost:5000/api/grammar?level=intermediate&limit=5
   ```

## 📚 Additional Resources

- **Postman Collection**: Import the API collection for easy testing
- **OpenAPI Spec**: Available at `/api/docs`
- **Rate Limiting**: Check headers for remaining requests
- **WebSocket**: Real-time features coming soon

---

**Need help?** Check the health endpoint or contact the development team!