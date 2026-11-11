import React from 'react';

interface ProgressBarProps {
  total: number;
  current: number; // 0-indexed
  onSelect?: (index: number) => void;
}

export function StoryProgressBar({ total, current, onSelect }: ProgressBarProps) {
  const progressPercent = Math.min(100, Math.round(((current + 1) / total) * 100));

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
                      ? 'bg-indigo-600 dark:bg-indigo-400 w-full'
                      : isCurrent
                      ? 'bg-indigo-600 dark:bg-indigo-400 w-full shadow-[0_0_8px_rgba(99,102,241,0.8)]'
                      : 'bg-transparent w-0'
                  }`}
                />
              </button>
            );
          })
        ) : (
          <div className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-emerald-500 to-indigo-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
