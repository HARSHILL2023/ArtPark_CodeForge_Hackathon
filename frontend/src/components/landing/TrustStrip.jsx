import React from 'react';
import { motion } from 'framer-motion';

export default function TrustStrip() {
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} whileHover={{ y: -5, boxShadow: '0 24px 48px rgba(139,92,246,0.1)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="p-8 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/10 flex flex-wrap lg:flex-nowrap justify-between gap-8 items-center cursor-default">
        {[
          { i: '🔐', t: 'Google OAuth2', s: 'Secure login via Google' },
          { i: '🛡️', t: 'JWT Protected', s: 'All routes auth-guarded' },
          { i: '🍃', t: 'MongoDB Atlas', s: 'Encrypted cloud database' },
          { i: '⚡', t: 'Multi-AI Fallback', s: '99.9% AI availability' }
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="text-3xl">{t.i}</span>
            <div>
              <div className="font-bold text-white text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>{t.t}</div>
              <div className="text-xs text-slate-400">{t.s}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
