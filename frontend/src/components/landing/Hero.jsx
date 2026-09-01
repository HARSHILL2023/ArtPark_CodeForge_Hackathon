import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck, BrainCircuit, Route, Layers, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center relative z-10 w-full">
        {/* Top Tagline Pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg border border-[#252A31] bg-[#111418] text-[#A7AFBA] text-xs font-semibold mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#6366F1]" />
          <span>AI-Adaptive Career Intelligence OS</span>
        </motion.div>

        {/* Main Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#F5F7FA] leading-[1.1] tracking-tight mb-6"
        >
          Topological Skill Intelligence.{' '}
          <span className="block mt-1 text-[#6366F1]">
            Deterministic Career Readiness.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-sm sm:text-base text-[#A7AFBA] max-w-2xl mx-auto mb-9 leading-relaxed"
        >
          Upload your resume and target role. CodeForge performs semantic vector extraction, constructs a directed acyclic graph, and sequences an adaptive 5-phase learning pathway using Kahn's algorithm.
        </motion.p>

        {/* Primary & Secondary Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14"
        >
          <Link
            to="/upload"
            className="w-full sm:w-auto px-6 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold shadow-xs flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <span>Analyze My Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/dashboard"
            className="w-full sm:w-auto px-6 py-3 bg-[#111418] hover:bg-[#171A1F] border border-[#252A31] hover:border-[#323842] text-[#F5F7FA] rounded-xl font-semibold flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Play className="w-3.5 h-3.5 text-[#6366F1] fill-[#6366F1]" />
            <span>Interactive Demo Workspace</span>
          </Link>
        </motion.div>

        {/* Metric Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-3xl mx-auto"
        >
          {[
            { metric: 'Multi-LLM Engine', desc: 'Groq · Gemini · GPT-4o', icon: BrainCircuit },
            { metric: '84 Courses', desc: '14 Tech Domains', icon: Layers },
            { metric: 'Kahn Graph', desc: '0 Dependency Loops', icon: Route },
            { metric: 'Sandbox Ready', desc: '1-Click Judge Access', icon: ShieldCheck },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#111418] border border-[#252A31] text-left"
            >
              <item.icon className="w-4 h-4 text-[#6366F1] mb-2.5" />
              <div className="text-sm font-bold text-[#F5F7FA] tracking-tight">
                {item.metric}
              </div>
              <div className="text-[11px] text-[#A7AFBA] font-normal mt-0.5">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
