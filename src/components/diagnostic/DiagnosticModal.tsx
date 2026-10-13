import React, { useState, useEffect } from 'react';
import { 
  Target, 
  X, 
  CheckCircle2, 
  Award, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Volume2,
  AlertCircle,
  HelpCircle,
  SkipForward,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { Grade } from '../../types';
import { SharedQuestion } from '../../types/questionBank';
import { DiagnosticResult } from '../../types/session';
import { LearningEngineService } from '../../services/learningEngineService';
import { StorageService } from '../../services/storage';
import { SpeechService } from '../../services/speechService';

interface DiagnosticModalProps {
  isOpen: boolean;
  grade: Grade;
  onClose: () => void;
  onCompleted: (result: DiagnosticResult) => void;
  onStartSession?: () => void;
}

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  grade,
  onClose,
  onCompleted,
  onStartSession
}) => {
  const [questions, setQuestions] = useState<SharedQuestion[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | string>>({});
  const [textInput, setTextInput] = useState('');
  const [diagnosticResult, setDiagnosticResult] = useState<DiagnosticResult | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const qs = LearningEngineService.getDiagnosticQuestions(grade);
      setQuestions(qs);
      setCurrentStep(0);
      setSelectedAnswers({});
      setTextInput('');
      setDiagnosticResult(null);
    }
  }, [isOpen, grade]);

  if (!isOpen) return null;

  const currentQ: SharedQuestion | undefined = questions[currentStep];

  const handleSelectOption = (optIndex: number) => {
    if (!currentQ) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.questionId]: optIndex }));
  };

  const handleTextInputChange = (text: string) => {
    setTextInput(text);
    if (!currentQ) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.questionId]: text }));
  };

  const handlePlayAudio = () => {
    if (!currentQ) return;
    const textToSpeak = currentQ.contextText || currentQ.prompt;
    setIsPlayingAudio(true);
    SpeechService.speakText(textToSpeak, 0.9, () => {
      setIsPlayingAudio(false);
    });
  };

  const handleSkip = () => {
    // If skipped, provide default baseline
    const fallbackResult = LearningEngineService.evaluateDiagnostic({}, questions, grade);
    const updatedProfile = StorageService.saveDiagnosticResult(fallbackResult);
    const plan = LearningEngineService.generateAdaptiveStudyPlan(updatedProfile);
    StorageService.saveActivePlan(plan);
    onClose();
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTextInput('');
    } else {
      // Complete diagnostic
      const result = LearningEngineService.evaluateDiagnostic(selectedAnswers, questions, grade);
      const updatedProfile = StorageService.saveDiagnosticResult(result);
      const plan = LearningEngineService.generateAdaptiveStudyPlan(updatedProfile);
      StorageService.saveActivePlan(plan);
      setDiagnosticResult(result);
      onCompleted(result);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#121620] rounded-3xl w-full max-w-2xl border border-slate-800 shadow-2xl overflow-hidden text-slate-100 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-blue-900/90 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/30 flex items-center justify-center border border-blue-500/30 shadow-xs">
              <Target className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">Đánh giá Năng lực Ban đầu (Lớp {grade})</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                  GDPT 2018
                </span>
              </div>
              <p className="text-xs text-slate-300">Khảo sát 8 câu ngắn (4 kỹ năng & từ vựng - ngữ pháp)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!diagnosticResult && (
              <button
                onClick={handleSkip}
                className="text-xs text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/60 hover:bg-slate-800 transition-colors flex items-center gap-1"
                title="Bỏ qua bài khảo sát và bắt đầu học ngay"
              >
                <SkipForward className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Bỏ qua</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {!diagnosticResult ? (
            <>
              {/* Progress & Skill tags */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-200">Câu {currentStep + 1} / {questions.length}</span>
                    {currentQ && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 uppercase tracking-wider border border-indigo-500/30">
                        {currentQ.skill} • {currentQ.topic}
                      </span>
                    )}
                  </div>
                  <span>{Math.round(((currentStep + 1) / (questions.length || 1)) * 100)}% hoàn thành</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / (questions.length || 1)) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Content */}
              {currentQ && (
                <div className="space-y-4">
                  {/* Context excerpt if available (e.g. listening audio or reading sentence) */}
                  {currentQ.contextText && (
                    <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                          {currentQ.skill === 'listening' ? '🎧 Audio Hội thoại' : '📖 Đoạn văn Ngữ cảnh'}
                        </span>
                        {currentQ.skill === 'listening' && (
                          <button
                            onClick={handlePlayAudio}
                            disabled={isPlayingAudio}
                            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-bold px-3 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 transition-colors"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isPlayingAudio ? 'Đang phát...' : 'Nghe Audio'}</span>
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed font-serif italic">
                        "{currentQ.contextText}"
                      </p>
                    </div>
                  )}

                  {/* Prompt Card */}
                  <div className="p-4 bg-[#181d29] rounded-2xl border border-slate-800">
                    <p className="font-bold text-white text-sm sm:text-base whitespace-pre-line leading-relaxed">
                      {currentQ.prompt}
                    </p>
                  </div>

                  {/* Options (Multiple choice or text input) */}
                  {currentQ.options && currentQ.options.length > 0 ? (
                    <div className="space-y-2.5">
                      {currentQ.options.map((opt, idx) => {
                        const isSelected = selectedAnswers[currentQ.questionId] === idx;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSelectOption(idx)}
                            className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center gap-3.5 ${
                              isSelected
                                ? 'bg-indigo-600/25 border-indigo-500 text-white font-bold shadow-md shadow-indigo-500/10'
                                : 'bg-slate-900/70 hover:bg-slate-850 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-indigo-500 text-white'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs text-slate-400 font-medium">Nhập câu trả lời của bạn:</label>
                      <input
                        type="text"
                        value={textInput}
                        onChange={(e) => handleTextInputChange(e.target.value)}
                        placeholder="Nhập từ hoặc cụm từ phù hợp..."
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  📌 Kết quả sẽ được đối chiếu với chuẩn CT GDPT 2018 Lớp {grade}.
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentQ && selectedAnswers[currentQ.questionId] === undefined}
                  className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 ml-auto"
                >
                  <span>{currentStep === questions.length - 1 ? 'Hoàn thành khảo sát' : 'Câu tiếp theo'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* Results View */
            <div className="space-y-6 py-2">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-xl">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Hoàn thành Đánh giá Năng lực Ban đầu!
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Hệ thống đã phân tích độ chính xác theo 4 kỹ năng và thiết lập lộ trình thích ứng cá nhân hóa cho bạn.
                </p>
              </div>

              {/* Baseline Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">Điểm khảo sát:</span>
                  <p className="text-2xl font-black text-cyan-400">
                    {diagnosticResult.correctCount} / {diagnosticResult.totalQuestions}
                  </p>
                  <span className="text-[10px] text-slate-400">Độ chính xác {diagnosticResult.scorePercentage}%</span>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">Ước lượng định hướng:</span>
                  <p className="text-2xl font-black text-indigo-400">
                    {diagnosticResult.estimatedLevel}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">{diagnosticResult.gradeAlignmentVi}</span>
                </div>

                <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-center space-y-1">
                  <span className="text-[11px] text-slate-400 font-medium">Khung chương trình:</span>
                  <p className="text-2xl font-black text-emerald-400">
                    Lớp {grade}
                  </p>
                  <span className="text-[10px] text-slate-400">CT GDPT 2018</span>
                </div>
              </div>

              {/* Pedagogical disclaimer notice */}
              <div className="p-3.5 bg-blue-950/40 border border-blue-600/30 rounded-2xl flex items-start gap-3 text-xs text-blue-200">
                <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Lưu ý sư phạm:</strong> Kết quả trên là bài khảo sát định hướng cá nhân hóa ban đầu để đề xuất bài học phù hợp nhất, <em>không phải kỳ thi chứng chỉ CEFR chính thức hay điểm số học bạ</em>. Trình độ của bạn sẽ liên tục được cập nhật theo kết quả thực tế qua từng bài luyện.
                </p>
              </div>

              {/* Skill Breakdown */}
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  <span>Chi tiết Năng lực theo Phân môn</span>
                </h4>
                <div className="space-y-2.5">
                  {diagnosticResult.skillScores.map((s, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-300">{s.nameVi}</span>
                        <span className="font-bold text-slate-200">{s.correct}/{s.total} ({s.percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            s.percentage >= 70 ? 'bg-emerald-500' : s.percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${s.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Focus Areas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-emerald-950/30 border border-emerald-500/30 rounded-2xl space-y-1.5">
                  <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Thế mạnh nổi bật:</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {diagnosticResult.strengths.map((str, i) => (
                      <li key={i}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 bg-amber-950/30 border border-amber-500/30 rounded-2xl space-y-1.5">
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    <span>Ưu tiên cần củng cố:</span>
                  </span>
                  <ul className="space-y-1 text-slate-300 list-disc list-inside">
                    {diagnosticResult.weaknesses.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    if (onStartSession) {
                      onStartSession();
                    }
                  }}
                  className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Kích hoạt Lộ trình & Bắt đầu buổi học đầu tiên</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl text-xs sm:text-sm transition-all"
                >
                  Về Bảng điều khiển
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
