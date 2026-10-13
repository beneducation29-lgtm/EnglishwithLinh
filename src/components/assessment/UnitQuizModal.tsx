import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  Send
} from 'lucide-react';
import { SharedQuestion, UnitAssessment } from '../../types/questionBank';
import { QuestionBankService } from '../../services/questionBankService';
import { StorageService } from '../../services/storage';

interface UnitQuizModalProps {
  assessment: UnitAssessment;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string) => void;
}

export const UnitQuizModal: React.FC<UnitQuizModalProps> = ({
  assessment,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [questions, setQuestions] = useState<SharedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, any>>({});
  const [matchingSelections, setMatchingSelections] = useState<Record<string, Record<string, string>>>({});
  const [secondsLeft, setSecondsLeft] = useState(assessment.timeLimitMinutes * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState<number | null>(null);
  const [skillBreakdown, setSkillBreakdown] = useState<Record<string, { correct: number; total: number }>>({});

  useEffect(() => {
    if (isOpen) {
      const qList = QuestionBankService.getAssessmentQuestions(assessment);
      setQuestions(qList);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setMatchingSelections({});
      setSecondsLeft(assessment.timeLimitMinutes * 60);
      setIsSubmitted(false);
      setScorePercent(null);
    }
  }, [isOpen, assessment]);

  // Timer
  useEffect(() => {
    let timer: any = null;
    if (isOpen && !isSubmitted && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && !isSubmitted && questions.length > 0) {
      handleSubmit();
    }
    return () => clearInterval(timer);
  }, [isOpen, isSubmitted, secondsLeft, questions.length]);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.questionId]: optIndex }));
  };

  const handleFillBlankChange = (text: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.questionId]: text }));
  };

  const handleSubmit = () => {
    let earned = 0;
    const skillsMap: Record<string, { correct: number; total: number }> = {};

    questions.forEach(q => {
      if (!skillsMap[q.skill]) {
        skillsMap[q.skill] = { correct: 0, total: 0 };
      }
      skillsMap[q.skill].total++;

      let isCorrect = false;

      if (q.questionType === 'fill_blank') {
        const userText = (selectedAnswers[q.questionId] || '').trim().toLowerCase();
        const acceptable = (q.blankAnswers || []).map(a => a.toLowerCase().trim());
        if (acceptable.includes(userText)) {
          isCorrect = true;
        }
      } else if (q.correctIndex !== undefined) {
        if (selectedAnswers[q.questionId] === q.correctIndex) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        earned++;
        skillsMap[q.skill].correct++;
      } else {
        // Automatically save to Mistake Bank for review
        const chosen = selectedAnswers[q.questionId];
        let userAnswerText = 'Chưa làm';
        let correctAnswerText = '';

        if (q.options && chosen !== undefined && q.options[chosen]) {
          userAnswerText = q.options[chosen];
        } else if (typeof chosen === 'string') {
          userAnswerText = chosen;
        }

        if (q.options && q.correctIndex !== undefined) {
          correctAnswerText = q.options[q.correctIndex];
        } else if (q.blankAnswers) {
          correctAnswerText = q.blankAnswers.join(' / ');
        }

        StorageService.recordMistake({
          skill: q.skill,
          topic: `${assessment.titleVi} • ${q.knowledgePoint}`,
          questionText: q.prompt,
          userAnswer: userAnswerText,
          correctAnswer: correctAnswerText,
          explanation: q.explanationVi
        });
      }
    });

    const finalPercent = Math.round((earned / questions.length) * 100);
    setScorePercent(finalPercent);
    setSkillBreakdown(skillsMap);
    setIsSubmitted(true);

    // Record study time & mark unit completed
    StorageService.logStudyMinutes(Math.max(5, Math.round((assessment.timeLimitMinutes * 60 - secondsLeft) / 60)));
    StorageService.completeLesson(assessment.id, 'grammar', finalPercent);
  };

  const answeredCount = Object.keys(selectedAnswers).filter(k => selectedAnswers[k] !== undefined && selectedAnswers[k] !== '').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#121620] border border-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-slate-100">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-4 bg-[#161a23]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-950 text-blue-300 border border-blue-800/60">
                Unit Quiz • Lớp {assessment.grade}
              </span>
              <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>GDPT 2018 Verified</span>
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">
              {assessment.titleVi}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono font-bold text-xs border ${
                secondsLeft < 120 
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800/80 animate-pulse' 
                  : 'bg-slate-900 text-cyan-300 border-slate-800'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Navigator Pills */}
        <div className="px-4 py-2.5 bg-[#0e1219] border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
          {questions.map((q, idx) => {
            const isAnswered = selectedAnswers[q.questionId] !== undefined && selectedAnswers[q.questionId] !== '';
            const isCurrent = currentIndex === idx;
            let statusColor = 'bg-slate-800 text-slate-400';

            if (isSubmitted) {
              const isCorrect = selectedAnswers[q.questionId] === q.correctIndex || 
                (q.blankAnswers && (q.blankAnswers || []).map(a => a.toLowerCase().trim()).includes((selectedAnswers[q.questionId] || '').trim().toLowerCase()));
              statusColor = isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
            } else if (isAnswered) {
              statusColor = 'bg-blue-600 text-white';
            }

            return (
              <button
                key={q.questionId}
                onClick={() => setCurrentIndex(idx)}
                className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold transition-all ${statusColor} ${
                  isCurrent ? 'ring-2 ring-white scale-105' : ''
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Quiz Body */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {/* RESULTS VIEW IF SUBMITTED */}
          {isSubmitted && scorePercent !== null && (
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 border border-slate-800 rounded-3xl space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    Báo cáo kết quả kiểm tra
                  </span>
                  <h3 className="text-2xl font-black text-white mt-1">
                    {scorePercent >= assessment.passingScorePercent ? '🎉 Đạt yêu cầu xuất sắc!' : '⚠️ Cần củng cố thêm kiến thức'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Điểm số: <strong className="text-cyan-300 text-lg">{scorePercent}%</strong> (Chuẩn đạt: {assessment.passingScorePercent}%)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('progress');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
                  >
                    Xem Sổ tay lỗi sai
                  </button>
                </div>
              </div>

              {/* Skill breakdown chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
                {Object.entries(skillBreakdown).map(([skill, stat]) => (
                  <div key={skill} className="p-2.5 bg-black/30 rounded-xl border border-white/10">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400 block">
                      {skill}
                    </span>
                    <span className="font-extrabold text-white">
                      {stat.correct} / {stat.total} câu ({Math.round((stat.correct / stat.total) * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACTIVE QUESTION CONTAINER */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-blue-400 bg-blue-950/70 border border-blue-800/50 px-2.5 py-0.5 rounded-md uppercase">
                Câu {currentIndex + 1} / {questions.length} • {currentQ.skill} • {currentQ.knowledgePoint}
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                Độ khó: {currentQ.difficulty}
              </span>
            </div>

            {/* Context Box if available (Reading excerpt / Listening dialogue) */}
            {currentQ.contextText && (
              <div className="p-4 bg-[#161a23] rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed italic">
                <span className="font-bold text-amber-400 block not-italic mb-1 text-[11px] uppercase tracking-wider">
                  Ngữ cảnh bài làm:
                </span>
                {currentQ.contextText}
              </div>
            )}

            {/* Question Prompt */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.prompt}
            </h3>

            {/* OPTIONS AREA */}
            {currentQ.options && (
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQ.questionId] === oIdx;
                  let optStyle = 'bg-[#161a23] border-slate-800 text-slate-200 hover:bg-[#1a202d] hover:border-slate-700';

                  if (isSubmitted) {
                    if (oIdx === currentQ.correctIndex) {
                      optStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && oIdx !== currentQ.correctIndex) {
                      optStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-blue-950/80 border-blue-500 text-blue-100 font-bold';
                  }

                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-3.5 sm:p-4 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer text-xs sm:text-sm transition-all ${optStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isSubmitted && oIdx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* FILL IN BLANK INPUT */}
            {currentQ.questionType === 'fill_blank' && (
              <div className="pt-2">
                <label className="text-xs font-bold text-slate-400 block mb-1.5">
                  Nhập từ hoặc cụm từ chính xác:
                </label>
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={selectedAnswers[currentQ.questionId] || ''}
                  onChange={(e) => handleFillBlankChange(e.target.value)}
                  placeholder="Gõ đáp án của bạn..."
                  className="w-full px-4 py-3 bg-[#161a23] border border-slate-800 rounded-2xl text-sm text-white focus:outline-hidden focus:border-blue-500"
                />
              </div>
            )}

            {/* SHORT WRITING RUBRIC PROMPT */}
            {currentQ.questionType === 'short_writing' && (
              <div className="pt-2 space-y-3">
                <textarea
                  disabled={isSubmitted}
                  rows={4}
                  value={selectedAnswers[currentQ.questionId] || ''}
                  onChange={(e) => handleFillBlankChange(e.target.value)}
                  placeholder="Viết đoạn văn của bạn tại đây (100 - 120 từ)..."
                  className="w-full p-4 bg-[#161a23] border border-slate-800 rounded-2xl text-xs sm:text-sm text-white focus:outline-hidden focus:border-blue-500 leading-relaxed"
                />
                {currentQ.rubric && (
                  <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                    <span className="font-bold text-amber-400 block mb-1 uppercase tracking-wider">Tiêu chí chấm chuẩn (Rubric):</span>
                    <ul className="space-y-1">
                      {currentQ.rubric.map((r, i) => (
                        <li key={i}>• {r.criterion} ({r.maxScore}đ): {r.descriptionVi}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* EXPLANATION ACCORDION IF SUBMITTED */}
            {isSubmitted && (
              <div className="p-4 bg-[#161a23] border border-slate-800 rounded-2xl space-y-1.5 animate-in fade-in">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Giải thích chi tiết & Căn cứ kiến thức:</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentQ.explanationVi}
                </p>
                <span className="text-[10px] text-slate-500 font-mono block pt-1">
                  Nguồn: {currentQ.sourceReference}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 sm:p-5 border-t border-slate-800 flex items-center justify-between gap-3 bg-[#161a23]">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Câu trước</span>
          </button>

          <div className="text-xs text-slate-400">
            Đã làm: <strong className="text-white">{answeredCount}</strong> / {questions.length} câu
          </div>

          <div className="flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
              >
                <span>Câu sau</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : !isSubmitted ? (
              <button
                onClick={handleSubmit}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Nộp bài kiểm tra</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/25 transition-all"
              >
                <span>Hoàn tất & Đóng</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
