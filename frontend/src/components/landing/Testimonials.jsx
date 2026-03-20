import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const testimonials = [
    {
      q: "Finally an onboarding tool that actually understands what I'm missing — not just what I have.",
      r: 'CS Final Year Student',
      color: 'bg-indigo-500',
      delay: 0,
    },
    {
      q: "The Career Simulator told me I needed 9 weeks to be Frontend-ready. It was exactly right.",
      r: 'Bootcamp Graduate',
      color: 'bg-emerald-500',
      delay: 1,
    },
    {
      q: "The Engineering Simulation Studio is the closest thing to a real technical interview I've found.",
      r: 'Junior Developer',
      color: 'bg-amber-500',
      delay: 0.5,
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-indigo-500 font-bold uppercase tracking-widest text-xs mb-4">
          <span>&mdash;</span> Early Feedback
        </div>
        <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
          What People Are Saying
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div key={i} animate={{ y: [0, -10, 0] }} transition={{ duration: 6, delay: t.delay, repeat: Infinity, ease: 'easeInOut' }} className="p-8 rounded-3xl bg-slate-900/40 backdrop-blur-md border border-white/10 group">
             <div className="text-amber-500 text-lg mb-4 tracking-widest">★★★★★</div>
             <p className="text-lg text-white font-serif italic mb-8">"{t.q}"</p>
             <div className="flex items-center gap-4">
               <div className={`w-12 h-12 rounded-full ${t.color}`}></div>
               <div>
                  <div className="font-bold text-sm text-white">Placeholder Name</div>
                  <div className="text-xs text-slate-400">{t.r}</div>
               </div>
             </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
