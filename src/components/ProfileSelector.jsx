import { Briefcase, ChevronDown } from 'lucide-react';

export default function ProfileSelector({ selectedProfile, onProfileChange, profileOptions }) {
  return (
    <div className="space-y-3">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform group-hover:scale-110">
          <Briefcase className="w-5 h-5 text-indigo-500" />
        </div>
        <select
          value={selectedProfile}
          onChange={(e) => onProfileChange(e.target.value)}
          className="w-full appearance-none pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-3xl text-slate-900 dark:text-white font-black text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all cursor-pointer hover:bg-white dark:hover:bg-slate-800 shadow-sm"
        >
          {profileOptions.map((option) => (
            <option key={option.id} value={option.id} className="font-bold py-2">
              {option.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:translate-y-[-40%] transition-all">
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="flex items-center gap-2 pl-2">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 italic">Simulated Testing Environment</p>
      </div>
    </div>
  );
}