import React from 'react';
import { Lightbulb } from 'lucide-react';
import { SubjectType } from '../../types/card';

interface ExplanationSectionProps {
  explanation: string;
  subject?: SubjectType;
  className?: string;
}

export function ExplanationSection({
  explanation,
  subject = 'physics',
  className = '',
}: ExplanationSectionProps) {
  const getSubjectStyles = () => {
    switch (subject) {
      case 'chemistry':
        return {
          container:
            'bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-transparent border border-teal-600/30 hover:border-teal-500/50 dark:from-teal-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-teal-500/30',
          icon: 'text-teal-700 dark:text-teal-400',
          badge: 'text-teal-800 dark:text-teal-300',
        };
      case 'mathematics':
        return {
          container:
            'bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent border border-purple-600/30 hover:border-purple-500/50 dark:from-purple-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-purple-500/30',
          icon: 'text-purple-700 dark:text-purple-400',
          badge: 'text-purple-800 dark:text-purple-300',
        };
      case 'physics':
      default:
        return {
          container:
            'bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent border border-sky-600/30 hover:border-sky-500/50 dark:from-sky-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-sky-500/30',
          icon: 'text-sky-700 dark:text-sky-400',
          badge: 'text-sky-800 dark:text-sky-300',
        };
    }
  };

  const styles = getSubjectStyles();

  return (
    <div
      className={`relative rounded-xl p-2 sm:p-2.5 lg:p-3 shadow-xs transition-all duration-200 group w-full min-w-0 max-w-full ${styles.container} ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 flex-shrink-0">
        <Lightbulb className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${styles.icon} flex-shrink-0`} />
        <span className={`text-[10px] sm:text-[11px] lg:text-xs font-black uppercase tracking-wider ${styles.badge}`}>
          In Plain English
        </span>
      </div>
      <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-snug break-words hyphens-auto pl-0.5">
        {explanation}
      </p>
    </div>
  );
}
