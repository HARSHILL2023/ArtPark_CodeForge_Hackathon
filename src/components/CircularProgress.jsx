import { motion } from 'framer-motion';
import { getScoreColor } from '../data/mockData';

export default function CircularProgress({ score, size = 180, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  const scoreColor = getScoreColor(score);

  return (
    <div className="relative group transition-transform duration-500 hover:scale-105" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90 filter drop-shadow-xl" style={{ width: size, height: size }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-slate-100 dark:text-slate-800"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Fill */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={scoreColor.stroke}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="filter drop-shadow-[0_0_8px_rgba(0,0,0,0.1)]"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 2, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </svg>
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className={`text-5xl font-black tracking-tighter ${scoreColor.text} tabular-nums`}
          >
            {score}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className={`text-xl font-bold ${scoreColor.text} absolute -top-1 -right-4`}>%</motion.span>
        </div>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mt-1">Ready</motion.span>
      </div>

      {/* Decorative Glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: scoreColor.stroke }}
      />
    </div>
  );
}