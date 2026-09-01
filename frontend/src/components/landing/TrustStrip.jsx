import React from 'react';
import { motion } from 'framer-motion';

export default function TrustStrip() {
  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="p-6 sm:p-8 rounded-2xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] shadow-xs flex flex-wrap lg:flex-nowrap justify-between gap-6 items-center cursor-default">
        {[
          { i: '🔐', t: 'Google OAuth2', s: 'Secure login via Google' },
          { i: '🛡️', t: 'JWT Protected', s: 'All routes auth-guarded' },
          { i: '🍃', t: 'MongoDB Atlas', s: 'Encrypted cloud database' },
          { i: '⚡', t: 'Multi-AI Fallback', s: '99.9% AI availability' }
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-2xl">{t.i}</span>
            <div>
              <div className="font-bold text-[#1B1B19] dark:text-[#F2F0EA] text-xs sm:text-sm">{t.t}</div>
              <div className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9]">{t.s}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
