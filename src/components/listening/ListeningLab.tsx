import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  BookmarkPlus, 
  Sparkles,
  ArrowRight,
  Headphones,
  Award
} from 'lucide-react';
import { LISTENING_LESSONS } from '../../data/curriculumData';
import { ListeningLesson, Question, Grade } from '../../types';
import { SpeechService } from '../../services/speechService';
import { StorageService } from '../../services/storage';

interface ListeningLabProps {
  currentGrade: Grade;
  onLessonCompleted: (lessonId: string, score: number) => void;
  onSaveVocab: (word: string, defVi: string) => void;
}

export const ListeningLab: React.FC<ListeningLabProps> = ({
  currentGrade,
  onLessonCompleted,
  onSaveVocab,
}) => {
  const [selectedLesson, setSelectedLesson] = useState<ListeningLesson>(
    LISTENING_LESSONS.find(l => l.grade === currentGrade) || LISTENING_LESSONS[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showViTranslation, setShowViTranslation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [savedWords, setSavedWords] = useState<string[]>([]);

  // Stop speech when switching lessons or unmounting
  useEffect(() => {
    return () => {
      SpeechService.stopSpeaking();
    };
  }, []);

  // Sync lesson when canonical grade changes
  useEffect(() => {
    const matching = LISTENING_LESSONS.find(l => l.grade === currentGrade);
    if (matching) {
      SpeechService.stopSpeaking();
      setIsPlaying(false);
      setSelectedLesson(matching);
      handleRetry();
    }
  }, [currentGrade]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      SpeechService.stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      SpeechService.speakText(
        selectedLesson.audioText,
        playbackSpeed,
        () => {
          setIsPlaying(false);
        },
        () => {
          setIsPlaying(false);
        }
      );
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (isPlaying) {
      SpeechService.stopSpeaking();
      setIsPlaying(true);
      SpeechService.speakText(
        selectedLesson.audioText,
        speed,
        () => setIsPlaying(false),
        () => setIsPlaying(false)
      );
    }
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    selectedLesson.questions.forEach((q) => {
      const userChoice = selectedAnswers[q.id];
      if (userChoice === q.correctIndex) {
        correctCount++;
      } else {
        // Record mistake to bank
        StorageService.recordMistake({
          skill: 'listening',
          topic: selectedLesson.topic,
          questionText: q.prompt,
          userAnswer: userChoice !== undefined ? q.options[userChoice] : 'Chưa chọn',
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanationVi
        });
      }
    });

    const percentage = Math.round((correctCount / selectedLesson.questions.length) * 100);
    setScore(percentage);
    setIsSubmitted(true);
    onLessonCompleted(selectedLesson.id, percentage);
    StorageService.logStudyMinutes(selectedLesson.estimatedMinutes);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(null);
    SpeechService.stopSpeaking();
    setIsPlaying(false);
  };

  const handleSaveWordChip = (word: string, defVi: string) => {
    onSaveVocab(word, defVi);
    setSavedWords(prev => [...prev, word]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header & Lesson Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-950/80 border border-blue-800/40 text-blue-400">
              <Headphones className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Listening Lab</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Luyện nghe hiểu chuẩn ngữ âm THPT với bộ điều khiển audio và chấm điểm tức thì.
          </p>
        </div>

        {/* Lesson Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {LISTENING_LESSONS.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                SpeechService.stopSpeaking();
                setIsPlaying(false);
                setSelectedLesson(l);
                handleRetry();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                selectedLesson.id === l.id
                  ? 'bg-[#3B82F6] text-white border-blue-500 shadow-md shadow-blue-500/20'
                  : 'bg-[#161a23] text-slate-300 hover:text-white hover:bg-[#1f2636] border-slate-800'
              }`}
            >
              {l.topic}
            </button>
          ))}
        </div>
      </div>

      {/* Main Player Card */}
      <div className="bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800/50 px-2.5 py-0.5 rounded-md">
                Lớp {selectedLesson.grade}
              </span>
              <span className="text-xs font-medium text-slate-400">{selectedLesson.topic}</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-medium text-slate-400">Độ khó: {selectedLesson.difficulty}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">{selectedLesson.title}</h2>
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-[#0f131a] p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <span className="text-[11px] font-bold text-slate-400 px-2">Tốc độ:</span>
            {[0.75, 1.0, 1.25, 1.5].map((spd) => (
              <button
                key={spd}
                onClick={() => handleSpeedChange(spd)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  playbackSpeed === spd
                    ? 'bg-[#3B82F6] text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>

        {/* Audio Player Controller Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-slate-800 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={handleTogglePlay}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                isPlaying 
                  ? 'bg-amber-500 text-white animate-pulse' 
                  : 'bg-[#3B82F6] hover:bg-blue-500 text-white shadow-blue-500/30'
              }`}
              title={isPlaying ? 'Tạm dừng audio' : 'Phát audio'}
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-bold text-white">
                  {isPlaying ? 'Đang phát âm thanh bài nghe...' : 'Sẵn sàng phát audio'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Giọng đọc tiếng Anh chuẩn bản ngữ (Web Speech Engine)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => {
                SpeechService.stopSpeaking();
                setIsPlaying(false);
                setTimeout(() => handleTogglePlay(), 150);
              }}
              className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
              title="Phát lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold text-white transition-colors"
            >
              {showTranscript ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showTranscript ? 'Ẩn Transcript' : 'Xem Transcript'}</span>
            </button>
          </div>
        </div>

        {/* Pre-listening Tips */}
        <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Chiến thuật trước khi nghe (Pre-listening focus):</span>
          </h3>
          <ul className="space-y-1">
            {selectedLesson.preListeningTips.map((tip, idx) => (
              <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                <span className="text-blue-500 font-bold">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Toggleable Transcript Section */}
        {showTranscript && (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">Bản ghi lời thoại (Transcript)</h4>
              <button
                onClick={() => setShowViTranslation(!showViTranslation)}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                {showViTranslation ? 'Ẩn dịch tiếng Việt' : 'Hiện dịch tiếng Việt'}
              </button>
            </div>

            <div className="space-y-3">
              {selectedLesson.transcript.map((line, i) => (
                <div key={i} className="text-sm">
                  <p className="font-bold text-slate-800 text-xs text-indigo-700">{line.speaker}:</p>
                  <p className="text-slate-800 font-medium mt-0.5">{line.text}</p>
                  {showViTranslation && (
                    <p className="text-xs text-slate-500 mt-0.5 italic">{line.vi}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Extracted vocabulary chips */}
            <div className="pt-3 border-t border-slate-200">
              <p className="text-xs font-bold text-slate-700 mb-2">Từ vựng nổi bật trong bài nghe:</p>
              <div className="flex flex-wrap gap-2">
                {selectedLesson.vocabularyHighlight.map((item, i) => {
                  const isSaved = savedWords.includes(item.word);
                  return (
                    <button
                      key={i}
                      onClick={() => handleSaveWordChip(item.word, item.meaningVi)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSaved
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                      }`}
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                      <span>{item.word}: {item.meaningVi}</span>
                      {isSaved && <span className="text-[10px] text-emerald-600 font-normal">(Đã lưu)</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Comprehension Quiz Section */}
        <div className="space-y-5 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">
              Câu hỏi kiểm tra nghe hiểu ({selectedLesson.questions.length} câu)
            </h3>
            {isSubmitted && score !== null && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700 font-extrabold text-sm">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Điểm: {score}/100</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {selectedLesson.questions.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[q.id];
              return (
                <div 
                  key={q.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3"
                >
                  <p className="font-bold text-slate-900 text-sm">
                    Câu {qIndex + 1}: {q.prompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = selectedOpt === optIndex;
                      const isCorrect = q.correctIndex === optIndex;
                      
                      let btnStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                        } else {
                          btnStyle = 'bg-white opacity-60 border-slate-200 text-slate-500';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-50 border-indigo-400 text-indigo-900 font-bold shadow-xs';
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectAnswer(q.id, optIndex)}
                          className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-slate-200/60 font-bold text-[11px] flex items-center justify-center shrink-0">
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

                  {/* Explanation after submit */}
                  {isSubmitted && (
                    <div className="mt-2 p-3 bg-white border border-slate-200 rounded-xl text-xs space-y-1">
                      <p className="font-bold text-slate-800">Giải thích chi tiết:</p>
                      <p className="text-slate-600 leading-relaxed">{q.explanationVi}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl shadow-md transition-all text-sm"
              >
                Nộp bài & Xem giải thích
              </button>
            ) : (
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Luyện lại bài này</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
