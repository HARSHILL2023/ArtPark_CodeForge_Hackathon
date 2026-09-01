import React, { useState } from 'react';
import { Sparkles, AlertTriangle, ExternalLink, Loader2, CheckCircle2, RefreshCw, Award } from 'lucide-react';
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
    <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">AI Surgical Resume Optimizer</h2>
            <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">
              STAR Rewrites & ATS Keyword Density Tuning
            </p>
          </div>
        </div>

        {!result && !loading && (
          <button
            type="button"
            onClick={handleOptimize}
            className="cf-btn-primary py-1.5 px-3 text-xs self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Optimize for {targetRole}</span>
          </button>
        )}
      </div>

      <div className="p-4 sm:p-5">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-2.5">
            <Loader2 className="w-6 h-6 animate-spin text-[#B88916] dark:text-[#D4A72C]" />
            <h3 className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA]">AI is Surgically Optimizing Your Resume...</h3>
            <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] max-w-sm text-center">
              Analyzing weak phrases, injecting quantified metrics, and matching target JD keywords.
            </p>
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl bg-[#B33A3A]/10 dark:bg-[#D96565]/10 border border-[#B33A3A]/20 dark:border-[#D96565]/25 text-center space-y-2">
            <AlertTriangle className="w-6 h-6 text-[#B33A3A] dark:text-[#D96565] mx-auto" />
            <p className="text-xs font-semibold text-[#B33A3A] dark:text-[#D96565]">{error}</p>
            <button
              type="button"
              onClick={handleOptimize}
              className="cf-btn-secondary py-1 px-3 text-xs"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Retry Optimization</span>
            </button>
          </div>
        ) : !result ? (
          <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33]">
            <div className="space-y-1.5 max-w-lg">
              <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
                Transform Generic Bullet Points into High-Impact Quantified Achievements
              </h3>
              <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">
                Our surgical AI engine rewrites weak resume lines into STAR-format impact statements (Situation, Task, Action, Result) calibrated to pass corporate ATS screens for <span className="font-semibold text-[#B88916] dark:text-[#D4A72C]">{targetRole}</span>.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOptimize}
              className="cf-btn-primary py-2 px-4 text-xs whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Resume Optimizer</span>
            </button>
          </div>
        ) : (
          /* Result Presentation */
          <div className="space-y-4">
            {/* Top Score + Breakdown Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33]">
              <div className="md:col-span-4 flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F] flex flex-col items-center justify-center font-bold shadow-xs">
                  <span className="text-xl leading-none font-mono">{result.optimizedScore || 85}</span>
                  <span className="text-[8px] opacity-80 uppercase tracking-widest mt-0.5 font-mono">/ 100</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Optimized ATS Score</h4>
                  <p className="text-[11px] text-[#237A4B] dark:text-[#4CAF7A] font-semibold mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> High Placement Readiness
                  </p>
                </div>
              </div>

              <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {result.scoreBreakdown && Object.entries(result.scoreBreakdown).map(([k, val]) => (
                  <div key={k} className="p-2.5 bg-[#FCFBF8] dark:bg-[#121416] rounded-lg border border-[#DCD9D1] dark:border-[#292D33]">
                    <span className="text-[9px] uppercase font-bold text-[#85827A] dark:text-[#7E7C77] block truncate">
                      {k.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mt-0.5 block font-mono">
                      {val} pts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Coaching Feedback */}
            {result.overallSuggestion && (
              <div className="p-3.5 rounded-xl bg-[#EEECE6]/60 dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] text-xs leading-relaxed text-[#5E5C56] dark:text-[#B4B1A9]">
                <span className="font-semibold text-[#1B1B19] dark:text-[#F2F0EA] block mb-0.5 uppercase tracking-wider text-[10px]">Strategic Executive Feedback:</span>
                {result.overallSuggestion}
              </div>
            )}

            {/* STAR Rewritten Bullets Comparison */}
            <div className="space-y-2.5">
              <h4 className="text-[11px] font-semibold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C]" />
                Surgical STAR Bullet Transformations
              </h4>

              <div className="space-y-2.5">
                {result.rewrittenBullets?.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] space-y-1.5"
                  >
                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-[#B33A3A]/10 text-[#B33A3A] dark:bg-[#D96565]/10 dark:text-[#D96565] text-[9px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5">
                        Before
                      </span>
                      <p className="text-xs text-[#85827A] dark:text-[#7E7C77] line-through">
                        {b.original}
                      </p>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="px-1.5 py-0.2 rounded bg-[#237A4B]/10 text-[#237A4B] dark:bg-[#4CAF7A]/10 dark:text-[#4CAF7A] text-[9px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5">
                        STAR Rewrite
                      </span>
                      <p className="text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA] leading-relaxed">
                        {b.rewritten}
                      </p>
                    </div>

                    {b.reason && (
                      <p className="text-[10px] text-[#85827A] dark:text-[#7E7C77] italic pl-12">
                        Why: {b.reason}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Keyword Injections and PDF Download */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#DCD9D1] dark:border-[#292D33]">
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#5E5C56]">
                <span className="font-semibold text-[#1B1B19] dark:text-[#F2F0EA] text-[11px]">ATS Keywords Injected:</span>
                {result.atsKeywordGaps?.map(kw => (
                  <span key={kw} className="px-1.5 py-0.2 bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded text-[10px] font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
                    +{kw}
                  </span>
                ))}
              </div>

              <PDFDownloadLink
                document={<ResumePDF data={pdfData} />}
                fileName={`Optimized_Resume_${targetRole.replace(/\s+/g, '_')}.pdf`}
                className="cf-btn-primary py-1.5 px-3 text-xs no-underline"
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
