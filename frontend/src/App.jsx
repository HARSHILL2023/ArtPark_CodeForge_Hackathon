import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
  Sun,
  Moon,
  Target,
  Compass,
  Cpu,
  Layers,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import UploadForm from './components/UploadForm';
import SkillTable from './components/SkillTable';
import GapSummary from './components/GapSummary';
import Roadmap from './components/Roadmap';
import ReasoningPanel from './components/ReasoningPanel';
import SkillGraph from './components/SkillGraph';
import SkillDNA from './components/SkillDNA';
import SignInAnimation from './components/SignInAnimation';
import { mockProfiles } from './data/mockData';
import MentorChat from './components/MentorChat';
import InterviewPrep from './components/InterviewPrepPremium';
import ResumeOptimizer from './components/ResumeOptimizer';
import AuthModal from './components/AuthModal';
import { useAuth } from './lib/AuthContext';
import LandingPage from './pages/LandingPage';

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/20 rounded-xl animate-pulse">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold">Semantic Multi-LLM Pipeline Active</h3>
            <p className="text-xs text-indigo-100">Embedding similarity & Kahn topological sort in progress...</p>
          </div>
        </div>
        <div className="hidden sm:block">
          <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-wider animate-pulse">
            Processing Graph
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/4 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-slate-100 dark:bg-slate-800/60 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardWorkspace({ darkMode, toggleDarkMode }) {
  const [selectedProfile, setSelectedProfile] = useState(mockProfiles[0].id);
  const [currentData, setCurrentData] = useState(null);
  const [learningStyle, setLearningStyle] = useState('Practical');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState('skills'); // 'skills', 'roadmap', 'studio'

  const { user, isLoggedIn, logout: authLogout } = useAuth();
  const location = useLocation();

  // Check URL query parameters for auth trigger
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('auth') === 'open') {
      setIsAuthModalOpen(true);
    }
  }, [location.search]);

  // Auto-seed data for Demo Judge user
  useEffect(() => {
    if (user?.id === 'DEMO_12345' && !currentData) {
      setCurrentData(mockProfiles[0]);
      setShowResults(true);
    }
  }, [user, currentData]);

  const toggleLearningStyle = (style) => setLearningStyle(style);
  const profileOptions = mockProfiles.map((d) => ({ id: d.id, name: d.name }));

  const handleAnalyze = (finalResult) => {
    setIsAnalyzing(false);
    setShowSkeleton(false);

    if (finalResult.id === 'demo-fullstack') {
      setCurrentData(finalResult);
      setShowResults(true);
      return;
    }

    const allSkills = [
      ...(finalResult.skillGap?.matched_skills || []).map(s => ({
        name: s.skill,
        requiredLevel: 4,
        yourLevel: s.resume_proficiency === 'expert' ? 4 : s.resume_proficiency === 'advanced' ? 3 : s.resume_proficiency === 'intermediate' ? 2 : 1,
        status: 'matched',
        category: 'Technical',
        isSemantic: true
      })),
      ...(finalResult.skillGap?.missing_skills || []).map(s => ({
        name: s.skill,
        requiredLevel: 4,
        yourLevel: 0,
        status: 'missing',
        category: 'Technical',
        isSemantic: false
      }))
    ];

    const mappedData = {
      sessionId: finalResult.sessionId,
      role: finalResult.jdProfile?.role_title || "Software Engineer",
      company: finalResult.jdProfile?.company_name || "Target Organization",
      readinessScore: finalResult.skillGap?.overall_readiness_score || 72,
      matchPercentage: finalResult.skillGap?.overall_readiness_score || 72,
      missingSkills: (finalResult.skillGap?.missing_skills || []).length,
      weakSkills: (finalResult.skillGap?.proficiency_gaps || []).length,
      missingSkillsList: (finalResult.skillGap?.missing_skills || []),
      currentSkills: (finalResult.skillGap?.matched_skills || []).map(s => s.skill),
      skills: allSkills.length > 0 ? allSkills : mockProfiles[0].skills,
      resumeText: finalResult.resumeProfile?._rawText,
      jobDescription: finalResult.jdProfile?._rawText,
      reasoning: (finalResult.skillGap?.missing_skills || []).map(s => ({
        skill: s.skill,
        reason: `Required for the role but not found on candidate profile. Priority: ${s.priority || 'High'}.`,
        type: 'missing'
      })).concat((finalResult.skillGap?.proficiency_gaps || []).map(s => ({
        skill: s.skill,
        reason: `Proficiency gap detected. Role requires ${s.required_level || 'level 4'}, you have ${s.current_level || 'level 2'}.`,
        type: 'weak'
      }))),
      roadmap: (finalResult.pathway || finalResult.roadmap || []).map(step => ({
        course_id: step.course_id || step.id,
        step: step.sequence || step.step,
        title: step.course_title || step.title || 'Architectural Module',
        description: step.learning_tips || step.description || 'Module curriculum overview.',
        duration: step.estimated_hours ? `${Math.ceil(step.estimated_hours / 10)}` : (step.duration || '2'),
        priority: step.priority || 'medium',
        status: step.status || 'todo',
        reason: step.reasoning?.why_included || step.reason || 'Prerequisite graph traversal recommendation.',
        prerequisites_ids: step.prerequisites_ids || []
      })),
      skillGraph: finalResult.graphData,
      coachingNote: finalResult.coachingNote,
      targetJob: finalResult.jdProfile?.role_title || "Full Stack Developer"
    };

    setCurrentData(mappedData);
    setShowResults(true);
  };

  const handleRoadmapUpdate = (index, updates) => {
    setCurrentData(prev => {
      const newRoadmap = [...prev.roadmap];
      newRoadmap[index] = { ...newRoadmap[index], ...updates };
      return { ...prev, roadmap: newRoadmap };
    });
  };

  const handleAssessment = async (step, passed) => {
    if (!currentData?.sessionId) return;
    try {
      const response = await api.recordAssessmentResult(
        currentData.sessionId,
        step.course_id,
        passed ? 85 : 40,
        passed
      );
      if (response.success && response.updatedPathway) {
        setCurrentData(prev => ({
          ...prev,
          roadmap: response.updatedPathway
        }));
      }
    } catch (err) {
      console.error('Failed to record assessment:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      {/* Workspace Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#080c14]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors mr-2 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Landing</span>
            </Link>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/25">
                <Brain className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                CodeForge Workspace
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 rounded-lg text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Multi-AI Engine Live</span>
            </div>

            <button
              onClick={toggleDarkMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 hidden sm:inline">
                  {user?.name}
                </span>
                <button
                  onClick={authLogout}
                  className="text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={() => {
          setIsAuthModalOpen(false);
          setIsSigningIn(true);
        }}
      />
      {isSigningIn && <SignInAnimation onComplete={() => setIsSigningIn(false)} />}

      {/* Main Workspace Grid or Auth Gate */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {!isLoggedIn ? (
          /* Authentication Required Gateway */
          <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-8">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#6366F1]/10 text-[#6366F1] flex items-center justify-center mx-auto border border-[#6366F1]/20 shadow-xs">
                <Brain className="w-6 h-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Sign In to Unlock Career Intelligence OS
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Personalized skill gap matrices, Kahn topological pathways, AI mock interviews, and STAR resume rewrites require a verified session.
              </p>
            </div>

            {/* Core Feature Access Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
              {[
                { title: 'Semantic Skill Matrix', desc: 'Vector cosine embeddings across 84 catalog courses', icon: Layers },
                { title: '5-Phase Kahn Pathways', desc: 'Strict topological prerequisite sequencing', icon: Compass },
                { title: 'AI Mock Interview Studio', desc: 'Dynamic FAANG-grade technical practice', icon: Cpu },
                { title: 'STAR Resume Optimizer', desc: 'Measurable ATS optimization & PDF export', icon: Target },
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#252A31] shadow-xs flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#171A1F] border border-[#252A31] text-[#6366F1] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">{feat.title}</h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sign In Options */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#252A31] shadow-sm space-y-4 text-center">
              <button
                type="button"
                onClick={() => {
                  const fakeToken = 'demo_token_judge_12345';
                  localStorage.setItem('artpark_token', fakeToken);
                  window.location.reload();
                }}
                className="w-full py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl text-xs font-bold shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>1-Click Judge Demo Access (Instant Unlock)</span>
              </button>

              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex-1 py-2.5 px-4 bg-slate-50 dark:bg-[#171A1F] hover:bg-slate-100 dark:hover:bg-[#1C2026] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#252A31] rounded-xl text-xs font-semibold transition-colors"
                >
                  Sign In with Email
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="flex-1 py-2.5 px-4 bg-slate-50 dark:bg-[#171A1F] hover:bg-slate-100 dark:hover:bg-[#1C2026] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-[#252A31] rounded-xl text-xs font-semibold transition-colors"
                >
                  Create Account
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                Hackathon evaluators can use 1-Click Judge Demo Access to immediately test all features.
              </p>
            </div>
          </div>
        ) : (
          /* Full Interactive Workspace (Unlocked upon Authentication) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Document Ingestion Panel */}
            <div className="lg:col-span-4 lg:sticky lg:top-20 space-y-6">
              <UploadForm
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
                selectedProfile={selectedProfile}
                onProfileChange={setSelectedProfile}
                profileOptions={profileOptions}
                learningStyle={learningStyle}
              />
            </div>

            {/* Right Column: Interactive Analysis & Career Workspace */}
            <div className="lg:col-span-8 space-y-6">
              <AnimatePresence mode="wait">
                {showSkeleton ? (
                  <SkeletonLoader key="skeleton" />
                ) : showResults && currentData ? (
                  <div key="results" className="space-y-6">
                    {/* Active Analysis Target Command Center */}
                    <div className="space-y-4">
                      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200">
                            Evaluated Target Role
                          </span>
                          <h2 className="text-2xl font-black tracking-tight mt-0.5">
                            {currentData.role}
                          </h2>
                          <p className="text-xs text-indigo-100 mt-0.5">{currentData.company}</p>
                        </div>

                        <div className="flex items-center gap-3 self-start sm:self-auto">
                          <div className="px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-center">
                            <span className="text-[10px] uppercase font-bold text-indigo-100 block">
                              Readiness Score
                            </span>
                            <span className="text-2xl font-black">{currentData.readinessScore}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Next Best Action & Readiness Triad */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                        <div className="md:col-span-6 p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-800/40 flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                            <Target className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                                Next Best Action
                              </span>
                              <button
                                type="button"
                                onClick={() => setActiveTab('roadmap')}
                                className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                              >
                                Jump to Path &rarr;
                              </button>
                            </div>
                            <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                              {currentData.roadmap?.find(s => s.status !== 'completed')?.title || currentData.roadmap?.[0]?.title || 'Master Prerequisite Modules'}
                            </p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                              Closes high-priority prerequisite bottleneck to boost readiness toward 100%.
                            </p>
                          </div>
                        </div>

                        <div className="md:col-span-6 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-around gap-2 text-center">
                          <div>
                            <span className="text-base font-black text-emerald-600 dark:text-emerald-400 block">
                              {currentData.skills?.filter(s => s.yourLevel >= s.requiredLevel).length || 0}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Strong Skills
                            </span>
                          </div>
                          <div className="h-7 w-px bg-slate-200 dark:bg-slate-800" />
                          <div>
                            <span className="text-base font-black text-amber-600 dark:text-amber-400 block">
                              {currentData.skills?.filter(s => s.yourLevel > 0 && s.yourLevel < s.requiredLevel).length || 0}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Needs Work
                            </span>
                          </div>
                          <div className="h-7 w-px bg-slate-200 dark:bg-slate-800" />
                          <div>
                            <span className="text-base font-black text-rose-600 dark:text-rose-400 block">
                              {currentData.skills?.filter(s => s.yourLevel === 0).length || 0}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Critical Gaps
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section Navigation Tabs */}
                    <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
                      {[
                        { id: 'skills', label: '1. Skill Matrix & DNA', icon: Layers },
                        { id: 'roadmap', label: '2. 5-Phase Roadmap', icon: Compass },
                        { id: 'studio', label: '3. Interview & Resume Studio', icon: Cpu },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                              activeTab === tab.id
                                ? 'bg-indigo-600 text-white shadow-sm'
                                : 'bg-white dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Tab 1: Skills & DNA */}
                    {activeTab === 'skills' && (
                      <div className="space-y-6">
                        <GapSummary
                          readinessScore={currentData.readinessScore}
                          matchPercentage={currentData.matchPercentage}
                          missingSkills={currentData.missingSkills}
                          weakSkills={currentData.weakSkills}
                          totalTime={`${(currentData.roadmap?.length || 3) * 2} Weeks`}
                          roadmapProgress={
                            ((currentData.roadmap?.filter(s => s.status === 'completed').length || 0) /
                              (currentData.roadmap?.length || 1)) *
                            100
                          }
                          skillConfidence={78}
                          marketTrends={{ demand: 'High', growth: '+22%', insight: 'Strong demand for full stack engineering.' }}
                          learningStyle={learningStyle}
                          onStyleChange={toggleLearningStyle}
                        />

                        <SkillDNA
                          skills={currentData.skills}
                          readinessScore={currentData.readinessScore}
                        />

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">
                              Dagre Topological Skill Graph
                            </h3>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              Interactive directed acyclic dependency layout
                            </span>
                          </div>
                          <SkillGraph
                            skills={currentData.skills}
                            graphData={currentData.skillGraph}
                            darkMode={darkMode}
                          />
                        </div>

                        <SkillTable
                          skills={currentData.skills}
                          learningStyle={learningStyle}
                        />
                      </div>
                    )}

                    {/* Tab 2: 5-Phase Roadmap */}
                    {activeTab === 'roadmap' && (
                      <div className="space-y-6">
                        <Roadmap
                          roadmap={currentData.roadmap}
                          onRoadmapUpdate={handleRoadmapUpdate}
                          onAssessment={handleAssessment}
                          learningStyle={learningStyle}
                        />

                        <ReasoningPanel reasoning={currentData.reasoning} />
                      </div>
                    )}

                    {/* Tab 3: Interview & Resume Studio */}
                    {activeTab === 'studio' && (
                      <div className="space-y-8">
                        <InterviewPrep
                          role={currentData.role}
                          company={currentData.company}
                          skills={currentData.skills}
                          missingSkills={currentData.missingSkillsList}
                        />

                        <ResumeOptimizer
                          resumeText={currentData.resumeText}
                          jobDescription={currentData.jobDescription}
                          missingSkills={currentData.missingSkillsList}
                          currentSkills={currentData.currentSkills}
                          targetRole={currentData.role}
                          seniority="Mid"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  /* Empty state prompt */
                  <div
                    key="empty"
                    className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Start Your Skill Gap Analysis
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
                        Upload your resume and target role description or load the preset demo profile on the left to explore the interactive career engine.
                      </p>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080c14] py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-slate-700 dark:text-slate-300">
            <Brain className="w-4 h-4 text-indigo-500" />
            <span>CodeForge AI &bull; ArtPark Hackathon</span>
          </div>
          <span>Engineered for next-generation AI career acceleration</span>
        </div>
      </footer>

      {/* AI Mentor Floating Drawer (Only active when logged in) */}
      {isLoggedIn && <MentorChat userData={currentData} />}
    </div>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage darkMode={darkMode} toggleDark={toggleDarkMode} />} />
        <Route path="/dashboard" element={<DashboardWorkspace darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="/upload" element={<DashboardWorkspace darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
        <Route path="*" element={<DashboardWorkspace darkMode={darkMode} toggleDarkMode={toggleDarkMode} />} />
      </Routes>
    </BrowserRouter>
  );
}