import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle,
  RotateCcw,
  Award
} from 'lucide-react';
import { GRAMMAR_TOPICS } from '../../data/curriculumData';
import { GrammarTopic, Grade } from '../../types';
import { StorageService } from '../../services/storage';

interface GrammarLabProps {
  currentGrade: Grade;
}

export const GrammarLab: React.FC<GrammarLabProps> = ({ currentGrade }) => {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic>(
    GRAMMAR_TOPICS.find(g => g.grade === currentGrade) || GRAMMAR_TOPICS[0]
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  // Sync topic when canonical student grade changes
  React.useEffect(() => {
    const matching = GRAMMAR_TOPICS.find(g => g.grade === currentGrade);
    if (matching) {
      setSelectedTopic(matching);
      handleRetry();
    }
  }, [currentGrade]);

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    selectedTopic.practiceQuestions.forEach((q) => {
      const choice = selectedAnswers[q.id];
      if (choice === q.correctIndex) {
        correct++;
      } else {
        StorageService.recordMistake({
          skill: 'grammar',
          topic: selectedTopic.titleVi,
          questionText: q.prompt,
          userAnswer: choice !== undefined ? q.options[choice] : 'Chưa chọn',
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanationVi
        });
      }
    });

    const percent = Math.round((correct / selectedTopic.practiceQuestions.length) * 100);
    setScore(percent);
    setIsSubmitted(true);
    StorageService.logStudyMinutes(5);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-950/80 border border-indigo-800/40 text-indigo-400">
              <CheckCircle2 className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Grammar Lab</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Tổng hợp các chuyên đề ngữ pháp cốt lõi theo ma trận đề thi Tốt nghiệp THPT.
          </p>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {GRAMMAR_TOPICS.map((gt) => (
            <button
              key={gt.id}
              onClick={() => {
                setSelectedTopic(gt);
                handleRetry();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedTopic.id === gt.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-[#161a23] text-slate-300 hover:text-white hover:bg-[#1f2636] border-slate-800'
              }`}
            >
              {gt.titleVi}
            </button>
          ))}
        </div>
      </div>

      {/* Main Topic Card */}
      <div className="bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 text-slate-100">
        <div className="space-y-2 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-indigo-950 text-indigo-300 border border-indigo-800/50 px-2.5 py-0.5 rounded-md">
              Lớp {selectedTopic.grade}
            </span>
            <span className="text-xs font-medium text-slate-400">{selectedTopic.category}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedTopic.titleVi}</h2>
          <p className="text-xs text-slate-400 font-mono">{selectedTopic.title}</p>
        </div>

        {/* Formula Box */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-lg space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
            Công thức chuẩn & Quy tắc cốt lõi:
          </span>
          <pre className="font-mono text-xs sm:text-sm text-cyan-200 whitespace-pre-wrap leading-relaxed">
            {selectedTopic.formula}
          </pre>
        </div>

        {/* Usage Rules */}
        <div className="space-y-3">
          <h3 className="font-bold text-white text-sm">Cách sử dụng chi tiết & Ví dụ mẫu:</h3>
          <div className="space-y-3">
            {selectedTopic.usageRules.map((ur, idx) => (
              <div key={idx} className="p-4 bg-[#121620] border border-slate-800 rounded-2xl space-y-1.5 text-xs">
                <p className="font-bold text-slate-200">{ur.rule}</p>
                <p className="font-medium text-indigo-300 font-mono">Example: "{ur.exampleEn}"</p>
                <p className="text-slate-400 italic">Dịch nghĩa: {ur.exampleVi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Common Pitfalls (Lỗi học sinh thường mắc) */}
        <div className="p-5 bg-rose-950/30 border border-rose-800/40 rounded-2xl space-y-3">
          <h3 className="font-bold text-rose-300 text-xs sm:text-sm flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>Lỗi sai kinh điển của học sinh THPT:</span>
          </h3>

          <div className="space-y-2.5">
            {selectedTopic.commonMistakes.map((cm, idx) => (
              <div key={idx} className="p-3 bg-[#121620] rounded-xl border border-rose-900/40 text-xs space-y-1">
                <p className="text-rose-400 line-through">❌ Sai: "{cm.wrong}"</p>
                <p className="text-emerald-400 font-bold">✅ Đúng: "{cm.correct}"</p>
                <p className="text-slate-400 text-[11px] italic">💡 Lý do: {cm.explanationVi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Practice Quiz */}
        <div className="pt-4 border-t border-slate-800/80 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base">
              Bài tập áp dụng ({selectedTopic.practiceQuestions.length} câu)
            </h3>
            {isSubmitted && score !== null && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-indigo-950/80 border border-indigo-800/50 rounded-xl text-indigo-300 font-bold text-xs">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Điểm: {score}%</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {selectedTopic.practiceQuestions.map((q, qIdx) => {
              const userChoice = selectedAnswers[q.id];
              return (
                <div key={q.id} className="p-4 bg-[#121620] rounded-2xl border border-slate-800 space-y-3">
                  <p className="font-bold text-white text-xs sm:text-sm">
                    Câu {qIdx + 1}: {q.prompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userChoice === optIdx;
                      const isCorrect = q.correctIndex === optIdx;

                      let style = 'bg-[#181d2a] hover:bg-[#202738] border-slate-800 text-slate-200';
                      if (isSubmitted) {
                        if (isCorrect) {
                          style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          style = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold';
                        } else {
                          style = 'bg-[#181d2a] opacity-50';
                        }
                      } else if (isSelected) {
                        style = 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-bold';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${style}`}
                        >
                          <span>{opt}</span>
                          {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                          {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {isSubmitted && (
                    <div className="p-3 bg-[#181d2a] border border-slate-800 rounded-xl text-xs space-y-1">
                      <p className="font-bold text-slate-200">Giải thích chi tiết:</p>
                      <p className="text-slate-400 leading-relaxed">{q.explanationVi}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="w-full sm:w-auto px-6 py-3 bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all"
              >
                Nộp bài & Kiểm tra đáp án
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1f2636] hover:bg-[#283246] text-white font-bold rounded-xl text-xs transition-colors border border-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Luyện lại chuyên đề</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
