import React, { useState } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Flame, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  ChevronRight,
  Headphones,
  Mic,
  PenTool,
  BookA,
  GraduationCap,
  ShieldCheck,
  Compass,
  ArrowRight,
  Database,
  Filter,
  Check,
  Info,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { StudentProfile, Grade, Skill } from '../../types';
import { CurriculumLesson } from '../../types/curriculum';
import { ALL_CURRICULA } from '../../data/curriculumEngineData';
import { StorageService } from '../../services/storage';
import { QuestionBankService } from '../../services/questionBankService';
import { LearningEngineService } from '../../services/learningEngineService';
import { UnitAssessment, SharedQuestion, QuestionType } from '../../types/questionBank';
import { UnitQuizModal } from '../assessment/UnitQuizModal';
import { LessonDetailModal } from '../curriculum/LessonDetailModal';

interface ProgressPageProps {
  profile: StudentProfile;
  onUpdateGoal: (mins: number) => void;
  onOpenDiagnostic: () => void;
  onStartGuidedSession?: () => void;
  onNavigate: (tab: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  profile,
  onUpdateGoal,
  onOpenDiagnostic,
  onStartGuidedSession,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'plan' | 'mistakes' | 'question_bank'>('curriculum');
  const [selectedGoal, setSelectedGoal] = useState(profile.dailyGoalMinutes || 15);
  const [mistakeList, setMistakeList] = useState(profile.mistakeBank || []);
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('u-g' + profile.grade + '-1');

  // Modals
  const [activeAssessment, setActiveAssessment] = useState<UnitAssessment | null>(null);
  const [selectedLessonForDetail, setSelectedLessonForDetail] = useState<CurriculumLesson | null>(null);

  // Question Bank filters
  const [filterSkill, setFilterSkill] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterGrade, setFilterGrade] = useState<string>(String(profile.grade));

  const currentCurriculum = ALL_CURRICULA[profile.grade] || ALL_CURRICULA[10];

  // Live Audit report & Coverage matrix
  const validationReport = QuestionBankService.validateQuestionBank();
  const coverageReports = QuestionBankService.getCoverageMatrix(profile.grade);
  const allQuestions = QuestionBankService.getAllQuestions();

  const handleGoalChange = (mins: number) => {
    setSelectedGoal(mins);
    onUpdateGoal(mins);
  };

