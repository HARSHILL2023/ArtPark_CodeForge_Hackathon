import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Zap,
  Trash2
} from 'lucide-react';
import * as api from '../lib/api';
import ProfileSelector from './ProfileSelector';

export default function UploadForm({
  onAnalyze,
  selectedProfile,
  onProfileChange,
  onSelectProfile,
  profiles,
  profileOptions,
  learningStyle,
  disabled
}) {
  const effectiveProfileOptions = profileOptions || profiles || [];
  const effectiveProfileChange = onProfileChange || onSelectProfile || (() => {});
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
      const resumeResult = await api.parseResume(resumeFile);
      const resumeProfile = resumeResult.profile;

      setCurrentStepIndex(1);
      setStatus(analysisSteps[1]);
      const jdResult = await api.parseJD(jdText);
      const jdProfile = jdResult.profile;

      setCurrentStepIndex(2);
      setStatus(analysisSteps[2]);
      const gapResult = await api.analyzeSkillGap(resumeProfile, jdProfile);
      const skillGap = gapResult.skillGap;

      setCurrentStepIndex(3);
      setStatus(analysisSteps[3]);
      const roadmapResult = await api.generateRoadmap(resumeProfile, jdProfile, skillGap, learningStyle);
      const roadmap = roadmapResult.roadmap;

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
    <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Document Ingestion</h2>
              <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">Resume & Job Description Analysis</p>
            </div>
          </div>

          <button
            onClick={handleTryDemo}
            type="button"
            className="cf-btn-secondary py-1 px-2 text-xs"
          >
            <Zap className="w-3 h-3 text-[#B88916] dark:text-[#D4A72C]" />
            <span>Load Demo</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Selector */}
        <ProfileSelector
          selectedProfile={selectedProfile}
          onProfileChange={effectiveProfileChange}
          profileOptions={effectiveProfileOptions}
        />

        {/* Resume Dropzone */}
        <div className="space-y-1.5">
          <label className="flex items-center justify-between text-[11px] font-semibold text-[#5E5C56] dark:text-[#B4B1A9]">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C]" />
              1. Candidate Resume
            </span>
            <span className="text-[10px] font-normal text-[#85827A] dark:text-[#7E7C77]">PDF, TXT, DOCX</span>
          </label>

          {!resumeFile ? (
            <div
              onDragEnter={(e) => handleDrag(e, 'resume')}
              onDragLeave={(e) => handleDrag(e, 'resume')}
              onDragOver={(e) => handleDrag(e, 'resume')}
              onDrop={(e) => handleDrop(e, 'resume')}
              className={`relative border border-dashed rounded-xl p-5 text-center transition-colors cursor-pointer ${
                dragActive === 'resume'
                  ? 'border-[#B88916] dark:border-[#D4A72C] bg-[#B88916]/5 dark:bg-[#D4A72C]/10'
                  : 'border-[#DCD9D1] dark:border-[#292D33] hover:border-[#C9C5BB] dark:hover:border-[#363B43] bg-[#FCFBF8] dark:bg-[#181B1F]'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={(e) => handleFileChange(e, 'resume')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload Resume"
              />
              <div className="space-y-1.5">
                <div className="mx-auto w-8 h-8 bg-[#EEECE6] dark:bg-[#121416] rounded-lg border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
                  Drag & drop resume or <span className="text-[#B88916] dark:text-[#D4A72C] underline">browse</span>
                </p>
                <p className="text-[10px] text-[#85827A] dark:text-[#7E7C77]">Max size 10MB</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-[#237A4B]/10 dark:bg-[#4CAF7A]/10 border border-[#237A4B]/20 dark:border-[#4CAF7A]/25 rounded-xl">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-[#237A4B]/20 dark:bg-[#4CAF7A]/20 flex items-center justify-center text-[#237A4B] dark:text-[#4CAF7A] flex-shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA] truncate">
                    {resumeFile.name}
                  </p>
                  <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">
                    {(resumeFile.size / 1024).toFixed(1)} KB &bull; Ready
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setResumeFile(null)}
                aria-label="Remove uploaded resume"
                className="p-1 rounded-md text-[#85827A] hover:text-[#D96565] transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Job Description */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5E5C56] dark:text-[#B4B1A9]">
              <FileText className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C]" />
              2. Target Job Description
            </label>
            <button
              type="button"
              onClick={handlePasteSampleJD}
              className="text-[10px] font-semibold text-[#B88916] dark:text-[#D4A72C] hover:underline cursor-pointer"
            >
              Paste Sample JD
            </button>
          </div>

          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            placeholder="Paste complete role description, responsibilities, and required qualifications..."
            rows={4}
            className="w-full px-3 py-2 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#B88916] dark:focus:ring-[#D4A72C] transition-colors resize-none font-sans leading-relaxed"
          />

          <div className="flex justify-between items-center text-[10px] text-[#85827A] dark:text-[#7E7C77]">
            <span>{jdText.length > 0 ? `${jdText.split(/\s+/).filter(Boolean).length} words entered` : 'Enter or paste job requirements'}</span>
            {jdText.length > 0 && <span className="text-[#237A4B] dark:text-[#4CAF7A] font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Ready</span>}
          </div>
        </div>

        {/* Step-by-Step Processing Indicator */}
        {isAnalyzing && (
          <div className="p-3 rounded-xl bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B88916] dark:text-[#D4A72C]" />
                <span>AI Pipeline Active</span>
              </span>
              <span className="font-mono text-[11px]">Step {currentStepIndex + 1} of 5</span>
            </div>

            <div className="w-full h-1 bg-[#DCD9D1] dark:bg-[#292D33] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: '10%' }}
                animate={{ width: `${((currentStepIndex + 1) / 5) * 100}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-[#B88916] dark:bg-[#D4A72C] rounded-full"
              />
            </div>
            <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9] font-medium">
              {status}
            </p>
          </div>
        )}

        {/* Error Notification */}
        {status.startsWith('Analysis encountered') && (
          <div className="p-3 rounded-xl bg-[#B33A3A]/10 dark:bg-[#D96565]/10 border border-[#B33A3A]/20 dark:border-[#D96565]/25 text-xs font-medium text-[#B33A3A] dark:text-[#D96565] flex items-start gap-2">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            <span>{status}</span>
          </div>
        )}

        {/* Action Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canAnalyze || isAnalyzing || disabled}
          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 ${
            canAnalyze && !isAnalyzing && !disabled
              ? 'cf-btn-primary'
              : 'bg-[#EEECE6] dark:bg-[#181B1F] text-[#85827A] dark:text-[#5B5A57] border border-[#DCD9D1] dark:border-[#292D33] cursor-not-allowed'
          }`}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing Skill Matrix...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Run Skill Gap Analysis</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}