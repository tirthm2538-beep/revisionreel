import React from 'react';
import { SubjectType } from '../../types/card';
import {
  Compass,
  MessageSquare,
  Zap,
  Magnet,
  Activity,
  Radio,
  Layers,
  Scale,
  RefreshCw,
  Flame,
  Shield,
  TrendingUp,
  PieChart,
  Maximize2,
  HelpCircle,
  CheckCircle2,
  Shuffle,
  BookOpen,
} from 'lucide-react';

interface AnalogySectionProps {
  analogy: string;
  iconName?: string;
  subject?: SubjectType;
  className?: string;
}

export function AnalogySection({
  analogy,
  iconName = 'Compass',
  subject = 'chemistry',
  className = '',
}: AnalogySectionProps) {
  const getSubjectStyles = () => {
    switch (subject) {
      case 'physics':
        return {
          container:
            'bg-gradient-to-br from-sky-500/10 via-sky-500/5 to-transparent border border-sky-600/30 hover:border-sky-500/50 dark:from-sky-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-sky-500/30',
          icon: 'text-sky-700 dark:text-sky-400',
          badge: 'text-sky-800 dark:text-sky-300',
        };
      case 'mathematics':
        return {
          container:
            'bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-600/30 hover:border-indigo-500/50 dark:from-indigo-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-indigo-500/30',
          icon: 'text-indigo-700 dark:text-indigo-400',
          badge: 'text-indigo-800 dark:text-indigo-300',
        };
      case 'chemistry':
      default:
        return {
          container:
            'bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-600/30 hover:border-emerald-500/50 dark:from-emerald-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-emerald-500/30',
          icon: 'text-emerald-700 dark:text-emerald-400',
          badge: 'text-emerald-800 dark:text-emerald-300',
        };
    }
  };

  const styles = getSubjectStyles();

  const renderIcon = () => {
    const iconClass = `w-3.5 h-3.5 lg:w-4 lg:h-4 ${styles.icon} flex-shrink-0`;
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare className={iconClass} />;
      case 'Zap':
        return <Zap className={iconClass} />;
      case 'Magnet':
        return <Magnet className={iconClass} />;
      case 'Activity':
        return <Activity className={iconClass} />;
      case 'Radio':
        return <Radio className={iconClass} />;
      case 'Layers':
        return <Layers className={iconClass} />;
      case 'Scale':
        return <Scale className={iconClass} />;
      case 'RefreshCw':
        return <RefreshCw className={iconClass} />;
      case 'Flame':
        return <Flame className={iconClass} />;
      case 'Shield':
        return <Shield className={iconClass} />;
      case 'TrendingUp':
        return <TrendingUp className={iconClass} />;
      case 'PieChart':
        return <PieChart className={iconClass} />;
      case 'Maximize2':
        return <Maximize2 className={iconClass} />;
      case 'HelpCircle':
        return <HelpCircle className={iconClass} />;
      case 'CheckCircle2':
        return <CheckCircle2 className={iconClass} />;
      case 'Shuffle':
        return <Shuffle className={iconClass} />;
      default:
        return <Compass className={iconClass} />;
    }
  };

  return (
    <div
      className={`relative rounded-xl p-2 sm:p-2.5 lg:p-3 shadow-xs transition-all duration-200 group w-full min-w-0 max-w-full ${styles.container} ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 flex-shrink-0">
        {renderIcon()}
        <span className={`text-[10px] sm:text-[11px] lg:text-xs font-black uppercase tracking-wider ${styles.badge}`}>
          Grounded Analogy
        </span>
      </div>
      <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-snug break-words hyphens-auto italic pl-0.5">
        &ldquo;{analogy}&rdquo;
      </p>
    </div>
  );
}
