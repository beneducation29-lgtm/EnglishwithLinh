import { StudentProfile, MistakeRecord, VocabularyItem, Skill } from '../types';
import { VOCABULARY_LIST } from '../data/curriculumData';

const PROFILE_KEY = 'englishup_student_profile_v1';
const VOCAB_KEY = 'englishup_user_vocab_v1';

const DEFAULT_PROFILE: StudentProfile = {
  name: 'Minh Anh',
  grade: 11,
  targetExamYear: 2026,
  dailyGoalMinutes: 15,
  todayMinutesLogged: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakDays: 1,
  hasTakenDiagnostic: false,
  estimatedCEFR: 'Chưa đánh giá',
  context: {
    grade: 11,
    proficiencyLevel: 'Chưa đánh giá',
    learningGoal: 'Thi tốt nghiệp THPT & Giao tiếp',
    preferredDuration: 15,
    activeCurriculumVersion: 'GDPT 2018'
  },
  completedLessonIds: [],
  savedVocabIds: ['voc-1', 'voc-2', 'voc-3'],
  masteredVocabIds: [],
  mistakeBank: [],
  skillStats: {
    listening: { completed: 0, avgScore: 0 },
    speaking: { sessions: 0, wordsSpoken: 0 },
    reading: { completed: 0, avgScore: 0 },
    writing: { submitted: 0, avgScore: 0 },
    vocabulary: { learned: 3, reviewDue: 1 },
    grammar: { masteredTopics: 0 }
  }
};

