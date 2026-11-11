import React from 'react';
import { Lightbulb } from 'lucide-react';

interface ExplanationSectionProps {
  explanation: string;
  className?: string;
}

export function ExplanationSection({ explanation, className = '' }: ExplanationSectionProps) {
  return (
    <div
      className={`relative rounded-xl bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent border border-sky-600/30 p-2 sm:p-2.5 lg:p-3 shadow-xs hover:border-sky-500/50 transition-all duration-200 group w-full min-w-0 max-w-full dark:from-sky-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-sky-500/30 ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 flex-shrink-0">
        <Lightbulb className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sky-700 dark:text-sky-400 flex-shrink-0" />
        <span className="text-[10px] sm:text-[11px] lg:text-xs font-black uppercase tracking-wider text-sky-800 dark:text-sky-300">
          In Plain English
        </span>
      </div>
      <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-snug break-words hyphens-auto pl-0.5">
        {explanation}
      </p>
    </div>
  );
}
