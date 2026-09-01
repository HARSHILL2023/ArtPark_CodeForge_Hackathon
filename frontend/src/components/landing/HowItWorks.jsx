import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Network, Route, Award, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  const phases = [
    {
      step: '01',
      title: 'Entity & Skill Extraction',
      desc: 'High-precision parsing of resume PDFs and target job descriptions to extract proficiencies, experience depth, and tech requirements.',
      icon: FileText,
      tag: 'Phase 1 · NLP Extraction'
    },
    {
      step: '02',
      title: 'Vector Cosine Similarity',
      desc: 'Normalizes synonyms and semantic overlaps (e.g., Deep Learning ≈ Neural Networks) to accurately quantify skill readiness.',
      icon: Cpu,
      tag: 'Phase 2 · Embedding Match'
    },
    {
      step: '03',
      title: 'DAG Dependency Graph',
      desc: 'Builds a Directed Acyclic Graph across 84 catalog courses and 14 technical domains to map prerequisite relations.',
      icon: Network,
      tag: 'Phase 3 · Graph Theory'
    },
    {
      step: '04',
      title: 'Kahn\'s Topological Sort',
      desc: 'Deterministic algorithm ensures zero circular loops and sequences foundational skills before advanced architectural concepts.',
      icon: Route,
      tag: 'Phase 4 · Topological Sort'
    },
    {
      step: '05',
      title: 'Adaptive Studio & Roadmap',
      desc: 'Synthesizes interactive 5-phase roadmaps, AI mock interview questions, and surgical STAR resume bullet points.',
      icon: Award,
      tag: 'Phase 5 · Career Readiness'
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6" id="how-it-works">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={item}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Algorithmic Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA] mb-2.5">
          The 5-Phase Topological AI Engine
        </h2>
        <p className="text-xs sm:text-sm text-[#5E5C56] dark:text-[#B4B1A9] max-w-lg mx-auto">
          Combining deterministic graph theory with generative multi-LLM reasoning to create verified, prerequisite-backed career roadmaps.
        </p>
      </motion.div>

      {/* 5-Phase Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6"
      >
        {phases.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.step}
              variants={item}
              className="p-4 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] hover:border-[#C9C5BB] dark:hover:border-[#363B43] transition-colors flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-base font-bold text-[#2563EB] dark:text-[#3B82F6] font-mono">{p.step}</span>
                  <div className="w-7 h-7 rounded-md bg-[#EEECE6] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6]">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-1 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <span className="text-[9px] font-semibold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider block pt-2 border-t border-[#DCD9D1] dark:border-[#292D33]">
                {p.tag}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Execution Pipeline Banner */}
      <motion.div
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="p-3.5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex flex-wrap items-center justify-between gap-2 text-xs"
      >
        {[
          '1. Document Ingestion',
          '2. Vector Embeddings',
          '3. DAG Graph',
          '4. Kahn Ordering',
          '5. Roadmap & Studio'
        ].map((node, i, arr) => (
          <React.Fragment key={node}>
            <span className="font-medium text-[#1B1B19] dark:text-[#F2F0EA] px-2 py-0.5 bg-[#EEECE6] dark:bg-[#181B1F] rounded-md border border-[#DCD9D1] dark:border-[#292D33] text-[11px]">
              {node}
            </span>
            {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#85827A] dark:text-[#7E7C77] hidden lg:block" />}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
