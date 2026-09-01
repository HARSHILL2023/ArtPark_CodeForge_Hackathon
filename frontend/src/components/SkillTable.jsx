import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getGapStatus, getGapColor } from '../data/mockData';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, Search, SlidersHorizontal, Layers } from 'lucide-react';

export default function SkillTable({ skills = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('gap'); // 'gap', 'name', 'level'

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category || 'Technical'));
    return ['All', ...Array.from(cats)];
  }, [skills]);

  // Filtered and sorted skills
  const filteredSkills = useMemo(() => {
    return skills
      .filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (skill.category && skill.category.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesCat = selectedCategory === 'All' || (skill.category || 'Technical') === selectedCategory;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'level') return b.yourLevel - a.yourLevel;
        // Default: sort by gap magnitude descending
        const gapA = a.requiredLevel - a.yourLevel;
        const gapB = b.requiredLevel - b.yourLevel;
        return gapB - gapA;
      });
  }, [skills, searchQuery, selectedCategory, sortBy]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'matched':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'weak':
        return <AlertTriangle className="w-3.5 h-3.5" />;
      case 'missing':
        return <XCircle className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'matched':
        return 'Matched';
      case 'weak':
        return 'Proficiency Gap';
      case 'missing':
        return 'Missing Skill';
      default:
        return '';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Skill Matrix & Gap Inventory</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {filteredSkills.length} of {skills.length} skills matching filters
              </p>
            </div>
          </div>

          {/* Status Legends */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Matched</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Needs Work</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300 border border-rose-200 dark:border-rose-500/20">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Missing</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills or categories..."
              className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50/30 dark:bg-slate-900/30">
              <th className="px-6 py-3.5">Skill Name</th>
              <th className="px-6 py-3.5 text-center">Required Proficiency</th>
              <th className="px-6 py-3.5 text-center">Candidate Level</th>
              <th className="px-6 py-3.5 text-center">Gap Delta</th>
              <th className="px-6 py-3.5 text-right">Evaluation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {filteredSkills.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                  No skills matched your filter query.
                </td>
              </tr>
            ) : (
              filteredSkills.map((skill) => {
                const status = getGapStatus(skill);
                const colors = getGapColor(status);
                const gap = skill.requiredLevel - skill.yourLevel;

                return (
                  <tr
                    key={skill.name}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-1.5 h-7 rounded-full ${colors.dot}`} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900 dark:text-slate-100">
                              {skill.name}
                            </span>
                            {skill.isSemantic && (
                              <span className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/15 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Semantic
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{skill.category || 'Technical'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Required Level Dots */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.requiredLevel
                                ? 'bg-slate-400 dark:bg-slate-500'
                                : 'bg-slate-200 dark:bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Candidate Level Dots */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < skill.yourLevel
                                ? status === 'matched'
                                  ? 'bg-emerald-500'
                                  : status === 'weak'
                                  ? 'bg-amber-500'
                                  : 'bg-rose-500'
                                : 'bg-slate-200 dark:bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Gap Delta Badge */}
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-xs font-bold ${
                          gap <= 0
                            ? 'bg-emerald-100/80 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300'
                            : gap <= 2
                            ? 'bg-amber-100/80 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'
                            : 'bg-rose-100/80 text-rose-800 dark:bg-rose-500/20 dark:text-rose-300'
                        }`}
                      >
                        {gap <= 0 ? '✓ Ready' : `-${gap} Level${gap > 1 ? 's' : ''}`}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
                      >
                        {getStatusIcon(status)}
                        <span>{getStatusLabel(status)}</span>
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden p-4 space-y-3">
        {filteredSkills.map((skill) => {
          const status = getGapStatus(skill);
          const colors = getGapColor(status);
          const gap = skill.requiredLevel - skill.yourLevel;

          return (
            <div
              key={skill.name}
              className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{skill.name}</h4>
                  <span className="text-[10px] text-slate-400">{skill.category || 'Technical'}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {getStatusIcon(status)}
                  <span>{getStatusLabel(status)}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/40 dark:border-slate-700/50">
                <span className="text-slate-500">Required: {skill.requiredLevel}/5</span>
                <span className="text-slate-500">Your Level: {skill.yourLevel}/5</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {gap <= 0 ? '✓ Met' : `Gap: -${gap}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}