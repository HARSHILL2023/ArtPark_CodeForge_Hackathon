import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal, X, CheckSquare,
  Mic, ArrowRight, Shield,
  Cpu, Sparkles, Bookmark,
  RefreshCw, Zap,
  Target, Send, Bot, User, Loader2
} from 'lucide-react';
import * as api from '../lib/api';

export default function InterviewPrep({ skills = [], role = "Software Engineer" }) {
  const [isActive, setIsActive] = useState(false);
  const [currentType, setCurrentType] = useState('questions'); // 'questions', 'mock'
  const [activeTier, setActiveTier] = useState('All');
  const [isLoadingQA, setIsLoadingQA] = useState(false);
  const [qaList, setQaList] = useState([]);
  
  // Mock Studio conversation state
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm your Technical Interviewer for the ${role} position. Let's begin by reviewing your core architecture design choices. Ready?`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const fallbackQuestions = useMemo(() => [
    {
      id: 1,
      category: "System Design",
      difficulty: "Hard",
      question: `How would you design a scalable architecture for a high-traffic ${role} microservice system?`,
      idealAnswer: "I would decouple ingestion from processing using message queues (Kafka/RabbitMQ), implement distributed caching with Redis, use circuit breakers for fault tolerance, and ensure database queries are indexed with read-replicas.",
      keyPoints: ["Horizontal scaling", "Decoupled queues", "Distributed caching", "Circuit breaking"],
      followUp: "How do you maintain data consistency across distributed boundaries without two-phase commits?"
    },
    {
      id: 2,
      category: "Technical",
      difficulty: "Medium",
      question: "Explain how you optimize latency and throughput in API endpoints handling 50k+ requests/sec.",
      idealAnswer: "Profile the hot paths using APM tools, optimize database queries with composite indexes, implement response payload compression, leverage CDN edge caching, and offload CPU-intensive operations to background workers.",
      keyPoints: ["Indexing & query profiling", "In-memory caching", "Edge CDN", "Worker offloading"],
      followUp: "What metrics would you monitor in your Grafana dashboard to alert before latency breaches SLA?"
    },
    {
      id: 3,
      category: "Behavioral",
      difficulty: "Medium",
      question: "Describe a critical production incident you resolved and the post-mortem safeguards you implemented.",
      idealAnswer: "During a database pool exhaustion incident, I temporarily throttled non-critical traffic, increased pool limits with connection timeouts, and later implemented connection pooling metrics, automated health checks, and a runbook for the team.",
      keyPoints: ["Calm incident triage", "Root cause identification", "Automated alerts", "Blameless post-mortem"],
      followUp: "How did you communicate the downtime impact and resolution to non-technical stakeholders?"
    },
    {
      id: 4,
      category: "Problem Solving",
      difficulty: "Easy",
      question: `What is your approach to testing and ensuring zero regression in continuous delivery for ${skills[0]?.name || 'key technologies'}?`,
      idealAnswer: "I follow the testing pyramid: comprehensive unit tests for business logic, contract tests for API boundaries, integration tests in containerized CI environments, and canary deployments with automated rollback.",
      keyPoints: ["Unit & contract tests", "Containerized CI", "Canary releases", "Automated rollbacks"],
      followUp: "How do you balance test execution speed against test coverage in tight CI/CD windows?"
    }
  ], [role, skills]);

  // Load questions when matrix is launched
  const handleLaunchQA = async () => {
    setIsActive(true);
    setCurrentType('questions');
    
    if (qaList.length > 0) return; // already loaded

    setIsLoadingQA(true);
    try {
      const skillNames = skills.map(s => s.name || s.skill || s);
      const res = await api.generateQA({
        jobRole: role,
        skills: skillNames.length > 0 ? skillNames : ['TypeScript', 'React', 'Node.js'],
        experienceLevel: 'Mid-Senior',
        interviewType: 'Mixed'
      });

      if (res && res.qaList && Array.isArray(res.qaList) && res.qaList.length > 0) {
        setQaList(res.qaList);
      } else {
        setQaList(fallbackQuestions);
      }
    } catch (err) {
      console.warn('Using curated fallback questions:', err.message);
      setQaList(fallbackQuestions);
    } finally {
      setIsLoadingQA(false);
    }
  };

  const handleSendMockMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isAiThinking) return;

    const userMessage = { role: 'user', content: chatInput.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setChatInput('');
    setIsAiThinking(true);

    try {
      const systemPrompt = `You are a Senior Technical Interviewer evaluating a candidate for the role of ${role}. Candidate evaluated skills: ${skills.map(s => s.name || s.skill).join(', ')}. Keep replies focused on realistic technical questions, constructive follow-ups, and probing depth. Keep answers under 3-4 sentences.`;
      const res = await api.sendInterviewChat(systemPrompt, updatedMessages);
      
      const aiReply = res?.reply || "Good answer. Let's dig deeper into how you would test and monitor this system under heavy concurrent load.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiReply }]);
    } catch (err) {
      console.error('Interview chat error:', err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "That's a solid architectural perspective. How would you handle state synchronization across multiple client instances?"
      }]);
    } finally {
      setIsAiThinking(false);
    }
  };

  const displayedQuestions = qaList.length > 0 ? qaList : fallbackQuestions;
  const filteredQuestions = activeTier === 'All'
    ? displayedQuestions
    : displayedQuestions.filter(q => q.category === activeTier || q.difficulty === activeTier);

  const categories = ['All', 'Technical', 'System Design', 'Behavioral', 'Problem Solving'];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header Banner */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">AI Technical Interview Simulator</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live generative technical interview preparation for {role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLaunchQA}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Launch Q&A Matrix</span>
          </button>

          <button
            type="button"
            onClick={() => { setIsActive(true); setCurrentType('mock'); }}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-emerald-500" />
            <span>Mock Session</span>
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Targeted Gap Alignment", desc: "Questions dynamically focus on your missing & weak skills.", icon: Target, col: "text-indigo-500" },
          { title: "FAANG-Grade Rubrics", desc: "Includes ideal STAR model answers and key evaluation points.", icon: Shield, col: "text-emerald-500" },
          { title: "Live Conversational AI", desc: "Simulate multi-turn technical and behavioral interviewer rounds.", icon: Sparkles, col: "text-violet-500" }
        ].map((item, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
            <item.icon className={`w-5 h-5 ${item.col} mb-2`} />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[85vh]"
            >
              {/* Modal Top Bar */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-600 text-white rounded-lg">
                    {currentType === 'questions' ? <Terminal className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {currentType === 'questions' ? `AI Question Matrix &bull; ${role}` : `Mock Interview Simulation &bull; ${role}`}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {currentType === 'questions' ? 'Curated architectural & technical challenge questions' : 'Multi-turn AI technical evaluation session'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setCurrentType('questions')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        currentType === 'questions'
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Question Matrix
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentType('mock')}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                        currentType === 'mock'
                          ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      Mock Simulation
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsActive(false)}
                    aria-label="Close interview prep"
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30 dark:bg-slate-950/30">
                {currentType === 'questions' ? (
                  <div className="space-y-6">
                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveTier(cat)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors border ${
                              activeTier === cat
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={handleLaunchQA}
                        disabled={isLoadingQA}
                        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5 hover:bg-slate-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isLoadingQA ? 'animate-spin' : ''}`} />
                        <span>Regenerate AI Questions</span>
                      </button>
                    </div>

                    {isLoadingQA ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-3">
                        <Loader2 className="w-8 h-8 animate-spin text-indigo-600 dark:text-indigo-400" />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Generating tailored FAANG-grade interview questions...
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredQuestions.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 uppercase tracking-wider">
                                {item.category}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  item.difficulty === 'Hard'
                                    ? 'bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
                                    : item.difficulty === 'Medium'
                                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300'
                                    : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                                }`}
                              >
                                {item.difficulty}
                              </span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                              {item.question}
                            </h4>

                            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Model Answer Framework:</span>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                                "{item.idealAnswer}"
                              </p>
                            </div>

                            {item.followUp && (
                              <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
                                <span className="font-bold">Interviewer Probing Follow-Up: </span>
                                {item.followUp}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Mock Interview Chat Interface */
                  <div className="flex flex-col h-full space-y-4 max-w-3xl mx-auto">
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                      {messages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 ${
                            msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              msg.role === 'assistant'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-700 text-white'
                            }`}
                          >
                            {msg.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          </div>
                          <div
                            className={`p-4 rounded-xl text-xs leading-relaxed max-w-[85%] ${
                              msg.role === 'assistant'
                                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm'
                                : 'bg-indigo-600 text-white shadow-sm'
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {isAiThinking && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium py-2">
                          <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                          <span>Interviewer is evaluating your response...</span>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMockMessage} className="pt-2 flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Type your architectural explanation or answer..."
                        className="flex-1 px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || isAiThinking}
                        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
