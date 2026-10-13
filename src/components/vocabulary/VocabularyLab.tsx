import React, { useState } from 'react';
import { 
  BookA, 
  RotateCcw, 
  Volume2, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Filter, 
  Layers, 
  BookmarkCheck,
  Search,
  Eye,
  ArrowRight
} from 'lucide-react';
import { VocabularyItem, Grade } from '../../types';
import { StorageService } from '../../services/storage';
import { SpeechService } from '../../services/speechService';

interface VocabularyLabProps {
  currentGrade: Grade;
}

export const VocabularyLab: React.FC<VocabularyLabProps> = ({ currentGrade }) => {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>(StorageService.getVocabularyItems());
  const [filterTopic, setFilterTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [practiceMode, setPracticeMode] = useState<'flashcard' | 'multiple_choice' | 'typing'>('flashcard');

  // Flashcard State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Multiple Choice Quiz State
  const [mcAnswerChosen, setMcAnswerChosen] = useState<number | null>(null);

  // Typing State
  const [typedInput, setTypedInput] = useState('');
  const [typingChecked, setTypingChecked] = useState<boolean | null>(null);

  // Add custom word modal state
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newIpa, setNewIpa] = useState('');
  const [newMeaningVi, setNewMeaningVi] = useState('');

  // Filtered list
  const filteredList = vocabList.filter(item => {
    const matchesSearch = item.word.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.meaningVi.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = filterTopic === 'all' || item.topic.toLowerCase().includes(filterTopic.toLowerCase());
    return matchesSearch && matchesTopic;
  });

  const activeCard = filteredList[currentCardIndex] || filteredList[0];

  const handlePlayAudio = (word: string) => {
    SpeechService.speakText(word, 0.95);
  };

  const handleSrsRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    if (!activeCard) return;
    const updated = StorageService.updateVocabSrs(activeCard.id, rating);
    if (updated) {
      setVocabList(StorageService.getVocabularyItems());
    }
    // Next card
    setIsFlipped(false);
    setMcAnswerChosen(null);
    setTypedInput('');
    setTypingChecked(null);
    if (currentCardIndex < filteredList.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
    StorageService.logStudyMinutes(1);
  };

  const handleAddNewWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim() || !newMeaningVi.trim()) return;

    const item: VocabularyItem = {
      id: 'voc-custom-' + Date.now(),
      word: newWord.trim(),
      ipa: newIpa.trim() || '/.../',
      pos: 'n',
      meaningVi: newMeaningVi.trim(),
      exampleEn: `Example sentence for ${newWord.trim()}.`,
      exampleVi: `Ví dụ cho từ ${newWord.trim()}.`,
      collocations: [],
      grade: currentGrade,
      topic: 'Personal Wordbook',
      srsStage: 0,
      nextReviewDate: new Date().toISOString()
    };

    StorageService.saveVocabItem(item);
    setVocabList(StorageService.getVocabularyItems());
    setIsAddingWord(false);
    setNewWord('');
    setNewIpa('');
    setNewMeaningVi('');
  };

  // Generate 4 options for Multiple Choice
  const mcOptions = React.useMemo(() => {
    if (!activeCard) return [];
    const correct = activeCard.meaningVi;
    const distractors = vocabList
      .filter(v => v.id !== activeCard.id)
      .map(v => v.meaningVi)
      .slice(0, 3);
    return [correct, ...distractors].sort(() => Math.random() - 0.5);
  }, [activeCard?.id, vocabList]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-950/80 border border-amber-800/40 text-amber-400">
              <BookA className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Vocabulary Lab</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Ghi nhớ từ vựng THPT & Khoa học bằng thuật toán Lặp lại ngắt quãng (Spaced Repetition SM-2).
          </p>
        </div>

        <button
          onClick={() => setIsAddingWord(true)}
          className="flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm từ vựng mới</span>
        </button>
      </div>

      {/* Mode Switcher & Filter Bar */}
      <div className="bg-[#161a23] p-4 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Practice Mode Tabs */}
        <div className="flex bg-[#0f131a] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => { setPracticeMode('flashcard'); setIsFlipped(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              practiceMode === 'flashcard' ? 'bg-[#3B82F6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Lật thẻ Flashcards
          </button>
          <button
            onClick={() => { setPracticeMode('multiple_choice'); setMcAnswerChosen(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              practiceMode === 'multiple_choice' ? 'bg-[#3B82F6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Trắc nghiệm nghĩa
          </button>
          <button
            onClick={() => { setPracticeMode('typing'); setTypingChecked(null); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              practiceMode === 'typing' ? 'bg-[#3B82F6] text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gõ chính tả
          </button>
        </div>

        {/* Search & Topic filter */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm từ vựng..."
              className="pl-8 pr-3 py-1.5 bg-[#0f131a] border border-slate-800 text-white rounded-xl text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-36 sm:w-48"
            />
          </div>

          <select
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="px-3 py-1.5 bg-[#0f131a] border border-slate-800 rounded-xl text-xs font-medium text-slate-300 focus:outline-hidden"
          >
            <option value="all">Tất cả chủ đề</option>
            <option value="Environment">Environment</option>
            <option value="Bioscience">Bioscience & Genetics</option>
            <option value="Technology">Technology & AI</option>
            <option value="Education">School & Education</option>
          </select>
        </div>
      </div>

      {/* Main Interactive Flashcard / Quiz Area */}
      {filteredList.length > 0 && activeCard ? (
        <div className="bg-[#161a23] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800/80">
            <span>
              Thẻ từ {currentCardIndex + 1} / {filteredList.length}
            </span>
            <span className="font-semibold text-purple-300 bg-purple-950/70 border border-purple-800/50 px-2.5 py-0.5 rounded-md">
              Chủ đề: {activeCard.topic} • Lớp {activeCard.grade}
            </span>
          </div>

          {/* MODE 1: FLASHCARD FLIP */}
          {practiceMode === 'flashcard' && (
            <div className="space-y-6">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className={`min-h-[260px] p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center select-none ${
                  isFlipped 
                    ? 'bg-gradient-to-b from-[#1E1B4B] to-[#161a23] border-purple-500 shadow-xl shadow-purple-500/10' 
                    : 'bg-[#121620] border-slate-800 hover:border-slate-700 shadow-lg'
                }`}
              >
                {!isFlipped ? (
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Mặt trước (Tiếng Anh) • Bấm để lật
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {activeCard.word}
                    </h2>
                    <p className="font-mono text-sm text-amber-300">{activeCard.ipa}</p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayAudio(activeCard.word);
                      }}
                      className="p-3 bg-[#A3E635] hover:bg-lime-400 text-slate-950 rounded-full transition-all inline-flex items-center gap-1.5 text-xs font-extrabold shadow-md shadow-lime-500/20"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Phát âm</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 max-w-lg">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                      Mặt sau (Nghĩa & Ví dụ)
                    </span>
                    <h3 className="text-2xl font-bold text-white">{activeCard.meaningVi}</h3>
                    <p className="text-xs font-medium text-slate-400 font-mono">({activeCard.pos})</p>
                    
                    <div className="p-3 bg-[#0d1017] rounded-xl border border-slate-800 text-xs text-left space-y-1">
                      <p className="font-semibold text-slate-200">{activeCard.exampleEn}</p>
                      <p className="text-slate-400 italic">{activeCard.exampleVi}</p>
                    </div>

                    {activeCard.collocations && activeCard.collocations.length > 0 && (
                      <div className="flex flex-wrap justify-center gap-1.5 text-[11px]">
                        {activeCard.collocations.map((col, i) => (
                          <span key={i} className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-800/40 rounded-md font-medium">
                            {col}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Spaced Repetition Buttons */}
              <div className="space-y-2">
                <p className="text-center text-xs text-slate-400 font-medium">
                  Đánh giá độ nhớ của bạn để hệ thống lên lịch ôn tập SM-2:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleSrsRate('again')}
                    className="p-3 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 rounded-2xl text-rose-300 font-bold text-xs flex flex-col items-center transition-all"
                  >
                    <span>Quên / Chưa thuộc</span>
                    <span className="text-[10px] font-normal text-rose-400 mt-0.5">Ôn lại hôm nay</span>
                  </button>
                  <button
                    onClick={() => handleSrsRate('hard')}
                    className="p-3 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-800/60 rounded-2xl text-amber-300 font-bold text-xs flex flex-col items-center transition-all"
                  >
                    <span>Nhớ một phần</span>
                    <span className="text-[10px] font-normal text-amber-400 mt-0.5">Ôn sau 1 ngày</span>
                  </button>
                  <button
                    onClick={() => handleSrsRate('good')}
                    className="p-3 bg-blue-950/50 hover:bg-blue-900/60 border border-blue-800/60 rounded-2xl text-blue-300 font-bold text-xs flex flex-col items-center transition-all"
                  >
                    <span>Đã nhớ tốt</span>
                    <span className="text-[10px] font-normal text-blue-400 mt-0.5">Ôn sau 3 ngày</span>
                  </button>
                  <button
                    onClick={() => handleSrsRate('easy')}
                    className="p-3 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-2xl text-emerald-300 font-bold text-xs flex flex-col items-center transition-all"
                  >
                    <span>Rất dễ & thành thạo</span>
                    <span className="text-[10px] font-normal text-emerald-400 mt-0.5">Ôn sau 7 ngày+</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MODE 2: MULTIPLE CHOICE */}
          {practiceMode === 'multiple_choice' && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Chọn nghĩa đúng của từ:</span>
                <h3 className="text-3xl font-extrabold text-slate-900">{activeCard.word}</h3>
                <p className="text-sm font-mono text-slate-500">{activeCard.ipa}</p>
                <button
                  onClick={() => handlePlayAudio(activeCard.word)}
                  className="p-2 hover:bg-slate-100 rounded-full text-amber-600 transition-colors inline-block"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mcOptions.map((opt, i) => {
                  const isCorrect = opt === activeCard.meaningVi;
                  const isSelected = mcAnswerChosen === i;
                  let style = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                  if (mcAnswerChosen !== null) {
                    if (isCorrect) {
                      style = 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold';
                    } else if (isSelected && !isCorrect) {
                      style = 'bg-rose-50 border-rose-300 text-rose-900 font-bold';
                    } else {
                      style = 'bg-slate-50 opacity-50';
                    }
                  }

                  return (
                    <button
                      key={i}
                      disabled={mcAnswerChosen !== null}
                      onClick={() => setMcAnswerChosen(i)}
                      className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {mcAnswerChosen !== null && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleSrsRate(mcOptions[mcAnswerChosen] === activeCard.meaningVi ? 'good' : 'again')}
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors"
                  >
                    <span>Từ tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MODE 3: TYPING CHALLENGE */}
          {practiceMode === 'typing' && (
            <div className="space-y-6 max-w-lg mx-auto text-center">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gõ chính xác từ tiếng Anh:</span>
                <h3 className="text-2xl font-bold text-slate-900">{activeCard.meaningVi}</h3>
                <p className="text-xs text-slate-500 font-mono">({activeCard.pos}) • {activeCard.ipa}</p>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const match = typedInput.trim().toLowerCase() === activeCard.word.toLowerCase();
                      setTypingChecked(match);
                    }
                  }}
                  placeholder="Gõ từ tiếng Anh..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-center font-bold text-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                />

                {typingChecked !== null && (
                  <div className={`p-3 rounded-xl text-xs font-bold ${
                    typingChecked ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                  }`}>
                    {typingChecked ? 'Chính xác 100%! Xuất sắc.' : `Chưa đúng. Đáp án chuẩn là: "${activeCard.word}"`}
                  </div>
                )}

                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      const match = typedInput.trim().toLowerCase() === activeCard.word.toLowerCase();
                      setTypingChecked(match);
                    }}
                    className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs"
                  >
                    Kiểm tra
                  </button>
                  {typingChecked !== null && (
                    <button
                      onClick={() => handleSrsRate(typingChecked ? 'good' : 'again')}
                      className="px-5 py-2.5 bg-amber-600 text-white font-bold rounded-xl text-xs"
                    >
                      Tiếp tục →
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
          <BookA className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-700">Không tìm thấy từ vựng phù hợp</p>
          <p className="text-xs text-slate-500 mt-1">Hãy thử đổi bộ lọc hoặc thêm từ vựng mới vào sổ tay.</p>
        </div>
      )}

      {/* Add Custom Word Modal */}
      {isAddingWord && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Thêm từ vựng mới vào Sổ tay</h3>
            <form onSubmit={handleAddNewWord} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Từ tiếng Anh:</label>
                <input
                  type="text"
                  required
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  placeholder="e.g. chloroplast"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Phiên âm IPA (tùy chọn):</label>
                <input
                  type="text"
                  value={newIpa}
                  onChange={(e) => setNewIpa(e.target.value)}
                  placeholder="e.g. /ˈklɔːr.ə.plæst/"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Nghĩa tiếng Việt:</label>
                <input
                  type="text"
                  required
                  value={newMeaningVi}
                  onChange={(e) => setNewMeaningVi(e.target.value)}
                  placeholder="e.g. lục lạp (bào quan quang hợp ở thực vật)"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingWord(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs"
                >
                  Lưu vào Sổ từ vựng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
