import React from 'react';
import { Briefcase } from 'lucide-react';

export default function ProfileSelector({ selectedProfile, onProfileChange, profileOptions }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5E5C56] dark:text-[#B4B1A9]">
        <Briefcase className="w-3.5 h-3.5 text-[#B88916] dark:text-[#D4A72C]" />
        <span>Pre-loaded Benchmark Profiles</span>
      </label>
      <select
        value={selectedProfile}
        onChange={(e) => onProfileChange(e.target.value)}
        className="w-full px-3 py-2 bg-[#FCFBF8] dark:bg-[#181B1F] border border-[#DCD9D1] dark:border-[#292D33] rounded-xl text-xs text-[#1B1B19] dark:text-[#F2F0EA] focus:outline-none focus:ring-1 focus:ring-[#B88916] dark:focus:ring-[#D4A72C] transition-colors cursor-pointer"
      >
        {profileOptions.map((option) => (
          <option key={option.id} value={option.id} className="bg-[#FCFBF8] dark:bg-[#121416] text-[#1B1B19] dark:text-[#F2F0EA]">
            {option.name}
          </option>
        ))}
      </select>
      <p className="text-[10px] text-[#85827A] dark:text-[#7E7C77]">Select a profile to load benchmark scenarios instantly</p>
    </div>
  );
}