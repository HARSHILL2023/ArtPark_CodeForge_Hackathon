import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export default function CTASection({ onOpenAuth }) {
  const { isLoggedIn } = useAuth();

  return (
    <section className="py-20 relative text-center overflow-hidden border-t border-[#DCD9D1] dark:border-[#292D33]">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25 }}
          className="text-2xl sm:text-3xl font-bold mb-3 text-[#1B1B19] dark:text-[#F2F0EA] tracking-tight"
        >
          Ready to Close Your Career Gap?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: 0.05 }}
          className="text-xs sm:text-sm text-[#5E5C56] dark:text-[#B4B1A9] mb-7 max-w-lg mx-auto leading-relaxed"
        >
          Sign in to generate your topological learning roadmap, prepare with generative AI technical interviews, and optimize your resume for target positions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="flex justify-center"
        >
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="cf-btn-primary px-7 py-2.5 text-sm"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="cf-btn-primary px-7 py-2.5 text-sm"
            >
              <span>Sign In to CodeForge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
