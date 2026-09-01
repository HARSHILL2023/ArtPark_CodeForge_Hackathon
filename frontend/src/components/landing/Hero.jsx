import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ShieldCheck, BrainCircuit, Route, Layers, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export default function Hero({ onOpenAuth }) {
  const { isLoggedIn } = useAuth();

  return (
    <section className="relative min-h-[82vh] flex items-center justify-center pt-28 pb-14 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 w-full">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-xs font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#3B82F6]" />
          <span>AI-Adaptive Career Intelligence OS</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1B1B19] dark:text-[#F2F0EA] leading-[1.12] tracking-tight mb-5"
        >
          Topological Skill Intelligence.{' '}
          <span className="block mt-1 text-[#2563EB] dark:text-[#3B82F6]">
            Deterministic Career Readiness.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-sm sm:text-base text-[#5E5C56] dark:text-[#B4B1A9] max-w-2xl mx-auto mb-8 leading-relaxed font-normal"
        >
          Upload your resume and target role. CodeForge performs semantic vector extraction, constructs a directed acyclic graph, and sequences an adaptive 5-phase learning pathway using Kahn's algorithm.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="cf-btn-primary px-6 py-2.5 text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="cf-btn-primary px-7 py-2.5 text-sm"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <a
            href="#features"
            className="cf-btn-secondary px-5 py-2.5 text-sm"
          >
            <span>Explore Platform</span>
            <ChevronDown className="w-4 h-4 text-[#85827A] dark:text-[#7E7C77]" />
          </a>
        </motion.div>

        {/* Metric Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto"
        >
          {[
            { metric: 'Multi-LLM Engine', desc: 'Groq · Gemini · GPT-4o', icon: BrainCircuit },
            { metric: '84 Courses', desc: '14 Tech Domains', icon: Layers },
            { metric: 'Kahn Graph', desc: '0 Dependency Loops', icon: Route },
            { metric: 'Sandbox Ready', desc: '1-Click Judge Access', icon: ShieldCheck },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] text-left hover-card group cursor-default"
            >
              <item.icon className="w-4 h-4 text-[#2563EB] dark:text-[#3B82F6] mb-2 transition-transform duration-200 group-hover:scale-110" />
              <div className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA] tracking-tight group-hover:text-[#2563EB] dark:group-hover:text-[#3B82F6] transition-colors">
                {item.metric}
              </div>
              <div className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] font-normal mt-0.5">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
