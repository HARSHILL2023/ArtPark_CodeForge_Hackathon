import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Shield, CircleAlert, Clock, Award, Wrench, Layers, BookOpen } from 'lucide-react';
import CircularProgress from './CircularProgress';

export default function GapSummary({
  readinessScore,
  matchPercentage,
  missingSkills,
  weakSkills,
  totalTime,
  roadmapProgress,
  skillConfidence,
  learningStyle,
  onStyleChange
}) {
  const stats = [
    {
      label: 'Match Rate',
      value: `${matchPercentage}%`,
      sublabel: 'Requirements Met',
      icon: TrendingUp,
      iconColor: 'text-[#B88916] dark:text-[#D4A72C]',
      badgeBg: 'bg-[#B88916]/10 dark:bg-[#D4A72C]/10 text-[#B88916] dark:text-[#D4A72C] border-[#B88916]/20 dark:border-[#D4A72C]/25',
    },
    {
      label: 'Skill Confidence',
      value: `${skillConfidence}%`,
      sublabel: 'Proficiency Depth',
      icon: Shield,
      iconColor: 'text-[#237A4B] dark:text-[#4CAF7A]',
      badgeBg: 'bg-[#237A4B]/10 dark:bg-[#4CAF7A]/10 text-[#237A4B] dark:text-[#4CAF7A] border-[#237A4B]/20 dark:border-[#4CAF7A]/25',
    },
    {
      label: 'Critical Gaps',
      value: missingSkills,
      sublabel: 'Skills to Acquire',
      icon: CircleAlert,
      iconColor: 'text-[#B33A3A] dark:text-[#D96565]',
      badgeBg: 'bg-[#B33A3A]/10 dark:bg-[#D96565]/10 text-[#B33A3A] dark:text-[#D96565] border-[#B33A3A]/20 dark:border-[#D96565]/25',
    },
    {
      label: 'Learning Velocity',
      value: `${weakSkills <= 2 ? 'Accelerated' : 'Standard'}`,
      sublabel: `${weakSkills} Skills Need Upgrade`,
      icon: Award,
      iconColor: 'text-[#9A6B00] dark:text-[#D6A84F]',
      badgeBg: 'bg-[#9A6B00]/10 dark:bg-[#D6A84F]/10 text-[#9A6B00] dark:text-[#D6A84F] border-[#9A6B00]/20 dark:border-[#D6A84F]/25',
    },
  ];

  return (
    <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#237A4B]/10 dark:bg-[#4CAF7A]/10 border border-[#237A4B]/20 dark:border-[#4CAF7A]/25 flex items-center justify-center text-[#237A4B] dark:text-[#4CAF7A]">
            <Target className="w-3.5 h-3.5" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Job Readiness Intelligence</h2>
            <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">Real-time candidate profile fit analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] text-xs font-semibold text-[#5E5C56] dark:text-[#B4B1A9] self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C]" />
          <span>Est. Completion: {totalTime}</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Main 2-Column Gauge + Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center">
          {/* Circular Progress Gauge */}
          <div className="lg:col-span-4 p-4 bg-[#FCFBF8] dark:bg-[#181B1F] rounded-xl border border-[#DCD9D1] dark:border-[#292D33] flex flex-col items-center justify-center">
            <CircularProgress score={readinessScore} size={130} strokeWidth={8} color="#D4A72C" />
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#85827A] dark:text-[#7E7C77] mt-2.5">
              Overall Match Score
            </span>
          </div>

          {/* 4 Stat Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-2.5">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-3 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33]"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-medium text-[#5E5C56] dark:text-[#B4B1A9]">{stat.label}</span>
                    <div className={`p-1 rounded-md border ${stat.badgeBg}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="text-lg font-bold text-[#1B1B19] dark:text-[#F2F0EA] tracking-tight font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#85827A] dark:text-[#7E7C77] mt-0.5">
                    {stat.sublabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Personalization Mode */}
        <div className="p-3.5 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <span className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA] block">
              Personalized Learning Modality
            </span>
            <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9] mt-0.5">
              Adapts module study guides and recommended exercises to your preferred style.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: 'Practical', label: 'Hands-on', icon: Wrench },
              { id: 'Visual', label: 'Visual', icon: Layers },
              { id: 'Theoretical', label: 'In-Depth', icon: BookOpen }
            ].map(style => {
              const StyleIcon = style.icon;
              const isSelected = learningStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onStyleChange(style.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F] border-transparent'
                      : 'bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] border-[#DCD9D1] dark:border-[#292D33] hover:text-[#1B1B19] dark:hover:text-white'
                  }`}
                >
                  <StyleIcon className="w-3 h-3" />
                  <span>{style.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Roadmap Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium mb-1">
            <span className="text-[#5E5C56] dark:text-[#B4B1A9]">Curriculum Milestone Progress</span>
            <span className="text-[#B88916] dark:text-[#D4A72C] font-bold font-mono">{Math.round(roadmapProgress)}% Completed</span>
          </div>
          <div className="w-full h-1.5 bg-[#EEECE6] dark:bg-[#292D33] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${roadmapProgress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full bg-[#B88916] dark:bg-[#D4A72C] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}