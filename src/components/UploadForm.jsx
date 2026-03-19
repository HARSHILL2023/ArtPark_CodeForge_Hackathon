import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Sparkles, Loader2, X } from 'lucide-react';
import ProfileSelector from './ProfileSelector';

export default function UploadForm({
  onAnalyze,
  isAnalyzing,
  selectedProfile,
  onProfileChange,
  profileOptions,
}) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('Senior Frontend Developer with experience in React, Tailwind and Framer Motion.');
  const [dragActive, setDragActive] = useState(null);

  const handleDrag = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(type);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  }, []);

  const handleDrop = useCallback((e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (type === 'resume') {
        setResumeFile(e.dataTransfer.files[0]);
      }
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const canAnalyze = resumeFile && jobDescription.trim().length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60 overflow-hidden ring-1 ring-white/20 dark:ring-slate-800/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 dark:bg-indigo-500 rounded-2xl shadow-lg shadow-indigo-500/20">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Job Analysis</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Map your skills to the perfect role</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Profile Selector */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Target Profile</label>
          <ProfileSelector
            selectedProfile={selectedProfile}
            onProfileChange={onProfileChange}
            profileOptions={profileOptions}
          />
        </div>

        {/* Resume Upload */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Resume / CV</label>
          <AnimatePresence mode="wait">
            {!resumeFile ? (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onDragEnter={(e) => handleDrag(e, 'resume')}
                onDragLeave={(e) => handleDrag(e, 'resume')}
                onDragOver={(e) => handleDrag(e, 'resume')}
                onDrop={(e) => handleDrop(e, 'resume')}
                className={`group relative border-2 border-dashed rounded-3xl p-10 text-center transition-all duration-300
                  ${dragActive === 'resume'
                    ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
              >
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-lg border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-900 dark:text-white">Drop resume here</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Supports PDF, TXT, DOC</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-5 bg-indigo-500/5 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-3xl group"
              >
                <div className="p-3 bg-indigo-500 dark:bg-indigo-400 rounded-2xl shadow-lg shadow-indigo-500/20">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-slate-900 dark:text-white truncate">{resumeFile.name}</p>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-bold">
                    {(resumeFile.size / 1024).toFixed(1)} KB • Verified
                  </p>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Job Description */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest pl-1">Job Context</label>
          <div className="relative group">
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description or context here..."
              rows={4}
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-900 dark:text-white placeholder:text-slate-400  placeholder:font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all resize-none font-medium text-sm"
            />
            {jobDescription.length > 0 && (
              <div className="absolute top-4 right-4 text-indigo-500">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <motion.button
          onClick={onAnalyze}
          disabled={!canAnalyze || isAnalyzing}
          whileHover={{ scale: canAnalyze && !isAnalyzing ? 1.02 : 1 }}
          whileTap={{ scale: canAnalyze && !isAnalyzing ? 0.98 : 1 }}
          className={`w-full py-5 px-8 rounded-3xl font-black text-white transition-all flex items-center justify-center gap-3 overflow-hidden relative group
            ${canAnalyze && !isAnalyzing
              ? 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 shadow-xl shadow-indigo-500/25 cursor-pointer ring-1 ring-white/20'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="uppercase tracking-widest text-xs">Processing...</span>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
              <Sparkles className="w-5 h-5" />
              <span className="uppercase tracking-widest text-xs">Run Deep Analysis</span>
            </>
          )}
        </motion.button>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}