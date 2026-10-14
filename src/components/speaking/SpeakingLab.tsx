import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  RotateCcw, 
  Send, 
  Radio, 
  Award, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  MessageSquare,
  Users,
  Layers
} from 'lucide-react';
import { SpeechService, PronunciationDiffResult } from '../../services/speechService';
import { Grade } from '../../types';
import { StorageService } from '../../services/storage';
import { speakingScenarios } from './speakingScenarios';

interface SpeakingLabProps {
  currentGrade: Grade;
  onSessionComplete: (wordsSpoken: number) => void;
}

interface ConversationMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  feedbackVi?: string;
}

const PRONUNCIATION_SENTENCES = [
  {
    id: 'pr-1',
    grade: 10,
    text: "Protecting biodiversity is essential for preserving our planet's ecological balance.",
    focusWord: "biodiversity, ecological",
    ipa: "/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/",
    translationVi: "Bảo vệ đa dạng sinh học là điều thiết yếu để gìn giữ sự cân bằng sinh thái của hành tinh chúng ta."
  },
  {
    id: 'pr-2',
    grade: 11,
    text: "Through photosynthesis, green plants synthesize glucose from carbon dioxide and water.",
    focusWord: "photosynthesis, synthesize",
    ipa: "/ˌfoʊ.t̬oʊˈsɪn.θə.sɪs/",
    translationVi: "Thông qua quang hợp, cây xanh tổng hợp glucose từ khí cacbonic và nước."
  },
  {
    id: 'pr-3',
    grade: 12,
    text: "Artificial intelligence empowers high school students to explore scientific breakthroughs.",
    focusWord: "artificial intelligence, breakthroughs",
    ipa: "/ˌɑːr.t̬ə.fɪʃ.əl ɪnˈtel.ə.dʒəns/",
    translationVi: "Trí tuệ nhân tạo trao quyền cho học sinh THPT khám phá các đột phá khoa học."
  },
  {
    id: 'pr-4',
    grade: 11,
    text: "If environmental researchers had secured sufficient funding, they would have preserved the sanctuary.",
    focusWord: "environmental, sanctuary",
    ipa: "/ɪnˌvaɪ.rənˈmen.t̬əl/",
    translationVi: "Nếu các nhà nghiên cứu môi trường nhận được đủ kinh phí, họ đã bảo tồn được khu bảo tồn."
  }
];

const CONVERSATION_TOPICS = speakingScenarios;

