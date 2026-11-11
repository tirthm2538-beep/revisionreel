import { getSupabaseClient, isSupabaseConfigured, AuthUser } from './supabase';

export interface UserProgressData {
  userId: string;
  isGuest: boolean;
  xpPoints: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  completedCardIds: string[];
  bookmarkedCardIds: string[];
}

export const getTodayDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const isYesterday = (prevDateStr: string, todayStr: string): boolean => {
  try {
    const prevParts = prevDateStr.split('-').map(Number);
    const todayParts = todayStr.split('-').map(Number);
    if (prevParts.length !== 3 || todayParts.length !== 3) return false;

    const prevUtc = Date.UTC(prevParts[0], prevParts[1] - 1, prevParts[2]);
    const todayUtc = Date.UTC(todayParts[0], todayParts[1] - 1, todayParts[2]);

    const diffDays = Math.round((todayUtc - prevUtc) / (1000 * 60 * 60 * 24));
    return diffDays === 1;
  } catch {
    return false;
  }
};

const getStorageKey = (userId: string) => `revisionreel_progress_${userId}`;

export function saveLocalProgress(progress: UserProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(progress.userId), JSON.stringify(progress));
  } catch {
    // Ignore storage write errors
  }
}

/**
 * Load user progress from Supabase if authenticated, or from localStorage for guest
 */
export async function loadUserProgress(user: AuthUser): Promise<UserProgressData> {
  const today = getTodayDateString();

  // Guest Mode or Unconfigured Supabase
  if (user.isGuest || !isSupabaseConfigured()) {
    if (typeof window === 'undefined') {
      return {
        userId: user.id,
        isGuest: true,
        xpPoints: 0,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
        completedCardIds: [],
        bookmarkedCardIds: [],
      };
    }

    try {
      const stored = localStorage.getItem(getStorageKey(user.id));
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Ignore parse errors
    }

    const defaultGuest: UserProgressData = {
      userId: user.id,
      isGuest: true,
      xpPoints: 0,
      currentStreak: 1,
      longestStreak: 1,
      lastActiveDate: today,
      completedCardIds: [],
      bookmarkedCardIds: [],
    };
    saveLocalProgress(defaultGuest);
    return defaultGuest;
  }

  // Supabase Authenticated Mode
  const supabase = getSupabaseClient();
  if (!supabase) {
    return loadUserProgress({ ...user, isGuest: true });
  }

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('xp_points, current_streak, longest_streak, last_active_date')
      .eq('user_id', user.id)
      .maybeSingle();

    const { data: completions } = await supabase
      .from('completed_cards')
      .select('card_id')
      .eq('user_id', user.id);

    const { data: bookmarks } = await supabase
      .from('saved_cards')
      .select('card_id')
      .eq('user_id', user.id);

    const completedCardIds = (completions || []).map((c: { card_id: string }) => c.card_id);
    const bookmarkedCardIds = (bookmarks || []).map((b: { card_id: string }) => b.card_id);

    return {
      userId: user.id,
      isGuest: false,
      xpPoints: profile?.xp_points || 0,
      currentStreak: profile?.current_streak || 1,
      longestStreak: profile?.longest_streak || 1,
      lastActiveDate: profile?.last_active_date || today,
      completedCardIds,
      bookmarkedCardIds,
    };
  } catch (err) {
    console.error('Error fetching Supabase user progress:', err);
    return loadUserProgress({ ...user, isGuest: true });
  }
}

/**
 * Record quiz completion: award +10 XP, update daily streak, sync to DB/localStorage
 */
export async function recordQuizCompletion(
  user: AuthUser,
  current: UserProgressData,
  cardId: string,
  subject: string
): Promise<UserProgressData> {
  const today = getTodayDateString();
  const alreadyCompleted = current.completedCardIds.includes(cardId);
  const newCompleted = alreadyCompleted
    ? current.completedCardIds
    : [...current.completedCardIds, cardId];

  // Calculate Streak
  let newCurrentStreak = current.currentStreak;
  if (current.lastActiveDate === today) {
    // Already active today; streak maintained
  } else if (isYesterday(current.lastActiveDate, today)) {
    // Incremented consecutive day streak
    newCurrentStreak += 1;
  } else {
    // Streak broken; reset to 1
    newCurrentStreak = 1;
  }

  const newLongestStreak = Math.max(current.longestStreak, newCurrentStreak);
  const newXp = current.xpPoints + (alreadyCompleted ? 2 : 10);

  const updated: UserProgressData = {
    ...current,
    xpPoints: newXp,
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    lastActiveDate: today,
    completedCardIds: newCompleted,
  };

  saveLocalProgress(updated);

  // Sync to Supabase if authenticated
  if (!user.isGuest && isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('profiles').upsert({
          user_id: user.id,
          xp_points: newXp,
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_active_date: today,
          updated_at: new Date().toISOString(),
        });

        if (!alreadyCompleted) {
          await supabase.from('completed_cards').upsert({
            user_id: user.id,
            card_id: cardId,
            subject: subject,
            completed_at: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.error('Supabase completion sync error:', e);
      }
    }
  }

  return updated;
}

/**
 * Toggle bookmark for a concept card
 */
export async function toggleBookmark(
  user: AuthUser,
  current: UserProgressData,
  cardId: string
): Promise<UserProgressData> {
  const isSaved = current.bookmarkedCardIds.includes(cardId);
  const newBookmarked = isSaved
    ? current.bookmarkedCardIds.filter((id) => id !== cardId)
    : [...current.bookmarkedCardIds, cardId];

  const updated: UserProgressData = {
    ...current,
    bookmarkedCardIds: newBookmarked,
  };

  saveLocalProgress(updated);

  if (!user.isGuest && isSupabaseConfigured()) {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        if (isSaved) {
          await supabase
            .from('saved_cards')
            .delete()
            .eq('user_id', user.id)
            .eq('card_id', cardId);
        } else {
          await supabase.from('saved_cards').insert({
            user_id: user.id,
            card_id: cardId,
            created_at: new Date().toISOString(),
          });
        }
      } catch (e) {
        console.error('Supabase bookmark error:', e);
      }
    }
  }

  return updated;
}
