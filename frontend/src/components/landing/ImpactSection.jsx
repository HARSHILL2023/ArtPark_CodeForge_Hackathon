import React from 'react';
import { motion } from 'framer-motion';

export default function ImpactSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const cards = [
    {
      title: '🎓 For Job Seekers & Students',
      points: [
        'Know your exact skill gaps for any target role instantly',
        'Get a personalized, AI-generated week-by-week learning roadmap',
        'Practice with real Engineering Simulation Studio sessions',
        'Track your readiness score and watch it improve over time',
        'Generate a downloadable resume via @react-pdf/renderer'
      ]
    },
    {
      title: '🏢 For Recruiters & Companies',
      points: [
        'See a candidate\'s verified Skill DNA profile at a glance',
        'Predict time-to-productivity before making a hiring decision',
        'Reduce skill mismatch with AI-powered role readiness scores',
        'Faster, smarter onboarding with a pre-mapped learning plan'
      ]
    },
    {
      title: '🏫 For Institutions & Bootcamps',
      points: [
        'Identify curriculum gaps across entire student cohorts',
        'Track graduate employability and career readiness outcomes',
        'Generate career-readiness reports at scale using AI analysis',
        'Prove program ROI with hard skill match data'
      ]
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> Impact
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          Built for Every Stage of the Journey
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((c, i) => (
          <motion.div key={i} variants={item} whileHover={{ y: -10, boxShadow: '0 24px 48px rgba(139,92,246,0.25)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 group">
            <h3 className="text-2xl font-black mb-6 text-white" style={{ fontFamily: "'Syne', sans-serif" }}>{c.title}</h3>
            <ul className="space-y-4">
              {c.points.map((p, j) => (
                <li key={j} className="flex gap-3 text-sm text-slate-400">
                  <span className="text-emerald-500 font-bold">✓</span> {p}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
