import React from 'react';
import { 
  LayoutDashboard, 
  Headphones, 
  Mic, 
  BookOpen, 
  PenTool, 
  Sparkles, 
  BookA, 
  Dna, 
  GraduationCap, 
  TrendingUp, 
  Settings, 
  Flame,
  CheckCircle2,
  X,
  Bot
} from 'lucide-react';
import { Grade } from '../../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  grade: Grade;
  setGrade: (grade: Grade) => void;
  streakDays: number;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  onOpenSettings: () => void;
  onOpenAITutor: () => void;
}

interface NavGroup {
  groupTitle: string;
  items: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    action?: () => void;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  grade,
  setGrade,
  streakDays,
  isOpenMobile,
  setIsOpenMobile,
  onOpenSettings,
  onOpenAITutor,
}) => {
  // Standardized 6 functional groups (Prompt Section IV compliant)
  const navGroups: NavGroup[] = [
    {
      groupTitle: '1. Tổng quan',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'progress', label: 'Lộ trình & Tiến độ', icon: TrendingUp, badge: 'Plan' },
      ],
    },
    {
      groupTitle: '2. Luyện 4 kỹ năng',
      items: [
        { id: 'listening', label: 'Listening Lab', icon: Headphones, badge: 'Audio' },
        { id: 'speaking', label: 'Speaking Lab', icon: Mic, badge: 'AI Voice' },
        { id: 'reading', label: 'Reading Lab', icon: BookOpen },
        { id: 'writing', label: 'Writing Lab', icon: PenTool, badge: 'AI Chấm' },
      ],
    },
    {
      groupTitle: '3. Kiến thức cốt lõi',
      items: [
        { id: 'vocabulary', label: 'Vocabulary Lab', icon: BookA, badge: 'SRS' },
        { id: 'grammar', label: 'Grammar Lab', icon: CheckCircle2 },
      ],
    },
    {
      groupTitle: '4. Luyện tập & Đánh giá',
      items: [
        { id: 'exam', label: 'Luyện thi THPT', icon: GraduationCap, badge: 'Đề thi' },
        { id: 'science', label: 'Bioscience & STEM', icon: Dna, badge: 'Science' },
      ],
    },
    {
      groupTitle: '5. AI English Tutor',
      items: [
        { 
          id: 'tutor_action', 
          label: 'Hỏi AI English Tutor', 
          icon: Bot, 
          badge: '24/7',
          action: onOpenAITutor 
        },
      ],
    },
  ];

  const handleSelectTab = (id: string, action?: () => void) => {
    if (action) {
      action();
    } else {
      setCurrentTab(id);
    }
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#121620] border-r border-slate-800 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div 
            onClick={() => handleSelectTab('dashboard')} 
            className="cursor-pointer flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF7A00] to-[#FFA800] flex items-center justify-center text-slate-950 font-black text-lg shadow-md shadow-orange-500/20">
              C
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-white tracking-wide">
                  <span className="text-[#FF7A00]">ENGLISH</span>UP
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider bg-[#A3E635] text-slate-950 px-1.5 py-0.5 rounded-full">
                  AI LAB
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tiếng Anh THPT Lớp 10-12</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CANONICAL GRADE SELECTOR: The SINGLE standard source of truth for the student's enrolled grade */}
        <div className="px-4 py-3 bg-[#161a24] border-b border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Khối lớp mục tiêu:</span>
            <span className="text-[#3B82F6] font-bold">Lớp {grade}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            {([10, 11, 12] as Grade[]).map((g) => (
              <button
                key={g}
                onClick={() => setGrade(g)}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  grade === g
                    ? 'bg-[#3B82F6] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                Lớp {g}
              </button>
            ))}
          </div>
        </div>

        {/* Standardized Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
          {navGroups.map((group, gIndex) => (
            <div key={gIndex} className="space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                {group.groupTitle}
              </div>
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id, item.action)}
                    className={`w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
                        : 'text-slate-300 hover:bg-[#1a202d] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badge === 'Science'
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-700/50'
                            : item.badge === 'AI Voice' || item.badge === 'AI Chấm' || item.badge === '24/7'
                            ? 'bg-purple-950 text-purple-300 border border-purple-700/50'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer: Streak and Account Settings */}
        <div className="p-4 border-t border-slate-800 bg-[#161a24] space-y-3">
          <div className="flex items-center justify-between p-2.5 bg-gradient-to-r from-orange-950/40 to-slate-900 border border-orange-500/30 rounded-xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
                <Flame className="w-4 h-4 fill-orange-500 text-orange-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Chuỗi {streakDays} ngày</p>
                <p className="text-[10px] text-orange-300">Rèn luyện mỗi ngày</p>
              </div>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div 
              onClick={onOpenSettings}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Minh Anh"
                className="w-8 h-8 rounded-full object-cover border border-orange-500"
              />
              <div>
                <p className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">Minh Anh</p>
                <p className="text-[10px] text-slate-400">Học sinh Lớp {grade}</p>
              </div>
            </div>
            <button
              onClick={onOpenSettings}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Cài đặt hồ sơ & tài khoản"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
