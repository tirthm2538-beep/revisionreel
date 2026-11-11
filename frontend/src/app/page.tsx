'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { StoryCardData, TrackFilter } from '../types/card';
import { SAMPLE_CARDS } from '../data/sampleCards';
import { StoryFeed } from '../components/feed/StoryFeed';
import { DesktopStoryDashboard } from '../components/feed/DesktopStoryDashboard';
import { AuthScreen } from '../components/auth/AuthScreen';
import {
  AuthUser,
  getSupabaseClient,
  isSupabaseConfigured,
  getGuestUser,
  setGuestUser,
} from '../lib/supabase';
import { fetchCards } from '../services/api';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [cards, setCards] = useState<StoryCardData[]>(SAMPLE_CARDS);
  const [activeFilter, setActiveFilter] = useState<TrackFilter>('all');
  const [viewMode, setViewMode] = useState<'responsive' | 'mobile-forced'>('responsive');
  const [isDesktopScreen, setIsDesktopScreen] = useState(false);

  // Responsive screen detection
  useEffect(() => {
    const checkScreen = () => {
      setIsDesktopScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Check initial authentication state (Supabase session or Guest session)
  useEffect(() => {
    const checkAuth = async () => {
      // 0. Check URL query parameters for demo/guest bypass (?guest=true or ?demo=true)
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('subject')) {
          const sub = params.get('subject') as TrackFilter;
          if (['physics', 'chemistry', 'mathematics', 'all'].includes(sub)) {
            setActiveFilter(sub);
          }
        }
        if (params.get('guest') === 'true' || params.get('demo') === 'true') {
          const guest: AuthUser = {
            id: 'guest-demo-student',
            email: 'student@revisionreel.demo',
            displayName: 'Class 12 Scholar',
            isGuest: true,
          };
          setGuestUser(guest);
          setUser(guest);
          setAuthChecking(false);
          return;
        }
      }

      // 1. Check Guest storage
      const guest = getGuestUser();
      if (guest) {
        setUser(guest);
        setAuthChecking(false);
        return;
      }

      // 2. Check Supabase session if configured
      if (isSupabaseConfigured()) {
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data } = await supabase.auth.getSession();
          if (data.session?.user) {
            setUser({
              id: data.session.user.id,
              email: data.session.user.email || 'student@revisionreel.app',
              isGuest: false,
            });
          }
        }
      }

      setAuthChecking(false);
    };

    checkAuth();
  }, []);

  // Fetch cards (backend with fallback)
  useEffect(() => {
    let isMounted = true;
    fetchCards(activeFilter).then(({ cards: loadedCards }) => {
      if (isMounted && loadedCards.length > 0) {
        setCards(loadedCards);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [activeFilter]);

  const handleSignOut = async () => {
    if (user?.isGuest) {
      setGuestUser(null);
    } else if (isSupabaseConfigured()) {
      const supabase = getSupabaseClient();
      if (supabase) {
        await supabase.auth.signOut();
      }
    }
    setUser(null);
  };

  if (authChecking) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-950 text-indigo-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onAuthSuccess={(authenticatedUser) => setUser(authenticatedUser)} />;
  }

  // Filtered cards passed to story feed
  const displayCards =
    activeFilter === 'all' ? cards : cards.filter((c) => c.subject === activeFilter);

  // Render desktop dashboard if on desktop screen and not explicitly forced to mobile feed
  if (isDesktopScreen && viewMode === 'responsive') {
    return (
      <DesktopStoryDashboard
        cards={cards}
        user={user}
        onSignOut={handleSignOut}
        onToggleMobileView={() => setViewMode('mobile-forced')}
      />
    );
  }

  // Otherwise render swipeable mobile-first snap story feed
  return (
    <StoryFeed
      cards={displayCards}
      user={user}
      onSignOut={handleSignOut}
      activeFilter={activeFilter}
      onFilterChange={(filter) => setActiveFilter(filter)}
    />
  );
}
