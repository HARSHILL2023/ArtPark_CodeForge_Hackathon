import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Terminal, X, CheckSquare,
    Mic, ArrowRight, Shield,
    Cpu, Gauge, Sparkles, Bookmark,
    Layers, RefreshCw, Zap,
    Target, History
} from 'lucide-react';

export default function InterviewPrep({ skills = [], role = "Software Engineer" }) {
    const [isActive, setIsActive] = useState(false);
    const [currentType, setCurrentType] = useState('questions'); // 'questions', 'mock'
    const [isListening, setIsListening] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [activeTier, setActiveTier] = useState('All');
    const [randomQuestionIndex] = useState(() => Math.floor(Math.random() * 20));

    const tiers = ['All', 'Beginner Warmup', 'Core Concepts', 'Advanced System Design', 'Real-world Scenarios'];

    const questions = [
        {
            q: "How would you design a scalable micro-frontend architecture for a large enterprise dashboard?",
            a: "I'd use a Module Federation approach (Webpack/Vite) to share dependencies. Key considerations include consistent design system tokens, cross-application state (via custom events or a lightweight store), and robust error boundaries to prevent one app from crashing the container.",
            tier: "Advanced System Design",
            difficulty: "Hard"
        },
        {
            q: "Explain how you would optimize Core Web Vitals, specifically LCP and CLS, in a complex Next.js application.",
            a: "For LCP, I'd prioritize critical CSS, use next/image for optimized assets, and implement pre-fetching. For CLS, I'd set explicit dimensions for media/ads, avoid inserting content above existing elements, and ensure font-display: swap is managed to prevent layout shifts.",
            tier: "Core Concepts",
            difficulty: "Medium"
        },
        {
            q: "Compare Redux, Context API, and Zustand for state management in a high-performance React app.",
            a: "Redux is best for large-scale apps with complex state transitions and strict debugging needs. Context API is suitable for static data (themes, auth). Zustand offers a minimalist, high-performance middle ground with less boilerplate, making it ideal for most modern reactive applications.",
            tier: "Core Concepts",
            difficulty: "Medium"
        },
        {
            q: "What is your strategy for ensuring a React application is fully accessible (WCAG 2.1 compliance)?",
            a: "I prioritize semantic HTML (main, section, nav), use ARIA attributes where necessary, ensure full keyboard navigability, and implement focus traps for modals. Constant testing with screen readers (NVDA/VoiceOver) and automated tools like axe-core is essential.",
            tier: "Beginner Warmup",
            difficulty: "Easy"
        },
        {
            q: "Describe a robust pattern for handling API authentication and silent token refreshes in a SPA.",
            a: "I utilize Axios interceptors to catch 401 errors, trigger a refresh token call, and retry original requests seamlessly. Tokens are stored in memory (not localStorage) to mitigate XSS, while HttpOnly cookies handle the actual session persistence.",
            tier: "Core Concepts",
            difficulty: "Medium"
        },
        {
            q: "How would you secure a frontend application against common XSS and CSRF attacks?",
            a: "For XSS, I avoid dangerouslySetInnerHTML, sanitize all user inputs, and implement a strict Content Security Policy (CSP). For CSRF, I ensure that sensitive actions are done via POST with Anti-CSRF tokens and SameSite cookie attributes (Strict/Lax).",
            tier: "Core Concepts",
            difficulty: "Medium"
        },
        {
            q: "Explain the benefits of React Server Components (RSC) vs. traditional Client Components.",
            a: "RSCs execute on the server, significantly reducing the JavaScript bundle sent to the client. This allows for direct database access from components, eliminates unnecessary data fetching waterfalls, and improves initial page load speed and SEO.",
            tier: "Advanced System Design",
            difficulty: "Hard"
        },
        {
            q: "How do you handle large-scale data rendering (e.g., 10k+ items) without blocking the main thread?",
            a: "I implement virtualization using libraries like react-window or react-virtual. This ensures only visible items are rendered in the DOM, drastically reducing memory usage and initial render time while keeping scroll performance smooth.",
            tier: "Real-world Scenarios",
            difficulty: "Hard"
        },
        {
            q: "What is your testing hierarchy for a production-ready frontend project?",
            a: "I follow the 'Testing Trophy' model: high emphasis on integration tests (RTL) to verify component behavior, unit tests for pure logic/utils (Jest/Vitest), and critical E2E flows (Playwright/Cypress) to ensure the entire system works together.",
            tier: "Beginner Warmup",
            difficulty: "Easy"
        },
        {
            q: "Strategy for managing large, complex forms with dynamic validation in React?",
            a: "I use React Hook Form for performance (uncontrolled components) paired with Zod for schema-based validation. This allows for clear, declarative validation logic that handles dynamic fields effortlessly without constant re-renders.",
            tier: "Real-world Scenarios",
            difficulty: "Medium"
        },
        {
            q: "How would you implement a 'Dark Mode' system that respects OS preferences but persists user choices?",
            a: "I'd use a CSS Variables based theme system. A small script in the HTML head checks localStorage and `matchMedia('(prefers-color-scheme: dark)')` to apply a `.dark` class to the document root before the main app paints, preventing 'theme flicker'.",
            tier: "Beginner Warmup",
            difficulty: "Easy"
        },
        {
            q: "Describe how to optimize a frontend build pipeline for faster CI/CD times.",
            a: "I'd utilize build caching (GitHub Actions cache/Turborepo), parallelize test suites, and implement incremental builds. Using faster bundlers like Vite/esbuild and swc for transpilation significantly cuts down on compilation time.",
            tier: "Advanced System Design",
            difficulty: "Hard"
        },
        {
            q: "What is 'Tree Shaking' and how do you ensure your project benefits from it?",
            a: "Tree shaking removes unused code during bundling. To maximize it, I use ES6 module syntax (import/export), keep functions pure, avoid side effects in top-level files, and ensure libraries used are correctly marked as 'sideEffects: false' in their package.json.",
            tier: "Core Concepts",
            difficulty: "Easy"
        },
        {
            q: "How do you handle Internationalization (i18n) for a multi-region enterprise application?",
            a: "I use react-i18next with lazy-loaded translation files to keep bundles light. I support right-to-left (RTL) layouts via CSS logical properties and ensure date/number formatting is handled via the Intl browser API for consistency.",
            tier: "Real-world Scenarios",
            difficulty: "Medium"
        },
        {
            q: "Explain the 'Compound Component' pattern and why it's useful for UI libraries.",
            a: "It's a pattern where state is shared implicitly between a parent and its children (like Select/Option). It provides a clean, declarative API for users, reduces prop drilling, and gives high flexibility over component structure while maintaining internal state.",
            tier: "Core Concepts",
            difficulty: "Medium"
        },
        {
            q: "How would you implement a performant 'Search-as-you-type' feature with API debouncing?",
            a: "I'd use a custom `useDebounce` hook to delay the API call until the user stops typing for ~300ms. I'd also use a results cache and implement an 'AbortController' to cancel previous inflight requests if a new search is initiated.",
            tier: "Real-world Scenarios",
            difficulty: "Easy"
        },
        {
            q: "Discuss the pros and cons of using a Monorepo for frontend development (Nx vs Turbo).",
            a: "Pros include shared code/UI libraries, atomic commits across projects, and simplified dependency management. Cons involve potentially large repo sizes and increased complexity in CI setup. Nx and Turbo provide 'computation hashing' to make these structures manageable.",
            tier: "Advanced System Design",
            difficulty: "Hard"
        },
        {
            q: "What is the difference between UseMemo and UseCallback, and when should you avoid them?",
            a: "UseMemo caches a value, UseCallback caches a function. Avoid them for simple calculations or small components, as the overhead of dependency tracking and memory usage can sometimes outweigh the performance gain of skipping a re-render.",
            tier: "Beginner Warmup",
            difficulty: "Easy"
        },
        {
            q: "How do you manage 'Cascading Renders' in large React applications?",
            a: "I identify unnecessary re-renders using Profilers. Solutions include moving state closer to where it's used, using state composition (lifting down), memoizing expensive components, and ensuring stable props (using useMemo/useCallback appropriately).",
            tier: "Real-world Scenarios",
            difficulty: "Hard"
        },
        {
            q: "Explain the 'Hydration Error' in SSR apps and how to prevent it.",
            a: "It occurs when the server-rendered HTML doesn't match the first client-side render (e.g., using `new Date()` or `window`). To prevent it, I use `useEffect` to trigger client-only logic or use 'suppressHydrationWarning' sparingly for inevitable mismatches.",
            tier: "Advanced System Design",
            difficulty: "Medium"
        }
    ];

    const filteredQuestions = activeTier === 'All'
        ? questions
        : questions.filter(q => q.tier === activeTier);

    useEffect(() => {
        if (isActive && currentType === 'mock') {
            const timer = setTimeout(() => setIsThinking(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [isActive, currentType]);

    const pulseAnimate = {
        scale: [1, 1.02, 1],
        opacity: [0.7, 1, 0.7],
        transition: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative"
        >
            {/* Outer Glow */}
            <div className="absolute inset-0 bg-violet-400/10 rounded-[2rem] blur-2xl group-hover:opacity-100 opacity-0 transition-all duration-1000 -z-10" />

            <div className="relative bg-white dark:bg-[#020617] border border-slate-200/80 dark:border-slate-800/60 rounded-[2rem] p-0.5 overflow-hidden transition-all duration-500 hover:border-violet-400/40 dark:hover:border-violet-500/30 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-2xl hover-levitate">
                <div className="rounded-[1.9rem] p-6 md:p-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex-1 space-y-5 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <div className="px-3 py-1 bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 rounded-md text-[9px] font-black uppercase tracking-[0.15em] border border-violet-200 dark:border-violet-500/20">
                                    <Sparkles className="w-3 h-3 inline mr-1.5" />
                                    Studio Matrix 3.5
                                </div>
                                <div className="px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-md text-[8px] font-black uppercase border border-emerald-200 dark:border-emerald-500/20 tracking-wider">
                                    Production Grade
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-[#1a1a2e] dark:text-white tracking-tight leading-[1.1]">
                                Engineering <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 dark:from-violet-400 to-purple-500 dark:to-indigo-400">Simulation Studio</span>
                            </h2>

                            <p className="text-sm text-[#6b7280] dark:text-slate-400 font-medium max-w-lg leading-relaxed px-1">
                                High-density technical evaluation and architectural reasoning. Select a module to begin deep-state assessment.
                            </p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                                <button
                                    onClick={() => { setIsActive(true); setCurrentType('questions') }}
                                    className="group/q px-6 py-3 bg-[#1a1a2e] dark:bg-white text-white dark:text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-slate-900/10 dark:shadow-xl hover:shadow-xl hover:shadow-violet-500/15 dark:hover:shadow-violet-500/20 hover:-translate-y-1 transition-all active:scale-95 flex items-center gap-2.5 pulse-glow-btn"
                                >
                                    <Zap className="w-4 h-4 text-violet-400 dark:text-violet-600 icon-spin-float" />
                                    Launch Q&A Matrix
                                    <ArrowRight className="w-4 h-4 group-hover/q:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => { setIsActive(true); setCurrentType('mock'); setIsListening(true) }}
                                    className="px-6 py-3 bg-emerald-50 dark:bg-slate-900 border border-emerald-200 dark:border-slate-700 text-emerald-700 dark:text-white rounded-xl text-xs font-black hover:bg-emerald-100 dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-slate-500 transition-all active:scale-95 flex items-center gap-2.5"
                                >
                                    <Target className="w-4 h-4 text-emerald-500 dark:text-emerald-400 icon-spin-float" />
                                    Start Session
                                </button>
                            </div>
                        </div>

                        <div className="hidden xl:block relative">
                            <div className="absolute inset-0 bg-violet-400/5 dark:bg-violet-600/5 rounded-full blur-[60px]" />
                            <div className="relative w-56 h-56 bg-[#f3f4f6] dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex items-center justify-center shadow-sm dark:shadow-xl rotate-2">
                                <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.15)_50%,transparent_75%)] [background-size:200%_200%] animate-[shimmer_5s_infinite] rounded-[2.5rem]" />
                                <div className="w-32 h-32 rounded-[2rem] border border-slate-200/60 dark:border-slate-700/30 flex items-center justify-center p-6 bg-white dark:bg-slate-900/50 hover-levitate pointer-events-auto cursor-pointer">
                                    <Cpu className="w-16 h-16 text-violet-500/80 icon-spin-float" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pro-Tool Dashboard Modal */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 backdrop-blur-3xl bg-slate-950/95"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 30 }}
                            className="w-full max-w-6xl bg-[#020617] rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-slate-800/80 overflow-hidden flex flex-col h-[85vh]"
                        >
                            {/* Pro Header */}
                            <div className="px-8 py-5 border-b border-slate-800/50 flex items-center justify-between bg-slate-950/80">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-violet-600/90 text-white rounded-xl shadow-lg shadow-violet-600/20">
                                        {currentType === 'questions' ? <Terminal className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                                            {currentType === 'questions' ? 'Architecture Ledger' : 'Simulation Studio'}
                                            <span className="px-2 py-0.5 bg-slate-800 text-[8px] text-slate-400 rounded uppercase font-black tracking-widest border border-slate-700/50">v3.5p</span>
                                        </h4>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Active Link</span>
                                            </div>
                                            <span className="flex items-center gap-1.5 text-[8px] text-slate-500 font-black uppercase tracking-widest">
                                                <Shield className="w-3 h-3 text-violet-500" /> Secure Tunnel
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsActive(false)}
                                    className="p-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-500 hover:text-white hover:border-slate-600 transition-all active:scale-90"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex-1 flex overflow-hidden">
                                {/* Compact Sidebar */}
                                <div className="hidden lg:flex w-64 border-r border-slate-800/50 flex-col p-6 bg-slate-950/20">
                                    <div className="space-y-2">
                                        <p className="px-4 text-[8px] font-black text-slate-600 uppercase tracking-widest mb-4">Core Modules</p>
                                        <button
                                            onClick={() => setCurrentType('questions')}
                                            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[11px] font-bold transition-all ${currentType === 'questions' ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-900 border border-transparent hover:border-slate-800'}`}
                                        >
                                            <Bookmark className="w-4 h-4 shrink-0" />
                                            Knowledge Ledger
                                        </button>
                                        <button
                                            onClick={() => setCurrentType('mock')}
                                            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[11px] font-bold transition-all ${currentType === 'mock' ? 'bg-violet-600 text-white' : 'text-slate-500 hover:bg-slate-900 border border-transparent hover:border-slate-800'}`}
                                        >
                                            <Mic className="w-4 h-4 shrink-0" />
                                            Voice Assessment
                                        </button>
                                        <button className="w-full px-4 py-3 rounded-xl flex items-center gap-3 text-[11px] font-bold text-slate-700 opacity-40 cursor-not-allowed">
                                            <History className="w-4 h-4" />
                                            Trace Logs
                                        </button>
                                    </div>

                                    <div className="mt-auto border border-slate-800/50 bg-slate-900/10 rounded-2xl p-4 space-y-3">
                                        <div className="w-8 h-8 bg-violet-600/10 rounded-lg flex items-center justify-center text-violet-500">
                                            <Layers className="w-4 h-4" />
                                        </div>
                                        <p className="text-[9px] font-medium leading-relaxed text-slate-500 uppercase tracking-wider">GPT-4o Engine <br /> Enabled</p>
                                    </div>
                                </div>

                                {/* Refined Content Hub */}
                                <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide bg-[#020617]">
                                    {currentType === 'questions' ? (
                                        <div className="space-y-8">
                                            {/* Tier Filter */}
                                            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/30 rounded-lg border border-slate-800/50 w-fit mx-auto md:mx-0">
                                                {tiers.map(tier => (
                                                    <button
                                                        key={tier}
                                                        onClick={() => setActiveTier(tier)}
                                                        className={`px-3 py-1.5 rounded-md text-[8px] font-black uppercase tracking-wider transition-all ${activeTier === tier ? 'bg-violet-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                                    >
                                                        {tier}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {filteredQuestions.map((item, i) => (
                                                    <motion.div
                                                        key={i}
                                                        layout
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="group/card relative bg-slate-900/10 border border-slate-800/40 p-5 rounded-2xl hover:border-violet-500/20 transition-all hover:bg-slate-900/20"
                                                    >
                                                        <div className="space-y-4">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-[7px] font-black text-slate-600 uppercase tracking-widest bg-slate-800/50 px-1.5 py-0.5 rounded leading-none">{item.tier}</span>
                                                                        <span className={`text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded leading-none ${item.difficulty === 'Hard' ? 'text-rose-400 bg-rose-500/5' :
                                                                                item.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/5' :
                                                                                    'text-emerald-400 bg-emerald-500/5'
                                                                            }`}>{item.difficulty}</span>
                                                                    </div>
                                                                    <h5 className="text-sm font-bold text-white leading-snug group-hover/card:text-violet-200 transition-colors">
                                                                        {item.q}
                                                                    </h5>
                                                                </div>
                                                                <div className="text-[10px] font-black text-slate-800 group-hover/card:text-violet-900/30 shrink-0">
                                                                    #{i + 1 < 10 ? `0${i + 1}` : i + 1}
                                                                </div>
                                                            </div>

                                                            <div className="p-4 bg-slate-950/50 border border-slate-800/30 rounded-xl">
                                                                <p className="text-[11px] leading-relaxed text-slate-500 font-medium italic">
                                                                    "{item.a}"
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto space-y-12">
                                            {/* Microphone Module */}
                                            <div className="relative">
                                                <AnimatePresence>
                                                    {isListening && (
                                                        <motion.div
                                                            animate={pulseAnimate}
                                                            className="absolute inset-0 bg-violet-600/10 rounded-full blur-[40px]"
                                                        />
                                                    )}
                                                </AnimatePresence>

                                                <div className="relative w-40 h-40 rounded-full bg-slate-950 border border-slate-800/50 flex items-center justify-center shadow-inner">
                                                    <div className={`absolute inset-0 rounded-full border border-violet-500/10`} />
                                                    <div className={`absolute inset-2 rounded-full border-t border-violet-500/40 ${isThinking ? 'animate-spin' : ''}`} />

                                                    <div className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-700 ${isListening ? 'bg-violet-600 shadow-xl' : 'bg-slate-900'}`}>
                                                        <Mic className={`w-10 h-10 ${isListening ? 'text-white' : 'text-slate-700'}`} />
                                                    </div>

                                                    {/* Pro Waveform */}
                                                    {isListening && (
                                                        <div className="absolute -bottom-6 flex gap-1 items-end h-8 w-16 justify-center">
                                                            {[...Array(10)].map((_, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    animate={{ height: [4, Math.random() * 20 + 5, 4] }}
                                                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.04 }}
                                                                    className="w-1 bg-violet-500/60 rounded-full"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="text-center space-y-4">
                                                <h3 className="text-xl font-black text-white tracking-tight">
                                                    {isThinking ? (
                                                        <span className="flex items-center justify-center gap-2">
                                                            <RefreshCw className="w-4 h-4 animate-spin text-violet-500" />
                                                            Processing Neural Feedback...
                                                        </span>
                                                    ) : "Studio Active. Transmitting."}
                                                </h3>
                                                <div className="p-4 bg-slate-900/20 border border-slate-800/30 rounded-2xl">
                                                    <p className="text-slate-500 text-xs font-medium leading-relaxed italic opacity-80 max-w-sm mx-auto">
                                                        "{questions[randomQuestionIndex % questions.length].q}"
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center justify-center gap-4">
                                                <button
                                                    onClick={() => setIsListening(!isListening)}
                                                    className={`px-8 py-3 rounded-xl text-[10px] font-black transition-all flex items-center gap-2 shadow-lg active:scale-95 ${isListening ? 'bg-rose-600 text-white' : 'bg-violet-600 text-white'}`}
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                    {isListening ? 'Stop Link' : 'Re-engage Studio'}
                                                </button>
                                                <button
                                                    onClick={() => setIsThinking(true)}
                                                    className="px-8 py-3 bg-white text-slate-950 rounded-xl text-[10px] font-black hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-2 border border-transparent"
                                                >
                                                    <CheckSquare className="w-3.5 h-3.5" />
                                                    Finalize Scoring
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Pro Footer */}
                            <div className="px-8 py-6 bg-slate-950 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Sys. 0 errors</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Gauge className="w-3 h-3 text-violet-500" />
                                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Lat. 12ms</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsActive(false)}
                                    className="px-8 py-3 bg-slate-900/50 border border-slate-800 text-slate-300 rounded-xl text-[10px] font-black transition-all active:scale-95 hover:bg-slate-800 hover:text-white"
                                >
                                    End Matrix Session
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
