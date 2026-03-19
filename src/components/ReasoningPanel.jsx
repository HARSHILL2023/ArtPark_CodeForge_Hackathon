import { motion } from 'framer-motion';
import { getGapColor } from '../data/mockData';
import { Lightbulb, CheckCircle2, AlertTriangle, XCircle, Zap } from 'lucide-react';

export default function ReasoningPanel({ reasoning }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'matched':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'weak':
        return <AlertTriangle className="w-5 h-5" />;
      case 'missing':
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'matched':
        return 'Strength';
      case 'weak':
        return 'Growth Opportunity';
      case 'missing':
        return 'Critical Requirement';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60 overflow-hidden ring-1 ring-white/20 dark:ring-slate-800/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-500 rounded-2xl shadow-lg shadow-amber-500/20 text-white">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Diagnostic Reasoning</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">AI insights behind each recommendation</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-4"
        >
          {reasoning.map((item, index) => {
            const colors = getGapColor(item.type);

            return (
              <motion.div
                key={index}
                variants={itemVariant}
                className={`flex items-start gap-4 p-5 rounded-3xl border ${colors.bg} ${colors.border} group transition-all hover:bg-white dark:hover:bg-slate-800 `}
              >
                <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} shadow-sm group-hover:scale-110 transition-transform`}>
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border ${colors.text} ${colors.bg} ${colors.border}`}>
                      {item.skill}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${colors.text}`}>
                      {getTypeLabel(item.type)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-100 leading-relaxed font-semibold italic">"{item.reason}"</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Summary */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-4 p-5 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-3xl border border-indigo-100/50 dark:border-indigo-500/20 group animate-pulse hover:animate-none">
            <div className="p-2.5 bg-indigo-500 dark:bg-indigo-400 rounded-xl shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white tracking-tight leading-none">Strategic Upskilling Logic</p>
              <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1.5 font-bold uppercase tracking-wider">
                Prioritizing critical gaps first to maximize immediate career impact.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}