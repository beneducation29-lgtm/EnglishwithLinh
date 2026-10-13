import React, { useState, useEffect } from 'react';
import { 
  X, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  BookOpen,
  Volume2,
  Award,
  ArrowRight,
  TrendingUp,
  Flame,
  Check,
  Brain
} from 'lucide-react';
import { StudentProfile, Skill } from '../../types';
import { LearningSession, SessionActivity } from '../../types/session';
import { LearningEngineService } from '../../services/learningEngineService';
import { SpeechService } from '../../services/speechService';
import { SHARED_QUESTION_BANK } from '../../data/questionBankData';
import { SharedQuestion } from '../../types/questionBank';

interface GuidedSessionModalProps {
  isOpen: boolean;
  profile: StudentProfile;
  onClose: () => void;
  onSessionCompleted: (session: LearningSession, updatedProfile: StudentProfile) => void;
  onNavigateToLab: (tab: string) => void;
}

export const GuidedSessionModal: React.FC<GuidedSessionModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSessionCompleted,
  onNavigateToLab
}) => {
  const [session, setSession] = useState<LearningSession | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedSummary, setCompletedSummary] = useState<{
    session: LearningSession;
    updatedProfile: StudentProfile;
  } | null>(null);

  // Initialize session upon open
  useEffect(() => {
    if (isOpen) {
      const newSession = LearningEngineService.createGuidedSession(profile);
      setSession(newSession);
      setCurrentStepIndex(0);
      setUserAnswers({});
      setSubmittedQuestions({});
      setElapsedSeconds(0);
      setCompletedSummary(null);
    }
  }, [isOpen, profile.grade]);

  // Session elapsed timer
  useEffect(() => {
    if (!isOpen || completedSummary) return;
    const interval = setInterval(() => {
      setElapsedSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, completedSummary]);

  if (!isOpen || !session) return null;

  const currentActivity: SessionActivity | undefined = session.activitySequence[currentStepIndex];
  const totalSteps = session.activitySequence.length;

  // Retrieve full questions for practice step
  const practiceQuestions: SharedQuestion[] = (currentActivity?.contentPayload.questionIds || [])
    .map(qid => SHARED_QUESTION_BANK.find(q => q.questionId === qid))
    .filter((q): q is SharedQuestion => !!q);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSpeak = (text: string) => {
    setIsPlayingAudio(true);
    SpeechService.speakText(text, 0.9, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (submittedQuestions[qId]) return; // locked once checked
    setUserAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleCheckQuestion = (qId: string) => {
    setSubmittedQuestions(prev => ({ ...prev, [qId]: true }));
  };

  const handleNextActivity = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Complete entire session
      const timeSpentMinutes = Math.max(1, Math.round(elapsedSeconds / 60));
      const res = LearningEngineService.completeSession(session, userAnswers, timeSpentMinutes);
      setCompletedSummary(res);
      onSessionCompleted(res.session, res.updatedProfile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#121620] rounded-3xl w-full max-w-2xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30">
              <Brain className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  Phiên học Thích ứng Lớp {session.grade}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatTimer(elapsedSeconds)}
                </span>
              </div>
              <h3 className="font-extrabold text-sm sm:text-base text-white mt-0.5">
                {session.learningObjective}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Pills */}
        <div className="px-5 py-3 bg-[#161a24] border-b border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          {session.activitySequence.map((act, idx) => {
            const isCompleted = idx < currentStepIndex || !!completedSummary;
            const isCurrent = idx === currentStepIndex && !completedSummary;
            return (
              <div
                key={act.id}
                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all shrink-0 ${
                  isCurrent
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : isCompleted
                    ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-850 text-slate-500'
                }`}
              >
                <span>{idx + 1}.</span>
                <span className="hidden sm:inline">
                  {act.type === 'warmup_vocab' ? 'Khởi động' :
                   act.type === 'core_lesson' ? 'Trọng tâm' :
                   act.type === 'practice_questions' ? 'Luyện tập' : 'Kiểm tra'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {!completedSummary ? (
            currentActivity && (
              <div className="space-y-6">
                {/* Activity Title Banner */}
                <div>
                  <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>{currentActivity.title}</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentActivity.descriptionVi}
                  </p>
                </div>

                {/* 1. WARM-UP VOCAB ACTIVITY */}
                {currentActivity.type === 'warmup_vocab' && (
                  <div className="space-y-3">
                    {currentActivity.contentPayload.vocabItems?.map((v, i) => (
                      <div
                        key={i}
                        className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-extrabold text-amber-300">{v.word}</span>
                            <span className="text-xs text-slate-400 font-mono">{v.ipa}</span>
                          </div>
                          <button
                            onClick={() => handleSpeak(v.word)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            title="Nghe phát âm chuẩn"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-300 font-medium">
                          <strong>Nghĩa tiếng Việt:</strong> {v.meaningVi}
                        </p>
                        <p className="text-xs text-slate-400 italic font-serif">
                          "{v.exampleEn}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. CORE LESSON ACTIVITY */}
                {currentActivity.type === 'core_lesson' && (
                  <div className="space-y-4">
                    {currentActivity.contentPayload.grammarFormula && (
                      <div className="p-4 bg-indigo-950/40 rounded-2xl border border-indigo-500/30 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                          Công thức & Cấu trúc ngữ pháp
                        </span>
                        <div className="p-3 bg-black/40 rounded-xl font-mono text-sm text-cyan-300 font-bold">
                          {currentActivity.contentPayload.grammarFormula}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {currentActivity.contentPayload.grammarRuleVi}
                        </p>
                      </div>
                    )}

                    {currentActivity.contentPayload.readingPassage && (
                      <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-300">
                            {currentActivity.contentPayload.readingPassage.title}
                          </span>
                          <button
                            onClick={() => handleSpeak(currentActivity.contentPayload.readingPassage?.text || '')}
                            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold px-2.5 py-1 rounded-lg bg-cyan-950/50 border border-cyan-500/30"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Đọc mẫu</span>
                          </button>
                        </div>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {currentActivity.contentPayload.readingPassage.text}
                        </p>
                        {currentActivity.contentPayload.readingPassage.viTranslation && (
                          <p className="text-xs text-slate-400 italic pt-2 border-t border-slate-800">
                            Dịch: {currentActivity.contentPayload.readingPassage.viTranslation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 3 & 4. PRACTICE & CHECK QUESTIONS */}
                {(currentActivity.type === 'practice_questions' || currentActivity.type === 'check_understanding') && (
                  <div className="space-y-5">
                    {practiceQuestions.map((q, idx) => {
                      const selected = userAnswers[q.questionId];
                      const isChecked = submittedQuestions[q.questionId];
                      const isCorrect = isChecked && selected === q.correctIndex;

                      return (
                        <div
                          key={q.questionId}
                          className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-indigo-400">
                              Câu hỏi {idx + 1} • {q.skill.toUpperCase()}
                            </span>
                            {isChecked && (
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                                isCorrect
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-rose-950 text-rose-400 border border-rose-500/40'
                              }`}>
                                {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
                                {isCorrect ? 'Chính xác' : 'Chưa đúng'}
                              </span>
                            )}
                          </div>

                          <p className="text-sm font-bold text-white leading-relaxed">
                            {q.prompt}
                          </p>

                          {/* Options */}
                          <div className="space-y-2">
                            {q.options?.map((opt, optIdx) => {
                              const isThisSelected = selected === optIdx;
                              const isThisCorrect = isChecked && optIdx === q.correctIndex;
                              const isThisWrong = isChecked && isThisSelected && optIdx !== q.correctIndex;

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectAnswer(q.questionId, optIdx)}
                                  disabled={isChecked}
                                  className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                                    isThisCorrect
                                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold'
                                      : isThisWrong
                                      ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                                      : isThisSelected
                                      ? 'bg-indigo-600/30 border-indigo-500 text-white font-bold'
                                      : 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-2.5">
                                    <span className="w-5 h-5 rounded-md bg-slate-800 text-[11px] font-bold flex items-center justify-center shrink-0">
                                      {String.fromCharCode(65 + optIdx)}
                                    </span>
                                    <span>{opt}</span>
                                  </div>
                                  {isThisCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                                </button>
                              );
                            })}
                          </div>

                          {/* Check Button or Explanation */}
                          {!isChecked ? (
                            <button
                              onClick={() => handleCheckQuestion(q.questionId)}
                              disabled={selected === undefined}
                              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-colors mt-2"
                            >
                              Kiểm tra đáp án
                            </button>
                          ) : (
                            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1 animate-in fade-in">
                              <span className="font-bold text-slate-300 block">💡 Giải thích chi tiết:</span>
                              <p className="text-slate-400 leading-relaxed">{q.explanationVi}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Footer Next Activity Button */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">
                    Bước {currentStepIndex + 1} trên {totalSteps}
                  </span>
                  <button
                    onClick={handleNextActivity}
                    className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
                  >
                    <span>{currentStepIndex === totalSteps - 1 ? 'Hoàn thành phiên học' : 'Chuyển hoạt động tiếp'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          ) : (
            /* COMPLETED SUMMARY SCREEN */
            <div className="space-y-6 py-2 animate-in fade-in">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Tuyệt vời! Bạn đã hoàn thành phiên học hôm nay!
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  {completedSummary.session.results?.summaryFeedback}
                </p>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">Thời gian học:</span>
                  <p className="text-2xl font-black text-cyan-400 flex items-center justify-center gap-1">
                    <Clock className="w-5 h-5" />
                    <span>+{Math.max(1, Math.round(elapsedSeconds / 60))} phút</span>
                  </p>
                  <span className="text-[10px] text-slate-400">Đã cộng vào tiến độ hôm nay</span>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">Độ chính xác:</span>
                  <p className="text-2xl font-black text-indigo-400">
                    {completedSummary.session.results?.scorePercentage}%
                  </p>
                  <span className="text-[10px] text-slate-400">Bài tập vận dụng</span>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">Chuỗi học tập:</span>
                  <p className="text-2xl font-black text-amber-400 flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5" />
                    <span>{profile.streakDays} ngày</span>
                  </p>
                  <span className="text-[10px] text-slate-400">Giữ vững phong độ 🔥</span>
                </div>
              </div>

              {/* Strengths & Next Step Suggestion */}
              <div className="space-y-3">
                {completedSummary.session.results?.strengths && completedSummary.session.results.strengths.length > 0 && (
                  <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl text-xs space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Điểm đã làm tốt:</span>
                    </span>
                    <ul className="text-slate-300 list-disc list-inside">
                      {completedSummary.session.results.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {completedSummary.session.results?.missedQuestionIds && completedSummary.session.results.missedQuestionIds.length > 0 && (
                  <div className="p-3.5 bg-rose-950/30 border border-rose-500/30 rounded-2xl text-xs space-y-1">
                    <span className="font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Đã lưu vào Sổ tay lỗi sai ({completedSummary.session.results.missedQuestionIds.length} câu):</span>
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      Các câu trả lời chưa đúng đã được tự động lưu vào Mistake Bank để bạn xem lại và luyện tập lại bất cứ lúc nào.
                    </p>
                  </div>
                )}

                {/* Next Recommended Step Card */}
                <div className="p-4 bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4" />
                      <span>Bước tiếp theo được hệ thống đề xuất:</span>
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300">
                      Thích ứng
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white">
                    {completedSummary.session.results?.nextRecommendedTitle}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Tiếp tục học để hoàn thành mục tiêu ngày và nâng cao năng lực toàn diện theo CT GDPT 2018.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    const tab = completedSummary.session.results?.nextRecommendedTab || 'vocabulary';
                    onClose();
                    onNavigateToLab(tab);
                  }}
                  className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2"
                >
                  <span>Chuyển sang bước tiếp theo ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs sm:text-sm transition-all"
                >
                  Đóng & Về Bảng điều khiển
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
