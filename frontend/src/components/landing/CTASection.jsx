import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

export default function CTASection({ onOpenAuth }) {
  const { isLoggedIn } = useAuth();

  return (
    <section className="py-24 relative text-center overflow-hidden border-t border-[#252A31]">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-[#F5F7FA] tracking-tight"
        >
          Ready to Close Your Career Gap?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="text-sm text-[#A7AFBA] mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Sign in to generate your topological learning roadmap, prepare with generative AI technical interviews, and optimize your resume for target positions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex justify-center"
        >
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold shadow-xs flex items-center justify-center gap-2 text-sm transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-8 py-3 bg-[#6366F1] hover:bg-[#4F46E5] text-white rounded-xl font-semibold shadow-xs flex items-center justify-center gap-2 text-sm transition-colors cursor-pointer"
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
