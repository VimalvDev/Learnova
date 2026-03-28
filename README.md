# Learnova - AI-Powered Adaptive Learning Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-6-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/Google Gemini-ai-4285F4?style=for-the-badge&logo=google" alt="Google Gemini">
</p>

---

## Table of Contents

1. [What is Learnova?](#what-is-learnova)
2. [Why This Project?](#why-this-project)
3. [Key Features](#key-features)
4. [How It Works (Step by Step)](#how-it-works-step-by-step)
5. [Tech Stack Explained](#tech-stack-explained)
6. [Project Structure](#project-structure)
7. [Getting Started](#getting-started)
8. [API Routes Overview](#api-routes-overview)
9. [Key Concepts for Beginners](#key-concepts-for-beginners)
10. [Future Improvements](#future-improvements)

---

## What is Learnova?

**Learnova** is an AI-powered adaptive learning platform designed to revolutionize how students learn. Unlike traditional one-size-fits-all learning management systems, Learnova uses artificial intelligence to:

- **Personalize** learning content based on each student's strengths and weaknesses
- **Adapt** difficulty levels automatically based on performance
- **Schedule** optimal review times using spaced repetition algorithms
- **Identify** knowledge gaps and prioritize them in the learning path

Think of it as having a **personal AI tutor** that understands your unique learning style and adapts to your pace.

---

## Why This Project?

Traditional e-learning platforms treat every student the same. If you're struggling with algebra, you still get the same content as someone who's acing it.

Learnova solves this by:

1. **Making learning intelligent** - The AI analyzes your performance and adjusts accordingly
2. **Saving time** - Focus on what you don't know, not what you already master
3. **Improving retention** - Spaced repetition ensures long-term memory
4. **Building confidence** - Starting at the right difficulty level prevents frustration

---

## Key Features

### 1. 🎯 Adaptive Quizzes
- Questions automatically adjust in difficulty based on your answers
- Get harder questions as you improve, easier ones when you struggle
- Real-time feedback helps reinforce learning

### 2. 🧠 AI Tutor
- Chat with an AI that understands your uploaded course material
- Ask questions about specific concepts
- Get explanations tailored to your current knowledge level

### 3. 📊 Smart Analytics
- Visual progress tracking with charts (using Nivo)
- Heatmaps showing study patterns
- Knowledge graph showing connections between concepts

### 4. 🔄 Spaced Repetition
- The system schedules reviews at optimal times
- Revisit material before you forget it
- Maximize long-term retention with minimal effort

### 5. 🎯 Weakness Intelligence
- Automatically identifies your knowledge gaps
- Prioritizes weak areas in your learning path
- Shows specific topics that need more attention

### 6. 📝 Ask From Notes
- Upload your study materials (PDFs, notes)
- The AI answers questions directly from your uploaded content
- No need to search through lengthy documents

### 7. 📅 Revision Scheduler
- Calendar view of what to review and when
- Smart recommendations based on forgetting curve
- Daily revision goals

### 8. 📈 Performance Insights
- Track scores across different topics
- Compare progress over time
- Identify trends in learning patterns

### 9. 📚 Course Management
- Browse and enroll in courses
- Track progress through lessons
- Mark completion status

### 10. 🎓 Onboarding Flow
- Personalized setup wizard
- Configure learning goals, timeline, and preferences
- Upload initial course material

---

## How It Works (Step by Step)

### For Students:

1. **Sign Up / Login** → Create an account or log in
2. **Onboarding** → Tell us about your learning goals, subjects, and schedule
3. **Upload Material** → Add your course notes or choose from existing courses
4. **Start Learning** → Begin with quizzes and lessons
5. **AI Helps** → Chat with the AI tutor when stuck
6. **Track Progress** → Watch your improvement over time
7. **Revision** → Review material at scheduled intervals

### The AI Magic:

```
Student Answer → Analysis → Difficulty Adjustment → Next Question
      ↓              ↓              ↓
  Correct?    Find gaps      Make easier/harder
```

The AI uses **Google Gemini** to:
- Generate personalized questions
- Answer questions from uploaded materials
- Explain concepts in different ways
- Adapt to individual learning patterns

---

## Tech Stack Explained

### Frontend

| Technology | Purpose | Why It Matters |
|------------|---------|-----------------|
| **Next.js 16** | React framework | Server-side rendering, routing, API routes |
| **React 19** | UI library | Interactive user interfaces |
| **TypeScript** | Language | Catches errors before runtime |
| **Tailwind CSS 4** | Styling | Rapid UI development |
| **Framer Motion** | Animations | Smooth, engaging animations |
| **GSAP** | Advanced animations | Complex scroll-based animations |
| **Lenis** | Smooth scrolling | Better user experience |
| **Nivo** | Charts | Beautiful data visualizations |

### Backend

| Technology | Purpose | Why It Matters |
|------------|---------|-----------------|
| **Next.js API Routes** | Backend endpoints | Handle serverless functions |
| **Google Gemini AI** | AI/ML capabilities | Generate content, answer questions |
| **AI SDK** | AI integration | Streamlined AI development |

### Development Tools

| Technology | Purpose |
|------------|---------|
| **ESLint** | Code quality |
| **TypeScript** | Type safety |
| **Git** | Version control |

---

## Project Structure

Here's what each folder does (beginner's guide):

```
learnova/
├── app/                    # All pages and routes
│   ├── (auth)/            # Login, register, password reset pages
│   ├── (dashboard)/       # Protected user pages (after login)
│   │   ├── dashboard/    # Main dashboard with stats
│   │   ├── courses/      # Course listing and details
│   │   ├── ai-tutor/     # AI chat interface
│   │   ├── analytics/    # Progress charts
│   │   ├── knowledge-map/# Visual topic connections
│   │   ├── quizzes/      # Quiz interface
│   │   ├── revision/     # Spaced repetition scheduler
│   │   └── settings/     # User preferences
│   ├── (onboarding)/     # New user setup wizard
│   ├── (admin)/          # Admin panel
│   ├── api/              # Backend API endpoints
│   │   ├── ai/          # AI chat & content generation
│   │   ├── auth/        # Authentication
│   │   ├── courses/     # Course management
│   │   └── progress/    # Progress tracking
│   └── page.jsx         # Landing page
│
├── components/            # Reusable UI pieces
│   ├── ui/               # Basic components (buttons, inputs)
│   ├── home/             # Landing page sections
│   ├── dashboard/        # Dashboard widgets
│   ├── course/           # Course-related components
│   ├── lesson/          # Lesson components
│   ├── ai/              # AI tutor components
│   ├── charts/           # Chart components
│   └── auth/            # Authentication components
│
├── lib/                   # Utility functions
│   ├── gsap.ts           # Animation setup
│   └── nivo.ts           # Chart configuration
│
├── types/                # TypeScript type definitions
├── hooks/                # Custom React hooks
├── context/              # React context (global state)
├── services/             # API calling functions
├── prisma/               # Database schema (for future)
└── public/               # Static files (images, icons)
```

### Key Folders Explained:

- **`app/`** - This is where all your pages live. Next.js uses file-based routing.
- **`components/`** - Reusable pieces of UI. Think of them like LEGO blocks.
- **`api/`** - These are your backend endpoints. When the frontend needs data, it calls these.
- **`lib/`** - Helper functions that are used across the app.

---

## Getting Started

### Prerequisites

You need these installed on your computer:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org)
2. **npm** or **yarn** (comes with Node.js)

### Installation Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd learnova

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env.local file with:
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# 4. Run the development server
npm run dev
```

### Access the App

Open your browser and go to: `http://localhost:3000`

---

## API Routes Overview

API routes are endpoints that the frontend calls to get data or perform actions. Here's what we have:

### AI Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ai/chat` | POST | Send a message to the AI tutor |
| `/api/ai/generate` | POST | Generate quiz questions |

### Future Endpoints (Template)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/courses` | GET/POST | List or create courses |
| `/api/lessons` | GET/POST | List or create lessons |
| `/api/progress` | GET/PUT | Track user progress |
| `/api/users` | GET/PUT | Manage user data |

---

## Key Concepts for Beginners

### 1. What is Next.js App Router?

Next.js 13+ uses a file-system based router. Each folder in `app/` becomes a route:

```
app/dashboard/page.tsx     →  /dashboard
app/courses/page.tsx       →  /courses
app/api/chat/route.ts      →  /api/chat
```

### 2. What are Server Components?

In Next.js, components are server-side by default. They run on the server and send HTML to the browser. This makes pages load faster.

```tsx
// This runs on the server
export default function Dashboard() {
  return <h1>Welcome!</h1>
}
```

For interactivity, add `"use client"` at the top:

```tsx
"use client"  // This runs in the browser
export default function Counter() {
  // Now you can use useState, useEffect, etc.
}
```

### 3. What is Tailwind CSS?

Tailwind is a utility-first CSS framework. Instead of writing custom CSS, you use pre-built classes:

```html
<!-- Instead of writing CSS, use classes -->
<button class="bg-blue-500 text-white px-4 py-2 rounded-lg">
  Click Me
</button>
```

### 4. What is an API Route?

An API route is a function that runs on the server. It can:
- Receive data from the frontend
- Process it
- Send a response back

```typescript
// app/api/hello/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  return Response.json({ message: "Hello!" })
}
```

### 5. What is Google Gemini?

Google Gemini is a large language model (LLM) - like ChatGPT but from Google. We use it to:
- Generate quiz questions
- Answer questions from study materials
- Provide explanations

### 6. What is Spaced Repetition?

It's a learning technique where you review material at increasing intervals:

```
Day 1: Learn new topic
Day 2: First review
Day 4: Second review
Day 7: Third review
Day 14: Fourth review
```

This helps move information from short-term to long-term memory.

---

## Future Improvements

This is a foundation. Here are things that could be added:

### Database Integration
- [ ] Add Prisma with PostgreSQL
- [ ] User authentication with NextAuth.js
- [ ] Store courses, lessons, progress in database

### More AI Features
- [ ] Generate entire lessons automatically
- [ ] Create personalized study plans
- [ ] Voice-based AI tutor

### Social Features
- [ ] Leaderboards
- [ ] Study groups
- [ ] Share courses

### Mobile App
- [ ] React Native or Expo app
- [ ] Push notifications for revision

### Analytics
- [ ] More detailed progress reports
- [ ] Learning streak tracking
- [ ] Time analytics

---

## Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Google Gemini AI](https://ai.google.dev)
- [Nivo Charts](https://nivo.rocks)
- [Framer Motion](https://www.framer.com/motion/)
- [GSAP](https://greensock.com/gsap/)

---

<p align="center">
  Made with ❤️ for better learning
</p>
