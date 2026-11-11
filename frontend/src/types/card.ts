export type SubjectType = 'physics' | 'chemistry' | 'mathematics';
export type TrackFilter = SubjectType | 'all';

export interface QuizOption {
  id: string;
  label: 'A' | 'B' | 'C';
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  takeaway: string;
}

export interface StoryCardData {
  id: string;
  conceptNumber: number;
  subject: SubjectType;
  track: string; // for backward compatibility
  trackTitle: string;
  conceptTitle: string;
  tag: string;
  readTime: string;
  hook: string;
  explanation: string;
  analogy: string;
  analogyIcon?: string;
  quiz: Quiz;
}

export interface SubjectMeta {
  id: SubjectType;
  name: string;
  description: string;
  badgeVariant: 'blue' | 'emerald' | 'purple';
  icon: string;
}
