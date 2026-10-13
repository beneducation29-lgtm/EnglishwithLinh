import React, { useState } from 'react';
import { 
  Dna, 
  ExternalLink, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  RotateCcw, 
  Award, 
  BookOpen, 
  FileText, 
  Atom,
  ShieldCheck,
  Search
} from 'lucide-react';
import { SCIENCE_ENGLISH_TOPICS } from '../../data/curriculumData';
import { ScienceEnglishTopic, Grade } from '../../types';
import { StorageService } from '../../services/storage';

interface ScienceEnglishLabProps {
  currentGrade: Grade;
  onSaveVocab: (word: string, defVi: string) => void;
}

export const ScienceEnglishLab: React.FC<ScienceEnglishLabProps> = ({
  currentGrade,
  onSaveVocab,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<ScienceEnglishTopic>(SCIENCE_ENGLISH_TOPICS[0]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [savedStatus, setSavedStatus] = useState(false);

  const handleSelectAnswer = (qId: string, optIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optIndex }));
  };

  const handleSubmit = () => {
    let correct = 0;
    selectedTopic.sampleQuestions.forEach((q) => {
      const choice = selectedAnswers[q.id];
      if (choice === q.correctIndex) {
        correct++;
      } else {
        StorageService.recordMistake({
          skill: 'science',
          topic: selectedTopic.term,
          questionText: q.prompt,
          userAnswer: choice !== undefined ? q.options[choice] : 'Chưa chọn',
          correctAnswer: q.options[q.correctIndex],
          explanation: q.explanationVi
        });
      }
    });

    const percent = Math.round((correct / selectedTopic.sampleQuestions.length) * 100);
    setScore(percent);
    setIsSubmitted(true);
    StorageService.logStudyMinutes(5);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(null);
  };

  const handleSaveTermToVocab = () => {
    onSaveVocab(selectedTopic.term, selectedTopic.vietnameseTerm);
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-950/80 border border-teal-800/40 text-teal-400">
              <Dna className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Bioscience English Lab</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Chuyên đề tiếng Anh Khoa học & Sinh học THPT (UniProt / PDB / PubMed Curated).
          </p>
        </div>

        <span className="text-xs font-bold bg-teal-950/80 text-teal-300 border border-teal-800/50 px-3 py-1.5 rounded-xl self-start sm:self-auto flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          <span>Chuẩn học thuật STEM & Đề thi Quốc Gia</span>
        </span>
      </div>

      {/* Quick-Try Example Chip Bar (from Science Skills UI System) */}
      <div className="bg-[#161a23] p-3.5 rounded-2xl border border-slate-800 shadow-lg flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-400 mr-2 flex items-center gap-1">
          <Atom className="w-3.5 h-3.5 text-teal-400" />
          <span>Chuyên đề sinh học:</span>
        </span>
        {SCIENCE_ENGLISH_TOPICS.map((top) => (
          <button
            key={top.id}
            onClick={() => {
              setSelectedTopic(top);
              handleRetry();
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              selectedTopic.id === top.id
                ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/20'
                : 'bg-[#121620] text-slate-300 hover:text-white hover:bg-[#1a202d] border-slate-800'
            }`}
          >
            {top.term.split(' ')[0]} ({top.domain})
          </button>
        ))}
      </div>

      {/* Main Scientific Workbench Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scientific Inspector & Provenance (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Inspector Card */}
          <div className="bg-[#161a23] rounded-3xl p-6 border border-slate-800 shadow-xl space-y-5 text-slate-100">
            <div className="space-y-1.5 pb-4 border-b border-slate-800/80">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold bg-teal-950 text-teal-300 border border-teal-800/50 px-2.5 py-0.5 rounded-md">
                  {selectedTopic.domain}
                </span>
                <span className="text-xs text-slate-400 font-mono">({selectedTopic.pos})</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">{selectedTopic.term}</h2>
              <p className="text-xs font-mono text-slate-400">{selectedTopic.ipa}</p>
              <p className="text-sm font-semibold text-teal-300 mt-1">{selectedTopic.vietnameseTerm}</p>
            </div>

            {/* Definitions */}
            <div className="space-y-3 text-xs">
              <div className="p-3.5 bg-[#121620] rounded-xl border border-slate-800 space-y-1">
                <p className="font-bold text-slate-200">English Definition:</p>
                <p className="text-slate-400 leading-relaxed">{selectedTopic.englishDefinition}</p>
              </div>

              <div className="p-3.5 bg-teal-950/30 rounded-xl border border-teal-800/40 space-y-1">
                <p className="font-bold text-teal-300">Giải thích bản chất sinh học (Tiếng Việt):</p>
                <p className="text-slate-300 leading-relaxed">{selectedTopic.vietnameseExplanation}</p>
              </div>
            </div>

            {/* Provenance & Curated Biological Citations */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold">Mã thực nghiệm:</span>
                <span className="font-mono text-cyan-300 bg-[#121620] px-2 py-0.5 rounded-md border border-slate-800">
                  {selectedTopic.proteinOrGeneRef}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold">Nguồn dữ liệu khoa học:</span>
                <span className="text-[11px] text-teal-400 font-medium">
                  {selectedTopic.curatedSource}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold">Chương trình GDPT:</span>
                <span className="text-[11px] text-slate-300">
                  {selectedTopic.curriculumUnit}
                </span>
              </div>
            </div>

            <button
              onClick={handleSaveTermToVocab}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-md shadow-teal-600/20"
            >
              <span>{savedStatus ? '✓ Đã lưu vào Sổ từ vựng!' : '+ Lưu thuật ngữ vào Vocabulary Lab'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Academic Scientific Reading & Exercises (7 cols) */}
        <div className="lg:col-span-7 bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6 text-slate-100">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-400" />
              <h3 className="font-bold text-white text-sm">Văn bản đọc hiểu khoa học (Academic Bioscience Passage)</h3>
            </div>
            <span className="text-xs text-slate-400">Định hướng Đề thi THPT</span>
          </div>

          <div className="p-5 bg-[#121620] border border-slate-800 rounded-2xl text-slate-200 text-xs sm:text-sm leading-relaxed font-sans space-y-3">
            <p className="leading-7 font-normal">
              {selectedTopic.sampleReadingText}
            </p>
            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 italic">
              Liên hệ bài học THPT: {selectedTopic.highSchoolContext}
            </div>
          </div>

          {/* Scientific Comprehension Questions */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">Câu hỏi kiểm tra tư duy khoa học</h4>
              {isSubmitted && score !== null && (
                <span className="px-3 py-1 bg-teal-950/80 text-teal-300 font-bold text-xs rounded-xl border border-teal-800/50">
                  Điểm: {score}%
                </span>
              )}
            </div>

            <div className="space-y-3">
              {selectedTopic.sampleQuestions.map((q, idx) => {
                const choice = selectedAnswers[q.id];
                return (
                  <div key={q.id} className="p-4 bg-[#121620] rounded-2xl border border-slate-800 space-y-2.5">
                    <p className="font-bold text-white text-xs sm:text-sm">
                      Câu {idx + 1}: {q.prompt}
                    </p>

                    <div className="space-y-1.5">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = choice === optIdx;
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
                          style = 'bg-teal-950/80 border-teal-500 text-teal-200 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                            {isSubmitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {isSubmitted && (
                      <div className="p-2.5 bg-[#181d2a] border border-slate-800 rounded-xl text-xs space-y-1">
                        <p className="font-bold text-slate-200">Giải thích cơ sở khoa học:</p>
                        <p className="text-slate-400 text-[11px] leading-relaxed">{q.explanationVi}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-teal-600/25"
                >
                  Nộp bài & Kiểm tra tư duy
                </button>
              ) : (
                <button
                  onClick={handleRetry}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1f2636] hover:bg-[#283246] text-white font-bold rounded-xl text-xs transition-colors border border-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Luyện lại bài đọc này</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
