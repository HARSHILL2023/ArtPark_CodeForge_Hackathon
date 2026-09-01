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
      iconColor: 'text-[#6366F1]',
      badgeBg: 'bg-[#6366F1]/10 text-[#6366F1] border-[#6366F1]/20',
    },
    {
      label: 'Skill Confidence',
      value: `${skillConfidence}%`,
      sublabel: 'Proficiency Depth',
      icon: Shield,
      iconColor: 'text-[#10B981]',
      badgeBg: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
    },
    {
      label: 'Critical Gaps',
      value: missingSkills,
      sublabel: 'Skills to Acquire',
      icon: CircleAlert,
      iconColor: 'text-[#EF4444]',
      badgeBg: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
    },
    {
      label: 'Learning Velocity',
      value: `${weakSkills <= 2 ? 'Accelerated' : 'Standard'}`,
      sublabel: `${weakSkills} Skills Need Upgrade`,
      icon: Award,
      iconColor: 'text-[#F59E0B]',
      badgeBg: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    },
  ];

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#111418] border border-[#E2E5E9] dark:border-[#252A31] rounded-2xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[#E2E5E9] dark:border-[#252A31] bg-[#F7F8FA] dark:bg-[#171A1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#16181D] dark:text-[#F5F7FA]">Job Readiness Intelligence</h2>
            <p className="text-[11px] text-[#5F6672] dark:text-[#A7AFBA]">Real-time candidate profile fit analysis</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#111418] dark:bg-[#171A1F] border border-[#252A31] text-xs font-semibold text-[#A7AFBA] self-start sm:self-auto">
          <Clock className="w-3.5 h-3.5 text-[#6366F1]" />
          <span>Est. Completion: {totalTime}</span>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Main 2-Column Gauge + Stat Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Circular Progress Gauge */}
          <div className="lg:col-span-4 p-5 bg-[#F7F8FA] dark:bg-[#171A1F] rounded-xl border border-[#E2E5E9] dark:border-[#252A31] flex flex-col items-center justify-center">
            <CircularProgress score={readinessScore} size={140} strokeWidth={9} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5F6672] dark:text-[#737C88] mt-3">
              Overall Match Score
            </span>
          </div>

          {/* 4 Stat Cards */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-xl bg-[#F7F8FA] dark:bg-[#171A1F] border border-[#E2E5E9] dark:border-[#252A31]"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-[#5F6672] dark:text-[#A7AFBA]">{stat.label}</span>
                    <div className={`p-1 rounded-md border ${stat.badgeBg}`}>
                      <Icon className="w-3 h-3" />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#16181D] dark:text-[#F5F7FA] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-[#5F6672] dark:text-[#737C88] mt-0.5">
                    {stat.sublabel}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Learning Personalization Mode */}
        <div className="p-4 rounded-xl bg-[#F7F8FA] dark:bg-[#171A1F] border border-[#E2E5E9] dark:border-[#252A31] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-[#16181D] dark:text-[#F5F7FA] block">
              Personalized Learning Modality
            </span>
            <p className="text-[11px] text-[#5F6672] dark:text-[#A7AFBA] mt-0.5">
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
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onStyleChange(style.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 border ${
                    learningStyle === style.id
                      ? 'bg-[#6366F1] text-white border-[#6366F1]'
                      : 'bg-white dark:bg-[#111418] text-[#5F6672] dark:text-[#A7AFBA] border-[#E2E5E9] dark:border-[#252A31] hover:text-[#16181D] dark:hover:text-white'
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
          <div className="flex items-center justify-between text-xs font-medium mb-1.5">
            <span className="text-[#5F6672] dark:text-[#A7AFBA]">Curriculum Milestone Progress</span>
            <span className="text-[#6366F1] font-bold">{Math.round(roadmapProgress)}% Completed</span>
          </div>
          <div className="w-full h-2 bg-[#E2E5E9] dark:bg-[#252A31] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${roadmapProgress}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="h-full bg-[#6366F1] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}