# Interview-Practice-Tracker

A responsive dashboard to organize your technical interview preparation, track coding questions, and monitor your progress — all in one place.

**Stay consistent. Practice smarter. Track your progress.**

## Overview

Preparing for technical interviews involves solving DSA problems, revising core computer science concepts, practicing Git, and preparing for machine-coding rounds. Keeping track of everything can quickly become overwhelming.

**Interview Practice Tracker** provides a centralized dashboard to organize your preparation, manage questions, monitor completion status, and understand how much progress you've made.

## Features

### 📊 Dashboard

- View the total number of tracked questions.
- Monitor completed questions and DSA problems.
- Track interview-question completion.
- View machine-coding preparation status.
- Visualize overall preparation progress.

### 📝 Question Management

- Add new interview questions.
- Categorize questions into DSA, Git, and Technical.
- Assign difficulty levels: Easy, Medium, and Hard.
- Track status: Pending, In Progress, or Completed.
- Update or delete existing questions.

### 🔎 Search and Filters

- Search questions by title or description.
- Filter questions by category.
- Filter by difficulty level.
- Filter by completion status.
- Combine filters to find specific questions quickly.

### 📈 Progress Tracking

- Calculate the completion percentage from tracked questions.
- View progress through visual indicators.
- Identify unfinished questions and areas that need more practice.

### 💾 Persistent Data

- Use browser `localStorage` for persistence when configured in the application.
- Keep saved questions available after refreshing the page.
- Manage preparation progress without requiring an account for a local-only setup.

### 📱 Responsive Interface

- Desktop-friendly dashboard layout.
- Mobile-friendly navigation and content.
- Clean typography and consistent spacing.
- Empty states, search-result feedback, and form validation.

## Tech Stack

| Technology   | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| React 18     | Component-based user interface                          |
| TypeScript   | Type safety and maintainable code                       |
| Vite         | Development server and build tooling                    |
| Tailwind CSS | Responsive styling                                      |
| Lucide React | Interface icons                                         |
| Supabase JS  | Available dependency for potential Supabase integration |

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) — preferably an active LTS version.
- npm, which comes with Node.js.
- Git.

### 1. Clone the repository


git clone https://github.com/Yogesh-sharma89/Interview-Practice-Tracker.git


### 2. Navigate to the project directory


cd Interview-Practice-Tracker

### 3. Install dependencies

npm install

### 4. Start the development server


npm run dev

Open the local URL printed in your terminal, usually `http://localhost:5173`.

## Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the development server         |
| `npm run build`     | Create a production build            |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Check TypeScript types               |

## How to Use

1. Open the dashboard to review your preparation progress.
2. Add questions you want to practice.
3. Assign each question a category, difficulty, and status.
4. Update the status as you work through your preparation.
5. Use search and filters to focus on specific topics.
6. Review your completion percentage to identify what remains.

## Project Goals

This project is designed to demonstrate practical frontend development skills, including:

- Building reusable React components.
- Managing application state.
- Implementing CRUD operations.
- Creating dynamic search and filtering.
- Calculating and visualizing progress.
- Persisting application data.
- Designing responsive user interfaces.
- Organizing a maintainable TypeScript codebase.

## Future Improvements

Potential enhancements include:

- [ ] Weekly preparation goals and study streaks.
- [ ] Dedicated machine-coding and mock-interview trackers.
- [ ] Question tags and revision reminders.
- [ ] Import and export of preparation data.
- [ ] Charts for category-wise and difficulty-wise progress.
- [ ] Optional cloud synchronization and user accounts.
- [ ] Deployment with a public demo link.

## Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run the available lint and build checks.
5. Submit a pull request describing your changes.

## License

No license has been specified yet. Add a `LICENSE` file before distributing the project under an open-source license.

## Author

**Yogesh Sharma**

- GitHub: [@Yogesh-sharma89](https://github.com/Yogesh-sharma89)
- Project repository: [Interview Practice Tracker](https://github.com/Yogesh-sharma89/Interview-Practice-Tracker)

---

*Built to make interview preparation more organized, measurable, and consistent.*

