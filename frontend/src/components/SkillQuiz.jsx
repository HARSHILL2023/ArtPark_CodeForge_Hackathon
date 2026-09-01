import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, CheckCircle2, XCircle, ChevronRight, Brain, AlertTriangle, X, Sparkles } from 'lucide-react';

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
    }, 700);
  };

  const finalScorePercent = Math.round((score / mockQuiz.length) * 100);
  const passed = finalScorePercent >= 66;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
      >
        {!showResult ? (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Milestone Knowledge Check
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Question {currentQuestion + 1} of {mockQuiz.length} &bull; {step.title}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onCancel}
                aria-label="Close quiz"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Question Body */}
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-4 leading-snug">
                {mockQuiz[currentQuestion].question}
              </h4>

              <div className="space-y-2.5">
                {mockQuiz[currentQuestion].options.map((option, i) => {
                  const isSelected = selectedAnswer === i;
                  const isCorrect = i === mockQuiz[currentQuestion].correct;
                  
                  let btnStyle = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-slate-200 hover:border-indigo-500/50';
                  if (isSelected) {
                    btnStyle = isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-500 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 text-rose-800 dark:text-rose-300';
                  }

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={selectedAnswer !== null}
                      onClick={() => handleAnswer(i)}
                      className={`w-full p-3.5 rounded-xl text-left text-xs font-semibold transition-all border flex items-center justify-between ${btnStyle} cursor-pointer`}
                    >
                      <span>{option}</span>
                      {isSelected && (
                        isCorrect ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-rose-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-[10px] text-slate-400 font-semibold mb-1">
                <span>Progress</span>
                <span>{Math.round(((currentQuestion + 1) / mockQuiz.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentQuestion + 1) / mockQuiz.length) * 100}%` }}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>
          </div>
        ) : (
          /* Result Summary */
          <div className="p-8 text-center space-y-5">
            <div
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-md ${
                passed
                  ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'
              }`}
            >
              {passed ? <Target className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {passed ? 'Milestone Assessment Passed!' : 'Targeted Remedial Path Injected'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                Score: <span className="font-bold text-slate-900 dark:text-white">{finalScorePercent}%</span>.
                {passed
                  ? ' Prerequisite verified. Adaptive algorithm marks milestone completed.'
                  : ' Adaptive algorithm has auto-injected targeted remedial exercises into your curriculum.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onComplete(passed)}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Apply to Adaptive Roadmap</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
