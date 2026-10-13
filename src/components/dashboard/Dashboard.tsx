import React, { useState } from 'react';
import { 
  Video, 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  ArrowUpRight, 
  Check, 
  Clock, 
  BookA, 
  Headphones, 
  CheckCircle2, 
  Dna, 
  Briefcase, 
  Plane, 
  Utensils, 
  Activity, 
  PawPrint, 
  Plus, 
  Flame,
  Award,
  Layers,
  RotateCcw,
  Play,
  ArrowRight,
  TrendingUp,
  Brain,
  AlertCircle
} from 'lucide-react';
import { StudentProfile, Grade } from '../../types';
import { SpeechService } from '../../services/speechService';
import { StorageService } from '../../services/storage';
import { LearningEngineService } from '../../services/learningEngineService';

interface DashboardProps {
  profile: StudentProfile;
  onNavigate: (tab: string) => void;
  onOpenDiagnostic: () => void;
  onStartGuidedSession: () => void;
  onLogTime: (mins: number) => void;
  onOpenAITutor: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  profile,
  onNavigate,
  onOpenDiagnostic,
  onStartGuidedSession,
  onLogTime,
  onOpenAITutor,
}) => {
  // Practice Speaking widget state
  const [targetSentence, setTargetSentence] = useState(
    "Protecting biodiversity is essential for our planet's ecological balance and future generations."
  );
  const [isSpeakingRecording, setIsSpeakingRecording] = useState(false);
  const [speakingFeedback, setSpeakingFeedback] = useState<string | null>(null);

  const handleToggleRecordSpeaking = () => {
    if (isSpeakingRecording) {
      setIsSpeakingRecording(false);
      setSpeakingFeedback("Xuất sắc! Phát âm đạt 94% chuẩn ngữ âm bản ngữ.");
      StorageService.logStudyMinutes(2);
    } else {
      setIsSpeakingRecording(true);
      setSpeakingFeedback(null);
      SpeechService.speakText(targetSentence, 0.95, () => {
        // after sample audio
      });
    }
  };

  const handlePlaySampleAudio = () => {
    SpeechService.speakText(targetSentence, 0.95);
  };

  const handleSelectCategory = (catName: string) => {
    if (catName === 'Science') {
      onNavigate('science');
    } else if (catName === 'Work' || catName === 'Traveling') {
      onNavigate('speaking');
    } else {
      onNavigate('vocabulary');
    }
  };

  const adaptivePlan = profile.currentPlan || LearningEngineService.generateAdaptiveStudyPlan(profile);
  const nextSession = adaptivePlan.nextRecommendedSession;

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-slate-100 font-sans pb-6">
      {/* =========================================================================
          HERO BANNER: NEXT RECOMMENDED STEP & ADAPTIVE STUDY SESSION
         ========================================================================= */}
      <div className="bg-gradient-to-r from-[#141b2d] via-[#161f38] to-[#121622] rounded-3xl p-5 sm:p-6 border border-blue-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-3 py-1 rounded-full">
                <Brain className="w-3.5 h-3.5" />
                <span>Next Recommended Step</span>
              </span>
              <span className="text-[11px] font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
                Lớp {profile.grade} • CT GDPT 2018
              </span>
              <span className="text-[11px] font-bold text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-full border border-purple-500/30 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{nextSession.durationMinutes} phút</span>
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {nextSession.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              💡 {nextSession.rationale}
            </p>

            {!profile.hasTakenDiagnostic ? (
              <div className="pt-1 flex items-center gap-2 text-xs text-amber-300">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Chưa làm bài khảo sát năng lực đầu vào?</span>
                <button
                  onClick={onOpenDiagnostic}
                  className="font-bold underline text-amber-200 hover:text-white transition-colors"
                >
                  Làm khảo sát ngay (5 phút)
                </button>
              </div>
            ) : (
              <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <span>Trình độ: <strong className="text-cyan-300">{profile.estimatedCEFR}</strong></span>
                <span>•</span>
                <span>{profile.diagnosticResult?.gradeAlignmentVi || 'Đạt chuẩn lớp'}</span>
                <span>•</span>
                <button
                  onClick={onOpenDiagnostic}
                  className="text-xs text-blue-400 hover:text-blue-300 underline font-medium"
                >
                  Khảo sát lại
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={onStartGuidedSession}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Bắt đầu phiên học ngay (Start Session)</span>
            </button>

            <button
              onClick={() => onNavigate('progress')}
              className="px-5 py-2.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-bold rounded-2xl text-xs transition-colors border border-slate-700/60 flex items-center justify-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Xem lộ trình thích ứng & mục tiêu</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 1: TOP GRID (Speaking Club Video | PRO Student Card | Weekly Activity)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. Large Live Video Speaking Club Card (Left: 6 cols on lg) */}
        <div className="lg:col-span-6 bg-[#161a23] rounded-3xl overflow-hidden border border-slate-800/80 relative min-h-[300px] sm:min-h-[340px] flex flex-col justify-between shadow-xl group">
          {/* Background image of two smiling learners on video call */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-102"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=80')`
            }}
          />
          {/* Subtle dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />

          {/* Top Tags & Online Ping */}
          <div className="relative z-10 p-5 flex items-start justify-between">
            <div className="space-y-1.5">
              <span className="inline-block bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                Francesca
              </span>
              <br />
              <span className="inline-block bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                Martin
              </span>
            </div>

            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-extrabold tracking-wider text-emerald-400 uppercase">
                ONLINE
              </span>
            </div>
          </div>

          {/* Bottom Call Action */}
          <div className="relative z-10 p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-white/90">Phòng Luyện Nói Tương Tác</p>
              <p className="text-[11px] text-slate-300">Giao lưu phản xạ tiếng Anh thời gian thực</p>
            </div>

            <button
              onClick={() => onNavigate('speaking')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-extrabold rounded-full text-xs sm:text-sm shadow-xl shadow-blue-600/35 transition-all active:scale-95"
            >
              <Video className="w-4 h-4 fill-white" />
              <span>Join speaking club</span>
            </button>
          </div>
        </div>

        {/* 2. PRO Student Radiant Orange Card (Middle: 3 cols on lg) */}
        <div className="lg:col-span-3 bg-gradient-to-b from-[#FF7A00] via-[#FF5500] to-[#E63900] rounded-3xl p-6 text-white flex flex-col justify-between shadow-xl shadow-orange-600/20 relative overflow-hidden">
          {/* Subtle radial aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-yellow-300/20 blur-2xl pointer-events-none" />

          {/* Top Title: PRO student */}
          <div className="text-center relative z-10 pt-2">
            <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-950 font-sans">
              PRO
            </h3>
            <span className="text-xs font-extrabold tracking-widest uppercase text-slate-900/80 block -mt-1">
              STUDENT
            </span>
          </div>

          {/* 3 Status Pills */}
          <div className="space-y-2.5 relative z-10 my-4">
            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
              <span className="text-base">🎯</span>
              <span>126 level</span>
            </div>

            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
              <span className="text-base">📝</span>
              <span>14 quizzes</span>
            </div>

            <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-black/15 backdrop-blur-md border border-white/20 text-xs font-bold text-white">
              <span className="text-base">⏱️</span>
              <span>{profile.todayMinutesLogged || 15} min today</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('progress')}
            className="w-full py-2 bg-slate-950 hover:bg-slate-900 text-white font-extrabold rounded-xl text-xs transition-all shadow-md"
          >
            Chi tiết thành tích
          </button>
        </div>

        {/* 3. Weekly Activity Bar Chart Card (Right: 3 cols on lg) */}
        <div className="lg:col-span-3 bg-[#161a23] rounded-3xl p-5 border border-slate-800/80 flex flex-col justify-between shadow-xl">
          <div>
            {/* Days header: Mon, Tue, Wed, Thu, Fri, Sat, Sun */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            {/* Checkmark status row */}
            <div className="grid grid-cols-7 gap-1 text-center mb-6">
              {[true, true, true, true, true, false, false].map((checked, i) => (
                <div key={i} className="flex justify-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    checked
                      ? 'bg-emerald-500 text-white font-black shadow-xs shadow-emerald-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {checked && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              ))}
            </div>

            {/* Stacked Activity Bars (Violet & Purple Tiers as in image) */}
            <div className="grid grid-cols-7 gap-2 items-end h-32 px-1">
              {[
                { top: 28, mid: 22, bot: 32 },  // Mon
                { top: 18, mid: 20, bot: 24 },  // Tue
                { top: 32, mid: 26, bot: 38 },  // Wed
                { top: 40, mid: 30, bot: 45 },  // Thu
                { top: 22, mid: 24, bot: 30 },  // Fri
                { top: 0,  mid: 0,  bot: 8 },   // Sat
                { top: 0,  mid: 0,  bot: 8 },   // Sun
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col gap-1 items-center justify-end h-full">
                  {bar.top > 0 && (
                    <div 
                      className="w-full bg-[#D8B4FE] rounded-sm transition-all"
                      style={{ height: `${bar.top}%` }}
                    />
                  )}
                  {bar.mid > 0 && (
                    <div 
                      className="w-full bg-[#C084FC] rounded-sm transition-all"
                      style={{ height: `${bar.mid}%` }}
                    />
                  )}
                  <div 
                    className={`w-full rounded-sm transition-all ${
                      bar.bot > 10 ? 'bg-[#9333EA]' : 'bg-slate-800'
                    }`}
                    style={{ height: `${bar.bot}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Hoàn thành: 5/7 ngày</span>
            <span className="text-purple-400 font-bold">Chuỗi {profile.streakDays} ngày 🔥</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: BOTTOM GRID (Trainings & Category | Practice Speaking | Fast Repeat)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 1. Trainings & Categories (Left: 6 cols on lg) */}
        <div className="lg:col-span-6 bg-[#161a23] rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between shadow-xl space-y-6">
          {/* Header */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-4">
              <h2 className="text-2xl font-black text-white tracking-tight">Trainings</h2>
              <span className="text-xs text-slate-400">Easily improve language knowledge every day!</span>
            </div>

            {/* 3 Training Cards side-by-side */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Vocabulary (Active Neon Lime Card from image) */}
              <div 
                onClick={() => onNavigate('vocabulary')}
                className="bg-[#A3E635] text-slate-950 p-4 rounded-2xl cursor-pointer hover:scale-102 transition-all shadow-lg shadow-lime-500/10 flex flex-col justify-between min-h-[115px]"
              >
                <div>
                  <h4 className="font-black text-base tracking-tight">Vocabulary</h4>
                  <p className="text-xs font-bold text-slate-900 mt-1">12 567 words</p>
                </div>
                <div className="w-full bg-slate-900/30 rounded-full h-1.5 overflow-hidden mt-3">
                  <div className="bg-slate-950 h-full rounded-full w-4/5" />
                </div>
              </div>

              {/* Listening Card */}
              <div 
                onClick={() => onNavigate('listening')}
                className="bg-[#1C202B] text-white p-4 rounded-2xl cursor-pointer hover:bg-[#222836] transition-all border border-slate-800/80 flex flex-col justify-between min-h-[115px]"
              >
                <div>
                  <h4 className="font-extrabold text-base text-slate-200">Listening</h4>
                  <p className="text-xs text-slate-400 mt-1">37 h audio</p>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-3">
                  <div className="bg-[#EAB308] h-full rounded-full w-3/5" />
                </div>
              </div>

              {/* Grammar Card */}
              <div 
                onClick={() => onNavigate('grammar')}
                className="bg-[#1C202B] text-white p-4 rounded-2xl cursor-pointer hover:bg-[#222836] transition-all border border-slate-800/80 flex flex-col justify-between min-h-[115px]"
              >
                <div>
                  <h4 className="font-extrabold text-base text-slate-200">Grammar</h4>
                  <p className="text-xs text-slate-400 mt-1">60 lessons</p>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-3">
                  <div className="bg-[#F97316] h-full rounded-full w-2/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Choose category section */}
          <div className="space-y-3 pt-2">
            <p className="text-xs font-bold text-slate-400 tracking-wider">Choose category</p>
            
            {/* Category pills grid (as in image) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => handleSelectCategory('Food')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Food</span>
              </button>

              <button
                onClick={() => handleSelectCategory('Traveling')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#FB923C] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Plane className="w-3.5 h-3.5" />
                <span>Traveling</span>
              </button>

              <button
                onClick={() => handleSelectCategory('Sport')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#8B5CF6] hover:bg-[#A78BFA] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Activity className="w-3.5 h-3.5" />
                <span>Sport</span>
              </button>

              <button
                onClick={() => handleSelectCategory('Animals')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#A855F7] hover:bg-[#C084FC] text-white font-bold text-xs transition-all shadow-xs"
              >
                <PawPrint className="w-3.5 h-3.5" />
                <span>Animals</span>
              </button>

              <button
                onClick={() => handleSelectCategory('Health')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#9333EA] hover:bg-[#A855F7] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Health</span>
              </button>

              {/* Science category (adhering to Science Skill) */}
              <button
                onClick={() => handleSelectCategory('Science')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#818CF8] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Dna className="w-3.5 h-3.5" />
                <span>Science</span>
              </button>

              <button
                onClick={() => handleSelectCategory('Work')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F97316] hover:bg-[#FB923C] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Work</span>
              </button>

              <button
                onClick={() => handleSelectCategory('Other')}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-bold text-xs transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Other</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Practice Speaking Card (Middle: 3.5 cols on lg) */}
        <div className="lg:col-span-3 bg-[#161a23] rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between shadow-xl relative min-h-[300px]">
          {/* Floating Neon Green AI Badge in top right */}
          <div className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#A3E635] text-slate-950 font-black text-sm flex items-center justify-center shadow-lg shadow-lime-500/20">
            AI
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 block mb-2">Practice speaking</span>
            
            {/* Target sentence in vivid gold/yellow */}
            <p className="text-amber-300 font-extrabold text-base sm:text-lg leading-snug mt-3 pr-8">
              "{targetSentence}"
            </p>

            {speakingFeedback && (
              <div className="mt-3 p-2.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-300 font-semibold animate-in fade-in">
                {speakingFeedback}
              </div>
            )}
          </div>

          {/* Bottom Waveform & Mic Bar */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleRecordSpeaking}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  isSpeakingRecording
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-[#3B82F6] hover:bg-blue-600 text-white shadow-blue-500/30'
                }`}
                title={isSpeakingRecording ? 'Dừng ghi âm' : 'Bắt đầu ghi âm'}
              >
                {isSpeakingRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              <button
                onClick={handlePlaySampleAudio}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full transition-colors"
                title="Nghe mẫu"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Audio Waveform Bars */}
            <div className="flex items-center gap-1 h-8 px-2 overflow-hidden">
              {[8, 14, 22, 16, 28, 18, 12, 26, 32, 20, 14, 24, 18, 10, 16, 20].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all ${
                    isSpeakingRecording 
                      ? 'bg-purple-400 waveform-bar' 
                      : 'bg-slate-600'
                  }`}
                  style={{
                    height: isSpeakingRecording ? `${h}px` : '8px',
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3. Fast Repeat Vocabulary Card with Robot Mascot (Right: 2.5 cols on lg) */}
        <div className="lg:col-span-3 bg-[#161a23] rounded-3xl p-6 border border-slate-800/80 flex flex-col justify-between shadow-xl relative min-h-[300px]">
          <div>
            <p className="text-xs font-bold text-slate-400">Fast repeat</p>
            <h3 className="text-2xl font-black text-[#C084FC] tracking-tight mt-1">
              Vocabulary
            </h3>
            
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>10 min practice</span>
            </div>
          </div>

          {/* Cute Robot AI Mascot (drawn in high quality SVG matching the reference) */}
          <div className="my-2 flex justify-center items-center">
            <svg 
              className="w-32 h-32 drop-shadow-xl animate-bounce-slow" 
              viewBox="0 0 120 120" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Antenna */}
              <circle cx="60" cy="18" r="4" fill="#FFA500" />
              <line x1="60" y1="22" x2="60" y2="30" stroke="#FFA500" strokeWidth="3" strokeLinecap="round" />
              
              {/* Robot Head */}
              <rect x="36" y="30" width="48" height="34" rx="14" fill="#1C202B" stroke="#FFA500" strokeWidth="3" />
              
              {/* Screen eyes */}
              <circle cx="50" cy="46" r="3.5" fill="#FFA500" />
              <circle cx="70" cy="46" r="3.5" fill="#FFA500" />
              <path d="M54 53 Q60 57 66 53" stroke="#FFA500" strokeWidth="2" strokeLinecap="round" />
              
              {/* Robot Body */}
              <path d="M42 66 C42 66 36 88 44 98 C52 108 68 108 76 98 C84 88 78 66 78 66 Z" fill="#FFA500" />
              
              {/* Center Body Core */}
              <circle cx="60" cy="84" r="8" fill="#1C202B" stroke="#FFFFFF" strokeWidth="2" />
              
              {/* Pointing Arm */}
              <path d="M38 74 L20 70 C18 69 16 72 18 74 L24 82" stroke="#FFA500" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Bottom Launch Button with diagonal arrow */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-slate-400">Spaced Repetition</span>
            <button
              onClick={() => onNavigate('vocabulary')}
              className="w-10 h-10 rounded-full bg-[#3B82F6] hover:bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              title="Vào ôn nhanh từ vựng"
            >
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
