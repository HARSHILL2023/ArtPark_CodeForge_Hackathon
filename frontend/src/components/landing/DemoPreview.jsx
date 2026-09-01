import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard3D from '../3d/TiltCard3D';

export default function DemoPreview() {
  const [activeTab, setActiveTab] = useState('Skill DNA Profile');
  const tabs = ['Skill DNA Profile', 'Job Readiness Dashboard', 'Simulation Studio'];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6 relative" id="demo">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.25 }} className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-[#DCD9D1] dark:border-[#292D33] bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] text-[11px] font-semibold uppercase tracking-wider mb-2.5">
          <span>Interactive Preview</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1B1B19] dark:text-[#F2F0EA] mb-2">
          Career Intelligence Workspace Preview
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab 
                ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white border-transparent shadow-xs scale-105' 
                : 'bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] border-[#DCD9D1] dark:border-[#292D33] hover:text-[#1B1B19] dark:hover:text-white hover:bg-[#EEECE6] dark:hover:bg-[#181B1F]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <TiltCard3D maxTilt={6} scale={1.01}>
        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="bg-[#FCFBF8] dark:bg-[#121416] rounded-2xl border border-[#DCD9D1] dark:border-[#292D33] overflow-hidden shadow-xs relative min-h-[360px] flex flex-col hover-card">
          <div className="w-full h-8 bg-[#EEECE6] dark:bg-[#181B1F] border-b border-[#DCD9D1] dark:border-[#292D33] flex items-center px-4 gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B33A3A] dark:bg-[#D96565]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#9A6B00] dark:bg-[#D6A84F]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#237A4B] dark:bg-[#4CAF7A]"></div>
          </div>

          <div className="p-6 w-full flex-1 flex items-center justify-center">
            {activeTab === 'Skill DNA Profile' && (
              <div className="flex flex-col md:flex-row gap-4 max-w-3xl w-full mx-auto">
                <div className="flex-1 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl p-4">
                   <h3 className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-3">Skill Distribution</h3>
                   <div className="space-y-3">
                     <div>
                       <div className="flex justify-between text-[11px] mb-1 font-semibold text-[#5E5C56] dark:text-[#B4B1A9]">
                         <span>FRONTEND (React, Next.js)</span> <span className="text-[#237A4B] dark:text-[#4CAF7A] font-bold">VERIFIED</span>
                       </div>
                       <div className="w-full bg-[#EEECE6] dark:bg-[#292D33] rounded-full h-1.5">
                         <div className="bg-[#237A4B] dark:bg-[#4CAF7A] h-1.5 rounded-full w-[80%]"></div>
                       </div>
                     </div>
                     <div>
                       <div className="flex justify-between text-[11px] mb-1 font-semibold text-[#5E5C56] dark:text-[#B4B1A9]">
                         <span>BACKEND (Node, Redis)</span> <span className="text-[#9A6B00] dark:text-[#D6A84F] font-bold">IN PROGRESS</span>
                       </div>
                       <div className="w-full bg-[#EEECE6] dark:bg-[#292D33] rounded-full h-1.5">
                         <div className="bg-[#9A6B00] dark:bg-[#D6A84F] h-1.5 rounded-full w-[45%]"></div>
                       </div>
                     </div>
                   </div>
                </div>
                <div className="flex-1 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl p-4">
                  <h3 className="text-xs font-bold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider mb-1">Target Benchmark</h3>
                  <div className="text-lg font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-3">Staff Software Engineer</div>
                  <div className="inline-flex gap-2">
                    <span className="px-2 py-0.5 bg-[#237A4B]/10 text-[#237A4B] dark:bg-[#4CAF7A]/15 dark:text-[#4CAF7A] text-[11px] font-bold rounded font-mono">
                      78% READINESS
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'Job Readiness Dashboard' && (
              <div className="text-center max-w-lg mx-auto">
                <div className="text-base sm:text-lg font-bold text-[#1B1B19] dark:text-[#F2F0EA] mb-3">
                  Senior Systems Engineer Target Alignment
                </div>
                <div className="w-24 h-24 rounded-full border-4 border-[#2563EB] dark:border-[#3B82F6] mx-auto flex flex-col items-center justify-center mb-3">
                  <div className="text-xl font-bold text-[#1B1B19] dark:text-[#F2F0EA] font-mono">82%</div>
                  <div className="text-[8px] font-bold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider">Score</div>
                </div>
                <p className="text-xs text-[#5E5C56] dark:text-[#B4B1A9] leading-relaxed">
                  ETA to benchmark readiness: 6 Weeks. Identified milestones: Distributed Systems, Kafka Clustering, Observability.
                </p>
              </div>
            )}

            {activeTab === 'Simulation Studio' && (
              <div className="text-center max-w-md mx-auto space-y-3">
                <div className="inline-flex text-[10px] font-bold uppercase tracking-wider text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/25 bg-[#2563EB]/10 px-2 py-0.5 rounded">
                  STUDIO ENGINE 3.5
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#1B1B19] dark:text-[#F2F0EA]">
                  Multi-Turn Architectural Interview Simulator
                </h3>
                <p className="text-xs text-[#5E5C56] dark:text-[#B4B1A9]">
                  Live technical evaluations with explainable scoring rubric and follow-up challenges.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </TiltCard3D>
    </section>
  );
}
