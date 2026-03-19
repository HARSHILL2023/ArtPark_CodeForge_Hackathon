import { motion } from 'framer-motion';
import { getPriorityColor } from '../data/mockData';
import { Clock, ExternalLink, ChevronRight, Flag, MapPin } from 'lucide-react';

export default function Roadmap({ roadmap }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200/60 dark:border-slate-800/60 overflow-hidden ring-1 ring-white/20 dark:ring-slate-800/50"
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900/50 px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-sky-600 dark:bg-sky-500 rounded-2xl shadow-lg shadow-sky-500/20 text-white">
              <Flag className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Learning Path</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium">Strategic roadmap to master your target role</p>
            </div>
          </div>
          <div className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 text-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 block mb-0.5">Estimated Commitment</span>
            <span className="text-xs font-black text-slate-900 dark:text-white tracking-tight leading-none">
              {roadmap.length} Steps • {roadmap.reduce((acc, step) => acc + parseInt(step.duration), 0)} Weeks
            </span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="p-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* Vertical Line */}
          <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-slate-100 dark:bg-slate-800" />
          <div className="absolute left-7 top-0 h-24 w-[2px] bg-gradient-to-b from-indigo-500 to-transparent" />
          <div className="absolute left-7 bottom-0 h-24 w-[2px] bg-gradient-to-t from-violet-500 to-transparent" />

          {roadmap.map((step, index) => {
            const priorityColors = getPriorityColor(step.priority);

            return (
              <motion.div
                key={step.step}
                variants={item}
                className="relative pl-20 pb-12 last:pb-0 group"
              >
                {/* Step Marker */}
                <div className="absolute left-0 w-14 h-14 bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-indigo-400 rounded-[1.25rem] flex items-center justify-center shadow-xl shadow-indigo-500/10 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-black text-indigo-600 dark:text-indigo-400 tabular-nums leading-none">{step.step}</span>
                  {/* Glowing Pulse */}
                  {index === 0 && (
                    <div className="absolute inset-0 rounded-[1.25rem] ring-4 ring-indigo-500/20 animate-pulse" />
                  )}
                </div>

                {/* Content Card */}
                <div className="bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-slate-100 dark:border-slate-800/50 p-6 group-hover:bg-indigo-500/5 dark:group-hover:bg-indigo-500/10 transition-all duration-300 relative">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{step.title}</h3>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${priorityColors.bg} ${priorityColors.text} ${priorityColors.border} border shadow-sm`}>
                          {step.priority} Priority
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{step.description}</p>

                      <div className="flex flex-wrap items-center gap-6 pt-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-800">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{step.duration}</span>
                        </div>

                        {step.resource && (
                          <a
                            href={step.resourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors uppercase tracking-widest"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{step.resource}</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}