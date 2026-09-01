import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, XCircle, ChevronRight, Brain, AlertTriangle, X } from 'lucide-react';

export default function SkillQuiz({ step, onComplete, onCancel }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onCancel?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  const mockQuiz = [
    {
      question: `Which fundamental principle is most critical to ${step.title}?`,
      options: [
        "Core Architectural Syntax & Conventions",
        "Advanced Reactive Performance Tuning",
        "Ecosystem Tooling & Integration",
        "Runtime Error Boundaries & Observability"
      ],
      correct: 0
    },
    {
      question: `What is the primary milestone achieved upon mastering ${step.title}?`,
      options: [
        "Eliminating critical prerequisite dependencies",
        "Higher test coverage across services",
        "Accelerated sprint delivery and code quality",
        "All of the above"
      ],
      correct: 3
    },
    {
      question: `When evaluating system boundaries for ${step.title}, what is the best practice?`,
      options: [
        "Avoid unnecessary coupling and isolate side effects",
        "Hardcode static configs in runtime modules",
        "Bypass type safety checks in production",
        "Disable asynchronous error handling"
      ],
      correct: 0
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === mockQuiz[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < mockQuiz.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 500);
  };

  const finalScorePercent = Math.round((score / mockQuiz.length) * 100);
  const passed = finalScorePercent >= 66;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0C0D0F]/80 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-md bg-[#FCFBF8] dark:bg-[#121416] rounded-2xl shadow-md border border-[#DCD9D1] dark:border-[#292D33] overflow-hidden"
      >
        {!showResult ? (
          <div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DCD9D1] dark:border-[#292D33] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6]">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
                    Milestone Knowledge Check
                  </h3>
                  <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">
                    Question {currentQuestion + 1} of {mockQuiz.length} &bull; {step.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onCancel}
                aria-label="Close quiz"
                className="p-1 rounded-md text-[#85827A] dark:text-[#7E7C77] hover:text-[#1B1B19] dark:hover:text-white hover:bg-[#EEECE6] dark:hover:bg-[#181B1F] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Question Body */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-3 leading-snug">
                {mockQuiz[currentQuestion].question}
              </h4>

              <div className="space-y-2">
                {mockQuiz[currentQuestion].options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === mockQuiz[currentQuestion].correct;
                  
                  let btnStyle = 'bg-[#FCFBF8] dark:bg-[#181B1F] border-[#DCD9D1] dark:border-[#292D33] text-[#1B1B19] dark:text-[#F2F0EA] hover:border-[#2563EB]/50 dark:hover:border-[#3B82F6]/50';
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'bg-[#237A4B]/10 dark:bg-[#4CAF7A]/10 border-[#237A4B] dark:border-[#4CAF7A] text-[#237A4B] dark:text-[#4CAF7A]'
                      : 'bg-[#B33A3A]/10 dark:bg-[#D96565]/10 border-[#B33A3A] dark:border-[#D96565] text-[#B33A3A] dark:text-[#D96565]';
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-2.5 rounded-xl text-left text-xs font-medium transition-colors border flex items-center justify-between ${btnStyle} cursor-pointer`}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        isCorrect ? <CheckCircle2 className="w-3.5 h-3.5 text-[#237A4B] dark:text-[#4CAF7A]" /> : <XCircle className="w-3.5 h-3.5 text-[#B33A3A] dark:text-[#D96565]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-1">
              <div className="flex justify-between text-[10px] text-[#85827A] dark:text-[#7E7C77] font-semibold mb-1">
                <span>Progress</span>
                <span className="font-mono">{Math.round(((currentQuestion + 1) / mockQuiz.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-[#EEECE6] dark:bg-[#292D33] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / mockQuiz.length) * 100}%` }}
                  className="h-full bg-[#2563EB] dark:bg-[#3B82F6] rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Result Summary */
          <div className="p-6 text-center space-y-4">
            <div
              className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center ${
                passed
                  ? 'bg-[#237A4B]/10 text-[#237A4B] dark:bg-[#4CAF7A]/15 dark:text-[#4CAF7A]'
                  : 'bg-[#9A6B00]/10 text-[#9A6B00] dark:bg-[#D6A84F]/15 dark:text-[#D6A84F]'
              }`}
            >
              {passed ? <Target className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
                {passed ? 'Milestone Assessment Passed!' : 'Targeted Remedial Path Injected'}
              </h3>
              <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] mt-1 max-w-xs mx-auto leading-relaxed">
                Score: <span className="font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">{finalScorePercent}%</span>.
                {passed
                  ? ' Prerequisite verified. Adaptive algorithm marks milestone completed.'
                  : ' Adaptive algorithm has auto-injected targeted remedial exercises into your curriculum.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onComplete(passed)}
              className="cf-btn-primary w-full justify-center py-2.5 text-xs"
            >
              <span>Apply to Adaptive Roadmap</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
