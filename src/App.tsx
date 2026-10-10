import { useEffect, useMemo, useState } from 'react';
import { BarChart3, BookOpen, Check, ChevronDown, CircleHelp, ClipboardCheck, Code2, Filter, GitBranch, LayoutDashboard, Menu, Moon, PanelLeftClose, PanelLeftOpen, Plus, Search, Sun, Target, Terminal, Trash2, X } from 'lucide-react';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionModal } from '@/components/QuestionModal';
import { StatCard } from '@/components/StatCard';
import { loadQuestions, loadTheme, saveQuestions, saveTheme } from '@/lib/storage';
import { categories, difficulties, statuses, type Category, type Difficulty, type Question, type QuestionForm, type Status, type Theme } from '@/types';

const filterOptions = ['All', ...categories];
const difficultyOptions = ['All', ...difficulties];
const statusOptions = ['All', ...statuses];

type FilterValue = 'All' | Category | Difficulty | Status;

function App() {
  const [questions, setQuestions] = useState<Question[]>(loadQuestions);
  const [theme, setTheme] = useState<Theme>(() => loadTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  const [activeView, setActiveView] = useState('Overview');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<FilterValue>('All');
  const [difficulty, setDifficulty] = useState<FilterValue>('All');
  const [status, setStatus] = useState<FilterValue>('All');
  const [modalQuestion, setModalQuestion] = useState<Question | null | undefined>(undefined);
  const [deleteQuestion, setDeleteQuestion] = useState<Question | null>(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    saveTheme(theme);
  }, [theme]);

  const completed = questions.filter((question) => question.status === 'Completed');
  const progress = questions.length ? Math.round((completed.length / questions.length) * 100) : 0;
  const filteredQuestions = useMemo(() => questions.filter((question) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || question.title.toLowerCase().includes(term) || question.description.toLowerCase().includes(term);
    return matchesSearch && (category === 'All' || question.category === category) && (difficulty === 'All' || question.difficulty === difficulty) && (status === 'All' || question.status === status);
  }), [questions, search, category, difficulty, status]);

  const updateQuestions = (nextQuestions: Question[]) => { setQuestions(nextQuestions); saveQuestions(nextQuestions); };
  const handleSave = (form: QuestionForm) => {
    if (modalQuestion) updateQuestions(questions.map((question) => question.id === modalQuestion.id ? { ...question, ...form } : question));
    else updateQuestions([{ ...form, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...questions]);
    setModalQuestion(undefined);
  };
  const handleDelete = () => {
    if (deleteQuestion) updateQuestions(questions.filter((question) => question.id !== deleteQuestion.id));
    setDeleteQuestion(null);
  };
  const clearFilters = () => { setSearch(''); setCategory('All'); setDifficulty('All'); setStatus('All'); };

  const navItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'Question tracker', icon: ClipboardCheck },
    { label: 'Progress', icon: BarChart3 },
  ];
  const categoryItems = [{ label: 'DSA questions', icon: Code2, value: questions.filter((question) => question.category === 'DSA').length }, { label: 'Git questions', icon: GitBranch, value: questions.filter((question) => question.category === 'Git').length }, { label: 'Technical questions', icon: Terminal, value: questions.filter((question) => question.category === 'Technical').length }];

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className={`sidebar ${mobileNavOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <div className="brand"><div className="brand-branding"><div className="brand-mark"><Target size={21} /></div><span>prep<span className="brand-accent">path</span></span></div><button className="sidebar-toggle" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} aria-label={`${sidebarCollapsed ? 'Expand' : 'Collapse'} sidebar`} title={`${sidebarCollapsed ? 'Expand' : 'Collapse'} sidebar`}>{sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}</button></div>
        <div className="sidebar-section"><p className="sidebar-label">Workspace</p>{navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${activeView === label ? 'active' : ''}`} onClick={() => { setActiveView(label); setMobileNavOpen(false); if (label === 'Question tracker') document.getElementById('tracker-section')?.scrollIntoView({ behavior: 'smooth' }); if (label === 'Progress') document.getElementById('progress-card')?.scrollIntoView({ behavior: 'smooth' }); }}><Icon size={18} /><span>{label}</span>{label === 'Question tracker' && <span className="nav-count">{questions.length}</span>}</button>)}</div>
        <div className="sidebar-section"><p className="sidebar-label">Your library</p>{categoryItems.map(({ label, icon: Icon, value }) => <button key={label} className="nav-item secondary" onClick={() => { setActiveView('Question tracker'); setCategory(label.split(' ')[0] as Category); setMobileNavOpen(false); }}><Icon size={17} /><span>{label}</span><span className="nav-count">{value}</span></button>)}</div>
        <div className="sidebar-bottom"><div className="profile"><div className="avatar">YS</div><div><strong>Yogesh Sharma</strong><span>Interview prep</span></div><ChevronDown size={16} /></div></div>
      </aside>
      <main className="main-content">
        <header className="topbar"><button className="mobile-menu" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle navigation"><Menu size={22} /></button><div className="breadcrumb"><span>Workspace</span><span>/</span><strong>{activeView}</strong></div><div className="topbar-actions"><span className="help-button" aria-hidden="true"><CircleHelp size={19} /></span><button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button><div className="top-avatar">YS</div></div></header>
        <div className="page-content">
          <section className="page-heading"><div><p className="eyebrow">Saturday, October 10, 2026</p><h1>Good morning, Yogesh <span className="heading-dot">.</span></h1><p className="heading-subtitle">Keep the momentum going. You’re building something great.</p></div><button className="button button-primary" onClick={() => setModalQuestion(null)}><Plus size={18} /> Add question</button></section>
          <section className="stats-grid"><StatCard label="Total questions" value={questions.length} detail="In your library" icon={BookOpen} tone="orange" /><StatCard label="Completed" value={completed.length} detail={`${progress}% of all questions`} icon={Check} tone="green" /><StatCard label="DSA completed" value={completed.filter((question) => question.category === 'DSA').length} detail={`of ${questions.filter((question) => question.category === 'DSA').length} DSA questions`} icon={Code2} tone="blue" /><StatCard label="Interview questions" value={completed.filter((question) => question.category === 'Technical').length} detail="Technical completed" icon={Terminal} tone="slate" /></section>
          <section id="progress-card" className="progress-card"><div className="progress-copy"><div className="progress-icon"><Target size={20} /></div><div><h2>Your preparation progress</h2><p>Every question answered is one step closer to interview day.</p></div></div><div className="progress-value"><strong>{progress}%</strong><span>complete</span></div><div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div><div className="progress-footer"><span>{completed.length} completed</span><span>{questions.length - completed.length} remaining</span></div></section>
          <section id="tracker-section" className="tracker-section"><div className="section-heading"><div><p className="eyebrow">Question library</p><h2>Practice questions</h2></div><button className="text-button" onClick={() => { setActiveView('Question tracker'); setSearch(''); setCategory('All'); setDifficulty('All'); setStatus('All'); }}>View all <span>→</span></button></div>
            <div className="toolbar"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search questions..." aria-label="Search questions" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}</div><div className="filters"><div className="select-wrap"><Filter size={15} /><select value={category} onChange={(event) => setCategory(event.target.value as FilterValue)} aria-label="Filter by category">{filterOptions.map((item) => <option key={item} value={item}>{item === 'All' ? 'Category' : item}</option>)}</select></div><div className="select-wrap"><select value={difficulty} onChange={(event) => setDifficulty(event.target.value as FilterValue)} aria-label="Filter by difficulty">{difficultyOptions.map((item) => <option key={item} value={item}>{item === 'All' ? 'Difficulty' : item}</option>)}</select></div><div className="select-wrap"><select value={status} onChange={(event) => setStatus(event.target.value as FilterValue)} aria-label="Filter by status">{statusOptions.map((item) => <option key={item} value={item}>{item === 'All' ? 'Status' : item}</option>)}</select></div></div></div>
            {filteredQuestions.length > 0 ? <div className="questions-list">{filteredQuestions.map((question) => <QuestionCard key={question.id} question={question} onEdit={setModalQuestion} onDelete={setDeleteQuestion} />)}</div> : <div className="empty-state">{questions.length === 0 ? <><div className="empty-icon"><BookOpen size={26} /></div><h3>Your question library is empty</h3><p>Start building your interview plan by adding your first question.</p><button className="button button-primary" onClick={() => setModalQuestion(null)}><Plus size={17} /> Add first question</button></> : <><div className="empty-icon"><Search size={26} /></div><h3>No questions found</h3><p>Try adjusting your search or filters to find what you need.</p><button className="button button-ghost" onClick={clearFilters}>Clear filters</button></>}</div>}
          </section>
          <footer className="page-footer"><span><span className="footer-dot" /> All progress is saved automatically</span><span>{questions.length} questions in your library</span></footer>
        </div>
      </main>
      {modalQuestion !== undefined && <QuestionModal question={modalQuestion} onClose={() => setModalQuestion(undefined)} onSave={handleSave} />}
      {deleteQuestion && <div className="modal-backdrop"><section className="confirm-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-title"><div className="confirm-icon"><Trash2 size={22} /></div><h2 id="delete-title">Delete this question?</h2><p>“{deleteQuestion.title}” will be removed from your library. This action can’t be undone.</p><div className="modal-footer"><button className="button button-ghost" onClick={() => setDeleteQuestion(null)}>Keep question</button><button className="button button-danger" onClick={handleDelete}>Delete question</button></div></section></div>}
    </div>
  );
}

export default App;
