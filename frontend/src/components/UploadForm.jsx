import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  Trash2,
  HelpCircle
} from 'lucide-react';
import * as api from '../lib/api';
import ProfileSelector from './ProfileSelector';

export default function UploadForm({
  onAnalyze,
  selectedProfile,
  onProfileChange,
  profileOptions,
  learningStyle
}) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [dragActive, setDragActive] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [status, setStatus] = useState('');

  const analysisSteps = [
    'Parsing resume structure & entities...',
    'Extracting target role requirements...',
    'Running semantic embedding similarity...',
    'Applying Kahn topological sort...',
    'Synthesizing adaptive roadmap...'
  ];

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
      const file = e.dataTransfer.files[0];
      if (type === 'resume') {
        setResumeFile(file);
      } else if (type === 'jobDescriptionFile') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setJdText(event.target.result);
        };
        reader.readAsText(file);
      }
    }
  }, []);

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === 'resume') {
        setResumeFile(file);
      } else if (type === 'jobDescriptionFile') {
        const reader = new FileReader();
        reader.onload = (event) => {
          setJdText(event.target.result);
        };
        reader.readAsText(file);
      }
    }
  };

  const handlePasteSampleJD = () => {
    setJdText(
      `Role: Senior Full Stack Engineer\nCompany: ArtPark Innovation Labs\nRequirements:\n- 4+ years of professional experience with JavaScript/TypeScript, React, Node.js\n- Strong background in building REST APIs and microservices\n- Experience with Docker, Kubernetes, CI/CD pipelines\n- Solid understanding of SQL/NoSQL databases (PostgreSQL, MongoDB)\n- Familiarity with GraphQL, cloud architectures (AWS/GCP), and performance tuning.`
    );
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!resumeFile || jdText.trim().length === 0) return;

    setIsAnalyzing(true);
    setCurrentStepIndex(0);
    setStatus(analysisSteps[0]);

    try {
      // Step 1: Parse Resume
      const resumeResult = await api.parseResume(resumeFile);
      const resumeProfile = resumeResult.profile;

      // Step 2: Parse JD
      setCurrentStepIndex(1);
      setStatus(analysisSteps[1]);
      const jdResult = await api.parseJD(jdText);
      const jdProfile = jdResult.profile;

      // Step 3: Skill Gap Analysis
      setCurrentStepIndex(2);
      setStatus(analysisSteps[2]);
      const gapResult = await api.analyzeSkillGap(resumeProfile, jdProfile);
      const skillGap = gapResult.skillGap;

      // Step 4: Roadmap Generation
      setCurrentStepIndex(3);
      setStatus(analysisSteps[3]);
      const roadmapResult = await api.generateRoadmap(resumeProfile, jdProfile, skillGap, learningStyle);
      const roadmap = roadmapResult.roadmap;

      // Step 5: Finalize
      setCurrentStepIndex(4);
      setStatus(analysisSteps[4]);

      const finalResult = {
        sessionId: resumeResult.sessionId,
        resumeProfile,
        jdProfile,
        skillGap,
        pathway: roadmap.pathway,
        graphData: roadmap.graphData,
        roadmapMetrics: roadmap.metrics,
        coachingNote: roadmap.overall_coaching_note
      };

      setTimeout(() => {
        onAnalyze(finalResult);
        setIsAnalyzing(false);
        setStatus('');
      }, 500);
    } catch (err) {
      console.error('Analysis failed:', err);
      setStatus('Analysis encountered an issue: ' + err.message);
      setTimeout(() => {
        setIsAnalyzing(false);
        setStatus('');
      }, 4000);
    }
  };

  const handleTryDemo = () => {
    const demoData = {
      id: 'demo-fullstack',
      name: 'Demo Profile (Full Stack)',
      role: 'Full Stack Developer',
      company: 'ArtPark Innovation Lab',
      readinessScore: 72,
      matchPercentage: 75,
      missingSkills: 3,
      weakSkills: 2,
      skills: [
        { name: 'React', requiredLevel: 5, yourLevel: 5, category: 'Frontend' },
        { name: 'Node.js', requiredLevel: 4, yourLevel: 4, category: 'Backend' },
        { name: 'MongoDB', requiredLevel: 4, yourLevel: 3, category: 'Database' },
        { name: 'Docker', requiredLevel: 4, yourLevel: 1, category: 'DevOps' },
        { name: 'GraphQL', requiredLevel: 3, yourLevel: 0, category: 'API' },
        { name: 'TypeScript', requiredLevel: 5, yourLevel: 2, category: 'Language' },
      ],
      roadmap: [
        {
          course_id: 'c-ts-101',
          step: 1,
          title: 'TypeScript Enterprise Masterclass',
          description: 'Master advanced TypeScript patterns, generics, and type-safe React development.',
          duration: '2',
          priority: 'high',
          learning_tips: 'Focus on generics and advanced type guards.',
          reason: 'JD requires expert level (5/5), but resume shows basic familiarity.'
        },
        {
          course_id: 'c-docker-102',
          step: 2,
          title: 'Docker & Kubernetes Cloud Foundations',
          description: 'Containerization fundamentals, multi-stage builds, and orchestration for modern cloud deployments.',
          duration: '3',
          priority: 'medium',
          learning_tips: 'Build a multi-stage container for a production web app.',
          reason: 'Missing core infrastructure skill needed for CI/CD deployment.'
        },
        {
          course_id: 'c-graphql-103',
          step: 3,
          title: 'GraphQL API Design & Apollo Integration',
          description: 'Schema-first development, resolvers, queries, mutations, and caching strategies.',
          duration: '2',
          priority: 'low',
          learning_tips: 'Practice schema-first design patterns.',
          reason: 'Required skill for modernizing the client-service communication layer.'
        }
      ],
      reasoning: [
        { skill: 'TypeScript', reason: 'High-priority gap. The role requires TypeScript across all repositories.', type: 'weak' },
        { skill: 'Docker', reason: 'Critical for local microservices environments and deployment.', type: 'weak' },
        { skill: 'GraphQL', reason: 'Skill not found on resume. Recommended as an API expansion milestone.', type: 'missing' }
      ],
      targetJob: 'Full Stack Developer',
      skillGraph: [
        { id: "JavaScript", dependsOn: [] },
        { id: "React", dependsOn: ["JavaScript"] },
        { id: "Node.js", dependsOn: ["JavaScript"] },
        { id: "MongoDB", dependsOn: ["Node.js"] },
        { id: "Docker", dependsOn: ["Node.js"] },
        { id: "GraphQL", dependsOn: ["Node.js"] },
        { id: "TypeScript", dependsOn: ["JavaScript"] }
      ],
      resumeText: "Experienced software engineer with 5 years building scalable web applications. Strong React and Node.js skills.",
      jobDescription: "Looking for a seasoned Full Stack Developer with expertise in React, Node.js, TypeScript, and Docker.",
      missingSkillsList: ['GraphQL', 'Docker'],
      currentSkills: ['React', 'Node.js', 'MongoDB', 'JavaScript']
    };
    onAnalyze(demoData);
  };

  const canAnalyze = resumeFile && jdText.trim().length > 0;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Document Ingestion</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Resume & Job Description Analysis</p>
            </div>
          </div>

          <button
            onClick={handleTryDemo}
            type="button"
            className="px-3 py-1.5 rounded-lg border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-colors"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Load Demo</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Selector */}
        <ProfileSelector
          selectedProfile={selectedProfile}
          onProfileChange={onProfileChange}
          profileOptions={profileOptions}
        />

        {/* Resume Dropzone */}
        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              1. Candidate Resume
            </span>
            <span className="text-[11px] font-normal text-slate-400">PDF, TXT, DOCX</span>
          </label>

          {!resumeFile ? (
            <div
              onDragEnter={(e) => handleDrag(e, 'resume')}
              onDragLeave={(e) => handleDrag(e, 'resume')}
              onDragOver={(e) => handleDrag(e, 'resume')}
              onDrop={(e) => handleDrop(e, 'resume')}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                dragActive === 'resume'
                  ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'resume')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload Resume"
              />
              <div className="space-y-2">
                <div className="mx-auto w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  Drag & drop resume or <span className="text-indigo-600 dark:text-indigo-400 underline">browse</span>
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Max size 10MB</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3.5 bg-emerald-50/60 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {resumeFile.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {(resumeFile.size / 1024).toFixed(1)} KB &bull; Verified
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                aria-label="Remove uploaded resume"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Job Description */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              2. Target Job Description
            </label>
            <button
              type="button"
              onClick={handlePasteSampleJD}
              className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Paste Sample JD
            </button>
          </div>

          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste complete role description, responsibilities, and required qualifications..."
            rows={5}
            className="w-full px-4 py-3 bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none font-sans leading-relaxed"
          />

          <div className="flex justify-between items-center text-[10px] text-slate-400">
            <span>{jdText.length > 0 ? `${jdText.split(/\s+/).filter(Boolean).length} words entered` : 'Enter or paste job requirements'}</span>
            {jdText.length > 0 && <span className="text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready</span>}
          </div>
        </div>

        {/* Step-by-Step Processing Indicator */}
        {isAnalyzing && (
          <div className="p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-200">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400" />
                <span>AI Pipeline Active</span>
              </span>
              <span>Step {currentStepIndex + 1} of 5</span>
            </div>

            <div className="w-full h-1.5 bg-indigo-100 dark:bg-indigo-900/60 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '10%' }}
                animate={{ width: `${((currentStepIndex + 1) / 5) * 100}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-indigo-600 rounded-full"
              />
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
              {status}
            </p>
          </div>
        )}

        {/* Error Notification */}
        {status.startsWith('Analysis encountered') && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-xs font-medium text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <span>{status}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canAnalyze || isAnalyzing}
          className={`w-full py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
            canAnalyze && !isAnalyzing
              ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-500/25 cursor-pointer active:scale-98'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 cursor-not-allowed'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analyzing Skill Matrix...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Run Skill Gap Analysis</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}