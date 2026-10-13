import { Grade, Skill, LessonDifficulty } from './index';

export type SessionStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'NEEDS_REVIEW';

export type ActivityType = 
  | 'warmup_vocab' 
  | 'core_lesson' 
  | 'practice_questions' 
  | 'check_understanding' 
  | 'review_consolidation';

export interface SessionActivity {
  id: string;
  type: ActivityType;
  title: string;
  descriptionVi: string;
  skill: Skill;
  estimatedMinutes: number;
  status: 'pending' | 'in_progress' | 'completed';
  contentPayload: {
    vocabItems?: { word: string; ipa: string; meaningVi: string; exampleEn: string }[];
    readingPassage?: { title: string; text: string; viTranslation?: string };
    audioText?: string;
    grammarFormula?: string;
    grammarRuleVi?: string;
    questionIds?: string[];
  };
}

export interface LearningSession {
  sessionId: string;
  learnerId?: string;
  curriculumVersion: string;
  grade: Grade;
  learningObjective: string;
  skillFocus: Skill;
  selectedLessonId: string;
  unitTitle: string;
  questionIds: string[];
  targetDurationMinutes: number;
  activitySequence: SessionActivity[];
  currentActivityIndex: number;
  learnerResponses: Record<string, any>;
  scorePercentage?: number;
  results?: {
    scorePercentage: number;
    strengths: string[];
    areasToImprove: string[];
    missedQuestionIds: string[];
    nextRecommendedActivityId?: string;
    nextRecommendedTab?: string;
    nextRecommendedTitle?: string;
    summaryFeedback: string;
  };
  createdAt: string;
  completedAt?: string;
  status: SessionStatus;
}

export interface DiagnosticSkillScore {
  skill: Skill;
  nameVi: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface DiagnosticResult {
  takenAt: string;
  grade: Grade;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  estimatedLevel: 'A2' | 'B1' | 'B2';
  gradeAlignment: 'below_grade' | 'at_grade' | 'above_grade';
  gradeAlignmentVi: string; // "Dưới chuẩn lớp", "Đạt chuẩn lớp", "Vượt chuẩn lớp"
  skillScores: DiagnosticSkillScore[];
  strengths: string[];
  weaknesses: string[];
  recommendedFocusSkills: Skill[];
  baselineRationale: string;
}

export interface AdaptivePlanPhase {
  phase: 'foundations' | 'application' | 'consolidation';
  phaseTitleVi: string;
  descriptionVi: string;
  targetUnits: string[];
  recommendedLab: string;
  status: 'current' | 'upcoming' | 'completed';
}

export interface AdaptiveStudyPlan {
  planId: string;
  grade: Grade;
  targetExamYear: number;
  dailyMinutesTarget: number;
  weeklyTargetDays: number;
  currentFocusSkills: Skill[];
  weakTopics: string[];
  phases: AdaptivePlanPhase[];
  nextRecommendedSession: {
    title: string;
    skill: Skill;
    unitId: string;
    unitTitle: string;
    rationale: string;
    durationMinutes: number;
    difficulty: LessonDifficulty;
    status: 'READY' | 'NEEDS_REVIEW';
    targetTab: string;
  };
  lastEvaluatedAt: string;
}
