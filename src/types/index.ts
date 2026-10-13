export type Grade = 10 | 11 | 12;

export type ProficiencyLevel = 'Chưa đánh giá' | 'A2' | 'B1' | 'B2';
export type LessonDifficulty = 'Cơ bản' | 'Trung cấp' | 'Nâng cao';

export interface StudentLearningContext {
  grade: Grade; // Khối lớp chuẩn duy nhất (10, 11, 12)
  proficiencyLevel: ProficiencyLevel; // Trình độ tiếng Anh ước lượng hoặc đã kiểm tra
  learningGoal: string; // Mục tiêu học tập (ví dụ: Thi tốt nghiệp THPT)
  preferredDuration: number; // Thời lượng phiên học (10, 15, 20, 30 phút)
  activeCurriculumVersion: string; // Chương trình GDPT 2018
}

export type Skill = 
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing'
  | 'vocabulary'
  | 'grammar'
  | 'science';

export * from './session';

export interface StudentProfile {
  name: string;
  grade: Grade;
  targetExamYear: number;
  dailyGoalMinutes: number; // 10, 15, 20, 30
  todayMinutesLogged: number;
  lastActiveDate: string;
  streakDays: number;
  hasTakenDiagnostic: boolean;
  estimatedCEFR: ProficiencyLevel;
  context: StudentLearningContext; // Single Source of Truth
  completedLessonIds: string[];
  savedVocabIds: string[];
  masteredVocabIds: string[];
  mistakeBank: MistakeRecord[];
  diagnosticResult?: import('./session').DiagnosticResult;
  activeSession?: import('./session').LearningSession;
  currentPlan?: import('./session').AdaptiveStudyPlan;
  skillStats: {
    listening: { completed: number; avgScore: number };
    speaking: { sessions: number; wordsSpoken: number };
    reading: { completed: number; avgScore: number };
    writing: { submitted: number; avgScore: number };
    vocabulary: { learned: number; reviewDue: number };
    grammar: { masteredTopics: number };
  };
}

export interface MistakeRecord {
  id: string;
  date: string;
  skill: Skill;
  topic: string;
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  reviewed: boolean;
}

export interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanationVi: string;
  skill: Skill;
  grade: Grade;
  category?: string;
  hint?: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  ipa: string;
  pos: string; // n, v, adj, adv, phr
  meaningVi: string;
  exampleEn: string;
  exampleVi: string;
  collocations: string[];
  grade: Grade;
  topic: string;
  srsStage: number; // 0: new, 1: 1 day, 2: 3 days, 3: 7 days, 4: 14 days, 5: mastered
  nextReviewDate: string;
  synonyms?: string[];
  antonyms?: string[];
  isFavorite?: boolean;
}

export interface GrammarTopic {
  id: string;
  title: string;
  titleVi: string;
  grade: Grade;
  category: string;
  formula: string;
  summaryVi: string;
  usageRules: { rule: string; exampleEn: string; exampleVi: string }[];
  commonMistakes: { wrong: string; correct: string; explanationVi: string }[];
  practiceQuestions: Question[];
}

export interface ListeningLesson {
  id: string;
  title: string;
  grade: Grade;
  topic: string;
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  estimatedMinutes: number;
  audioText: string; // used for Web Speech TTS synthesis & text
  transcript: { speaker: string; text: string; vi: string }[];
  preListeningTips: string[];
  questions: Question[];
  vocabularyHighlight: { word: string; meaningVi: string }[];
}

export interface ReadingLesson {
  id: string;
  title: string;
  grade: Grade;
  topic: string;
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  estimatedMinutes: number;
  passageText: string;
  passageTranslationVi?: string;
  vocabularyGlossary: { word: string; pos: string; meaningVi: string }[];
  questions: Question[];
  sourceBadge?: string;
}

export interface WritingPrompt {
  id: string;
  title: string;
  grade: Grade;
  type: 'sentence_transformation' | 'short_paragraph' | 'opinion_essay' | 'letter_email';
  promptEn: string;
  promptVi: string;
  wordCountMin: number;
  wordCountMax: number;
  suggestedStructures: string[];
  sampleGoodAnswer?: string;
}

export interface ScienceEnglishTopic {
  id: string;
  term: string;
  ipa: string;
  pos: string;
  vietnameseTerm: string;
  domain: 'Di truyền & Tế bào' | 'Hệ sinh thái & Môi trường' | 'Công nghệ sinh học & Y sinh' | 'Hóa sinh & Enzyme';
  englishDefinition: string;
  vietnameseExplanation: string;
  highSchoolContext: string;
  curriculumUnit: string;
  proteinOrGeneRef?: string;
  curatedSource: string;
  sampleReadingText: string;
  sampleQuestions: Question[];
}

export interface WritingFeedbackResult {
  score: number; // 0 - 100
  generalComment: string;
  bandScoreEstimate: string; // e.g. "B1 High / THPT 8.0+"
  strengths: string[];
  errors: {
    type: 'grammar' | 'vocabulary' | 'spelling' | 'coherence' | 'sentence_structure';
    originalSentence: string;
    suggestion: string;
    reasonVi: string;
    practiceDrill?: string;
  }[];
  improvedVersion: string;
}
