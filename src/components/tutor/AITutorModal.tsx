import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Lightbulb, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import { Grade } from '../../types';
import { SpeechService } from '../../services/speechService';

interface AITutorModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: Grade;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

const SAMPLE_QUESTIONS = [
  "Phân biệt cách dùng câu điều kiện loại 2 và loại 3?",
  "Mẹo làm bài tìm từ có trọng âm khác trong đề thi THPT?",
  "Giải thích hiện tượng đảo ngữ với 'Not only... but also'?",
  "Từ vựng về chủ đề Bioscience & Đa dạng sinh học hay gặp?"
];

export const AITutorModal: React.FC<AITutorModalProps> = ({
  isOpen,
  onClose,
  grade,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Xin chào bạn! Mình là EnglishUp AI Tutor, đồng hành cùng bạn ôn luyện Tiếng Anh THPT Lớp ${grade}. Bạn có thắc mắc gì về công thức ngữ pháp, từ vựng hay muốn giải thích đáp án của một câu hỏi khó không? Hãy hỏi mình nhé!`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          grade,
          context: 'High school English study session'
        })
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.reply || 'Cảm ơn bạn! Để mình giải thích chi tiết câu hỏi này nhé...'
      };
      setMessages(prev => [...prev, aiReply]);
    } catch (e) {
      console.error('Tutor error:', e);
      setMessages(prev => [
        ...prev,
        {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: 'Rất tiếc, kết nối AI đang gián đoạn. Bạn có thể tra cứu nhanh trong mục Grammar Lab hoặc Vocabulary Lab!'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="bg-[#161a23] rounded-3xl w-full max-w-2xl h-[85vh] max-h-[680px] flex flex-col shadow-2xl border border-slate-800 overflow-hidden text-slate-100">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A3E635] text-slate-950 flex items-center justify-center font-black">
              AI
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base">EnglishUp AI Tutor</h3>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                  Lớp {grade}
                </span>
              </div>
              <p className="text-xs text-slate-300">Trợ lý sư phạm Tiếng Anh THPT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat message history */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0d1017]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-[#A3E635] text-slate-950 flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs">
                  AI
                </div>
              )}

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-[#3B82F6] text-white rounded-br-xs shadow-xs'
                    : 'bg-[#181d2a] text-slate-200 border border-slate-800 rounded-bl-xs shadow-xs'
                }`}
              >
                <p>{m.text}</p>
                {m.sender === 'ai' && (
                  <button
                    onClick={() => SpeechService.speakText(m.text.slice(0, 200), 1.0)}
                    className="mt-2 text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe audio giải thích</span>
                  </button>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white shrink-0 text-xs font-bold">
                  MA
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 italic">
              <Sparkles className="w-4 h-4 text-[#A3E635] animate-spin" />
              <span>AI Tutor đang soạn câu trả lời sư phạm...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-[#121620] border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
          <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-400" />
            <span>Gợi ý:</span>
          </span>
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 bg-[#1c2230] hover:bg-blue-900/40 hover:text-blue-300 border border-slate-800 rounded-lg text-[11px] text-slate-300 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 sm:p-4 bg-[#161a23] border-t border-slate-800 flex items-center gap-2 shrink-0">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Hỏi AI Tutor về ngữ pháp, bài tập, từ vựng..."
            className="flex-1 px-4 py-2.5 bg-[#0d1017] border border-slate-800 text-white rounded-xl text-xs sm:text-sm focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2.5 bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Gửi</span>
          </button>
        </div>
      </div>
    </div>
  );
};
