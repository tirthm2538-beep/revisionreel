import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';

export const metadata: Metadata = {
  title: 'RevisionReel — Micro-Learning Story Cards for Class 11-12 & JEE',
  description:
    'Master high-yield Class 11-12 Board and JEE Foundation Physics, Chemistry, and Math concepts through 60-second bite-sized swipeable story cards with interactive quizzes.',
  keywords: [
    'RevisionReel',
    'Class 11',
    'Class 12',
    'JEE Foundation',
    'Physics',
    'Chemistry',
    'Mathematics',
    'Board Exams',
    'Micro-learning',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
