import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'emerald' | 'purple' | 'amber' | 'slate';
  size?: 'sm' | 'md';
}

export function Badge({ children, variant = 'blue', size = 'sm' }: BadgeProps) {
  const variantStyles = {
    blue: 'bg-sky-500/15 text-sky-800 dark:text-sky-300 border-sky-500/30 font-bold',
    emerald: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30 font-bold',
    purple: 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-300 border-indigo-500/30 font-bold',
    amber: 'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30 font-bold',
    slate: 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700 font-semibold',
  };

  const sizeStyles = {
    sm: 'text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full tracking-wide',
    md: 'text-xs px-3 py-1 rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 border uppercase backdrop-blur-sm ${variantStyles[variant]} ${sizeStyles[size]}`}
    >
      {children}
    </span>
  );
}
