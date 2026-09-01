import React from 'react';
import { motion } from 'framer-motion';

export default function PricingSection({ onOpenAuth }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  return (
    <section className="py-20 max-w-6xl mx-auto px-6" id="pricing">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Tiered Access</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA]">
          Simple, Transparent Access Plans
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <motion.div variants={item} className="p-6 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex flex-col justify-between space-y-4 hover-card hover-glow-blue">
          <div>
            <h3 className="text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-1">Explorer Sandbox</h3>
            <div className="text-3xl font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-4 font-mono">$0</div>
            <ul className="space-y-2.5 text-xs text-[#5E5C56] dark:text-[#B4B1A9]">
              {['Full Resume + JD Skill Gap Analysis', 'Kahn Topological 5-Phase Roadmap', 'Interactive Skill DNA Radar', 'ATS Readiness Score Benchmark'].map((p, i) => (
                <li key={i} className="pb-2 border-b border-[#DCD9D1] dark:border-[#292D33] last:border-0">{p}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="cf-btn-secondary w-full justify-center py-2 text-xs"
          >
            Get Started Free
          </button>
        </motion.div>

        <motion.div variants={item} className="p-6 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border-2 border-[#2563EB] dark:border-[#3B82F6] flex flex-col justify-between relative space-y-4 shadow-sm hover-card hover-glow-blue">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#2563EB] dark:bg-[#3B82F6] rounded-md text-[9px] font-bold uppercase tracking-widest text-white whitespace-nowrap shadow-xs">
            MOST POPULAR
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-1">Professional Engineer</h3>
            <div className="text-3xl font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-4 flex items-baseline gap-1 font-mono">
              $19 <span className="text-xs font-normal text-[#85827A] dark:text-[#7E7C77]">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#5E5C56] dark:text-[#B4B1A9]">
              {['Unlimited Target Role Audits', 'Full Interactive Dagre React Flow Graph', 'AI Mock Studio with Multi-Turn Audio', 'STAR Surgical Resume Optimization', 'Verifiable PDF Profile Export'].map((p, i) => (
                <li key={i} className="pb-2 border-b border-[#DCD9D1] dark:border-[#292D33] last:border-0">{p}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="cf-btn-primary w-full justify-center py-2 text-xs"
          >
            Start Pro Access
          </button>
        </motion.div>

        <motion.div variants={item} className="p-6 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex flex-col justify-between space-y-4 hover-card hover-glow-blue">
          <div>
            <h3 className="text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-1">Enterprise & Cohorts</h3>
            <div className="text-3xl font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-4 font-mono">Custom</div>
            <ul className="space-y-2.5 text-xs text-[#5E5C56] dark:text-[#B4B1A9]">
              {['Everything in Pro', 'Cohort Skill Matrix Analytics', 'Custom Enterprise Job Benchmarks', 'Dedicated API & LMS Webhooks', 'Team Onboarding SLA Support'].map((p, i) => (
                <li key={i} className="pb-2 border-b border-[#DCD9D1] dark:border-[#292D33] last:border-0">{p}</li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            onClick={onOpenAuth}
            className="cf-btn-secondary w-full justify-center py-2 text-xs"
          >
            Contact Engineering Team
          </button>
        </motion.div>

      </motion.div>
    </section>
  );
}
