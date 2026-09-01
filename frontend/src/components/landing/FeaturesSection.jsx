import React from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Target, Route, FileCheck2, MessagesSquare, GitBranch } from 'lucide-react';

export default function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
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
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Platform Capabilities</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA] mb-2.5">
          Engineered for Career Acceleration
        </h2>
        <p className="text-xs sm:text-sm text-[#5E5C56] dark:text-[#B4B1A9] max-w-lg mx-auto">
          Combining vector similarity, deterministic graph theory, and generative AI to systematically bridge enterprise skill gaps.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5"
      >
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              variants={item}
              className={`flex flex-col p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] hover:border-[#C9C5BB] dark:hover:border-[#363B43] transition-colors ${
                f.wide ? 'md:col-span-2' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center mb-3.5 text-[#B88916] dark:text-[#D4A72C]">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-1.5 tracking-tight">
                {f.title}
              </h3>
              <p className="text-xs text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed mb-3.5">
                {f.desc}
              </p>
              <div className="mt-auto self-start">
                <span className="text-[9px] font-semibold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider block pt-2 border-t border-[#DCD9D1] dark:border-[#292D33]">
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
