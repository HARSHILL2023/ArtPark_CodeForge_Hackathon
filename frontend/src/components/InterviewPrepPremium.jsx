import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowRight,
  Sparkles,
  RefreshCw,
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
      question: "Walk me through how you isolate memory leaks and performance bottlenecks in asynchronous workloads.",
      idealAnswer: "I take heap snapshots before and after stress tests, analyze retainers to identify uncollected event listeners or closures, and monitor event loop lag using profiling metrics.",
      keyPoints: ["Heap snapshots", "Retainer tree analysis", "Event loop profiling"],
      followUp: "How would you reproduce intermittent memory spikes in staging before releasing to production?"
    }
  ], [role]);

  const displayedQuestions = qaList.length > 0 ? qaList : fallbackQuestions;

  const categories = useMemo(() => {
    const set = new Set(displayedQuestions.map(q => q.category));
    return ['All', ...Array.from(set)];
  }, [displayedQuestions]);

  const filteredQuestions = useMemo(() => {
    if (activeTier === 'All') return displayedQuestions;
    return displayedQuestions.filter(q => q.category === activeTier);
  }, [displayedQuestions, activeTier]);

  const handleLaunchQA = async () => {
    setIsLoadingQA(true);
    try {
      const weakSkillNames = skills
        .filter(s => s.yourLevel < s.requiredLevel)
        .map(s => s.name);
      
      const res = await api.getInterviewQA(role, weakSkillNames);
      if (res && res.questions && res.questions.length > 0) {
        setQaList(res.questions);
      }
    } catch (err) {
      console.warn("Failed fetching AI questions, using fallback set:", err);
    } finally {
      setIsLoadingQA(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isAiThinking) return;

    const userMsg = { role: 'user', content: chatInput.trim() };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setChatInput('');
    setIsAiThinking(true);

    try {
      const res = await api.sendInterviewMessage(role, updatedHistory, userMsg.content);
      if (res && res.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.reply }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            content: "Strong architectural trade-off! Let's drill into the persistence layer. How do you handle cache invalidation during write spikes?"
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Excellent clarification. In terms of fault tolerance, what happens if the secondary replica fails during a split-brain scenario?"
        }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  return (
    <>
      {/* Launch Card */}
      <div className="p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
              AI Technical Mock Interview Studio
            </h3>
            <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] mt-0.5">
              Practice architectural & behavioral interviews generated for {role}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setIsActive(true);
            if (qaList.length === 0) handleLaunchQA();
          }}
          className="cf-btn-primary self-start sm:self-auto py-2 px-3 text-xs"
        >
          <span>Open Interview Studio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Full Modal Studio */}
      <AnimatePresence>
        {isActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0C0D0F]/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.15 }}
              className="w-full max-w-4xl bg-[#FCFBF8] dark:bg-[#121416] rounded-2xl shadow-md border border-[#DCD9D1] dark:border-[#292D33] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Studio Header */}
              <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
                      {currentType === 'questions' ? `AI Question Matrix · ${role}` : `Mock Interview Simulation · ${role}`}
                    </h3>
                    <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">
                      {currentType === 'questions' ? 'Curated architectural & technical challenge questions' : 'Multi-turn AI technical evaluation session'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex bg-[#FCFBF8] dark:bg-[#121416] p-0.5 rounded-lg border border-[#DCD9D1] dark:border-[#292D33]">
                    <button
                      type="button"
                      onClick={() => setCurrentType('questions')}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        currentType === 'questions'
                          ? 'bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F]'
                          : 'text-[#5E5C56] dark:text-[#B4B1A9] hover:text-[#1B1B19] dark:hover:text-white'
                      }`}
                    >
                      Question Matrix
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentType('mock')}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                        currentType === 'mock'
                          ? 'bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F]'
                          : 'text-[#5E5C56] dark:text-[#B4B1A9] hover:text-[#1B1B19] dark:hover:text-white'
                      }`}
                    >
                      Mock Simulation
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsActive(false)}
                    aria-label="Close interview prep"
                    className="p-1.5 rounded-lg text-[#85827A] dark:text-[#7E7C77] hover:text-[#1B1B19] dark:hover:text-white hover:bg-[#EEECE6] dark:hover:bg-[#181B1F] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#FCFBF8] dark:bg-[#121416]">
                {currentType === 'questions' ? (
                  <div className="space-y-4">
                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5">
                      <div className="flex flex-wrap gap-1.5">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setActiveTier(cat)}
                            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors border cursor-pointer ${
                              activeTier === cat
                                ? 'bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F] border-transparent'
                                : 'bg-[#FCFBF8] dark:bg-[#181B1F] text-[#5E5C56] dark:text-[#B4B1A9] border-[#DCD9D1] dark:border-[#292D33] hover:text-[#1B1B19] dark:hover:text-white'
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
                        className="cf-btn-secondary py-1 px-2.5 text-xs"
                      >
                        <RefreshCw className={`w-3 h-3 ${isLoadingQA ? 'animate-spin' : ''}`} />
                        <span>Regenerate AI Questions</span>
                      </button>
                    </div>

                    {isLoadingQA ? (
                      <div className="flex flex-col items-center justify-center py-12 space-y-2.5">
                        <Loader2 className="w-6 h-6 animate-spin text-[#B88916] dark:text-[#D4A72C]" />
                        <p className="text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
                          Generating tailored interview questions...
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredQuestions.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="p-4 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B88916]/10 dark:bg-[#D4A72C]/10 text-[#B88916] dark:text-[#D4A72C] border border-[#B88916]/20 uppercase tracking-wider">
                                {item.category}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                  item.difficulty === 'Hard'
                                    ? 'bg-[#B33A3A]/10 text-[#B33A3A] dark:bg-[#D96565]/10 dark:text-[#D96565]'
                                    : item.difficulty === 'Medium'
                                    ? 'bg-[#9A6B00]/10 text-[#9A6B00] dark:bg-[#D6A84F]/10 dark:text-[#D6A84F]'
                                    : 'bg-[#237A4B]/10 text-[#237A4B] dark:bg-[#4CAF7A]/10 dark:text-[#4CAF7A]'
                                }`}
                              >
                                {item.difficulty}
                              </span>
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] leading-snug">
                              {item.question}
                            </h4>

                            <div className="p-2.5 bg-[#EEECE6]/60 dark:bg-[#121416] rounded-lg border border-[#DCD9D1] dark:border-[#292D33]">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#85827A] dark:text-[#7E7C77] block mb-1">Model Answer:</span>
                              <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed italic">
                                "{item.idealAnswer}"
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Mock Interactive Session */
                  <div className="flex flex-col h-[520px]">
                    <div className="flex-1 overflow-y-auto space-y-3 p-2">
                      {messages.map((m, idx) => {
                        const isUser = m.role === 'user';
                        return (
                          <div
                            key={idx}
                            className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                                isUser
                                  ? 'bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F]'
                                  : 'bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] text-[#B88916] dark:text-[#D4A72C]'
                              }`}
                            >
                              {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                            </div>

                            <div
                              className={`max-w-[78%] p-3 rounded-xl text-xs leading-relaxed ${
                                isUser
                                  ? 'bg-[#B88916] dark:bg-[#D4A72C] text-white dark:text-[#0C0D0F]'
                                  : 'bg-[#EEECE6] dark:bg-[#181B1F] text-[#1B1B19] dark:text-[#F2F0EA] border border-[#DCD9D1] dark:border-[#292D33]'
                              }`}
                            >
                              {m.content}
                            </div>
                          </div>
                        );
                      })}

                      {isAiThinking && (
                        <div className="flex items-center gap-2 text-xs text-[#85827A] dark:text-[#7E7C77] pl-9">
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#B88916] dark:text-[#D4A72C]" />
                          <span>Interviewer is evaluating your response...</span>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="pt-3 border-t border-[#DCD9D1] dark:border-[#292D33] flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={`Explain your approach for ${role}...`}
                        className="flex-1 px-3 py-2 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#B88916] dark:focus:ring-[#D4A72C]"
                      />
                      <button
                        type="submit"
                        disabled={isAiThinking || !chatInput.trim()}
                        className="cf-btn-primary py-2 px-3 text-xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Reply</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
