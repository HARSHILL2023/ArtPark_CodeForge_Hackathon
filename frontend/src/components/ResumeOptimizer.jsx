import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Sparkles, TrendingUp, AlertTriangle, ExternalLink, Loader2, CheckCircle2, RefreshCw, ArrowRight, Award } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumePDF from './ResumePDF';
import * as api from '../lib/api';

export default function ResumeOptimizer({
  resumeText,
  jobDescription,
  missingSkills = [],
  currentSkills = [],
  targetRole = 'Software Engineer',
  seniority = 'Mid'
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleOptimize = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.optimizeResume({
        resumeText: resumeText || "Experienced Software Developer with proven background in building scalable web platforms.",
        jobDescription: jobDescription || `Seeking ${targetRole} with strong engineering background.`,
        missingSkills: missingSkills?.map(s => s.name || s.skill || s) || [],
        currentSkills: currentSkills?.map(s => s.name || s.skill || s) || [],
        targetRole,
        seniority
      });
      setResult(response);
    } catch (err) {
      console.error('Optimization failed:', err);
      setError('Failed to generate optimization. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const pdfData = {
    name: "Target Role Candidate",
    title: targetRole,
    summary: result?.overallSuggestion || "Engineered for maximum ATS match and role alignment.",
    skills: currentSkills.map(s => s.name || s.skill || s),
    rewrittenBullets: result?.rewrittenBullets || []
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">AI Surgical Resume Optimizer</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              FAANG-Grade STAR Rewrites & ATS Keyword Density Tuning
            </p>
          </div>
        </div>

        {!result && !loading && (
          <button
            type="button"
            onClick={handleOptimize}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimize for {targetRole}</span>
          </button>
        )}
      </div>

      <div className="p-6">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI is Surgically Optimizing Your Resume...</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm text-center">
              Analyzing weak phrases, injecting quantified metrics, and matching target JD keywords.
            </p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-center space-y-3">
            <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto" />
            <p className="text-xs font-semibold text-rose-700 dark:text-rose-300">{error}</p>
            <button
              type="button"
              onClick={handleOptimize}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-1.5 shadow-sm hover:bg-rose-500"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Optimization</span>
            </button>
          </div>
        ) : !result ? (
          <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 border border-slate-100 dark:border-slate-800">
            <div className="space-y-2 max-w-xl">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Transform Generic Bullet Points into High-Impact Quantified Achievements
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our surgical AI engine rewrites weak resume lines into STAR-format impact statements (Situation, Task, Action, Result) calibrated to pass corporate ATS screens for <span className="font-semibold text-indigo-600 dark:text-indigo-400">{targetRole}</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOptimize}
              className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run Resume Optimizer</span>
            </button>
          </div>
        ) : (
          /* Result Presentation */
          <div className="space-y-6">
            {/* Top Score + Breakdown Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="md:col-span-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex flex-col items-center justify-center font-black shadow-md shadow-indigo-500/20">
                  <span className="text-2xl leading-none">{result.optimizedScore || 85}</span>
                  <span className="text-[9px] opacity-80 uppercase tracking-widest mt-0.5">/ 100</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Optimized ATS Score</h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High Placement Readiness
                  </p>
                </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.scoreBreakdown && Object.entries(result.scoreBreakdown).map(([k, val]) => (
                  <div key={k} className="p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200/80 dark:border-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block truncate">
                      {k.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-base font-black text-slate-900 dark:text-white mt-0.5 block">
                      {val} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Coaching Feedback */}
            {result.overallSuggestion && (
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800/40 text-xs leading-relaxed text-indigo-900 dark:text-indigo-200">
                <span className="font-bold block mb-0.5 uppercase tracking-wider text-[10px]">Strategic Executive Feedback:</span>
                {result.overallSuggestion}
              </div>
            )}

            {/* STAR Rewritten Bullets Comparison */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Surgical STAR Bullet Transformations
              </h4>

              <div className="space-y-3">
                {result.rewrittenBullets?.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
                  >
                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5">
                        Before
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-through">
                        {b.original}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5">
                        STAR Rewrite
                      </span>
                      <p className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                        {b.rewritten}
                      </p>
                    </div>

                    {b.reason && (
                      <p className="text-[11px] text-slate-400 italic pl-16">
                        Why: {b.reason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Injections and PDF Download */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                <span className="font-bold text-slate-700 dark:text-slate-300">ATS Keywords Injected:</span>
                {result.atsKeywordGaps?.map(kw => (
                  <span key={kw} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    +{kw}
                  </span>
                ))}
              </div>

              <PDFDownloadLink
                document={<ResumePDF data={pdfData} />}
                fileName={`Optimized_Resume_${targetRole.replace(/\s+/g, '_')}.pdf`}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors no-underline cursor-pointer"
              >
                {({ loading }) => (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{loading ? 'Preparing PDF...' : 'Download PDF Resume'}</span>
                  </>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
