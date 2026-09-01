import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { getPriorityColor } from '../data/mockData';
import { Clock, Flag, CheckCircle2, XCircle, Target, Brain, Lock } from 'lucide-react';
import SkillQuiz from './SkillQuiz';

export default function Roadmap({ roadmap = [], onUpdate, onAssessment }) {
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
    <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
            <Flag className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Topological Learning Roadmap</h2>
            <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">5-Phase Kahn Sequenced Milestone Curriculum</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#5E5C56] dark:text-[#B4B1A9]">
          <span className="px-2.5 py-0.5 bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-md text-[11px]">
            {roadmap.length} Modular Steps
          </span>
          <span className="px-2.5 py-0.5 bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-md text-[11px]">
            ~{totalEstimatedWeeks || roadmap.length * 2} Weeks Total
          </span>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-4 sm:p-5">
        <div className="relative">
          {/* Vertical Progress Spine */}
          <div className="absolute left-4 top-3 bottom-3 w-0.5 bg-[#DCD9D1] dark:bg-[#292D33]" />

          <div className="space-y-4">
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
                  className="relative pl-11 group"
                >
                  {/* Milestone Marker */}
                  <div
                    className={`absolute left-0 top-2.5 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs border transition-all duration-200 z-10 ${
                      isCompleted
                        ? 'bg-[#237A4B] dark:bg-[#4CAF7A] border-[#237A4B] dark:border-[#4CAF7A] text-white dark:text-[#0C0D0F]'
                        : isSkipped
                        ? 'bg-[#EEECE6] dark:bg-[#181B1F] border-[#DCD9D1] dark:border-[#292D33] text-[#85827A]'
                        : isRemedial
                        ? 'bg-[#9A6B00] dark:bg-[#D6A84F] border-[#9A6B00] dark:border-[#D6A84F] text-white'
                        : isActive
                        ? 'bg-[#B88916] dark:bg-[#D4A72C] border-[#B88916] dark:border-[#D4A72C] text-white dark:text-[#0C0D0F] shadow-xs'
                        : 'bg-[#FCFBF8] dark:bg-[#121416] border-[#DCD9D1] dark:border-[#292D33] text-[#85827A]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isSkipped ? (
                      <XCircle className="w-4 h-4" />
                    ) : isLocked ? (
                      <Lock className="w-3.5 h-3.5 text-[#85827A]" />
                    ) : (
                      <span className="font-mono text-xs">{step.step || index + 1}</span>
                    )}
                  </div>

                  {/* Step Card Container */}
                  <div
                    className={`p-4 rounded-xl border transition-colors ${
                      isCompleted
                        ? 'bg-[#237A4B]/5 dark:bg-[#4CAF7A]/5 border-[#237A4B]/20 dark:border-[#4CAF7A]/25'
                        : isRemedial
                        ? 'bg-[#9A6B00]/5 dark:bg-[#D6A84F]/5 border-[#9A6B00]/20 dark:border-[#D6A84F]/25'
                        : isActive
                        ? 'bg-[#FCFBF8] dark:bg-[#181B1F] border-[#B88916] dark:border-[#D4A72C]'
                        : 'bg-[#FCFBF8] dark:bg-[#121416] border-[#DCD9D1] dark:border-[#292D33]'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 mb-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-semibold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider">
                          Milestone {step.step || index + 1}
                        </span>
                        {isRemedial && (
                          <span className="px-1.5 py-0.2 rounded bg-[#9A6B00]/10 dark:bg-[#D6A84F]/10 text-[#9A6B00] dark:text-[#D6A84F] border border-[#9A6B00]/20 text-[9px] font-bold uppercase tracking-wider">
                            Targeted Remedial Action
                          </span>
                        )}
                        {!isCompleted && !isSkipped && !isRemedial && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider border ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border}`}
                          >
                            {step.priority || 'Medium'} Priority
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-[11px] text-[#85827A] dark:text-[#7E7C77] font-mono">
                        <Clock className="w-3 h-3 text-[#B88916] dark:text-[#D4A72C]" />
                        <span>{step.duration ? `${step.duration} Weeks` : '2 Weeks'}</span>
                      </div>
                    </div>

                    <h3
                      className={`text-xs sm:text-sm font-bold mb-1 ${
                        isCompleted
                          ? 'text-[#237A4B] dark:text-[#4CAF7A] line-through opacity-80'
                          : 'text-[#1B1B19] dark:text-[#F2F0EA]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed mb-3">
                      {step.description}
                    </p>

                    {/* AI Reasoning Trace */}
                    <div className="p-2.5 rounded-lg bg-[#EEECE6]/60 dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-start gap-2 mb-3">
                      <Brain className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C] flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9] leading-normal">
                        <span className="font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">Algorithmic Trace: </span>
                        {step.reason ||
                          `Kahn's topological sort verified all prerequisites. Recommended to close high priority target competency.`}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#DCD9D1] dark:border-[#292D33]">
                      <div className="flex items-center gap-2">
                        {step.learning_tips && (
                          <span className="text-[10px] text-[#85827A] dark:text-[#7E7C77] italic">
                            Tip: {step.learning_tips}
                          </span>
                        )}
                      </div>

                      {isActive && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveQuizStep(step)}
                            className="cf-btn-primary py-1 px-2.5 text-xs"
                          >
                            <Target className="w-3 h-3" />
                            <span>Take Knowledge Quiz</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdate(index, { status: 'completed' })}
                            className="cf-btn-secondary py-1 px-2.5 text-xs"
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