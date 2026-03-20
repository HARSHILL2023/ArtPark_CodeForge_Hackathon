import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';
import ProfileSelector from './ProfileSelector';

export default function UploadForm({
  onAnalyze,
  isAnalyzing,
  selectedProfile,
  onProfileChange,
  profileOptions,
}) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-800/60 overflow-hidden shadow-indigo-100/20 dark:shadow-none"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50 px-8 py-6 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-100 rounded-xl">
            <Upload className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Upload Your Documents</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">We'll analyze your skills against the job requirements</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Profile Selector */}
        <ProfileSelector
          selectedProfile={selectedProfile}
          onProfileChange={onProfileChange}
          profileOptions={profileOptions}
        />

        {/* Resume Upload */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            Resume
          </label>
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
                className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer
                  ${dragActive === 'resume'
                    ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'}`}
              >
                <input
                  type="file"
                  accept=".pdf,.txt,.doc,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="space-y-3">
                  <div className="mx-auto w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
                    <Upload className="w-6 h-6 text-slate-400 dark:text-slate-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Drop your resume here</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">or click to browse (PDF, TXT, DOC)</p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-200 dark:border-emerald-900/50 rounded-xl"
              >
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">{resumeFile.name}</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">
                    {(resumeFile.size / 1024).toFixed(1)} KB • Ready to analyze
                  </p>
                </div>
                <button
                  onClick={() => setResumeFile(null)}
                  className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                >
                  Change
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Job Description */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            rows={5}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all resize-none"
          />
          {jobDescription.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Job description added</span>
            </motion.div>
          )}
        </div>

        {/* Analyze Button */}
        <motion.button
          onClick={() => onAnalyze(resumeFile, jobDescription)}
          disabled={!canAnalyze || isAnalyzing}
          whileHover={{ scale: canAnalyze && !isAnalyzing ? 1.01 : 1 }}
          whileTap={{ scale: canAnalyze && !isAnalyzing ? 0.99 : 1 }}
          className={`w-full py-4 px-6 rounded-xl font-medium text-white transition-all flex items-center justify-center gap-3
            ${canAnalyze && !isAnalyzing
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-500/25 cursor-pointer'
              : 'bg-slate-300 cursor-not-allowed'}`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Your Skills...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Skill Gaps</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}