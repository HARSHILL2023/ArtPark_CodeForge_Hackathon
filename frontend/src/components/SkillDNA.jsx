import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Terminal, Clock, Target, ChevronRight, BarChart3, TrendingUp, Search, Layers } from 'lucide-react';
import { careerPaths } from '../data/mockData';

const SkillDNA = ({ userSkills }) => {
  const [selectedRole, setSelectedRole] = useState(careerPaths[0].id);
  const [isSimulating, setIsSimulating] = useState(false);

  // Panel A data calculation
  const distribution = useMemo(() => {
    if (!userSkills || userSkills.length === 0) return { strong: 0, moderate: 0, weak: 0, count: 0 };
    const total = userSkills.length;
    const strong = userSkills.filter(s => s.yourLevel >= s.requiredLevel).length;
    const moderate = userSkills.filter(s => s.yourLevel > 0 && s.yourLevel < s.requiredLevel).length;
    const weak = userSkills.filter(s => s.yourLevel === 0).length;
    
    return {
      strong: Math.round((strong / total) * 100),
      moderate: Math.round((moderate / total) * 100),
      weak: Math.round((weak / total) * 100),
      count: total
    };
  }, [userSkills]);

  // Panel B simulation logic
  const simulation = useMemo(() => {
    const role = careerPaths.find(r => r.id === selectedRole);
    if (!role || !userSkills) return null;

    const skillMap = Object.fromEntries(userSkills.map(s => [s.name, s]));
    const missing = role.requiredSkills.filter(rs => !skillMap[rs] || skillMap[rs].yourLevel === 0);
    const weak = role.requiredSkills.filter(rs => skillMap[rs] && skillMap[rs].yourLevel > 0 && skillMap[rs].yourLevel < skillMap[rs].requiredLevel);
    const totalRequired = role.requiredSkills.length;
    
    const masteredCount = role.requiredSkills.filter(rs => skillMap[rs] && skillMap[rs].yourLevel >= skillMap[rs].requiredLevel).length;
    const readiness = Math.round(((masteredCount + (weak.length * 0.5)) / totalRequired) * 100);
    
    const timeInWeeks = missing.length * 2 + weak.length * 1;
    const probability = Math.min(99, Math.round(readiness * 0.9 + 5));

    return {
      readiness,
      timeInWeeks,
      missing,
      weak,
      probability,
      name: role.name
    };
  }, [selectedRole, userSkills]);

  const handleRoleChange = (e) => {
    setIsSimulating(true);
    setSelectedRole(e.target.value);
    setTimeout(() => setIsSimulating(false), 300);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Panel A: Skill DNA Profile */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Skill DNA Vector Profile</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Proficiency depth across {distribution.count} evaluated skills</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Mastered */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Mastered Skills (Target Level Met)
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{distribution.strong}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${distribution.strong}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-emerald-500 rounded-full"
              />
            </div>
          </div>

          {/* Emerging */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Emerging Skills (Proficiency Gap)
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{distribution.moderate}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${distribution.moderate}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-amber-500 rounded-full"
              />
            </div>
          </div>

          {/* Growth */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Growth Opportunities (Missing Requirements)
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{distribution.weak}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${distribution.weak}%` }}
                transition={{ duration: 0.6 }}
                className="h-full bg-rose-500 rounded-full"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center gap-3 mt-4">
            <BarChart3 className="w-4 h-4 text-indigo-500 flex-shrink-0" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
              Candidate shows {distribution.strong >= 50 ? 'solid core strength' : 'strong growth velocity'} with high leverage in modular skill acquisition.
            </p>
          </div>
        </div>
      </div>

      {/* Panel B: Career Simulation Engine */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Role Trajectory Simulator</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Simulate alternate domain readiness</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="relative">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
              Select Target Role Benchmark
            </label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
            >
              {careerPaths.map(path => (
                <option key={path.id} value={path.id}>{path.name}</option>
              ))}
            </select>
          </div>

          <AnimatePresence mode="wait">
            {!isSimulating && simulation && (
              <motion.div
                key={selectedRole}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-3 pt-1"
              >
                {/* Readiness Result */}
                <div className="p-3.5 bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-800/40 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                    Fit for {simulation.name}
                  </span>
                  <span className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                    {simulation.readiness}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>Estimated Time</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{simulation.timeInWeeks} Weeks</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-0.5">
                      <Target className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Pass Probability</span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{simulation.probability}%</p>
                  </div>
                </div>

                {simulation.missing.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Required Skills to Close
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {simulation.missing.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SkillDNA;
