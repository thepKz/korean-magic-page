# Korean Grammar Museum - Current Features

This document outlines the features that are currently implemented and working in the Korean Grammar Museum application.

## Core Learning Features

- **Level Selection:** Users can choose their learning path from three levels:
  - **Beginner (초급):** Basic grammar points.
  - **Intermediate (중급):** TOPIK Level 3 grammar.
  - **Advanced (고급):** Complex grammar structures.

- **Grammar Rooms:** An immersive environment where users can study grammar points specific to their selected level.

- **My Grammar Notes:** A personalized notebook where users can view all their saved grammar points.
  - **Search:** Users can search through their saved notes.
  - **Detailed View:** Clicking on a grammar point opens a detailed modal with examples, structure, and usage information.

## Interactive & Gamified Features

- **Grammar Games:** A simple game to test knowledge on saved grammar points.
- **Study Progress Tracking:** A dashboard that visualizes:
  - Quiz statistics (correct/total answers).
  - Total study time.
  - Number of mastered grammar points.

## User Account & Data

- **Authentication:** Users can register and log in to their accounts.
- **Database Persistence:** All user progress, including saved grammar and study statistics, is saved to the database, allowing for a consistent experience across multiple devices.
- **Admin Role:** A special `admin` role exists for application management. The admin panel can be accessed via a dedicated button when an admin user is logged in.

## Upcoming Features (Disabled in UI)

The following features are planned and visible in the UI but are currently disabled and marked as "Coming Soon":

- Flashcards
- Interactive Games (Advanced)
- Analytics
- AI-Powered Features (AI Tutor, Various Quizzes, etc.) 