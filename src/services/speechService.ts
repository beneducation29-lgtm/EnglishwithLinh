// Speech synthesis and recognition service for Listening and Speaking Labs

export interface PronunciationDiffResult {
  score: number; // 0 to 100
  words: {
    word: string;
    status: 'correct' | 'missing' | 'mispronounced' | 'extra';
  }[];
  feedbackVi: string;
}

export const SpeechService = {
  isSynthesisAvailable(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  },

  isRecognitionAvailable(): boolean {
    if (typeof window === 'undefined') return false;
    return !!(
      (window as unknown as { SpeechRecognition: unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition: unknown }).webkitSpeechRecognition
    );
  },

  speakText(
    text: string, 
    rate: number = 1.0, 
    onEnd?: () => void, 
    onError?: (err: unknown) => void
  ): { cancel: () => void } {
    if (!this.isSynthesisAvailable()) {
      console.warn('Speech synthesis not available in this browser');
      if (onEnd) onEnd();
      return { cancel: () => {} };
    }

    window.speechSynthesis.cancel(); // stop any ongoing utterance

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate; // 0.75 to 1.5
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    if (onEnd) {
      utterance.onend = () => onEnd();
    }
    if (onError) {
      utterance.onerror = (e) => onError(e);
    }

    window.speechSynthesis.speak(utterance);

    return {
      cancel: () => {
        window.speechSynthesis.cancel();
      }
    };
  },

  stopSpeaking(): void {
    if (this.isSynthesisAvailable()) {
      window.speechSynthesis.cancel();
    }
  },

  comparePronunciation(targetSentence: string, spokenTranscript: string): PronunciationDiffResult {
    const clean = (s: string) => s.toLowerCase().replace(/[.,!?;:"'(){}\[\]]/g, '').trim().split(/\s+/).filter(Boolean);
    const targetWords = clean(targetSentence);
    const spokenWords = clean(spokenTranscript);

    if (targetWords.length === 0) {
      return { score: 0, words: [], feedbackVi: 'Chưa có câu mục tiêu để so sánh.' };
    }

    if (spokenWords.length === 0) {
      return {
        score: 0,
        words: targetWords.map(w => ({ word: w, status: 'missing' })),
        feedbackVi: 'Hệ thống chưa ghi nhận được âm thanh hoặc giọng nói của bạn. Vui lòng kiểm tra quyền micro và thử lại!'
      };
    }

    let matchCount = 0;
    const diffWords: { word: string; status: 'correct' | 'missing' | 'mispronounced' | 'extra' }[] = [];

    // Simple LCS / alignment
    targetWords.forEach((tw, index) => {
      const sw = spokenWords[index];
      if (sw === tw) {
        matchCount++;
        diffWords.push({ word: tw, status: 'correct' });
      } else if (spokenWords.includes(tw)) {
        matchCount += 0.8;
        diffWords.push({ word: tw, status: 'correct' });
      } else if (sw && this.calculateSimilarity(tw, sw) >= 0.6) {
        matchCount += 0.5;
        diffWords.push({ word: `${tw} (${sw})`, status: 'mispronounced' });
      } else {
        diffWords.push({ word: tw, status: 'missing' });
      }
    });

    const score = Math.min(100, Math.round((matchCount / targetWords.length) * 100));

    let feedbackVi = '';
    if (score >= 90) {
      feedbackVi = 'Xuất sắc! Phát âm rất rõ ràng, chuẩn ngữ âm và đầy đủ các âm tiết.';
    } else if (score >= 70) {
      feedbackVi = 'Rất tốt! Bạn phát âm đúng hầu hết các từ chính. Hãy chú ý các âm đuôi (ending sounds) và nối âm.';
    } else if (score >= 50) {
      feedbackVi = 'Khá ổn. Một số từ bị bỏ sót hoặc chưa rõ trọng âm. Hãy nghe lại audio mẫu và luyện lại từng cụm từ.';
    } else {
      feedbackVi = 'Cần luyện thêm. Hãy nói to, rõ ràng và chậm hơn theo tốc độ 0.75x của giáo viên bản ngữ.';
    }

    return { score, words: diffWords, feedbackVi };
  },

  calculateSimilarity(s1: string, s2: string): number {
    const longer = s1.length > s2.length ? s1 : s2;
    const shorter = s1.length > s2.length ? s2 : s1;
    if (longer.length === 0) return 1.0;
    
    // Levenshtein distance
    const costs: number[] = [];
    for (let i = 0; i <= longer.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= shorter.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[shorter.length] = lastValue;
    }
    return (longer.length - costs[shorter.length]) / longer.length;
  }
};
