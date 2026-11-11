'use client';

import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface FeedNavigationProps {
  currentIndex: number;
  totalCards: number;
  onPrev: () => void;
  onNext: () => void;
}

export function FeedNavigation({
  currentIndex,
  totalCards,
  onPrev,
  onNext,
}: FeedNavigationProps) {
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < totalCards - 1;

  return (
    <div className="fixed right-3 bottom-6 sm:right-6 sm:bottom-8 z-40 flex flex-col items-center gap-2">
      {/* Up Button */}
      <button
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Previous card"
        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer ${
          canGoPrev
            ? 'bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-white hover:scale-105 border border-slate-200 dark:border-slate-700'
            : 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40 cursor-not-allowed border border-transparent'
        }`}
      >
        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
      </button>

      {/* Slide Counter Pill */}
      <div className="px-2 py-0.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 text-white text-[10px] font-bold border border-slate-700/60 backdrop-blur-md shadow-sm">
        {currentIndex + 1}/{totalCards}
      </div>

      {/* Down Button */}
      <button
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Next card"
        className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer ${
          canGoNext
            ? 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105 shadow-indigo-600/30'
            : 'bg-slate-200/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 opacity-40 cursor-not-allowed border border-transparent'
        }`}
      >
        <ChevronDown className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
