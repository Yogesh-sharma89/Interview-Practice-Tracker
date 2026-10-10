import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { Question } from '@/types';

type QuestionCardProps = {
  question: Question;
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
};

const statusClass = {
  Pending: 'status-pending',
  'In Progress': 'status-progress',
  Completed: 'status-completed',
};

const difficultyClass = {
  Easy: 'difficulty-easy',
  Medium: 'difficulty-medium',
  Hard: 'difficulty-hard',
};

export function QuestionCard({ question, onEdit, onDelete }: QuestionCardProps) {
  return (
    <article className="question-card">
      <div className="question-card-main">
        <div className="question-topline">
          <span className="category-pill">{question.category}</span>
          <span className={`difficulty-pill ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span>
        </div>
        <h3>{question.title}</h3>
        {question.description && <p className="question-description">{question.description}</p>}
        <div className="question-meta">
          <span><CalendarDays size={14} /> {new Date(question.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className={`status-pill ${statusClass[question.status]}`}><span className="status-dot" /> {question.status}</span>
        </div>
      </div>
      <div className="question-actions">
        <button className="icon-button" onClick={() => onEdit(question)} aria-label={`Edit ${question.title}`} title="Edit question"><Pencil size={17} /></button>
        <button className="icon-button danger-hover" onClick={() => onDelete(question)} aria-label={`Delete ${question.title}`} title="Delete question"><Trash2 size={17} /></button>
        <MoreHorizontal className="more-icon" size={19} />
      </div>
    </article>
  );
}
