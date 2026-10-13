import React from 'react';
import { 
  Sparkles, 
  Menu, 
  Clock, 
  Target, 
  GraduationCap,
  Layers,
  ChevronRight,
  Search
} from 'lucide-react';
import { StudentProfile } from '../../types';

interface TopHeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  profile: StudentProfile;
  onOpenMobileNav: () => void;
  onOpenAITutor: () => void;
  onOpenSettings: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  onNavigate,
  profile,
  onOpenMobileNav,
  onOpenAITutor,
  onOpenSettings,
}) => {
  const getTabLabel = (tab: string): string => {
    switch (tab) {
      case 'dashboard': return 'Dashboard';
      case 'listening': return 'Listening Lab';
      case 'speaking': return 'Speaking Lab';
      case 'reading': return 'Reading Lab';
      case 'writing': return 'Writing Lab';
      case 'vocabulary': return 'Vocabulary Lab';
      case 'grammar': return 'Grammar Lab';
      case 'science': return 'Bioscience & STEM Lab';
      case 'exam': return 'Luyện thi THPT';
      case 'progress': return 'Lộ trình & Tiến độ';
      default: return 'EnglishUp';
    }
  };

  const currentLabel = getTabLabel(currentTab);

  return (
    <header className="sticky top-0 z-40 bg-[#0b0e14]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger + Active Section Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb indicating active module without duplicate nav pills */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span 
              onClick={() => onNavigate('dashboard')}
              className="text-slate-400 hover:text-white cursor-pointer transition-colors font-medium"
            >
              EnglishUp
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="font-extrabold text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2.5 py-0.5 rounded-full">
              {currentLabel}
            </span>
          </div>
        </div>

        {/* Center: Mobile brand logo OR desktop quick search */}
        <div 
          onClick={() => onNavigate('dashboard')}
          className="lg:hidden cursor-pointer flex items-center gap-2 select-none"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FFA800] flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-orange-500/20">
            C
          </div>
          <span className="font-extrabold text-base tracking-wider text-white font-sans flex items-center gap-1">
            <span className="text-[#FF7A00]">ENGLISH</span>UP
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 max-w-sm flex-1 mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm bài học, từ vựng, ngữ pháp..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onNavigate('vocabulary');
                }
              }}
              className="w-full pl-8 pr-4 py-1.5 bg-[#121620] border border-slate-800 rounded-full text-xs text-slate-200 placeholder:text-slate-500 focus:outline-hidden focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Right: Student Learning Context Status Badge + AI Tutor + Profile */}
        <div className="flex items-center gap-3">
          {/* Unified Student Context Badge (Distinguishes Grade, CEFR, and Time; NO duplicate selector) */}
          <div className="hidden md:flex items-center gap-2.5 bg-[#161a23] px-3.5 py-1.5 rounded-full border border-slate-800 text-xs">
            {/* Grade (From Single Source of Truth) */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="font-extrabold text-white">Lớp {profile.grade}</span>
            </div>

            <span className="text-slate-700">•</span>

            {/* Proficiency Level (Distinct from Grade) */}
            <div className="flex items-center gap-1 text-slate-400 font-medium">
              <span>CEFR:</span>
              <span className={`font-bold ${
                profile.hasTakenDiagnostic ? 'text-cyan-300' : 'text-amber-400'
              }`}>
                {profile.estimatedCEFR}
              </span>
            </div>

            <span className="text-slate-700">•</span>

            {/* Daily study progress */}
            <div className="flex items-center gap-1 text-slate-400 font-medium">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{profile.todayMinutesLogged}/{profile.dailyGoalMinutes}p</span>
            </div>
          </div>

          {/* AI Tutor Quick Action */}
          <button
            onClick={onOpenAITutor}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#A3E635] text-slate-950 font-extrabold text-xs shadow-md shadow-lime-500/20 hover:bg-[#b2f347] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Tutor</span>
            <span className="sm:hidden">AI</span>
          </button>

          {/* Student Profile avatar */}
          <div 
            onClick={onOpenSettings}
            className="flex items-center gap-2.5 pl-1 cursor-pointer group"
          >
            <div className="text-right hidden xl:block">
              <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">
                {profile.name}
              </p>
              <p className="text-[10px] text-slate-400 font-medium">Lớp {profile.grade} THPT</p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Minh Anh"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-orange-500/80 shadow-xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0b0e14]"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
