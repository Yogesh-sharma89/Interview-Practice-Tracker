import type { LucideIcon } from 'lucide-react';

type StatCardProps = {
  label: string;
  value: string | number;
  detail: string;
  icon: LucideIcon;
  tone: 'orange' | 'blue' | 'green' | 'slate';
};

const toneClasses = {
  orange: 'stat-icon-orange',
  blue: 'stat-icon-blue',
  green: 'stat-icon-green',
  slate: 'stat-icon-slate',
};

export function StatCard({ label, value, detail, icon: Icon, tone }: StatCardProps) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${toneClasses[tone]}`}><Icon size={19} strokeWidth={2.2} /></div>
      <div className="min-w-0">
        <p className="stat-label">{label}</p>
        <p className="stat-value">{value}</p>
        <p className="stat-detail">{detail}</p>
      </div>
    </article>
  );
}
