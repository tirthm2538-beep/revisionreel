import React from 'react';
import { SubjectType } from '../../types/card';

interface ProgressBarProps {
  total: number;
  current: number; // 0-indexed
  subject?: SubjectType;
  onSelect?: (index: number) => void;
}

export function StoryProgressBar({ total, current, subject = 'physics', onSelect }: ProgressBarProps) {
  const progressPercent = Math.min(100, Math.round(((current + 1) / total) * 100));

  const getSubjectColor = () => {
    switch (subject) {
      case 'physics':
        return {
          bar: 'bg-sky-500 dark:bg-sky-400',
          shadow: 'shadow-[0_0_8px_rgba(14,165,233,0.8)]',
        };
      case 'chemistry':
        return {
          bar: 'bg-emerald-500 dark:bg-emerald-400',
          shadow: 'shadow-[0_0_8px_rgba(16,185,129,0.8)]',
        };
      case 'mathematics':
      default:
        return {
          bar: 'bg-indigo-500 dark:bg-indigo-400',
          shadow: 'shadow-[0_0_8px_rgba(99,102,241,0.8)]',
        };
    }
  };

  const colors = getSubjectColor();

  return (
    <div className="w-full max-w-full px-3 pt-2 pb-1.5 z-20 flex flex-col gap-1 overflow-hidden">
      <div className="flex items-center gap-1 w-full max-w-full">
        {total <= 12 ? (
          Array.from({ length: total }).map((_, index) => {
            const isPassed = index < current;
            const isCurrent = index === current;

            return (
              <button
                key={index}
                onClick={() => onSelect?.(index)}
                aria-label={`Go to slide ${index + 1}`}
                className="flex-1 h-1 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 transition-all duration-300 relative cursor-pointer focus:outline-none"
              >
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isPassed
                      ? `${colors.bar} w-full opacity-80`
                      : isCurrent
                      ? `${colors.bar} w-full ${colors.shadow}`
                      : 'bg-transparent w-0'
                  }`}
                />
              </button>
            );
          })
        ) : (
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className={`h-full ${colors.bar} rounded-full transition-all duration-300 ${colors.shadow}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
