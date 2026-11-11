'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StoryCardData, SubjectType } from '../../types/card';
import { StoryCard } from '../card/StoryCard';
import { AuthUser } from '../../lib/supabase';
import {
  UserProgressData,
  loadUserProgress,
  recordQuizCompletion,
  toggleBookmark,
} from '../../lib/userProgress';
import { ThemeToggle } from '../ui/ThemeToggle';
import {
  Flame,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Bookmark,
  GraduationCap,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Smartphone,
  LayoutDashboard,
  Atom,
  FlaskConical,
  Sigma,
} from 'lucide-react';

interface DesktopStoryDashboardProps {
  cards: StoryCardData[];
  user: AuthUser;
  onSignOut?: () => void;
  onToggleMobileView?: () => void;
}

export function DesktopStoryDashboard({
  cards,
  user,
  onSignOut,
  onToggleMobileView,
}: DesktopStoryDashboardProps) {
  const [selectedCardId, setSelectedCardId] = useState<string>(cards[0]?.id || '');
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<'all' | SubjectType | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState<UserProgressData | null>(null);

  // Load progress
  useEffect(() => {
    if (user) {
      loadUserProgress(user).then((p) => {
        setProgress(p);
      });
    }
  }, [user]);

  // Keep selected card valid
  useEffect(() => {
    if (cards.length > 0 && !cards.some((c) => c.id === selectedCardId)) {
      setSelectedCardId(cards[0].id);
    }
  }, [cards, selectedCardId]);

  // Filtered cards list
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      if (activeSubjectFilter === 'physics' && card.subject !== 'physics') return false;
      if (activeSubjectFilter === 'chemistry' && card.subject !== 'chemistry') return false;
      if (activeSubjectFilter === 'mathematics' && card.subject !== 'mathematics') return false;
      if (activeSubjectFilter === 'saved' && !progress?.bookmarkedCardIds.includes(card.id)) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = card.conceptTitle.toLowerCase().includes(query);
        const matchTag = card.tag.toLowerCase().includes(query);
        const matchHook = card.hook.toLowerCase().includes(query);
        return matchTitle || matchTag || matchHook;
      }

      return true;
    });
  }, [cards, activeSubjectFilter, searchQuery, progress]);

  const activeCardIndex = filteredCards.findIndex((c) => c.id === selectedCardId);
  const activeCard = filteredCards[activeCardIndex] || filteredCards[0] || cards[0];

  const handleNext = () => {
    if (activeCardIndex >= 0 && activeCardIndex < filteredCards.length - 1) {
      setSelectedCardId(filteredCards[activeCardIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (activeCardIndex > 0) {
      setSelectedCardId(filteredCards[activeCardIndex - 1].id);
    }
  };

  const handleQuizComplete = async (cardId: string) => {
    if (!user) return;
    const card = cards.find((c) => c.id === cardId);
    const subject = card?.subject || 'general';

    const current = progress || {
      userId: user.id,
      isGuest: Boolean(user.isGuest),
      xpPoints: 0,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: '',
      completedCardIds: [],
      bookmarkedCardIds: [],
    };
    const updated = await recordQuizCompletion(user, current, cardId, subject);
    setProgress(updated);
  };

  const handleToggleBookmark = async (cardId: string) => {
    if (!user) return;
    const current = progress || {
      userId: user.id,
      isGuest: Boolean(user.isGuest),
      xpPoints: 0,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: '',
      completedCardIds: [],
      bookmarkedCardIds: [],
    };
    const updated = await toggleBookmark(user, current, cardId);
    setProgress(updated);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden font-sans transition-colors">
      {/* Top Navbar */}
      <header className="h-14 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-6 flex items-center justify-between flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5 text-white stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                Revision<span className="text-indigo-600 dark:text-indigo-400">Reel</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                Study Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Center: Quick Switch or Tagline */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span>Class 11-12 Board & JEE Foundation</span>
          <span>&bull;</span>
          <span>60-Second Story Cards</span>
        </div>

        {/* Right Stats & Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mobile phone reel toggle */}
          {onToggleMobileView && (
            <button
              onClick={onToggleMobileView}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
              <span>Mobile Feed</span>
            </button>
          )}

          {/* Streak */}
          <div className="flex items-center gap-1.5 font-bold text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25 text-xs dark:text-amber-300">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{progress?.currentStreak ?? 1} Day Streak</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 font-bold text-indigo-800 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/25 text-xs dark:text-indigo-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{progress?.xpPoints ?? 0} XP</span>
          </div>

          <ThemeToggle compact />

          {onSignOut && (
            <button
              onClick={onSignOut}
              title={`Sign out (${user.displayName || user.email})`}
              className="p-1.5 rounded-full text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Main Dual-Pane Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: Concepts Browser */}
        <aside className="w-80 lg:w-96 bg-white dark:bg-slate-900/60 border-r border-slate-200 dark:border-slate-800 flex flex-col flex-shrink-0">
          {/* Subject Filter Tabs */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveSubjectFilter('all')}
                className={`py-1 rounded-md transition-colors cursor-pointer ${
                  activeSubjectFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveSubjectFilter('physics')}
                className={`py-1 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                  activeSubjectFilter === 'physics'
                    ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Atom className="w-3 h-3" /> Phys
              </button>
              <button
                onClick={() => setActiveSubjectFilter('chemistry')}
                className={`py-1 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                  activeSubjectFilter === 'chemistry'
                    ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <FlaskConical className="w-3 h-3" /> Chem
              </button>
              <button
                onClick={() => setActiveSubjectFilter('mathematics')}
                className={`py-1 rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                  activeSubjectFilter === 'mathematics'
                    ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Sigma className="w-3 h-3" /> Math
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search concepts, tags, formulas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Cards List */}
          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1 scrollbar-thin">
            {filteredCards.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No matching concept cards found.
              </div>
            ) : (
              filteredCards.map((card) => {
                const isSelected = card.id === selectedCardId;
                const isDone = progress?.completedCardIds.includes(card.id);
                const isSaved = progress?.bookmarkedCardIds.includes(card.id);
                const isPhys = card.subject === 'physics';
                const isChem = card.subject === 'chemistry';

                const activeCardStyle = isPhys
                  ? 'bg-sky-50/90 border-sky-400/90 shadow-xs dark:bg-sky-950/40 dark:border-sky-500/70'
                  : isChem
                  ? 'bg-emerald-50/90 border-emerald-400/90 shadow-xs dark:bg-emerald-950/40 dark:border-emerald-500/70'
                  : 'bg-indigo-50/90 border-indigo-400/90 shadow-xs dark:bg-indigo-950/40 dark:border-indigo-500/70';

                const numberBadgeStyle = isSelected
                  ? isPhys
                    ? 'bg-sky-600 text-white'
                    : isChem
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

                const tagBadgeStyle = isPhys
                  ? 'text-sky-700 bg-sky-500/10 border-sky-500/20 dark:text-sky-300'
                  : isChem
                  ? 'text-emerald-700 bg-emerald-500/10 border-emerald-500/20 dark:text-emerald-300'
                  : 'text-indigo-700 bg-indigo-500/10 border-indigo-500/20 dark:text-indigo-300';

                return (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCardId(card.id)}
                    className={`w-full text-left p-2.5 rounded-xl border transition-all duration-150 flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? activeCardStyle
                        : 'bg-white dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 ${numberBadgeStyle}`}
                    >
                      {card.conceptNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border ${tagBadgeStyle}`}>
                          {card.tag}
                        </span>
                        <div className="flex items-center gap-1">
                          {isDone && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          )}
                          {isSaved && (
                            <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500 flex-shrink-0" />
                          )}
                        </div>
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {card.conceptTitle}
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {card.hook}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>
              {progress?.completedCardIds.length || 0} of {cards.length} Mastered
            </span>
            <span className="font-semibold">
              {Math.round(((progress?.completedCardIds.length || 0) / cards.length) * 100)}%
            </span>
          </div>
        </aside>

        {/* Right Active Card Display */}
        <main className="flex-1 flex flex-col overflow-y-auto p-4 lg:p-6 bg-slate-100/60 dark:bg-slate-950/80">
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-4">
            {/* Navigation Header */}
            <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Concept {activeCardIndex + 1} of {filteredCards.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={activeCardIndex <= 0}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 disabled:opacity-40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeCardIndex >= filteredCards.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 disabled:opacity-40 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Card Body */}
            {activeCard && (
              <div
                className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md p-4 lg:p-6 border-t-4 transition-all duration-300 ${
                  activeCard.subject === 'physics'
                    ? 'border-t-sky-500 shadow-sky-500/5'
                    : activeCard.subject === 'chemistry'
                    ? 'border-t-emerald-500 shadow-emerald-500/5'
                    : 'border-t-indigo-500 shadow-indigo-500/5'
                }`}
              >
                <StoryCard
                  card={activeCard}
                  isLastCard={activeCardIndex === filteredCards.length - 1}
                  isCompleted={progress?.completedCardIds.includes(activeCard.id) ?? false}
                  isSaved={progress?.bookmarkedCardIds.includes(activeCard.id) ?? false}
                  currentStreak={progress?.currentStreak ?? 1}
                  onNextCard={handleNext}
                  onQuizComplete={() => handleQuizComplete(activeCard.id)}
                  onToggleBookmark={() => handleToggleBookmark(activeCard.id)}
                  isDesktopLayout={true}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
