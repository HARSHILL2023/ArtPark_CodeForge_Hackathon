import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function ImpactSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  const cards = [
    {
      title: 'For Developers & Engineers',
      points: [
        'Audit exact prerequisite skill gaps against target benchmarks',
        'Receive Kahn-sequenced milestone curriculums with AI trace verification',
        'Simulate technical interviews in the multi-turn Mock Studio',
        'Track ATS placement score with STAR bullet optimizations',
        'Export verifiable PDF profile reports'
      ]
    },
    {
      title: 'For Engineering Leaders',
      points: [
        'Inspect candidate Skill DNA with verified proficiency scores',
        'Forecast ramp-up time and prerequisite blockers prior to hiring',
        'Eliminate interview ambiguity with auditable skill evaluation',
        'Accelerate team onboarding through structured roadmaps'
      ]
    },
    {
      title: 'For Academies & Bootcamps',
      points: [
        'Audit curriculum dependencies across full student cohorts',
        'Identify systemic prerequisite bottlenecks in technical tracks',
        'Generate objective role-readiness benchmarks at scale',
        'Quantify outcome metrics with structured skill matrices'
      ]
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Enterprise Impact</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA]">
          Engineered for Career Acceleration & Team Readiness
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            variants={item}
            className="p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] space-y-3"
          >
            <h3 className="text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">{c.title}</h3>
            <ul className="space-y-2">
              {c.points.map((p, j) => (
                <li key={j} className="flex gap-2 text-xs text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">
                  <Check className="w-3.5 h-3.5 text-[#237A4B] dark:text-[#4CAF7A] flex-shrink-0 mt-0.5" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
