import React, { useState } from 'react';
import { Settings, X, Save, Trash2, KeyRound, CheckCircle2 } from 'lucide-react';
import { StudentProfile, Grade } from '../../types';
import { StorageService } from '../../services/storage';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onProfileUpdated: (p: StudentProfile) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileUpdated,
}) => {
  const [name, setName] = useState(profile.name);
  const [grade, setGrade] = useState<Grade>(profile.grade);
  const [goal, setGoal] = useState(profile.dailyGoalMinutes);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: StudentProfile = {
      ...profile,
      name: name.trim() || 'Học sinh',
      grade,
      dailyGoalMinutes: goal,
    };
    StorageService.saveProfile(updated);
    onProfileUpdated(updated);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (confirm('Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu học tập trên máy này không?')) {
      StorageService.resetAllData();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#161a23] rounded-3xl w-full max-w-md border border-slate-800 shadow-2xl p-6 sm:p-7 space-y-5 text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base text-white">Cài đặt tài khoản học sinh</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-300 block mb-1">Họ và tên học sinh:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0d1017] border border-slate-800 text-white rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Khối lớp THPT:</label>
            <div className="grid grid-cols-3 gap-2">
              {([10, 11, 12] as Grade[]).map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => setGrade(g)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    grade === g
                      ? 'bg-[#3B82F6] border-blue-500 text-white shadow-xs'
                      : 'bg-[#0d1017] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Lớp {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-300 block mb-1">Mục tiêu học mỗi ngày:</label>
            <div className="grid grid-cols-4 gap-2">
              {[10, 15, 20, 30].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setGoal(m)}
                  className={`py-2 rounded-xl font-bold border transition-all ${
                    goal === m
                      ? 'bg-[#3B82F6] border-blue-500 text-white shadow-xs'
                      : 'bg-[#0d1017] border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {m}p
                </button>
              ))}
            </div>
          </div>

          {/* AI Settings note */}
          <div className="p-3 bg-blue-950/40 border border-blue-800/40 rounded-xl space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-blue-300">
              <KeyRound className="w-3.5 h-3.5 text-blue-400" />
              <span>Kết nối AI & Bảo mật</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Ứng dụng hỗ trợ Gemini 3.8 Flash qua server proxy an toàn. API key được quản lý trong tab Settings &gt; Secrets của AI Studio Build.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="text-rose-600 hover:text-rose-800 text-xs font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa dữ liệu máy</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
            >
              {isSaved ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4 text-white" />}
              <span>{isSaved ? 'Đã lưu!' : 'Lưu thay đổi'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
