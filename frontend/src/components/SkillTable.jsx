import React, { useState, useMemo } from 'react';
import { getGapStatus, getGapColor } from '../data/mockData';
import { CheckCircle2, AlertTriangle, XCircle, Sparkles, Search, Layers } from 'lucide-react';

export default function SkillTable({ skills = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('gap');

  const categories = useMemo(() => {
    const cats = new Set(skills.map(s => s.category || 'Technical'));
    return ['All', ...Array.from(cats)];
  }, [skills]);

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
    <div className="bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#DCD9D1] dark:border-[#292D33] bg-[#EEECE6] dark:bg-[#181B1F]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] flex items-center justify-center text-[#2563EB] dark:text-[#3B82F6]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#1B1B19] dark:text-[#F2F0EA]">Skill Matrix & Gap Inventory</h2>
              <p className="text-[10px] text-[#5E5C56] dark:text-[#B4B1A9]">
                {filteredSkills.length} of {skills.length} skills matching filters
              </p>
            </div>
          </div>

          {/* Status Legends */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#237A4B]/10 dark:bg-[#4CAF7A]/10 text-[#237A4B] dark:text-[#4CAF7A] border border-[#237A4B]/20 dark:border-[#4CAF7A]/25 text-[11px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#237A4B] dark:bg-[#4CAF7A]" />
              <span>Matched</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#D97706]/10 dark:bg-[#F59E0B]/10 text-[#D97706] dark:text-[#F59E0B] border border-[#D97706]/20 dark:border-[#F59E0B]/25 text-[11px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#D97706] dark:bg-[#F59E0B]" />
              <span>Needs Work</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-[#B33A3A]/10 dark:bg-[#D96565]/10 text-[#B33A3A] dark:text-[#D96565] border border-[#B33A3A]/20 dark:border-[#D96565]/25 text-[11px]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#B33A3A] dark:bg-[#D96565]" />
              <span>Missing</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-3 pt-3 border-t border-[#DCD9D1] dark:border-[#292D33] flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 text-[#85827A] dark:text-[#7E7C77] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills or categories..."
              className="w-full bg-[#FCFBF8] dark:bg-[#121416] border border-[#DCD9D1] dark:border-[#292D33] rounded-lg pl-8 pr-3 py-1.5 text-xs text-[#1B1B19] dark:text-[#F2F0EA] placeholder:text-[#85827A] dark:placeholder:text-[#7E7C77] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:focus:ring-[#3B82F6]"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-0.5 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap transition-colors border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2563EB] dark:bg-[#3B82F6] text-white border-transparent'
                    : 'bg-[#FCFBF8] dark:bg-[#121416] text-[#5E5C56] dark:text-[#B4B1A9] border-[#DCD9D1] dark:border-[#292D33] hover:text-[#1B1B19] dark:hover:text-white'
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
            <tr className="border-b border-[#DCD9D1] dark:border-[#292D33] text-[10px] font-bold text-[#85827A] dark:text-[#7E7C77] uppercase tracking-wider bg-[#EEECE6]/40 dark:bg-[#181B1F]/40">
              <th className="px-5 py-2.5">Skill Name</th>
              <th className="px-5 py-2.5 text-center">Required Proficiency</th>
              <th className="px-5 py-2.5 text-center">Candidate Level</th>
              <th className="px-5 py-2.5 text-center">Gap Delta</th>
              <th className="px-5 py-2.5 text-right">Evaluation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DCD9D1] dark:divide-[#292D33]/60 text-xs">
            {filteredSkills.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-[#85827A] dark:text-[#7E7C77]">
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
                    className="hover:bg-[#EEECE6]/30 dark:hover:bg-[#181B1F]/40 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-1 h-5 rounded-full ${colors.dot}`} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#1B1B19] dark:text-[#F2F0EA]">
                              {skill.name}
                            </span>
                            {skill.isSemantic && (
                              <span className="px-1.5 py-0.2 rounded bg-[#2563EB]/10 dark:bg-[#3B82F6]/10 text-[9px] font-bold text-[#2563EB] dark:text-[#3B82F6] border border-[#2563EB]/20 dark:border-[#3B82F6]/25 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" /> Semantic
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#85827A] dark:text-[#7E7C77]">{skill.category || 'Technical'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Required Level Dots */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < skill.requiredLevel
                                ? 'bg-[#85827A] dark:text-[#7E7C77]'
                                : 'bg-[#DCD9D1] dark:bg-[#292D33]'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Candidate Level Dots */}
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < skill.yourLevel
                                ? status === 'matched'
                                  ? 'bg-[#237A4B] dark:bg-[#4CAF7A]'
                                  : status === 'weak'
                                  ? 'bg-[#9A6B00] dark:bg-[#D6A84F]'
                                  : 'bg-[#B33A3A] dark:bg-[#D96565]'
                                : 'bg-[#DCD9D1] dark:bg-[#292D33]'
                            }`}
                          />
                        ))}
                      </div>
                    </td>

                    {/* Gap Delta Badge */}
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-2 py-0.5 rounded-md text-[11px] font-bold font-mono ${
                          gap <= 0
                            ? 'bg-[#237A4B]/10 text-[#237A4B] dark:bg-[#4CAF7A]/20 dark:text-[#4CAF7A]'
                            : gap <= 2
                            ? 'bg-[#9A6B00]/10 text-[#9A6B00] dark:bg-[#D6A84F]/20 dark:text-[#D6A84F]'
                            : 'bg-[#B33A3A]/10 text-[#B33A3A] dark:bg-[#D96565]/20 dark:text-[#D96565]'
                        }`}
                      >
                        {gap <= 0 ? '✓ Ready' : `-${gap} Level${gap > 1 ? 's' : ''}`}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-3 text-right">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold border ${colors.bg} ${colors.text} ${colors.border}`}
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
      <div className="md:hidden p-3 space-y-2.5">
        {filteredSkills.map((skill) => {
          const status = getGapStatus(skill);
          const colors = getGapColor(status);
          const gap = skill.requiredLevel - skill.yourLevel;

          return (
            <div
              key={skill.name}
              className="p-3 rounded-xl bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#1B1B19] dark:text-[#F2F0EA]">{skill.name}</h4>
                  <span className="text-[10px] text-[#85827A] dark:text-[#7E7C77]">{skill.category || 'Technical'}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${colors.bg} ${colors.text} ${colors.border}`}
                >
                  {getStatusIcon(status)}
                  <span>{getStatusLabel(status)}</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#DCD9D1] dark:border-[#292D33]">
                <span className="text-[#5E5C56] dark:text-[#B4B1A9] text-[11px]">Required: {skill.requiredLevel}/5</span>
                <span className="text-[#5E5C56] dark:text-[#B4B1A9] text-[11px]">Your Level: {skill.yourLevel}/5</span>
                <span className="font-bold text-[#2563EB] dark:text-[#3B82F6] text-[11px] font-mono">
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