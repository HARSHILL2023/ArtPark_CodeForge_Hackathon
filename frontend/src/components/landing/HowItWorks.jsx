import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cpu, Network, Route, Award, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
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
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#252A31] bg-[#111418] text-[#A7AFBA] text-xs font-semibold uppercase tracking-wider mb-3">
          <span>Algorithmic Architecture</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F5F7FA] mb-3">
          The 5-Phase Topological AI Engine
        </h2>
        <p className="text-xs sm:text-sm text-[#A7AFBA] max-w-xl mx-auto">
          Combining deterministic graph theory with generative multi-LLM reasoning to create verified, prerequisite-backed career roadmaps.
        </p>
      </motion.div>

      {/* 5-Phase Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8"
      >
        {phases.map((p) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.step}
              variants={item}
              className="p-5 rounded-2xl bg-[#111418] border border-[#252A31] hover:border-[#323842] transition-colors flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-[#6366F1]">{p.step}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#171A1F] border border-[#252A31] flex items-center justify-center text-[#6366F1]">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-[#F5F7FA] mb-1.5 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[11px] text-[#A7AFBA] leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <span className="text-[9px] font-semibold text-[#737C88] uppercase tracking-wider block pt-2 border-t border-[#252A31]">
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
        className="p-4 rounded-xl bg-[#111418] border border-[#252A31] flex flex-wrap items-center justify-between gap-2.5 text-xs"
      >
        {[
          '1. Document Ingestion',
          '2. Vector Embeddings',
          '3. DAG Graph',
          '4. Kahn Ordering',
          '5. Roadmap & Studio'
        ].map((node, i, arr) => (
          <React.Fragment key={node}>
            <span className="font-semibold text-[#F5F7FA] px-2.5 py-1 bg-[#171A1F] rounded-lg border border-[#252A31]">
              {node}
            </span>
            {i < arr.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-[#737C88] hidden lg:block" />}
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
