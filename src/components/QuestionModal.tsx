import { X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { categories, difficulties, statuses, type Question, type QuestionForm } from '@/types';

type QuestionModalProps = {
  question: Question | null;
  onClose: () => void;
  onSave: (form: QuestionForm) => void;
};

const emptyForm: QuestionForm = { title: '', description: '', category: 'DSA', difficulty: 'Medium', status: 'Pending' };

export function QuestionModal({ question, onClose, onSave }: QuestionModalProps) {
  const [form, setForm] = useState<QuestionForm>(emptyForm);
  const [error, setError] = useState('');

  useEffect(() => {
    setForm(question ? { title: question.title, description: question.description, category: question.category, difficulty: question.difficulty, status: question.status } : emptyForm);
    setError('');
  }, [question]);

  const updateField = <K extends keyof QuestionForm>(field: K, value: QuestionForm[K]) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.title.trim()) {
      setError('Add a title so you can find this question later.');
      return;
    }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="modal" role="dialog" aria-modal="true" aria-labelledby="question-modal-title">
        <div className="modal-header">
          <div><p className="eyebrow">Question library</p><h2 id="question-modal-title">{question ? 'Edit question' : 'Add a question'}</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Question title <span className="required">*</span><input value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="e.g. Explain event bubbling" autoFocus /></label>
          {error && <p className="field-error">{error}</p>}
          <label>Description <span className="optional">Optional</span><textarea value={form.description} onChange={(event) => updateField('description', event.target.value)} placeholder="Add notes, prompts, or a short reminder" rows={4} /></label>
          <div className="form-grid">
            <label>Category<select value={form.category} onChange={(event) => updateField('category', event.target.value as QuestionForm['category'])}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Difficulty<select value={form.difficulty} onChange={(event) => updateField('difficulty', event.target.value as QuestionForm['difficulty'])}>{difficulties.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <label>Status<select value={form.status} onChange={(event) => updateField('status', event.target.value as QuestionForm['status'])}>{statuses.map((item) => <option key={item}>{item}</option>)}</select></label>
          <div className="modal-footer"><button type="button" className="button button-ghost" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{question ? 'Save changes' : 'Add question'}</button></div>
        </form>
      </section>
    </div>
  );
}
