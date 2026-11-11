import React from 'react';
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
  className?: string;
}

export function AnalogySection({ analogy, iconName = 'Compass', className = '' }: AnalogySectionProps) {
  const renderIcon = () => {
    const iconClass = 'w-3.5 h-3.5 lg:w-4 lg:h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0';
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
      className={`relative rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-600/30 p-2 sm:p-2.5 lg:p-3 shadow-xs hover:border-emerald-500/50 transition-all duration-200 group w-full min-w-0 max-w-full dark:from-emerald-500/15 dark:via-slate-900/80 dark:to-slate-950/90 dark:border-emerald-500/30 ${className}`}
    >
      <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5 flex-shrink-0">
        {renderIcon()}
        <span className="text-[10px] sm:text-[11px] lg:text-xs font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
          Grounded Analogy
        </span>
      </div>
      <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-snug break-words hyphens-auto italic pl-0.5">
        &ldquo;{analogy}&rdquo;
      </p>
    </div>
  );
}
