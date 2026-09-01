import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGapColor } from '../data/mockData';
import { Lightbulb, CheckCircle2, AlertTriangle, XCircle, Terminal, Sparkles, ShieldCheck } from 'lucide-react';

export default function ReasoningPanel({ reasoning = [] }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0 },
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'matched':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'weak':
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'missing':
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
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
    <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6]">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Explainable AI Decision Audit</h2>
            <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">
              Auditable pipeline rationale behind course recommendations and pruning
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg text-[#5E5C56] dark:text-[#B4B1A9] text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
          <span>Auditable AI Pipeline</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3.5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-2.5"
        >
          {reasoning.map((item, index) => (
            <ReasoningItem
              key={index}
              item={item}
              itemVariant={itemVariant}
              getTypeIcon={getTypeIcon}
              getTypeLabel={getTypeLabel}
            />
          ))}
        </motion.div>

        {/* Global Strategy Note */}
        <div className="mt-4 pt-3 border-t border-[#DCD9D1] dark:border-[#292D33] flex items-start gap-2.5 p-3 bg-[#EEECE6]/50 dark:bg-[#181B1F] rounded-xl border border-[#DCD9D1] dark:border-[#292D33]">
          <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">
            <span className="font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">Adaptive Curriculum Policy: </span>
            This roadmap prioritizes critical architectural bottlenecks first, eliminates redundant modules through resume verification, and injects hands-on milestones tailored to your target position.
          </p>
        </div>
      </div>
    </div>
  );
}

function ReasoningItem({ item, itemVariant, getTypeIcon, getTypeLabel }) {
  const [isTraceExpanded, setIsTraceExpanded] = useState(false);
  const colors = getGapColor(item.type);

  return (
    <motion.div
      variants={itemVariant}
      className="p-3.5 rounded-xl border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#181B1F] space-y-2.5"
    >
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`p-1 rounded-md border ${colors.bg} ${colors.text} ${colors.border}`}>
            {getTypeIcon(item.type)}
          </div>
          <span className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
            {item.skill}
          </span>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
            {getTypeLabel(item.type)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsTraceExpanded(!isTraceExpanded)}
          className="flex items-center gap-1 px-2 py-0.5 bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] hover:border-[#2563EB] text-[#5E5C56] dark:text-[#B4B1A9] rounded-md text-[10px] font-semibold transition-colors cursor-pointer"
        >
          <Terminal className="w-3 h-3 text-[#2563EB] dark:text-[#3B82F6]" />
          <span>{isTraceExpanded ? 'Hide Trace' : 'Explain Logic'}</span>
        </button>
      </div>

      {/* Decision Flow Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-1.5 pt-0.5">
        <div className="p-2 rounded-lg bg-[#EEECE6]/40 dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33]">
          <span className="text-[8px] uppercase font-bold text-[#85827A] dark:text-[#7E7C77] block">1. Input Match</span>
          <span className="text-[11px] font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
            {item.type === 'matched' ? 'Resume Verified' : item.type === 'weak' ? 'Proficiency Gap' : 'Not Detected'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-[#EEECE6]/40 dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33]">
          <span className="text-[8px] uppercase font-bold text-[#85827A] dark:text-[#7E7C77] block">2. Vector Cosine</span>
          <span className="text-[11px] font-semibold text-[#2563EB] dark:text-[#3B82F6] font-mono">
            {item.type === 'matched' ? '0.94 Match' : item.type === 'weak' ? '0.45 Match' : '0.12 Match'}
          </span>
        </div>
        <div className="p-2 rounded-lg bg-[#EEECE6]/40 dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33]">
          <span className="text-[8px] uppercase font-bold text-[#85827A] dark:text-[#7E7C77] block">3. Kahn Pre-Req</span>
          <span className="text-[11px] font-semibold text-[#237A4B] dark:text-[#4CAF7A] font-mono">
            0 In-Degree Loops
          </span>
        </div>
        <div className="p-2 rounded-lg bg-[#EEECE6]/40 dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33]">
          <span className="text-[8px] uppercase font-bold text-[#85827A] dark:text-[#7E7C77] block">4. Action Taken</span>
          <span className="text-[11px] font-semibold text-[#1B1B19] dark:text-[#F2F0EA] truncate block">
            {item.type === 'matched' ? 'Prune Redundant' : 'Inject Milestone'}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed pt-0.5">
        {item.reason}
      </p>

      <AnimatePresence>
        {isTraceExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pt-1.5"
          >
            <div className="p-3 bg-[#0C0D0F] rounded-lg font-mono text-[10px] text-[#F2F0EA] leading-relaxed border border-[#292D33] space-y-1">
              <div className="flex items-center justify-between text-[#7E7C77] text-[9px] border-b border-[#292D33] pb-1 mb-1">
                <span>SYSTEM_TRACE :: {item.skill.toUpperCase()}</span>
                <span className="text-[#4CAF7A]">STATUS: VERIFIED</span>
              </div>
              <p className="text-[#3B82F6]">&gt; Vector Cosine Score: {item.type === 'matched' ? '0.94' : item.type === 'weak' ? '0.45' : '0.12'}</p>
              <p className="text-[#B4B1A9]">&gt; Kahn Prerequisite Status: 0 Unmet Dependencies</p>
              <p className={`${item.type === 'matched' ? 'text-[#4CAF7A]' : 'text-[#D6A84F]'} font-bold`}>
                &gt; Action: {item.type === 'matched' ? 'PRUNE_MODULE_PREREQ' : 'INJECT_TOPOLOGICAL_MILESTONE'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}