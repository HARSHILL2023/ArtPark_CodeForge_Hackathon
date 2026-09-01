import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } }
  };

  const testimonials = [
    {
      q: "CodeForge revealed my exact prerequisite bottlenecks in distributed systems instead of handing me another generic course list.",
      author: "Alex Morgan",
      role: "Distributed Systems Candidate",
    },
    {
      q: "The Kahn roadmap sequencing gave our team a structured timeline to bridge key engineering skill gaps in 8 weeks.",
      author: "Priya Sharma",
      role: "Engineering Director",
    },
    {
      q: "The AI Mock Studio drilled down into architectural trade-offs just like senior engineering rounds at top tier tech firms.",
      author: "David Chen",
      role: "Senior Backend Developer",
    }
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={item} className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Candidate Feedback</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA]">
          Trusted by Serious Technical Professionals
        </h2>
      </motion.div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            variants={item}
            className="p-5 rounded-xl bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] space-y-3 flex flex-col justify-between hover-card hover-glow-blue cursor-default"
          >
            <p className="text-xs text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed italic">
              "{t.q}"
            </p>
            <div className="pt-3 border-t border-[#DCD9D1] dark:border-[#292D33]">
              <div className="font-bold text-xs text-[#1B1B19] dark:text-[#F2F0EA]">{t.author}</div>
              <div className="text-[10px] text-[#85827A] dark:text-[#7E7C77]">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