export const SpeakingLab: React.FC<SpeakingLabProps> = ({
  currentGrade,
  onSessionComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'pronunciation' | 'conversation' | 'roleplay'>('pronunciation');

  // Pronunciation Practice State
  const [selectedSentenceIndex, setSelectedSentenceIndex] = useState(0);
  const currentSentence = PRONUNCIATION_SENTENCES[selectedSentenceIndex] || PRONUNCIATION_SENTENCES[0];
  const [isRecording, setIsRecording] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [diffResult, setDiffResult] = useState<PronunciationDiffResult | null>(null);
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(true);

  // Conversation Room State
  const [selectedTopic, setSelectedTopic] = useState(CONVERSATION_TOPICS[0]);
  const [chatMessages, setChatMessages] = useState<ConversationMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello Minh Anh! Welcome to the EnglishUp Speaking Club. Today let's talk about: "${CONVERSATION_TOPICS[0].title}". ${CONVERSATION_TOPICS[0].prompt}`,
    }
  ]);
  const [userInputText, setUserInputText] = useState('');
  const [isAiResponding, setIsAiResponding] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Recognition instance ref
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setIsRecognitionSupported(SpeechService.isRecognitionAvailable());
  }, []);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Clean up recognition and audio on unmount
  useEffect(() => {
    return () => {
      SpeechService.stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, []);

  // Sync sentence with canonical student grade
  useEffect(() => {
    const idx = PRONUNCIATION_SENTENCES.findIndex(s => s.grade === currentGrade);
    if (idx !== -1) {
      setSelectedSentenceIndex(idx);
      setSpokenTranscript('');
      setDiffResult(null);
    }
  }, [currentGrade]);

  useEffect(() => {
    const gradeTopic = CONVERSATION_TOPICS.find((topic) => topic.grade === currentGrade) || CONVERSATION_TOPICS[0];
    setSelectedTopic(gradeTopic);
    setChatMessages([{ id: 'grade-' + Date.now(), sender: 'ai', text: `Let's practise ${gradeTopic.title}. ${gradeTopic.prompt}` }]);
  }, [currentGrade]);

  // --- Pronunciation Methods ---
  const handlePlayModelAudio = () => {
    SpeechService.speakText(currentSentence.text, 0.9);
  };

  const handleStartRecording = () => {
    if (!SpeechService.isRecognitionAvailable()) {
      alert('Trình duyệt của bạn hiện chưa hỗ trợ Web Speech Recognition API. Bạn có thể gõ nội dung câu nói bên dưới để so sánh thử!');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setSpokenTranscript('');
        setDiffResult(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSpokenTranscript(transcript);
        const diff = SpeechService.comparePronunciation(currentSentence.text, transcript);
        setDiffResult(diff);
        onSessionComplete(transcript.split(/\s+/).length);
        StorageService.logStudyMinutes(2);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech Recognition error:', e);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Cannot start recognition:', err);
      setIsRecording(false);
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
    }
    setIsRecording(false);
  };

  // --- Conversation Methods ---
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || userInputText).trim();
    if (!textToSend || isAiResponding) return;

    const userMsg: ConversationMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: textToSend
    };

    const newHistory = [...chatMessages, userMsg];
    setChatMessages(newHistory);
    setUserInputText('');
    setIsAiResponding(true);

    try {
      const res = await fetch('/api/gemini/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic.title,
          grade: currentGrade,
          scenario: { role: selectedTopic.role, objective: selectedTopic.objective, vocabulary: selectedTopic.vocabulary, usefulExpressions: selectedTopic.phrases, followUp: selectedTopic.followUp },
          history: newHistory.map(m => ({ sender: m.sender, text: m.text })),
          userSpeech: textToSend
        })
      });

      const data = await res.json();
      const aiMsg: ConversationMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.reply || 'Great thought! Could you explain that further with a specific example?',
        feedbackVi: data.feedbackOnSpeech
      };

      setChatMessages(prev => [...prev, aiMsg]);
      // Play audio response automatically
      SpeechService.speakText(aiMsg.text, 1.0);
      onSessionComplete(textToSend.split(/\s+/).length);
    } catch (e) {
      console.error('Conversation turn error:', e);
      const fallbackAi: ConversationMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: 'That is a compelling point. How can high school students implement that in daily life?',
      };
      setChatMessages(prev => [...prev, fallbackAi]);
    } finally {
      setIsAiResponding(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-950/80 border border-purple-800/40 text-purple-400">
              <Mic className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">Speaking Lab</h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Luyện phát âm từng âm tiết và đàm thoại tự nhiên với AI Speaking Room.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-[#161a23] p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTab('pronunciation')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pronunciation'
                ? 'bg-[#3B82F6] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Phát âm câu</span>
          </button>
          <button
            onClick={() => setActiveTab('conversation')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'conversation'
                ? 'bg-[#3B82F6] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>AI Speaking Room</span>
          </button>
          <button
            onClick={() => setActiveTab('roleplay')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'roleplay'
                ? 'bg-[#3B82F6] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Role-play</span>
          </button>
        </div>
      </div>

      {/* Mode A: Pronunciation Practice */}
      {activeTab === 'pronunciation' && (
        <div className="bg-[#161a23] rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-bold text-[#A3E635] bg-lime-950/70 border border-lime-800/50 px-2.5 py-0.5 rounded-md">
                Lớp {currentSentence.grade} • Luyện âm & Ngữ điệu
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Trọng tâm từ: <span className="font-semibold text-white">{currentSentence.focusWord}</span> • {currentSentence.ipa}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {PRONUNCIATION_SENTENCES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedSentenceIndex(idx);
                    setSpokenTranscript('');
                    setDiffResult(null);
                  }}
                  className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                    selectedSentenceIndex === idx
                      ? 'bg-[#3B82F6] text-white shadow-xs'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Sentence Display Card */}
          <div className="p-6 bg-[#0f131a] rounded-2xl border border-slate-800 space-y-3 text-center sm:text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Câu tiếng Anh mục tiêu:</p>
            <p className="text-lg sm:text-xl font-extrabold text-amber-300 leading-relaxed font-sans">
              "{currentSentence.text}"
            </p>
            <p className="text-xs sm:text-sm text-slate-400 italic">
              Nghĩa: {currentSentence.translationVi}
            </p>
          </div>

          {/* Audio Model and Recording Controller */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-4">
            <button
              onClick={handlePlayModelAudio}
              className="flex items-center gap-2 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs sm:text-sm transition-all"
            >
              <Volume2 className="w-4 h-4 text-purple-600" />
              <span>Nghe phát âm chuẩn</span>
            </button>

            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex items-center gap-2 px-7 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md shadow-purple-200 text-xs sm:text-sm transition-all active:scale-95"
              >
                <Mic className="w-5 h-5 text-white animate-bounce" />
                <span>Bấm vào đây để ghi âm & đọc</span>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex items-center gap-2 px-7 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl shadow-md text-xs sm:text-sm transition-all animate-pulse"
              >
                <MicOff className="w-5 h-5 text-white" />
                <span>Đang ghi âm... Bấm để dừng & chấm điểm</span>
              </button>
            )}
          </div>

          {/* Transcription & Diff Analysis */}
          {spokenTranscript && (
            <div className="p-5 bg-purple-50/50 border border-purple-200 rounded-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-purple-200/60">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="font-bold text-slate-900 text-sm">Kết quả phân tích giọng nói:</span>
                </div>
                {diffResult && (
                  <span className={`px-3 py-1 rounded-xl text-xs font-extrabold ${
                    diffResult.score >= 80 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : diffResult.score >= 60 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-rose-100 text-rose-800'
                  }`}>
                    Độ chuẩn xác: {diffResult.score}%
                  </span>
                )}
              </div>

              <div>
                <p className="text-xs text-slate-500 mb-1">Âm thanh máy tính nhận diện được (Transcript):</p>
                <div className="flex flex-wrap gap-1.5 p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
                  {diffResult ? (
                    diffResult.words.map((w, idx) => {
                      let color = 'text-slate-800';
                      let bg = 'bg-slate-100';
                      if (w.status === 'correct') {
                        color = 'text-emerald-700 font-bold';
                        bg = 'bg-emerald-50 border border-emerald-200';
                      } else if (w.status === 'mispronounced') {
                        color = 'text-amber-700 font-bold';
                        bg = 'bg-amber-50 border border-amber-200';
                      } else if (w.status === 'missing') {
                        color = 'text-rose-700 line-through';
                        bg = 'bg-rose-50 border border-rose-200';
                      }
                      return (
                        <span key={idx} className={`px-2 py-0.5 rounded-md ${bg} ${color}`}>
                          {w.word}
                        </span>
                      );
                    })
                  ) : (
                    <span>{spokenTranscript}</span>
                  )}
                </div>
              </div>

              {diffResult && (
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p className="font-bold text-purple-900">Nhận xét cải thiện phát âm:</p>
                  <p className="leading-relaxed">{diffResult.feedbackVi}</p>
                </div>
              )}
            </div>
          )}

          {/* Fallback Notice for Speech Recognition */}
          {!isRecognitionSupported && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                Lưu ý: Trình duyệt của bạn đang hạn chế Web Speech API. Bạn có thể sử dụng Chế độ AI Speaking Room bên cạnh để nhập văn bản hoặc thử trên Google Chrome/Edge để có trải nghiệm nhận diện giọng nói tối ưu nhất!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Mode B: AI Conversation Room */}
      {activeTab === 'conversation' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          {/* Topic Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-emerald-600">Phòng Luyện Nói AI Trực Tuyến</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mt-0.5">{selectedTopic.title}</h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {CONVERSATION_TOPICS.filter((top) => top.grade === currentGrade).map((top) => (
                <button
                  key={top.id}
                  onClick={() => {
                    setSelectedTopic(top);
                    setChatMessages([
                      {
                        id: 'm-' + Date.now(),
                        sender: 'ai',
                        text: `Welcome! Let's discuss: "${top.title}". ${top.prompt}`
                      }
                    ]);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    selectedTopic.id === top.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {top.title.slice(0, 15)}...
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages Log */}
          <div 
            ref={chatScrollRef}
            className="h-80 overflow-y-auto p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3.5"
          >
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Play audio button for AI turn */}
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => SpeechService.speakText(msg.text, 1.0)}
                      className="mt-2 flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-800"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe phát âm câu này</span>
                    </button>
                  )}
                </div>

                {/* Optional Feedback for User's speech */}
                {msg.feedbackVi && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mt-1 border border-amber-200 max-w-sm">
                    Gợi ý phản xạ: {msg.feedbackVi}
                  </span>
                )}
              </div>
            ))}

            {isAiResponding && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Sparkles className="w-3.5 h-3.5 text-purple-500 animate-spin" />
                <span>AI Tutor đang suy nghĩ và chuẩn bị phản hồi...</span>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={userInputText}
                onChange={(e) => setUserInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Nhập câu trả lời bằng tiếng Anh hoặc bấm Mic để nói..."
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!userInputText.trim() || isAiResponding}
                className="px-5 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm flex items-center gap-1.5 transition-all"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Gửi</span>
              </button>
            </div>

            {/* Quick response suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold">Câu mẫu gợi ý:</span>
              {[
                "In my opinion, we should reduce single-use plastic.",
                "I believe AI provides personalized learning support.",
                "Practicing listening every day improves my confidence."
              ].map((pill, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(pill)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-purple-50 hover:text-purple-700 rounded-lg text-[11px] transition-colors"
                >
                  "{pill.slice(0, 32)}..."
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mode C: Role-play Scenarios */}
      {activeTab === 'roleplay' && (
        <div className="space-y-5">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-purple-700">Curriculum-linked speaking bank</p>
                <h3 className="mt-1 text-xl font-black text-slate-900">Phòng luyện nói theo tình huống · Lớp {currentGrade}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Chọn tình huống, dùng cụm từ gợi ý rồi hội thoại với AI. Chủ đề bám các mạch thường gặp ở THPT; thứ tự và từ vựng chính xác còn phụ thuộc bộ sách trường đang học.</p>
              </div>
              <span className="w-fit rounded-full bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-700">{CONVERSATION_TOPICS.filter((topic) => topic.grade === currentGrade).length} tình huống</span>
            </div>
          </section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {CONVERSATION_TOPICS.filter((scenario) => scenario.grade === currentGrade).map((scenario, index) => (
              <article key={scenario.id} className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-indigo-700">Tình huống {index + 1}</span>
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{scenario.level}</span>
                </div>
                <h4 className="mt-3 text-base font-extrabold leading-snug text-slate-900">{scenario.title}</h4>
                <p className="mt-1 text-xs font-semibold text-purple-700">{scenario.theme}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{scenario.objective}</p>
                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-wide text-slate-500">Vai trò AI</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{scenario.role}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">“{scenario.prompt}”</p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Từ vựng theo chủ đề</p>
                  <div className="mt-2 space-y-2">
                    {scenario.vocabulary.map((item) => <div key={item.word} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:items-start sm:justify-between"><span className="font-bold text-slate-800">{item.word}</span><span className="text-slate-500 sm:text-right">{item.meaningVi}</span></div>)}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-extrabold uppercase tracking-wide text-slate-500">Cụm từ nên dùng</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {scenario.phrases.map((phrase) => <span key={phrase} className="rounded-lg border border-sky-100 bg-sky-50 px-2 py-1 text-xs leading-5 text-sky-800">{phrase}</span>)}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedTopic(scenario);
                    setChatMessages([{ id: 'rp-' + Date.now(), sender: 'ai', text: `${scenario.prompt}\n\nTry to use: ${scenario.phrases.slice(0, 3).join(' / ')}\n\n${scenario.followUp}` }]);
                    setUserInputText('');
                    setActiveTab('conversation');
                  }}
                  className="mt-5 min-h-11 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
                >
                  Luyện với AI ngay <span aria-hidden="true">→</span>
                </button>
              </article>
            ))}
          </div>
          <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-900">Mẹo luyện tập: trả lời thành 3–5 câu, nêu ý chính, giải thích lý do và thêm một ví dụ. Hãy thử dùng ít nhất hai cụm từ gợi ý; AI có thể hỏi tiếp để bạn luyện phản xạ nhiều lượt.</p>
        </div>
      )}
    </div>
  );
};
