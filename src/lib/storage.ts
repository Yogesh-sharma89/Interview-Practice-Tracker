import type { Question, Theme } from '@/types';

const STORAGE_KEY = 'interview-practice-questions';
const THEME_KEY = 'interview-practice-theme';

const demoQuestions: Question[] = [
  {
    id: 'demo-1',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Find the length of the longest substring without repeating characters using a sliding window.',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'Completed',
    createdAt: '2026-10-06T09:30:00.000Z',
  },
  {
    id: 'demo-2',
    title: 'Git rebase vs merge',
    description: 'Explain the practical differences and when you would choose each workflow on a team.',
    category: 'Git',
    difficulty: 'Easy',
    status: 'Completed',
    createdAt: '2026-10-05T13:10:00.000Z',
  },
  {
    id: 'demo-3',
    title: 'Design a rate limiter',
    description: 'Walk through a scalable rate limiter for a public API and discuss trade-offs.',
    category: 'Technical',
    difficulty: 'Hard',
    status: 'In Progress',
    createdAt: '2026-10-03T16:20:00.000Z',
  },
  {
    id: 'demo-4',
    title: 'Validate a binary search tree',
    description: 'Determine whether a binary tree is a valid binary search tree.',
    category: 'DSA',
    difficulty: 'Medium',
    status: 'Pending',
    createdAt: '2026-10-01T10:00:00.000Z',
  },
];

export function loadQuestions(): Question[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoQuestions));
      return demoQuestions;
    }
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed as Question[] : demoQuestions;
  } catch {
    return demoQuestions;
  }
}

export function loadTheme(): Theme | null {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch {
    return null;
  }
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // The app remains usable for the current session if storage is unavailable.
  }
}

export function saveQuestions(questions: Question[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(questions));
  } catch {
    // The app remains usable for the current session if storage is unavailable.
  }
}
