import React, { useState } from 'react';
import { 
  BookOpen, 
  BookmarkPlus, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles, 
  Award, 
  ExternalLink,
  Search,
  BookA
} from 'lucide-react';
import { READING_LESSONS } from '../../data/curriculumData';
import { ReadingLesson, Question, Grade } from '../../types';
import { StorageService } from '../../services/storage';

interface ReadingLabProps {
  currentGrade: Grade;
  onLessonCompleted: (lessonId: string, score: number) => void;
  onSaveVocab: (word: string, defVi: string) => void;
}

export const ReadingLab: React.FC<ReadingLabProps> = ({
  currentGrade,
  onLessonCompleted,
  onSaveVocab,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<ReadingLesson>(
    READING_LESSONS.find(l => l.grade === currentGrade) || READING_LESSONS[0]
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [highlightedWord, setHighlightedWord] = useState<{ word: string; meaningVi: string; pos?: string } | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);

  // Split passage text into paragraphs for clean typography
  const paragraphs = selectedLesson.passageText.split('\n\n').filter(Boolean);

  // Sync lesson when canonical grade changes
  React.useEffect(() => {
    const matching = READING_LESSONS.find(l => l.grade === currentGrade);
    if (matching) {
      setSelectedLesson(matching);
      handleRetry();
    }
  }, [currentGrade]);

  const handleWordClick = (rawWord: string) => {
    const clean = rawWord.toLowerCase().replace(/[^a-zA-Z-]/g, '');
    if (!clean || clean.length < 3) return;

    // Check if in glossary
    const inGlossary = selectedLesson.vocabularyGlossary.find(g => g.word.toLowerCase() === clean);
    if (inGlossary) {
      setHighlightedWord({ word: inGlossary.word, meaningVi: inGlossary.meaningVi, pos: inGlossary.pos });
    } else {
      setHighlightedWord({ word: clean, meaningVi: 'Từ vựng học thuật trong bài đọc. Nhấp "Lưu từ" để học thêm trong Vocabulary Lab.' });
    }
  };

  const handleSaveHighlightedWord = () => {
    if (!highlightedWord) return;
    onSaveVocab(highlightedWord.word, highlightedWord.meaningVi);
    setSavedWords(prev => [...prev, highlightedWord.word]);
  };

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    let correct = 0;
    selectedLesson.questions.forEach((q) => {
      const choice = selectedAnswers[q.id];
      if (choice === q.correctIndex) {
        correct++;
      } else {
        StorageService.recordMistake({
          skill: 'reading',
          topic: selectedLesson.topic,
          questionText: q.prompt,
          userAnswer: choice !== undefined ? q.options[choice] : 'Chưa chọn',
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanationVi
        });
      }
    });

    const percent = Math.round((correct / selectedLesson.questions.length) * 100);
    setScore(percent);
    setIsSubmitted(true);
    onLessonCompleted(selectedLesson.id, percent);
    StorageService.logStudyMinutes(selectedLesson.estimatedMinutes);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(null);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header & Lesson Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Reading Lab</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Luyện đọc hiểu chuyên sâu với tính năng tra nghĩa từ vựng tức thì khi click vào văn bản.
          </p>
        </div>

        {/* Lesson Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {READING_LESSONS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLesson(l);
                handleRetry();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedLesson.id === l.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/20'
                  : 'bg-[#161a23] text-slate-300 hover:text-white hover:bg-[#1f2636] border-slate-800'
              }`}
            >
              {l.topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Reading Workspace: 2-column layout (Passage Left, Questions & Word Inspector Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Passage Text (7 cols) */}
        <div className="lg:col-span-7 bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="space-y-2 pb-4 border-b border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/50 px-2.5 py-0.5 rounded-md">
                Lớp {selectedLesson.grade}
              </span>
              <span className="text-xs font-medium text-slate-400">{selectedLesson.topic}</span>
              {selectedLesson.sourceBadge && (
                <span className="text-[10px] font-bold bg-blue-950 text-blue-300 border border-blue-800/50 px-2 py-0.5 rounded-md">
                  {selectedLesson.sourceBadge}
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white leading-snug">{selectedLesson.title}</h2>
            <p className="text-xs text-amber-300/80 italic">
              💡 Mẹo: Nhấp chuột vào bất kỳ từ nào trong đoạn văn để tra nghĩa tiếng Việt và lưu vào sổ từ vựng!
            </p>
          </div>

          {/* Interactive Passage Body */}
          <div className="space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed font-sans select-text">
            {paragraphs.map((pText, pIndex) => {
              const words = pText.split(' ');
              return (
                <p key={pIndex} className="text-justify indent-4 leading-7">
                  <span className="text-xs font-mono font-bold text-slate-400 mr-2 select-none">
                    [{pIndex + 1}]
                  </span>
                  {words.map((w, wIndex) => (
                    <span
                      key={wIndex}
                      onClick={() => handleWordClick(w)}
                      className="cursor-pointer hover:bg-emerald-100 hover:text-emerald-900 rounded-xs transition-colors px-0.5 inline-block"
                      title="Bấm để xem nghĩa"
                    >
                      {w}{' '}
                    </span>
                  ))}
                </p>
              );
            })}
          </div>

          {/* Quick Glossary Footer */}
          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Bảng từ vựng trọng tâm trong bài đọc:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {selectedLesson.vocabularyGlossary.map((vg, i) => (
                <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">{vg.word}</span>
                    <span className="text-slate-400 ml-1">({vg.pos})</span>
                    <p className="text-slate-600 text-[11px] mt-0.5">{vg.meaningVi}</p>
                  </div>
                  <button
                    onClick={() => {
                      onSaveVocab(vg.word, vg.meaningVi);
                      setSavedWords(prev => [...prev, vg.word]);
                    }}
                    className="p-1 hover:bg-emerald-100 text-slate-400 hover:text-emerald-700 rounded-lg transition-colors"
                    title="Lưu vào từ vựng"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Word Inspector & Comprehension Questions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Word Inspector Card (Shows clicked word) */}
          {highlightedWord && (
            <div className="bg-[#161a23] border border-emerald-500/40 rounded-3xl p-5 shadow-xl space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookA className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Tra từ tức thì
                  </span>
                </div>
                <button
                  onClick={() => setHighlightedWord(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Đóng
                </button>
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-extrabold text-white">{highlightedWord.word}</h3>
                  {highlightedWord.pos && (
                    <span className="text-xs text-amber-300 font-mono">({highlightedWord.pos})</span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  {highlightedWord.meaningVi}
                </p>
              </div>

              <button
                onClick={handleSaveHighlightedWord}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition-colors shadow-md shadow-emerald-600/20"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>
                  {savedWords.includes(highlightedWord.word) ? 'Đã lưu vào Vocabulary Lab' : 'Lưu từ này vào sổ tay'}
                </span>
              </button>
            </div>
          )}

          {/* Comprehension Questions Card */}
          <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <h3 className="font-extrabold text-white text-base">
                Câu hỏi đọc hiểu ({selectedLesson.questions.length} câu)
              </h3>
              {isSubmitted && score !== null && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/70 border border-emerald-800/60 rounded-xl text-emerald-300 font-bold text-xs">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Điểm: {score}%</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {selectedLesson.questions.map((q, qIndex) => {
                const userChoice = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-snug">
                      Câu {qIndex + 1}: {q.prompt}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIndex) => {
                        const isSelected = userChoice === optIndex;
                        const isCorrect = q.correctIndex === optIndex;
                        
                        let style = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700';
                        if (isSubmitted) {
                          if (isCorrect) {
                            style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                          } else if (isSelected && !isCorrect) {
                            style = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                          } else {
                            style = 'bg-white opacity-60 text-slate-500';
                          }
                        } else if (isSelected) {
                          style = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectAnswer(q.id, optIndex)}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${style}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 rounded-md bg-slate-200/70 font-bold text-[10px] flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                            {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                        <p className="font-bold text-slate-800">Căn cứ trong bài đọc:</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{q.explanationVi}</p>
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
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all"
                >
                  Nộp bài & Chấm điểm
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại bài này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
