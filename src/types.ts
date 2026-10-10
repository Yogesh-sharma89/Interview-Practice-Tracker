export const categories = ['DSA', 'Git', 'Technical'] as const;
export const difficulties = ['Easy', 'Medium', 'Hard'] as const;
export const statuses = ['Pending', 'In Progress', 'Completed'] as const;

export type Category = (typeof categories)[number];
export type Difficulty = (typeof difficulties)[number];
export type Status = (typeof statuses)[number];
export type Theme = 'light' | 'dark';

export type Question = {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  status: Status;
  createdAt: string;
};

export type QuestionForm = Omit<Question, 'id' | 'createdAt'>;
