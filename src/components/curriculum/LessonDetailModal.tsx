import React from 'react';
import { 
  X, 
  BookOpen, 
  Target, 
  Award, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Headphones,
  Mic,
  PenTool,
  BookA,
  CheckCircle2,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { CurriculumLesson } from '../../types/curriculum';
import { Skill } from '../../types';

interface LessonDetailModalProps {
  lesson: CurriculumLesson | null;
  isOpen: boolean;
  onClose: () => void;
  onLaunchPractice: (skill: Skill, lessonId: string) => void;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  lesson,
  isOpen,
  onClose,
  onLaunchPractice,
}) => {
  if (!isOpen || !lesson) return null;

  const getSkillIcon = (skill: Skill) => {
    switch (skill) {
      case 'listening': return <Headphones className="w-5 h-5 text-blue-400" />;
      case 'speaking': return <Mic className="w-5 h-5 text-purple-400" />;
      case 'reading': return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'writing': return <PenTool className="w-5 h-5 text-amber-400" />;
      case 'vocabulary': return <BookA className="w-5 h-5 text-emerald-400" />;
      case 'grammar': return <CheckCircle2 className="w-5 h-5 text-indigo-400" />;
      default: return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  const getSkillLabel = (skill: Skill) => {
    switch (skill) {
      case 'listening': return 'Listening Lab (Luyện Nghe Audio)';
      case 'speaking': return 'Speaking Lab (Luyện Phát âm & Hội thoại)';
      case 'reading': return 'Reading Lab (Đọc hiểu & Từ vựng trong văn cảnh)';
      case 'writing': return 'Writing Lab (Luyện Viết & AI Nhận xét)';
      case 'vocabulary': return 'Vocabulary Lab (Flashcards & SRS Spaced Repetition)';
      case 'grammar': return 'Grammar Lab (Quy tắc & Bài tập Chuyên đề)';
      default: return skill;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#121620] border border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#161a23] border-b border-slate-800 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 mt-1">
              {getSkillIcon(lesson.skillFocus)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60">
                  Lớp {lesson.grade} • {lesson.curriculumVersion}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Trạng thái: {lesson.status}</span>
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mt-1">
                {lesson.titleVi}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                {lesson.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 CORE PEDAGOGICAL QUESTIONS (PROMPT 4 MANDATE) */}
        <div className="p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
          {/* Question 1: What knowledge will student learn? */}
          <div className="p-4 bg-[#161a23] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center text-[10px]">1</span>
              <span>Học sinh sẽ tiếp thu kiến thức gì? (Knowledge Objectives)</span>
            </div>
            <ul className="space-y-1.5 text-slate-300 pl-6 list-disc text-xs">
              {lesson.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Question 2: How will student practice? */}
          <div className="p-4 bg-[#161a23] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-800 flex items-center justify-center text-[10px]">2</span>
              <span>Học sinh sẽ thực hành như thế nào? (Learning Activity)</span>
            </div>
            <p className="text-xs text-slate-300 pl-6 leading-relaxed">
              Thực hành trực tiếp tại phòng lab <strong>{getSkillLabel(lesson.skillFocus)}</strong> với thời lượng chuẩn <strong>{lesson.estimatedMinutes} phút</strong>. 
              {lesson.vocabularyRefs.length > 0 && ` Củng cố các từ vựng trọng tâm: ${lesson.vocabularyRefs.join(', ')}.`}
              {lesson.grammarRefs.length > 0 && ` Ứng dụng điểm ngữ pháp: ${lesson.grammarRefs.join(', ')}.`}
            </p>
          </div>

          {/* Question 3: How is mastery assessed? */}
          <div className="p-4 bg-[#161a23] rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-[10px]">3</span>
              <span>Làm thế nào để xác định học sinh đã đạt mục tiêu? (Mastery Criteria)</span>
            </div>
            <p className="text-xs text-slate-300 pl-6 leading-relaxed">
              Học sinh hoàn thành bài thực hành với điểm số tối thiểu <strong>70%</strong>. Toàn bộ câu trả lời sai được tự động lưu vào <strong>Sổ tay lỗi sai (Mistake Bank)</strong> với giải thích chi tiết để học sinh ôn lại.
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-black/30 rounded-xl border border-slate-800 text-[11px]">
              <span className="text-slate-500 block">Thời lượng dự kiến:</span>
              <strong className="text-white text-xs">{lesson.estimatedMinutes} phút</strong>
            </div>

            <div className="p-3 bg-black/30 rounded-xl border border-slate-800 text-[11px]">
              <span className="text-slate-500 block">Độ khó bài học:</span>
              <strong className="text-cyan-300 text-xs">{lesson.difficulty}</strong>
            </div>

            <div className="p-3 bg-black/30 rounded-xl border border-slate-800 text-[11px] col-span-2 sm:col-span-1">
              <span className="text-slate-500 block">Điều kiện tiên quyết:</span>
              <strong className="text-slate-300 text-xs">
                {lesson.prerequisites.length > 0 ? lesson.prerequisites.join(', ') : 'Không có'}
              </strong>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-5 sm:p-6 bg-[#161a23] border-t border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            Đóng
          </button>

          <button
            onClick={() => {
              onClose();
              onLaunchPractice(lesson.skillFocus, lesson.id);
            }}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            <span>Bắt đầu bài thực hành</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
