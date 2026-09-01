import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPriorityColor } from '../data/mockData';
import { Clock, ExternalLink, Flag, CheckCircle2, XCircle, Target, Brain, Sparkles, ArrowRight, Lock } from 'lucide-react';
import SkillQuiz from './SkillQuiz';

export default function Roadmap({ roadmap = [], onUpdate, onAssessment, learningStyle }) {
  const [activeQuizStep, setActiveQuizStep] = useState(null);

  const handleQuizComplete = (passed) => {
    if (activeQuizStep) {
      onAssessment(activeQuizStep, passed);
      setActiveQuizStep(null);
    }
  };

  const totalEstimatedWeeks = roadmap.reduce((acc, step) => {
    const val = parseInt(step.duration || 0);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20 flex items-center justify-center text-sky-600 dark:text-sky-400">
            <Flag className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Topological Learning Roadmap</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">5-Phase Kahn Sequenced Milestone Curriculum</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            {roadmap.length} Modular Steps
          </span>
          <span className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            ~{totalEstimatedWeeks || roadmap.length * 2} Weeks Total
          </span>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-6">
        <div className="relative">
          {/* Vertical Progress Spine */}
          <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-slate-800" />

          <div className="space-y-6">
            {roadmap.map((step, index) => {
              const priorityColors = getPriorityColor(step.priority);
              const isCompleted = step.status === 'completed';
              const isSkipped = step.status === 'skipped';
              const isRemedial = step.type === 'remedial' || step.course_id?.startsWith('remedial-');
              const isActive = !isCompleted && !isSkipped && (index === 0 || roadmap[index - 1].status === 'completed');
              const isLocked = !isCompleted && !isSkipped && !isActive;

              return (
                <div
                  key={step.course_id || step.step || index}
                  className="relative pl-14 group"
                >
                  {/* Milestone Marker */}
                  <div
                    className={`absolute left-0 top-3 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 z-10 ${
                      isCompleted
                        ? 'bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/20'
                        : isSkipped
                        ? 'bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400'
                        : isRemedial
                        ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                        : isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-4 ring-indigo-500/10'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isSkipped ? (
                      <XCircle className="w-5 h-5" />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : (
                      <span>{step.step || index + 1}</span>
                    )}
                  </div>

                  {/* Step Card Container */}
                  <div
                    className={`p-5 rounded-xl border transition-all ${
                      isCompleted
                        ? 'bg-emerald-50/20 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-900/30'
                        : isRemedial
                        ? 'bg-amber-50/30 dark:bg-amber-950/10 border-amber-300 dark:border-amber-700/50'
                        : isActive
                        ? 'bg-white dark:bg-slate-900 border-indigo-500/60 dark:border-indigo-500/50 shadow-md shadow-indigo-500/5'
                        : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200/70 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Milestone {step.step || index + 1}
                        </span>
                        {isRemedial && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                            Targeted Remedial Action
                          </span>
                        )}
                        {!isCompleted && !isSkipped && !isRemedial && (
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border}`}
                          >
                            {step.priority || 'Medium'} Priority
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-mono">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{step.duration ? `${step.duration} Weeks` : '2 Weeks'}</span>
                      </div>
                    </div>

                    <h3
                      className={`text-base font-bold mb-1.5 ${
                        isCompleted
                          ? 'text-emerald-900 dark:text-emerald-300 line-through opacity-80'
                          : 'text-slate-900 dark:text-white'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                      {step.description}
                    </p>

                    {/* AI Reasoning Trace */}
                    <div className="p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/60 dark:border-indigo-800/30 flex items-start gap-2.5 mb-4">
                      <Brain className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-indigo-900 dark:text-indigo-300 leading-normal">
                        <span className="font-bold">Algorithmic Trace: </span>
                        {step.reason ||
                          `Kahn's topological sort verified all prerequisites. Recommended to close high priority target competency.`}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        {step.learning_tips && (
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                            Tip: {step.learning_tips}
                          </span>
                        )}
                      </div>

                      {isActive && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveQuizStep(step)}
                            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-colors"
                          >
                            <Target className="w-3.5 h-3.5" />
                            <span>Take Knowledge Quiz</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdate(index, { status: 'completed' })}
                            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
                          >
                            Mark Completed
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Assessment Modal Dialog */}
      <AnimatePresence>
        {activeQuizStep && (
          <SkillQuiz
            step={activeQuizStep}
            onComplete={handleQuizComplete}
            onCancel={() => setActiveQuizStep(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}