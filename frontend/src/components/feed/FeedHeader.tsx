'use client';

import React from 'react';
import { AuthUser } from '../../lib/supabase';
import { ThemeToggle } from '../ui/ThemeToggle';
import { GraduationCap, Flame, Sparkles, LogOut, BookOpen } from 'lucide-react';
import { TrackFilter } from '../../types/card';

interface FeedHeaderProps {
  user?: AuthUser | null;
  currentStreak?: number;
  xpPoints?: number;
  onSignOut?: () => void;
  activeFilter?: TrackFilter;
  onFilterChange?: (filter: TrackFilter) => void;
  isDesktop?: boolean;
}

export function FeedHeader({
  user,
  currentStreak = 1,
  xpPoints = 0,
  onSignOut,
  activeFilter = 'all',
  onFilterChange,
  isDesktop = false,
}: FeedHeaderProps) {
  return (
    <header className="w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-3 py-2 sm:px-4 sm:py-2.5 z-30 flex-shrink-0 transition-colors">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                Revision<span className="text-indigo-600 dark:text-indigo-400">Reel</span>
              </span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                11-12 Board & JEE
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Swipeable 60s Micro-Learning Cards
            </p>
          </div>
        </div>

        {/* Filter Pills (if provided and not desktop) */}
        {onFilterChange && !isDesktop && (
          <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => onFilterChange('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (18)
            </button>
            <button
              onClick={() => onFilterChange('physics')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                activeFilter === 'physics'
                  ? 'bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Physics (6)
            </button>
            <button
              onClick={() => onFilterChange('chemistry')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                activeFilter === 'chemistry'
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Chemistry (6)
            </button>
            <button
              onClick={() => onFilterChange('mathematics')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                activeFilter === 'mathematics'
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Math (6)
            </button>
          </div>
        )}

        {/* User Stats & Controls */}
        <div className="flex items-center gap-2">
          {/* Streak */}
          <div
            title="Daily active learning streak"
            className="flex items-center gap-1 font-bold text-amber-800 bg-amber-500/10 px-2 sm:px-2.5 py-1 rounded-full border border-amber-500/25 text-xs dark:text-amber-300"
          >
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{currentStreak}d</span>
          </div>

          {/* XP */}
          <div
            title="Revision XP earned"
            className="hidden sm:flex items-center gap-1 font-bold text-indigo-800 bg-indigo-500/10 px-2 sm:px-2.5 py-1 rounded-full border border-indigo-500/25 text-xs dark:text-indigo-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{xpPoints} XP</span>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle compact />

          {/* User Sign Out */}
          {user && onSignOut && (
            <button
              onClick={onSignOut}
              title={`Signed in as ${user.displayName || user.email} (${user.isGuest ? 'Guest' : 'Account'}) - Click to Exit`}
              className="p-1.5 rounded-full text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