export const StorageService = {
  getProfile(): StudentProfile {
    try {
      const data = localStorage.getItem(PROFILE_KEY);
      if (!data) return DEFAULT_PROFILE;
      const parsed: StudentProfile = JSON.parse(data);
      
      // Ensure context is synced
      if (!parsed.context) {
        parsed.context = {
          grade: parsed.grade || 11,
          proficiencyLevel: parsed.estimatedCEFR || 'Chưa đánh giá',
          learningGoal: 'Thi tốt nghiệp THPT & Giao tiếp',
          preferredDuration: parsed.dailyGoalMinutes || 15,
          activeCurriculumVersion: 'GDPT 2018'
        };
      }
      
      // Check if day changed to reset today minutes
      const today = new Date().toISOString().split('T')[0];
      if (parsed.lastActiveDate !== today) {
        parsed.todayMinutesLogged = 0;
        parsed.lastActiveDate = today;
      }
      return parsed;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: StudentProfile): void {
    try {
      // Ensure context stays strictly in sync with profile attributes
      if (!profile.context) {
        profile.context = {
          grade: profile.grade,
          proficiencyLevel: profile.estimatedCEFR,
          learningGoal: 'Thi tốt nghiệp THPT & Giao tiếp',
          preferredDuration: profile.dailyGoalMinutes,
          activeCurriculumVersion: 'GDPT 2018'
        };
      } else {
        profile.context.grade = profile.grade;
        profile.context.proficiencyLevel = profile.estimatedCEFR;
        profile.context.preferredDuration = profile.dailyGoalMinutes;
      }
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile to localStorage:', e);
    }
  },

  updateGrade(grade: 10 | 11 | 12): StudentProfile {
    const p = this.getProfile();
    p.grade = grade;
    if (p.context) {
      p.context.grade = grade;
    }
    this.saveProfile(p);
    return p;
  },

  updateDailyGoal(minutes: number): StudentProfile {
    const p = this.getProfile();
    p.dailyGoalMinutes = minutes;
    if (p.context) {
      p.context.preferredDuration = minutes;
    }
    this.saveProfile(p);
    return p;
  },

  logStudyMinutes(minutes: number): StudentProfile {
    const p = this.getProfile();
    p.todayMinutesLogged = (p.todayMinutesLogged || 0) + minutes;
    p.lastActiveDate = new Date().toISOString().split('T')[0];
    this.saveProfile(p);
    return p;
  },

  completeLesson(lessonId: string, skill: Skill, scorePercentage: number): StudentProfile {
    const p = this.getProfile();
    if (!p.completedLessonIds.includes(lessonId)) {
      p.completedLessonIds.push(lessonId);
    }

    if (skill === 'listening') {
      const count = p.skillStats.listening.completed;
      const prevAvg = p.skillStats.listening.avgScore;
      p.skillStats.listening.completed += 1;
      p.skillStats.listening.avgScore = Math.round((prevAvg * count + scorePercentage) / (count + 1));
    } else if (skill === 'reading') {
      const count = p.skillStats.reading.completed;
      const prevAvg = p.skillStats.reading.avgScore;
      p.skillStats.reading.completed += 1;
      p.skillStats.reading.avgScore = Math.round((prevAvg * count + scorePercentage) / (count + 1));
    } else if (skill === 'writing') {
      const count = p.skillStats.writing.submitted;
      const prevAvg = p.skillStats.writing.avgScore;
      p.skillStats.writing.submitted += 1;
      p.skillStats.writing.avgScore = Math.round((prevAvg * count + scorePercentage) / (count + 1));
    }

    this.saveProfile(p);
    return p;
  },

  recordMistake(mistake: Omit<MistakeRecord, 'id' | 'date' | 'reviewed'>): void {
    const p = this.getProfile();
    const newRecord: MistakeRecord = {
      ...mistake,
      id: 'err-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      date: new Date().toISOString().split('T')[0],
      reviewed: false
    };
    p.mistakeBank = [newRecord, ...(p.mistakeBank || [])].slice(0, 50); // keep last 50
    this.saveProfile(p);
  },

  getVocabularyItems(): VocabularyItem[] {
    try {
      const stored = localStorage.getItem(VOCAB_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(VOCAB_KEY, JSON.stringify(VOCABULARY_LIST));
      return VOCABULARY_LIST;
    } catch {
      return VOCABULARY_LIST;
    }
  },

  saveVocabItem(item: VocabularyItem): void {
    const list = this.getVocabularyItems();
    const index = list.findIndex(v => v.id === item.id || v.word.toLowerCase() === item.word.toLowerCase());
    if (index >= 0) {
      list[index] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(VOCAB_KEY, JSON.stringify(list));

    const p = this.getProfile();
    if (!p.savedVocabIds.includes(item.id)) {
      p.savedVocabIds.push(item.id);
      this.saveProfile(p);
    }
  },

  // Spaced Repetition Algorithm (SM-2 based stage multiplier)
  updateVocabSrs(vocabId: string, rating: 'again' | 'hard' | 'good' | 'easy'): VocabularyItem | null {
    const list = this.getVocabularyItems();
    const item = list.find(v => v.id === vocabId);
    if (!item) return null;

    let stage = item.srsStage || 0;
    let daysToAdd = 1;

    if (rating === 'again') {
      stage = Math.max(0, stage - 1);
      daysToAdd = 0.5; // review again today / tomorrow morning
    } else if (rating === 'hard') {
      stage = Math.max(1, stage);
      daysToAdd = 1;
    } else if (rating === 'good') {
      stage = stage + 1;
      daysToAdd = Math.pow(2, stage); // 2, 4, 8, 16 days
    } else if (rating === 'easy') {
      stage = stage + 2;
      daysToAdd = Math.pow(2.5, stage);
    }

    item.srsStage = stage;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + Math.ceil(daysToAdd));
    item.nextReviewDate = nextDate.toISOString();

    const p = this.getProfile();
    if (stage >= 5 && !p.masteredVocabIds.includes(item.id)) {
      p.masteredVocabIds.push(item.id);
      this.saveProfile(p);
    }

    localStorage.setItem(VOCAB_KEY, JSON.stringify(list));
    return item;
  },

  finishDiagnostic(scoreOutOf8: number): StudentProfile {
    const p = this.getProfile();
    p.hasTakenDiagnostic = true;
    if (scoreOutOf8 <= 3) {
      p.estimatedCEFR = 'A2';
    } else if (scoreOutOf8 <= 6) {
      p.estimatedCEFR = 'B1';
    } else {
      p.estimatedCEFR = 'B2';
    }
    if (p.context) {
      p.context.proficiencyLevel = p.estimatedCEFR;
    }
    this.saveProfile(p);
    return p;
  },

  saveDiagnosticResult(result: import('../types/session').DiagnosticResult): StudentProfile {
    const p = this.getProfile();
    p.hasTakenDiagnostic = true;
    p.estimatedCEFR = result.estimatedLevel;
    p.diagnosticResult = result;
    if (p.context) {
      p.context.proficiencyLevel = result.estimatedLevel;
    }
    this.saveProfile(p);
    return p;
  },

  saveActivePlan(plan: import('../types/session').AdaptiveStudyPlan): StudentProfile {
    const p = this.getProfile();
    p.currentPlan = plan;
    this.saveProfile(p);
    return p;
  },

  saveActiveSession(session: import('../types/session').LearningSession | undefined): StudentProfile {
    const p = this.getProfile();
    p.activeSession = session;
    this.saveProfile(p);
    return p;
  },

  resetAllData(): void {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(VOCAB_KEY);
  }
};
