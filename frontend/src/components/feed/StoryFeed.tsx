'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StoryCardData, TrackFilter } from '../../types/card';
import { StoryCard } from '../card/StoryCard';
import { FeedHeader } from './FeedHeader';
import { FeedNavigation } from './FeedNavigation';
import { StoryProgressBar } from '../ui/ProgressBar';
import { AuthUser } from '../../lib/supabase';
import {
  UserProgressData,
  loadUserProgress,
  recordQuizCompletion,
  toggleBookmark,
} from '../../lib/userProgress';

interface StoryFeedProps {
  cards: StoryCardData[];
  user?: AuthUser | null;
  onSignOut?: () => void;
  activeFilter?: TrackFilter;
  onFilterChange?: (filter: TrackFilter) => void;
}

export function StoryFeed({
  cards,
  user,
  onSignOut,
  activeFilter = 'all',
  onFilterChange,
}: StoryFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState<UserProgressData | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  // Load user progress
  useEffect(() => {
    if (user) {
      loadUserProgress(user).then((p) => {
        setProgress(p);
      });
    }
  }, [user]);

  // Reset index when cards change (e.g. subject filter changes)
  useEffect(() => {
    setCurrentIndex(0);
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [cards]);

  const scrollToCard = useCallback(
    (index: number) => {
      if (index < 0 || index >= cards.length) return;
      const container = containerRef.current;
      if (!container) return;

      isProgrammaticScroll.current = true;
      setCurrentIndex(index);

      const targetY = index * container.clientHeight;
      container.scrollTo({
        top: targetY,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    },
    [cards.length]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      scrollToCard(currentIndex + 1);
    }
  }, [currentIndex, cards.length, scrollToCard]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      scrollToCard(currentIndex - 1);
    }
  }, [currentIndex, scrollToCard]);

  // Handle scroll detection
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = containerRef.current;
    if (!container) return;

    const height = container.clientHeight;
    if (height === 0) return;

    const scrollPos = container.scrollTop;
    const newIndex = Math.round(scrollPos / height);
    if (newIndex >= 0 && newIndex < cards.length && newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  // Keyboard navigation (Arrow keys, Page up/down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch swipe support
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartY.current = null;
  };

  // Handler for quiz completion
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

  // Handler for bookmark toggle
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

  if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col h-full w-full items-center justify-center p-6 text-center">
        <p className="text-slate-600 dark:text-slate-400 font-semibold mb-2">
          No cards found for this subject filter.
        </p>
        {onFilterChange && (
          <button
            onClick={() => onFilterChange('all')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold cursor-pointer"
          >
            Show All Subjects
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full max-w-full overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <FeedHeader
        user={user}
        currentStreak={progress?.currentStreak ?? 1}
        xpPoints={progress?.xpPoints ?? 0}
        onSignOut={onSignOut}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
      />

      {/* Progress Dots / Bar */}
      <StoryProgressBar
        total={cards.length}
        current={currentIndex}
        onSelect={(idx) => scrollToCard(idx)}
      />

      {/* Swipeable Snap Feed Container */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex-1 w-full overflow-y-scroll snap-y snap-mandatory no-scrollbar relative"
        style={{ scrollBehavior: 'smooth' }}
      >
        {cards.map((card, index) => {
          const isCompleted = progress?.completedCardIds.includes(card.id) ?? false;
          const isSaved = progress?.bookmarkedCardIds.includes(card.id) ?? false;

          return (
            <div
              key={card.id}
              className="w-full h-full snap-start snap-always flex items-center justify-center p-2 sm:p-4"
            >
              <StoryCard
                card={card}
                isLastCard={index === cards.length - 1}
                isCompleted={isCompleted}
                isSaved={isSaved}
                currentStreak={progress?.currentStreak ?? 1}
                onNextCard={handleNext}
                onQuizComplete={() => handleQuizComplete(card.id)}
                onToggleBookmark={() => handleToggleBookmark(card.id)}
                isDesktopLayout={false}
              />
            </div>
          );
        })}
      </div>

      {/* Floating Navigation Controls */}
      <FeedNavigation
        currentIndex={currentIndex}
        totalCards={cards.length}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </div>
  );
}
