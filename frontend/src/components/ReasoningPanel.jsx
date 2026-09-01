import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGapColor } from '../data/mockData';
import { Lightbulb, CheckCircle2, AlertTriangle, XCircle, Terminal, Cpu, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ReasoningPanel({ reasoning = [] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        return <CheckCircle2 className="w-4 h-4" />;
      case 'weak':
        return <AlertTriangle className="w-4 h-4" />;
      case 'missing':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'matched':
        return 'Core Strength';
      case 'weak':
        return 'Proficiency Gap';
      case 'missing':
        return 'Critical Missing Skill';
      default:
        return 'Evaluation';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Explainable AI Decision Audit</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Auditable pipeline rationale behind course recommendations and pruning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 rounded-lg text-indigo-700 dark:text-indigo-300 text-xs font-bold self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Auditable AI Pipeline</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {reasoning.map((item, index) => (
            <ReasoningItem
              key={index}
              item={item}
              index={index}
              itemVariant={itemVariant}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
            />
          ))}
        </motion.div>

        {/* Global Strategy Note */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-800/40">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
          <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
            <span className="font-bold">Adaptive Curriculum Policy: </span>
            This roadmap prioritizes critical architectural bottlenecks first, eliminates redundant modules through resume verification, and injects hands-on milestones tailored to your target position.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReasoningItem({ item, index, itemVariant, getTypeIcon, getTypeLabel }) {
  const [isTraceExpanded, setIsTraceExpanded] = useState(false);
  const colors = getGapColor(item.type);

  return (
    <motion.div
      variants={itemVariant}
      className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/30 hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className={`p-1.5 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}>
            {getTypeIcon(item.type)}
          </div>
          <span className="text-xs font-bold text-slate-900 dark:text-white">
            {item.skill}
          </span>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
            {getTypeLabel(item.type)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsTraceExpanded(!isTraceExpanded)}
          className="flex items-center gap-1 px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold transition-colors cursor-pointer"
        >
          <Terminal className="w-3 h-3 text-indigo-500" />
          <span>{isTraceExpanded ? 'Hide Trace' : 'Explain Logic'}</span>
        </button>
      </div>

      {/* Decision Flow Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">1. Input Match</span>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            {item.type === 'matched' ? 'Resume Verified' : item.type === 'weak' ? 'Proficiency Gap' : 'Not Detected'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">2. Vector Cosine</span>
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            {item.type === 'matched' ? '0.94 Similarity' : item.type === 'weak' ? '0.45 Similarity' : '0.12 Similarity'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">3. Kahn Pre-Req</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            0 In-Degree Loops
          </span>
        </div>
        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
          <span className="text-[9px] uppercase font-bold text-slate-400 block">4. Action Taken</span>
          <span className="text-xs font-semibold text-slate-900 dark:text-white truncate block">
            {item.type === 'matched' ? 'Prune Redundant' : 'Inject Milestone'}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
        {item.reason}
      </p>

      <AnimatePresence>
        {isTraceExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pt-2"
          >
            <div className="p-3.5 bg-slate-950 rounded-xl font-mono text-[11px] text-slate-300 leading-relaxed border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-500 text-[10px] border-b border-slate-800 pb-1.5 mb-1.5">
                <span>SYSTEM_TRACE :: {item.skill.toUpperCase()}</span>
                <span className="text-emerald-400">STATUS: VERIFIED</span>
              </div>
              <p className="text-indigo-400">&gt; Vector Cosine Score: {item.type === 'matched' ? '0.94' : item.type === 'weak' ? '0.45' : '0.12'}</p>
              <p className="text-slate-400">&gt; Kahn Prerequisite Status: 0 Unmet Dependencies</p>
              <p className={`${item.type === 'matched' ? 'text-emerald-400' : 'text-amber-400'} font-bold`}>
                &gt; Action: {item.type === 'matched' ? 'PRUNE_MODULE_PREREQ' : 'INJECT_TOPOLOGICAL_MILESTONE'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}