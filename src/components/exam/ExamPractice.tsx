import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Database,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { DIAGNOSTIC_TEST } from '../../data/curriculumData';
import { Question, Grade } from '../../types';
import { StorageService } from '../../services/storage';
import { QuestionBankService } from '../../services/questionBankService';

interface ExamPracticeProps {
  currentGrade: Grade;
}

type ExamSetType = 'thpt_matrix' | 'unit_1' | 'unit_2';

export const ExamPractice: React.FC<ExamPracticeProps> = ({ currentGrade }) => {
  const [activeSet, setActiveSet] = useState<ExamSetType>('thpt_matrix');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 mins
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Load questions based on active set from Shared Question Bank
  const questions: Question[] = React.useMemo(() => {
    if (activeSet === 'unit_1') {
      const u1Questions = QuestionBankService.getQuestionsForUnit('u-g10-1');
      return u1Questions
        .filter(q => q.options && q.correctIndex !== undefined)
        .map(q => ({
          id: q.questionId,
          prompt: q.prompt,
          options: q.options || [],
          correctIndex: q.correctIndex || 0,
          explanationVi: q.explanationVi,
          skill: q.skill,
          grade: q.grade,
          category: `Unit 1: ${q.knowledgePoint}`
        }));
    } else if (activeSet === 'unit_2') {
      const u2Questions = QuestionBankService.getQuestionsForUnit('u-g10-2');
      return u2Questions
        .filter(q => q.options && q.correctIndex !== undefined)
        .map(q => ({
          id: q.questionId,
          prompt: q.prompt,
          options: q.options || [],
          correctIndex: q.correctIndex || 0,
          explanationVi: q.explanationVi,
          skill: q.skill,
          grade: q.grade,
          category: `Unit 2: ${q.knowledgePoint}`
        }));
    }
    return DIAGNOSTIC_TEST;
  }, [activeSet]);

  const handleSwitchSet = (setType: ExamSetType) => {
    setActiveSet(setType);
    setSelectedAnswers({});
    setSecondsLeft(15 * 60);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setScore(null);
  };

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && !isSubmitted) {
      handleSubmitExam();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft, isSubmitted]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitExam = () => {
    setIsTimerRunning(false);
    let correct = 0;
    questions.forEach((q) => {
      const choice = selectedAnswers[q.id];
      if (choice === q.correctIndex) {
        correct++;
      } else {
        StorageService.recordMistake({
          skill: q.skill,
          topic: q.category || 'THPT Exam Practice',
          questionText: q.prompt,
          userAnswer: choice !== undefined ? q.options[choice] : 'Chưa làm',
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanationVi
        });
      }
    });

    const scaledScore = Math.round((correct / questions.length) * 100);
    setScore(scaledScore);
    setIsSubmitted(true);
    StorageService.logStudyMinutes(15);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSecondsLeft(15 * 60);
    setIsTimerRunning(true);
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400">
              <GraduationCap className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Luyện thi Tốt nghiệp THPT & Đánh giá Năng lực
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Đề ôn luyện tổng hợp theo ma trận Bộ Giáo dục & Đào tạo và Ngân hàng câu hỏi dùng chung (Shared Question Bank).
          </p>
        </div>

        {/* Live Timer Clock */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-mono font-bold text-sm shadow-xs self-start sm:self-auto ${
          secondsLeft < 180 ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse' : 'bg-[#161a23] border-slate-800 text-slate-200'
        }`}>
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Thời gian còn: {formatTime(secondsLeft)}</span>
        </div>
      </div>

      {/* Exam Set Switcher (Connected with Question Bank) */}
      <div className="flex flex-wrap items-center gap-2 p-1 bg-[#121620] rounded-2xl border border-slate-800">
        <button
          onClick={() => handleSwitchSet('thpt_matrix')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSet === 'thpt_matrix'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Đề THPT Tổng hợp (Ma trận Quốc Gia)</span>
        </button>

        <button
          onClick={() => handleSwitchSet('unit_1')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSet === 'unit_1'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Đề Unit 1: Family Life (Ngân hàng câu hỏi)</span>
        </button>

        <button
          onClick={() => handleSwitchSet('unit_2')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
            activeSet === 'unit_2'
              ? 'bg-[#3B82F6] text-white shadow-md shadow-blue-500/20'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Đề Unit 2: Humans & Environment (Ngân hàng câu hỏi)</span>
        </button>
      </div>

      {/* Main Exam Card */}
      <div className="bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 text-slate-100">
        {/* Score banner if submitted */}
        {isSubmitted && score !== null && (
          <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                Kết quả bài thi thử
              </span>
              <h3 className="text-2xl font-bold mt-1 text-white">
                Điểm quy đổi: {(score / 10).toFixed(1)} / 10.0
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Đã hoàn thành đúng {Math.round((score / 100) * questions.length)} / {questions.length} câu. Các câu sai đã được tự động lưu vào Sổ tay lỗi sai.
              </p>
            </div>

            <div className="text-center p-3 bg-white/10 rounded-2xl border border-white/15">
              <span className="text-3xl font-extrabold text-cyan-300">{score}%</span>
              <span className="text-xs text-slate-300 block">Độ chính xác</span>
            </div>
          </div>
        )}

        {/* Question List */}
        <div className="space-y-6">
          {questions.map((q, qIndex) => {
            const userChoice = selectedAnswers[q.id];
            return (
              <div 
                key={q.id} 
                className="p-5 sm:p-6 bg-[#121620] border border-slate-800 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-blue-400 bg-blue-950/70 border border-blue-800/50 px-2 py-0.5 rounded-md">
                    Câu {qIndex + 1} • {q.category || 'THPT'}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">ID: {q.id}</span>
                </div>

                <p className="font-bold text-white text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                  {q.prompt}
                </p>

                {/* 4 Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = userChoice === optIndex;
                    let buttonClass = 'bg-[#181d2a] border-slate-800 text-slate-300 hover:bg-[#202738]';

                    if (isSubmitted) {
                      if (optIndex === q.correctIndex) {
                        buttonClass = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                      } else if (isSelected && optIndex !== q.correctIndex) {
                        buttonClass = 'bg-rose-950 border-rose-500 text-rose-200';
                      }
                    } else if (isSelected) {
                      buttonClass = 'bg-blue-950 border-blue-500 text-blue-200 font-bold';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectOption(q.id, optIndex)}
                        disabled={isSubmitted}
                        className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${buttonClass}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {String.fromCharCode(65 + optIndex)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isSubmitted && optIndex === q.correctIndex && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isSubmitted && isSelected && optIndex !== q.correctIndex && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation after submission */}
                {isSubmitted && (
                  <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-1 text-xs text-slate-300 animate-in fade-in">
                    <span className="font-bold text-cyan-300 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Giải thích chi tiết:</span>
                    </span>
                    <p className="leading-relaxed">{q.explanationVi}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit / Retry Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 font-medium">
            Đã làm: <strong className="text-white">{Object.keys(selectedAnswers).length}</strong> / {questions.length} câu
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {isSubmitted ? (
              <button
                onClick={handleRetry}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại đề thi</span>
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#3B82F6] hover:bg-blue-600 text-white font-extrabold rounded-xl text-xs transition-colors shadow-md shadow-blue-500/20"
              >
                <span>Nộp bài thi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
