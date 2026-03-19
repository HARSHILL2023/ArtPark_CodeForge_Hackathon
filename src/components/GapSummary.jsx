import { motion } from 'framer-motion';
import { TrendingUp, Target, Shield, XCircle, Clock } from 'lucide-react';
import CircularProgress from './CircularProgress';

export default function GapSummary({
  readinessScore,
  matchPercentage,
  missingSkills,
  weakSkills,
  totalTime,
  roadmapProgress,
  skillConfidence
}) {
  const stats = [
    {
      label: 'Match Rate',
      value: `${matchPercentage}%`,
      icon: TrendingUp,
      color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
      trend: matchPercentage >= 70 ? 'up' : 'down',
    },
    {
      label: 'Skill Confidence',
      value: `${skillConfidence}%`,
      icon: Shield,
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
      trend: skillConfidence >= 80 ? 'up' : 'down',
    },
    {
      label: 'Critical Gaps',
      value: missingSkills,
      icon: XCircle,
      color: 'bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
      trend: missingSkills <= 1 ? 'up' : 'down',
    },
    {
      label: 'Learning Velocity',
      value: `${weakSkills <= 2 ? 'High' : 'Moderate'}`,
      icon: TrendingUp,
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
      trend: 'up',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-indigo-100/20 dark:shadow-none"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900 px-8 py-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100/80 dark:bg-emerald-500/10 rounded-xl">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Job Readiness Dashboard</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Real-time progress and predictive analysis</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/25">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-bold tracking-tight">ETA: {totalTime}</span>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1.5">Predicted Completion</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Circular Progress */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50">
            <CircularProgress score={readinessScore} />
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mt-6">Match Readiness</p>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="flex flex-col gap-3 p-4 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 hover:border-indigo-500/30 transition-all shadow-sm"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Learning Path Progress */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Overall Path Progress</span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Status of your Adaptive Roadmap milestones</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{Math.round(roadmapProgress)}%</span>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Completed</p>
            </div>
          </div>
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 overflow-hidden border border-slate-200 dark:border-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${roadmapProgress}%` }}
              transition={{ duration: 1.5, ease: 'circOut' }}
              className="h-full rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}