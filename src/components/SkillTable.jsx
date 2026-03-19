import { motion } from 'framer-motion';
import { getGapStatus, getGapColor } from '../data/mockData';
import { CheckCircle2, AlertTriangle, XCircle, BarChart3 } from 'lucide-react';

export default function SkillTable({ skills }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'matched':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'weak':
        return <AlertTriangle className="w-4 h-4" />;
      case 'missing':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'matched':
        return 'Matched';
      case 'weak':
        return 'Needs Work';
      case 'missing':
        return 'Missing';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60 overflow-hidden ring-1 ring-white/20 dark:ring-slate-800/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-600 dark:bg-violet-500 rounded-2xl shadow-lg shadow-violet-500/20 text-white">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Gap Breakdown</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Detailed comparison of requirements vs skills</p>
            </div>
          </div>
          <div className="flex items-center gap-4 py-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Match</span>
            </div>
            <div className="w-[1px] h-3 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Weak</span>
            </div>
            <div className="w-[1px] h-3 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Missing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-100 dark:border-slate-800">
              <th className="text-left px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Target Skill</th>
              <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Required</th>
              <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Assessment</th>
              <th className="text-center px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Gap</th>
              <th className="text-right px-8 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Stability</th>
            </tr>
          </thead>
          <motion.tbody
            variants={container}
            initial="hidden"
            animate="show"
          >
            {skills.map((skill, index) => {
              const status = getGapStatus(skill);
              const colors = getGapColor(status);
              const gap = skill.requiredLevel - skill.yourLevel;

              return (
                <motion.tr
                  key={skill.name}
                  variants={item}
                  className={`border-b border-slate-50 dark:border-slate-800/50 last:border-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-all group`}
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-1 h-10 rounded-full ${colors.dot} shadow-sm transition-all group-hover:h-12`} />
                      <div>
                        <p className="font-black text-slate-900 dark:text-white tracking-tight leading-none mb-1 text-base">{skill.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{skill.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${i < skill.requiredLevel
                              ? 'bg-slate-300 dark:bg-slate-600 scale-100'
                              : 'bg-slate-100 dark:bg-slate-800 scale-90'
                            }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2.5 h-2.5 rounded-full shadow-sm transition-all duration-700 delay-150 ${i < skill.yourLevel
                              ? status === 'matched'
                                ? 'bg-emerald-500 shadow-emerald-500/20'
                                : status === 'weak'
                                  ? 'bg-amber-500 shadow-amber-500/20'
                                  : 'bg-rose-500 shadow-rose-500/20'
                              : 'bg-slate-100 dark:bg-slate-800/50'
                            }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`inline-flex items-center justify-center w-10 h-10 rounded-2xl text-xs font-black ring-1 ring-inset ${gap <= 0
                          ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20'
                          : gap <= 2
                            ? 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20'
                            : 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20'
                        }`}>
                      {gap <= 0 ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-sm">-{gap}</span>
                      )}
                    </motion.span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${colors.bg} ${colors.text} ${colors.border} group-hover:scale-105 shadow-sm`}>
                      {getStatusIcon(status)}
                      {getStatusLabel(status)}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>
    </motion.div>
  );
}