import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Clock, Target, BarChart3, TrendingUp } from 'lucide-react';
import { careerPaths } from '../data/mockData';

const SkillDNA = ({ userSkills, skills, readinessScore }) => {
  const actualSkills = useMemo(() => {
    if (Array.isArray(userSkills)) return userSkills;
    if (Array.isArray(skills)) return skills;
    return [];
  }, [userSkills, skills]);

  const [selectedRole, setSelectedRole] = useState(careerPaths[0]?.id || 'frontend');
  const [isSimulating, setIsSimulating] = useState(false);

  const distribution = useMemo(() => {
    if (!actualSkills || actualSkills.length === 0) return { strong: 0, moderate: 0, weak: 0, count: 0 };
    const total = actualSkills.length;
    const strong = actualSkills.filter(s => (s.yourLevel || 0) >= (s.requiredLevel || 1)).length;
    const moderate = actualSkills.filter(s => (s.yourLevel || 0) > 0 && (s.yourLevel || 0) < (s.requiredLevel || 1)).length;
    const weak = actualSkills.filter(s => (s.yourLevel || 0) === 0).length;
    
    return {
      strong: Math.round((strong / total) * 100),
      moderate: Math.round((moderate / total) * 100),
      weak: Math.round((weak / total) * 100),
      count: total
    };
  }, [actualSkills]);

  const simulation = useMemo(() => {
    const role = careerPaths.find(r => r.id === selectedRole);
    if (!role || !actualSkills || actualSkills.length === 0) return null;

    const skillMap = Object.fromEntries(actualSkills.map(s => [s.name || s.skill || s, s]));
    const missing = (role.requiredSkills || []).filter(rs => !skillMap[rs] || (skillMap[rs].yourLevel || 0) === 0);
    const weak = (role.requiredSkills || []).filter(rs => skillMap[rs] && (skillMap[rs].yourLevel || 0) > 0 && (skillMap[rs].yourLevel || 0) < (skillMap[rs].requiredLevel || 1));
    const totalRequired = role.requiredSkills?.length || 1;
    
    const masteredCount = (role.requiredSkills || []).filter(rs => skillMap[rs] && (skillMap[rs].yourLevel || 0) >= (skillMap[rs].requiredLevel || 1)).length;
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
    setTimeout(() => setIsSimulating(false), 200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Panel A: Skill DNA Profile */}
      <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
        <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
              <Fingerprint className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Skill DNA Vector Profile</h3>
              <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">Proficiency depth across {distribution.count} evaluated skills</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Mastered */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#237A4B] dark:text-[#4CAF7A] flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#237A4B] dark:bg-[#4CAF7A]" />
                Mastered Skills (Target Level Met)
              </span>
              <span className="font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">{distribution.strong}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#EEECE6] dark:bg-[#292D33] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${distribution.strong}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-[#237A4B] dark:bg-[#4CAF7A] rounded-full"
              />
            </div>
          </div>

          {/* Emerging */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#9A6B00] dark:text-[#D6A84F] flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#9A6B00] dark:bg-[#D6A84F]" />
                Emerging Skills (Proficiency Gap)
              </span>
              <span className="font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">{distribution.moderate}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#EEECE6] dark:bg-[#292D33] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${distribution.moderate}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-[#9A6B00] dark:bg-[#D6A84F] rounded-full"
              />
            </div>
          </div>

          {/* Growth */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-[#B33A3A] dark:text-[#D96565] flex items-center gap-1.5 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#B33A3A] dark:bg-[#D96565]" />
                Growth Opportunities (Missing Requirements)
              </span>
              <span className="font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">{distribution.weak}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#EEECE6] dark:bg-[#292D33] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${distribution.weak}%` }}
                transition={{ duration: 0.4 }}
                className="h-full bg-[#B33A3A] dark:bg-[#D96565] rounded-full"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] flex items-center gap-2.5 mt-3">
            <BarChart3 className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C] flex-shrink-0" />
            <p className="text-[11px] text-[#5E5C56] dark:text-[#B4B1A9] leading-snug">
              Candidate shows {distribution.strong >= 50 ? 'solid core strength' : 'strong growth velocity'} with high leverage in modular skill acquisition.
            </p>
          </div>
        </div>
      </div>

      {/* Panel B: Career Simulation Engine */}
      <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
        <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#B88916] dark:text-[#D4A72C]">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Role Trajectory Simulator</h3>
              <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">Simulate alternate domain readiness</p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3.5">
          <div>
            <label className="block text-[10px] font-semibold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider mb-1">
              Select Target Role Benchmark
            </label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="w-full bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] text-[#1B1B19] dark:text-[#F2F0EA] px-3 py-2 rounded-lg text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B88916] dark:focus:ring-[#D4A72C] cursor-pointer"
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
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="space-y-2.5 pt-0.5"
              >
                {/* Readiness Result */}
                <div className="p-3 bg-[#B88916]/10 dark:bg-[#D4A72C]/10 border border-[#B88916]/20 dark:border-[#D4A72C]/25 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
                    Fit for {simulation.name}
                  </span>
                  <span className="text-base font-bold text-[#B88916] dark:text-[#D4A72C] font-mono">
                    {simulation.readiness}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33]">
                    <div className="flex items-center gap-1.5 text-[#85827A] dark:text-[#7E7C77] text-[10px] uppercase tracking-wider font-semibold mb-0.5">
                      <Clock className="w-3 h-3 text-[#9A6B00] dark:text-[#D6A84F]" />
                      <span>Estimated Time</span>
                    </div>
                    <p className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">{simulation.timeInWeeks} Weeks</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33]">
                    <div className="flex items-center gap-1.5 text-[#85827A] dark:text-[#7E7C77] text-[10px] uppercase tracking-wider font-semibold mb-0.5">
                      <Target className="w-3 h-3 text-[#237A4B] dark:text-[#4CAF7A]" />
                      <span>Pass Probability</span>
                    </div>
                    <p className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">{simulation.probability}%</p>
                  </div>
                </div>

                {simulation.missing.length > 0 && (
                  <div>
                    <span className="text-[10px] font-semibold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider block mb-1">
                      Required Skills to Close
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {simulation.missing.map(skill => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#B33A3A]/10 dark:bg-[#D96565]/10 text-[#B33A3A] dark:text-[#D96565] border border-[#B33A3A]/20 dark:border-[#D96565]/25"
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