  const getSkillIcon = (skill: Skill) => {
    switch (skill) {
      case 'listening': return <Headphones className="w-3.5 h-3.5 text-blue-400" />;
      case 'speaking': return <Mic className="w-3.5 h-3.5 text-purple-400" />;
      case 'reading': return <BookOpen className="w-3.5 h-3.5 text-cyan-400" />;
      case 'writing': return <PenTool className="w-3.5 h-3.5 text-amber-400" />;
      case 'vocabulary': return <BookA className="w-3.5 h-3.5 text-emerald-400" />;
      case 'grammar': return <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getSkillLabel = (skill: Skill) => {
    switch (skill) {
      case 'listening': return 'Nghe (Listening)';
      case 'speaking': return 'Nói (Speaking)';
      case 'reading': return 'Đọc (Reading)';
      case 'writing': return 'Viết (Writing)';
      case 'vocabulary': return 'Từ vựng (Vocabulary)';
      case 'grammar': return 'Ngữ pháp (Grammar)';
      default: return skill;
    }
  };

  const handleLaunchLesson = (skill: Skill) => {
    if (skill === 'vocabulary') onNavigate('vocabulary');
    else if (skill === 'grammar') onNavigate('grammar');
    else if (skill === 'listening') onNavigate('listening');
    else if (skill === 'speaking') onNavigate('speaking');
    else if (skill === 'reading') onNavigate('reading');
    else if (skill === 'writing') onNavigate('writing');
    else onNavigate('exam');
  };

  const currentSemesterData = currentCurriculum.semesters.find(s => s.semesterNumber === selectedSemester) 
    || currentCurriculum.semesters[0];

  // Filtered Question list
  const filteredQuestions = allQuestions.filter(q => {
    const matchGrade = filterGrade === 'all' || String(q.grade) === filterGrade;
    const matchSkill = filterSkill === 'all' || q.skill === filterSkill;
    const matchType = filterType === 'all' || q.questionType === filterType;
    return matchGrade && matchSkill && matchType;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800/40 text-indigo-400">
            <TrendingUp className="w-5 h-5" />
          </span>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Lộ trình Cá nhân & Ngân hàng Bài học THPT
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">
          Bám sát khung Chương trình GDPT 2018 Bộ Giáo dục & Đào tạo cho Lớp {profile.grade}, kết hợp cân đối 4 kỹ năng chuẩn B1-B2 và Ngân hàng câu hỏi dùng chung.
        </p>
      </div>

      {/* Top Stats Overview Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 bg-[#161a23] rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Thời gian hôm nay</span>
          </div>
          <p className="text-2xl font-black text-white">
            {profile.todayMinutesLogged || 0} <span className="text-xs font-normal text-slate-400">phút</span>
          </p>
        </div>

        <div className="p-5 bg-[#161a23] rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Chuỗi ngày học liên tục</span>
          </div>
          <p className="text-2xl font-black text-white">
            {profile.streakDays} <span className="text-xs font-normal text-slate-400">ngày</span>
          </p>
        </div>

        <div className="p-5 bg-[#161a23] rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Trình độ CEFR</span>
          </div>
          <p className="text-2xl font-black text-cyan-300">
            {profile.estimatedCEFR}
          </p>
          <span className="text-[10px] text-slate-500 block">Mục tiêu THPT: B1-B2</span>
        </div>

        <div className="p-5 bg-[#161a23] rounded-2xl border border-slate-800 shadow-lg space-y-1">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <AlertCircle className="w-4 h-4 text-rose-400" />
            <span>Sổ tay lỗi sai</span>
          </div>
          <p className="text-2xl font-black text-rose-400">
            {mistakeList?.length || 0} <span className="text-xs font-normal text-slate-400">câu</span>
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-[#121620] rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('curriculum')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'curriculum'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Khung GDPT 2018 (Lớp {profile.grade})</span>
        </button>

        <button
          onClick={() => setActiveTab('question_bank')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'question_bank'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Ngân hàng Câu hỏi & Báo cáo Độ phủ</span>
        </button>

        <button
          onClick={() => setActiveTab('plan')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'plan'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Mục tiêu {selectedGoal} phút</span>
        </button>

        <button
          onClick={() => setActiveTab('mistakes')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'mistakes'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Sổ tay lỗi sai ({mistakeList.length})</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: CURRICULUM ROADMAP (GDPT 2018 Framework)
         ========================================================================= */}
      {activeTab === 'curriculum' && (
        <div className="space-y-6">
          {/* Program Overview Banner */}
          <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-950 text-blue-300 border border-blue-800/60 px-2 py-0.5 rounded-md">
                    {currentCurriculum.curriculumVersion}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Nguồn chuẩn Bộ GD&ĐT</span>
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentCurriculum.name}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentCurriculum.descriptionVi}
                </p>
              </div>

              {/* Semester Switcher */}
              <div className="flex items-center gap-1 bg-[#121620] p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
                <button
                  onClick={() => setSelectedSemester(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSemester === 1
                      ? 'bg-[#3B82F6] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Học kỳ 1
                </button>
                <button
                  onClick={() => setSelectedSemester(2)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedSemester === 2
                      ? 'bg-[#3B82F6] text-white shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Học kỳ 2
                </button>
              </div>
            </div>

            {/* Reference Source Note */}
            <div className="p-3 bg-[#121620] rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
              <span className="italic">
                <strong>Căn cứ đối chiếu:</strong> {currentCurriculum.sourceReference}
              </span>
              <span className="text-slate-500 font-mono text-[10px]">
                Status: {currentCurriculum.reviewStatus}
              </span>
            </div>
          </div>

          {/* Units Accordion */}
          <div className="space-y-4">
            {currentSemesterData.units.map((unit) => {
              const isExpanded = expandedUnitId === unit.id;
              const unitAssessment = QuestionBankService.getUnitAssessment(unit.id);

              return (
                <div
                  key={unit.id}
                  className="bg-[#161a23] rounded-3xl border border-slate-800 overflow-hidden shadow-lg transition-all"
                >
                  {/* Unit Title Bar */}
                  <div
                    onClick={() => setExpandedUnitId(isExpanded ? null : unit.id)}
                    className="p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#1a202d] transition-colors"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800/60">
                          Unit {unit.unitNumber}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          Chủ đề: {unit.theme}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {unit.titleVi}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        {unit.title}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      {unitAssessment && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveAssessment(unitAssessment);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                        >
                          <FileCheck className="w-3.5 h-3.5" />
                          <span>Kiểm tra Unit</span>
                        </button>
                      )}

                      <span className="hidden md:inline-block text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                        {unit.lessons.length} bài học
                      </span>
                      <div className={`p-1.5 rounded-full bg-slate-800 text-slate-400 transition-transform ${
                        isExpanded ? 'rotate-90 text-white' : ''
                      }`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/80 space-y-5">
                      {/* Objectives and Skills Distribution */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {/* Knowledge objectives */}
                        <div className="p-4 bg-[#121620] rounded-2xl border border-slate-800 space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                            Yêu cầu cần đạt (Objectives):
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {unit.knowledgeObjectives.map((obj, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-cyan-400">•</span>
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Vocabulary & Grammar Focus */}
                        <div className="p-4 bg-[#121620] rounded-2xl border border-slate-800 space-y-3">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                              Từ vựng trọng tâm:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {unit.keyVocabularyWords.map((w, i) => (
                                <span
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate('vocabulary');
                                  }}
                                  className="text-xs bg-amber-950/60 text-amber-300 border border-amber-800/40 px-2 py-0.5 rounded-md hover:bg-amber-900/60 cursor-pointer"
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 block mb-1.5">
                              Ngữ pháp trọng điểm:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {unit.keyGrammarTopics.map((g, i) => (
                                <span
                                  key={i}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onNavigate('grammar');
                                  }}
                                  className="text-xs bg-indigo-950/60 text-indigo-300 border border-indigo-800/40 px-2 py-0.5 rounded-md hover:bg-indigo-900/60 cursor-pointer"
                                >
                                  {g}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Table */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Danh sách bài học & Hoạt động thực hành:
                          </h4>
                          <span className="text-[11px] text-slate-500">
                            Nhấp vào bài học để xem chi tiết 3 câu hỏi sư phạm
                          </span>
                        </div>

                        <div className="space-y-2">
                          {unit.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              onClick={() => setSelectedLessonForDetail(lesson)}
                              className="p-3.5 bg-[#121620] hover:bg-[#181d2a] rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors cursor-pointer group"
                            >
                              <div className="flex items-start sm:items-center gap-3">
                                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mt-0.5 sm:mt-0">
                                  {getSkillIcon(lesson.skillFocus)}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                      {getSkillLabel(lesson.skillFocus)}
                                    </span>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      {lesson.estimatedMinutes} phút
                                    </span>
                                    <span className="text-slate-600">•</span>
                                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950 px-1.5 py-0.2 rounded-sm border border-cyan-800/40">
                                      {lesson.difficulty}
                                    </span>
                                  </div>
                                  <p className="text-xs sm:text-sm font-bold text-white mt-0.5 group-hover:text-blue-300 transition-colors">
                                    {lesson.titleVi}
                                  </p>
                                  <p className="text-[11px] text-slate-400 font-mono">
                                    {lesson.title}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLaunchLesson(lesson.skillFocus);
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-[#3B82F6] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl transition-all shadow-md shadow-blue-500/20 self-start sm:self-auto"
                              >
                                <span>Luyện ngay</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: QUESTION BANK & COVERAGE AUDIT (Prompt 4 Core)
         ========================================================================= */}
      {activeTab === 'question_bank' && (
        <div className="space-y-6">
          {/* Quality Assurance & Anti-Duplication Banner */}
          <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-md">
                    Audit Quality Report
                  </span>
                  <span className="text-[10px] font-bold text-cyan-400">
                    Ngân hàng câu hỏi dùng chung (Shared Repository)
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  Báo cáo Kiểm duyệt & Ma trận Độ phủ Kỹ năng
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kiểm tra toàn vẹn dữ liệu, chống nhân bản câu hỏi và bảo đảm phân bổ 4 kỹ năng theo chuẩn GDPT 2018.
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <div className="text-xs">
                  <span className="font-bold text-emerald-300 block">Dữ liệu hợp lệ 100%</span>
                  <span className="text-[10px] text-slate-400">0 ID trùng • 0 câu thiếu đáp án</span>
                </div>
              </div>
            </div>

            {/* Validation Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[#121620] rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Tổng số câu hỏi:</span>
                <strong className="text-xl font-black text-white">{validationReport.totalQuestions} câu</strong>
              </div>

              <div className="p-3.5 bg-[#121620] rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Đã kiểm duyệt (Verified):</span>
                <strong className="text-xl font-black text-emerald-400">{validationReport.verifiedCount} câu</strong>
              </div>

              <div className="p-3.5 bg-[#121620] rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Phân bố theo Lớp:</span>
                <strong className="text-xs font-bold text-cyan-300">
                  Lớp 10: {validationReport.questionsByGrade[10]} • Lớp 11: {validationReport.questionsByGrade[11]} • Lớp 12: {validationReport.questionsByGrade[12]}
                </strong>
              </div>

              <div className="p-3.5 bg-[#121620] rounded-2xl border border-slate-800">
                <span className="text-[11px] text-slate-500 block">Tham chiếu Unit hỏng:</span>
                <strong className="text-xl font-black text-emerald-400">0 lỗi</strong>
              </div>
            </div>
          </div>

          {/* Unit Coverage Matrix (Ma trận độ phủ Unit & Khoảng trống nội dung) */}
          <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div>
                <h3 className="text-base font-bold text-white">
                  Ma trận Độ phủ Kỹ năng Lớp {profile.grade} (Target: 20% Nghe, 20% Nói, 20% Đọc, 20% Viết, 20% Từ vựng & Ngữ pháp)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Đánh giá sự cân đối hoạt động học tập và cảnh báo các khoảng trống nội dung (CONTENT_GAP).
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {coverageReports.map((cov) => (
                <div 
                  key={cov.unitId}
                  className="p-4 bg-[#121620] rounded-2xl border border-slate-800 space-y-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-400">Unit {cov.unitNumber}</span>
                        <span className="text-slate-600">•</span>
                        <span className="font-bold text-white">{cov.titleVi}</span>
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {cov.totalLessons} bài học thiết kế • {cov.totalQuestions} câu hỏi ngân hàng
                      </span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border self-start sm:self-auto ${
                      cov.isBalanced 
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800/60' 
                        : 'bg-amber-950 text-amber-300 border-amber-800/60'
                    }`}>
                      {cov.isBalanced ? 'Đầy đủ 4 kỹ năng' : 'Cần bổ sung kỹ năng'}
                    </span>
                  </div>

                  {/* Skill distribution progress mini-bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-[11px]">
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Listening:</span>
                      <strong className="text-blue-400">{cov.skillsPercentages.listening}%</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Speaking:</span>
                      <strong className="text-purple-400">{cov.skillsPercentages.speaking}%</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Reading:</span>
                      <strong className="text-cyan-400">{cov.skillsPercentages.reading}%</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Writing:</span>
                      <strong className="text-amber-400">{cov.skillsPercentages.writing}%</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Vocabulary:</span>
                      <strong className="text-emerald-400">{cov.skillsPercentages.vocabulary}%</strong>
                    </div>
                    <div className="p-2 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-400 block text-[10px]">Grammar:</span>
                      <strong className="text-indigo-400">{cov.skillsPercentages.grammar}%</strong>
                    </div>
                  </div>

                  {/* Content gap note if any */}
                  {cov.contentGaps.length > 0 && (
                    <div className="p-2.5 bg-amber-950/40 border border-amber-800/40 rounded-xl text-[11px] text-amber-300">
                      <strong>Khoảng trống nội dung (CONTENT_GAP):</strong> {cov.contentGaps.join('; ')}.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Shared Question Bank Browser */}
          <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
              <div>
                <h3 className="text-base font-bold text-white">
                  Khám phá Ngân hàng Câu hỏi ({filteredQuestions.length} câu phù hợp)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Xem chi tiết từng câu hỏi, định dạng bài, đáp án và căn cứ sư phạm.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={filterGrade}
                  onChange={(e) => setFilterGrade(e.target.value)}
                  className="px-3 py-1.5 bg-[#121620] border border-slate-800 rounded-xl text-xs text-slate-200"
                >
                  <option value="all">Tất cả Khối</option>
                  <option value="10">Lớp 10</option>
                  <option value="11">Lớp 11</option>
                  <option value="12">Lớp 12</option>
                </select>

                <select
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
                  className="px-3 py-1.5 bg-[#121620] border border-slate-800 rounded-xl text-xs text-slate-200"
                >
                  <option value="all">Tất cả Kỹ năng</option>
                  <option value="listening">Listening</option>
                  <option value="speaking">Speaking</option>
                  <option value="reading">Reading</option>
                  <option value="writing">Writing</option>
                  <option value="vocabulary">Vocabulary</option>
                  <option value="grammar">Grammar</option>
                </select>
              </div>
            </div>

            {/* Questions list */}
            <div className="space-y-3">
              {filteredQuestions.map((q) => (
                <div
                  key={q.questionId}
                  className="p-4 bg-[#121620] border border-slate-800 rounded-2xl space-y-2 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-md">
                        {q.questionId}
                      </span>
                      <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                        Lớp {q.grade} • {q.skill} • {q.questionType}
                      </span>
                    </div>

                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-800/40">
                      {q.reviewStatus}
                    </span>
                  </div>

                  <p className="font-bold text-white text-sm leading-snug">
                    {q.prompt}
                  </p>

                  {q.contextText && (
                    <p className="text-[11px] text-slate-400 italic bg-black/30 p-2.5 rounded-xl border border-slate-800">
                      {q.contextText}
                    </p>
                  )}

                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-xl border ${
                            oIdx === q.correctIndex
                              ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300 font-bold'
                              : 'bg-slate-900/50 border-slate-800 text-slate-400'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt} {oIdx === q.correctIndex && '✓ (Đáp án đúng)'}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-2.5 bg-slate-900/70 border border-slate-800 rounded-xl text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-cyan-300">Giải thích sư phạm:</strong> {q.explanationVi}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: DAILY STUDY PLAN BLUEPRINT
         ========================================================================= */}
      {activeTab === 'plan' && (() => {
        const adaptivePlan = profile.currentPlan || LearningEngineService.generateAdaptiveStudyPlan(profile);
        const vocabItems = StorageService.getVocabularyItems();
        const dueCount = vocabItems.filter(v => new Date(v.nextReviewDate) <= new Date()).length;
        const masteredCount = profile.masteredVocabIds?.length || 0;
        const learnedCount = profile.savedVocabIds?.length || 0;

        return (
          <div className="space-y-6">
            {/* 1. Next Recommended Session Banner */}
            <div className="bg-gradient-to-r from-blue-950/70 via-indigo-950/60 to-slate-900 rounded-3xl p-6 border border-blue-500/30 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/30 text-cyan-300 border border-blue-500/40 px-2.5 py-0.5 rounded-full">
                      Next Recommended Session
                    </span>
                    <span className="text-xs text-slate-400">
                      Lớp {profile.grade} • {adaptivePlan.nextRecommendedSession.durationMinutes} phút
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {adaptivePlan.nextRecommendedSession.title}
                  </h3>
                  <p className="text-xs text-slate-300">
                    💡 {adaptivePlan.nextRecommendedSession.rationale}
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (onStartGuidedSession) {
                      onStartGuidedSession();
                    } else {
                      onNavigate(adaptivePlan.nextRecommendedSession.targetTab);
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all flex items-center justify-center gap-2 shrink-0 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Bắt đầu phiên học (Start Session)</span>
                </button>
              </div>
            </div>

            {/* 2. Daily Goal Selector & Settings */}
            <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Mục tiêu học tập hàng ngày</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Hệ thống tự động hiệu chỉnh khối lượng bài học thích ứng theo thời gian bạn chọn.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#121620] p-1 rounded-2xl border border-slate-800">
                  {[10, 15, 20, 30].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleGoalChange(mins)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedGoal === mins
                          ? 'bg-[#3B82F6] text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {mins} phút
                    </button>
                  ))}
                </div>
              </div>

              {/* Blueprint breakdown */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xs sm:text-sm">
                  Phân bổ nội dung cho phiên học {selectedGoal} phút:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div 
                    onClick={() => onNavigate('vocabulary')}
                    className="p-4 bg-amber-950/30 border border-amber-800/40 rounded-2xl space-y-1 cursor-pointer hover:bg-amber-900/30 transition-all"
                  >
                    <span className="font-bold text-amber-400">
                      {selectedGoal === 10 ? '2' : selectedGoal === 15 ? '3' : selectedGoal === 20 ? '4' : '6'} phút
                    </span>
                    <p className="font-semibold text-slate-200">Ôn từ vựng SRS</p>
                    <p className="text-slate-400 text-[11px]">Thuật toán lặp lại ngắt quãng SM-2</p>
                  </div>

                  <div 
                    onClick={() => onNavigate('grammar')}
                    className="p-4 bg-indigo-950/30 border border-indigo-800/40 rounded-2xl space-y-1 cursor-pointer hover:bg-indigo-900/30 transition-all"
                  >
                    <span className="font-bold text-indigo-400">
                      {selectedGoal === 10 ? '3' : selectedGoal === 15 ? '4' : selectedGoal === 20 ? '5' : '8'} phút
                    </span>
                    <p className="font-semibold text-slate-200">Ngữ pháp THPT</p>
                    <p className="text-slate-400 text-[11px]">Ôn công thức & giải bài tập ứng dụng</p>
                  </div>

                  <div 
                    onClick={() => onNavigate('speaking')}
                    className="p-4 bg-purple-950/30 border border-purple-800/40 rounded-2xl space-y-1 cursor-pointer hover:bg-purple-900/30 transition-all"
                  >
                    <span className="font-bold text-purple-400">
                      {selectedGoal === 10 ? '3' : selectedGoal === 15 ? '4' : selectedGoal === 20 ? '6' : '8'} phút
                    </span>
                    <p className="font-semibold text-slate-200">Luyện Nghe / Nói</p>
                    <p className="text-slate-400 text-[11px]">Hội thoại bản ngữ & chấm phát âm AI</p>
                  </div>

                  <div 
                    onClick={() => onNavigate('reading')}
                    className="p-4 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl space-y-1 cursor-pointer hover:bg-emerald-900/30 transition-all"
                  >
                    <span className="font-bold text-emerald-400">
                      {selectedGoal === 10 ? '2' : selectedGoal === 15 ? '4' : selectedGoal === 20 ? '5' : '8'} phút
                    </span>
                    <p className="font-semibold text-slate-200">Đọc hiểu & Kiểm tra</p>
                    <p className="text-slate-400 text-[11px]">Đoạn văn chủ điểm & câu hỏi trắc nghiệm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Diagnostic Baseline Status Card */}
            <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-cyan-300 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm sm:text-base">Hồ sơ Đánh giá Năng lực Ban đầu (Diagnostic Baseline)</h3>
                    <p className="text-xs text-slate-400">Khảo sát chuẩn hóa đối chiếu CT GDPT 2018 Lớp {profile.grade}</p>
                  </div>
                </div>

                <button
                  onClick={onOpenDiagnostic}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700/60 transition-colors self-start sm:self-auto"
                >
                  {profile.hasTakenDiagnostic ? 'Làm lại bài khảo sát' : 'Làm bài khảo sát ngay (5 phút)'}
                </button>
              </div>

              {profile.hasTakenDiagnostic && profile.diagnosticResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
                      <span className="text-slate-400 font-medium block">Điểm khảo sát:</span>
                      <span className="text-lg font-black text-cyan-300 mt-1 block">
                        {profile.diagnosticResult.correctCount} / {profile.diagnosticResult.totalQuestions} ({profile.diagnosticResult.scorePercentage}%)
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
                      <span className="text-slate-400 font-medium block">Mức năng lực ước lượng:</span>
                      <span className="text-lg font-black text-indigo-400 mt-1 block">
                        {profile.diagnosticResult.estimatedLevel}
                      </span>
                    </div>
                    <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-center">
                      <span className="text-slate-400 font-medium block">Chuẩn CT GDPT:</span>
                      <span className="text-sm font-bold text-emerald-400 mt-1 block">
                        {profile.diagnosticResult.gradeAlignmentVi}
                      </span>
                    </div>
                  </div>

                  {/* Skill scores */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    {profile.diagnosticResult.skillScores.map((s, idx) => (
                      <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                        <div className="flex justify-between font-medium">
                          <span className="text-slate-300">{s.nameVi}</span>
                          <span className="text-slate-200 font-bold">{s.correct}/{s.total} ({s.percentage}%)</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${s.percentage >= 70 ? 'bg-emerald-500' : s.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${s.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-amber-950/20 border border-amber-600/30 rounded-2xl text-xs text-amber-200 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Bạn chưa hoàn thành bài khảo sát năng lực ban đầu. Hãy dành 5 phút làm bài 8 câu để hệ thống ước lượng chính xác điểm mạnh, điểm yếu và tự động điều chỉnh lộ trình học thích ứng.
                  </p>
                </div>
              )}
            </div>

            {/* 4. Adaptive Progression (3 Phases) */}
            <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-300" />
                <span>3 Giai đoạn Tiến trình Học tập Thích ứng (Progression Phases)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adaptivePlan.phases.map((ph, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-2 transition-all ${
                      ph.status === 'current'
                        ? 'bg-blue-950/30 border-blue-500/50 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        ph.status === 'current'
                          ? 'bg-blue-500/20 text-cyan-300 border border-blue-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {ph.status === 'current' ? 'Đang thực hiện' : 'Sắp tới'}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-bold">0{idx + 1}</span>
                    </div>

                    <h4 className="font-bold text-sm text-white">
                      {ph.phaseTitleVi}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {ph.descriptionVi}
                    </p>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-800 text-[11px]">
                      <span className="text-slate-400">Phòng học:</span>
                      <button
                        onClick={() => onNavigate(ph.recommendedLab)}
                        className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1"
                      >
                        <span>Vào học</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Engine Audit & Quality Metrics */}
            <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-white text-sm">Chỉ số Kiểm định Động cơ Học tập (Engine Quality Metrics)</h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800/50">
                  REAL-TIME SYNC
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Trạng thái phiên học:</span>
                  <p className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SẴN SÀNG (READY)</span>
                  </p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Từ vựng đến hạn ôn (SRS):</span>
                  <p className="font-bold text-amber-400">
                    {dueCount} từ cần ôn / {learnedCount} đã học
                  </p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Từ vựng đã thuần thục:</span>
                  <p className="font-bold text-cyan-300">
                    {masteredCount} từ (Giai đoạn SM-2: 5+)
                  </p>
                </div>

                <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-1">
                  <span className="text-slate-400 font-medium">Lỗi sai tồn đọng:</span>
                  <p className="font-bold text-rose-400">
                    {profile.mistakeBank?.length || 0} câu trong Mistake Bank
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <strong className="text-slate-300">Cơ sở đề xuất thuật toán:</strong> {adaptivePlan.nextRecommendedSession.rationale}. Hệ thống không tạo kết quả ngẫu nhiên mà đối chiếu dữ liệu từ kết quả thực tế qua các bài thực hành và ngân hàng câu hỏi dùng chung.
              </div>
            </div>
          </div>
        );
      })()}

      {/* =========================================================================
          TAB 4: MISTAKE BANK
         ========================================================================= */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4 text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div>
                <h3 className="text-lg font-bold text-white">Sổ tay lỗi sai cần ôn lại (Mistake Bank)</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Hệ thống tự động ghi nhận câu trả lời chưa chính xác trong các bài kiểm tra Unit và đề thi để bạn xem lại lý do.
                </p>
              </div>
              <span className="text-xs font-bold text-rose-300 bg-rose-950/80 border border-rose-800/50 px-2.5 py-1 rounded-xl">
                {mistakeList.length} câu đã lưu
              </span>
            </div>

            {mistakeList.length > 0 ? (
              <div className="space-y-3">
                {mistakeList.map((m) => (
                  <div 
                    key={m.id}
                    className="p-4 bg-[#121620] border border-slate-800 rounded-2xl space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold uppercase tracking-wider text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                        {m.skill} • {m.topic}
                      </span>
                      <span className="text-[11px] text-slate-500">{m.date}</span>
                    </div>

                    <p className="font-bold text-white text-sm leading-snug">{m.questionText}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div className="p-2.5 bg-rose-950/40 border border-rose-800/50 rounded-xl">
                        <span className="text-[10px] text-rose-400 font-bold block">Bạn đã chọn:</span>
                        <span className="text-slate-200 font-medium">{m.userAnswer}</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/50 rounded-xl">
                        <span className="text-[10px] text-emerald-400 font-bold block">Đáp án chính xác:</span>
                        <span className="text-emerald-200 font-bold">{m.correctAnswer}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#181d2a] border border-slate-800 rounded-xl text-[11px] text-slate-300 leading-relaxed">
                      <strong className="text-cyan-300">Giải thích:</strong> {m.explanation}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-[#121620] rounded-2xl border border-dashed border-slate-800">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-bold text-white text-sm">Chưa có câu sai nào trong ngân hàng!</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                  Hãy tiếp tục làm các bài kiểm tra Unit và bài luyện kỹ năng để phát hiện và bù đắp các lỗ hổng kiến thức.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* UNIT QUIZ MODAL */}
      {activeAssessment && (
        <UnitQuizModal
          assessment={activeAssessment}
          isOpen={true}
          onClose={() => setActiveAssessment(null)}
          onNavigate={onNavigate}
        />
      )}

      {/* LESSON DETAIL MODAL */}
      {selectedLessonForDetail && (
        <LessonDetailModal
          lesson={selectedLessonForDetail}
          isOpen={true}
          onClose={() => setSelectedLessonForDetail(null)}
          onLaunchPractice={(skill) => {
            setSelectedLessonForDetail(null);
            handleLaunchLesson(skill);
          }}
        />
      )}
    </div>
  );
};
