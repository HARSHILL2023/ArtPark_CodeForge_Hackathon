import { motion } from 'framer-motion';
import { TrendingUp, Target, AlertTriangle, XCircle, MoreVertical } from 'lucide-react';
import CircularProgress from './CircularProgress';

export default function GapSummary({
  readinessScore,
  matchPercentage,
  missingSkills,
  weakSkills,
}) {
  const stats = [
    {
      label: 'Overall Match',
      value: `${matchPercentage}%`,
      icon: Target,
      color: 'bg-indigo-500 shadow-indigo-500/20',
      description: 'Alignment with core job requirements',
      trend: matchPercentage >= 70 ? 'Optimal' : 'Needs Focus',
      trendColor: matchPercentage >= 70 ? 'text-emerald-500' : 'text-amber-500'
    },
    {
      label: 'Critical Gaps',
      value: missingSkills,
      icon: XCircle,
      color: 'bg-rose-500 shadow-rose-500/20',
      description: 'Minimum required skills not found',
      trend: missingSkills === 0 ? 'Clear' : `${missingSkills} Pending`,
      trendColor: missingSkills === 0 ? 'text-emerald-500' : 'text-rose-500'
    },
    {
      label: 'Growth Areas',
      value: weakSkills,
      icon: TrendingUp,
      color: 'bg-amber-500 shadow-amber-500/20',
      description: 'Partial match, needs upskilling',
      trend: weakSkills <= 2 ? 'Low Risk' : 'High Risk',
      trendColor: weakSkills <= 2 ? 'text-emerald-500' : 'text-amber-500'
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60 overflow-hidden ring-1 ring-white/20 dark:ring-slate-800/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-8 py-8 text-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />

        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl ring-1 ring-white/40">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight leading-none">Readiness Status</h2>
              <p className="text-emerald-50/80 text-xs font-bold mt-1.5 uppercase tracking-widest">Real-time matching metrics</p>
            </div>
          </div>
          <button className="p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-center">
          {/* Circular Progress (Larger on Desktop) */}
          <div className="xl:col-span-5 flex items-center justify-center py-6">
            <CircularProgress score={readinessScore} />
          </div>

          {/* Stat Cards */}
          <div className="xl:col-span-7 space-y-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5, ease: "backOut" }}
                className="group p-5 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 transition-all hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-5">
                  <div className={`p-3 rounded-2xl ${stat.color} text-white transition-all group-hover:scale-110 shadow-lg`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">{stat.label}</p>
                      <p className={`text-[10px] font-black uppercase tracking-widest ${stat.trendColor}`}>{stat.trend}</p>
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">{stat.value}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">/ {stat.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Progress Bar (Modernized) */}
        <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">Global System Index</span>
              <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
            </div>
            <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight tabular-nums">{readinessScore}% COMPLETION</span>
          </div>
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-1 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${readinessScore}%` }}
              transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
              className={`h-full rounded-full bg-gradient-to-r relative ${readinessScore >= 80
                  ? 'from-emerald-500 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : readinessScore >= 60
                    ? 'from-amber-500 to-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'from-rose-500 to-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                }`}
            >
              <div className="absolute inset-0 bg-white/20 animate-[move_5s_linear_infinite]"
                style={{ backgroundImage: 'linear-gradient(45deg, transparent 25%, rgba(255,255,255,.2) 50%, transparent 75%)', backgroundSize: '1rem 1rem' }} />
            </motion.div>
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1">
            <span>Candidate Evaluation</span>
            <span>Strategic Readiness</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes move {
            0% { background-position: 0 0; }
            100% { background-position: 4rem 4rem; }
        }
      `}</style>
    </motion.div>
  );
}