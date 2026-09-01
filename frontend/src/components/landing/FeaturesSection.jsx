import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Target, Route, FileCheck2, MessagesSquare, GitBranch } from 'lucide-react';

export default function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } }
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const features = [
    {
      icon: ScanSearch,
      title: 'Semantic Skill DNA Profile',
      desc: 'Vector embeddings classify your competencies across Mastered, Emerging, and Critical Gaps with exact cosine similarity scoring.',
      tag: 'Vector Match',
      wide: true
    },
    {
      icon: Target,
      title: 'Predictive Role Trajectory',
      desc: 'Simulate fit across Frontend, Backend, and Full Stack positions to calculate estimated weeks to hire and pass probability.',
      tag: 'Role Simulation'
    },
    {
      icon: Route,
      title: '5-Phase Kahn Roadmap',
      desc: 'Topological sort builds a strictly sequenced curriculum enforcing prerequisites and eliminating circular dependencies.',
      tag: 'Topological Sort'
    },
    {
      icon: FileCheck2,
      title: 'STAR Resume Optimizer',
      desc: 'ATS score benchmarking and quantifiable before/after bullet rewrites with client-side PDF compilation.',
      tag: 'ATS Optimization'
    },
    {
      icon: MessagesSquare,
      title: 'AI Technical Interview Studio',
      desc: 'Generative interview matrix with multi-turn conversational AI evaluation tailored to candidate skill deficiencies.',
      tag: 'Mock Interview',
      wide: true
    },
    {
      icon: GitBranch,
      title: 'Auditable Decision Traces',
      desc: 'Explainable AI decision panel detailing why each course was selected, adapted, or pruned for your profile.',
      tag: 'Explainable AI'
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6" id="features">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={item}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#252A31] bg-[#111418] text-[#A7AFBA] text-xs font-semibold uppercase tracking-wider mb-3">
          <span>Platform Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-3">
          Engineered for Career Acceleration
        </h2>
        <p className="text-xs sm:text-sm text-[#A7AFBA] max-w-xl mx-auto">
          Combining vector similarity, deterministic graph theory, and generative AI to systematically bridge enterprise skill gaps.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              variants={item}
              className={`flex flex-col p-6 rounded-2xl bg-[#111418] border border-[#252A31] hover:border-[#323842] transition-colors ${
                f.wide ? 'md:col-span-2' : ''
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-[#171A1F] border border-[#252A31] flex items-center justify-center mb-4 text-[#6366F1]">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#F5F7FA] mb-2 tracking-tight">
                {f.title}
              </h3>
              <p className="text-xs text-[#A7AFBA] leading-relaxed mb-4">
                {f.desc}
              </p>
              <div className="mt-auto self-start">
                <span className="text-[10px] font-semibold text-[#737C88] uppercase tracking-wider block pt-2 border-t border-[#252A31]">
                  {f.tag}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
