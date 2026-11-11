'use client';

import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`flex items-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer ${
        isDark
          ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-700/80 hover:border-slate-600 shadow-sm'
          : 'bg-slate-100 hover:bg-slate-200 text-indigo-800 border border-slate-300 hover:border-slate-400 shadow-sm'
      } ${
        compact
          ? 'p-1.5'
          : 'px-2.5 py-1 text-xs font-semibold'
      } ${className}`}
    >
      {isDark ? (
        <>
          <Sun className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 animate-spin-slow" />
          {!compact && <span>Light</span>}
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-indigo-700 flex-shrink-0" />
          {!compact && <span>Dark</span>}
        </>
      )}
    </button>
  );
}
