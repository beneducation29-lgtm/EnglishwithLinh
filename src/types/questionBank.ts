import { Grade, Skill, LessonDifficulty } from './index';
import { SourceType, ContentStatus } from './curriculum';

export type QuestionType =
  | 'multiple_choice_single'
  | 'multiple_choice_multi'
  | 'fill_blank'
  | 'matching'
  | 'sentence_ordering'
  | 'error_correction'
  | 'reading_comprehension'
  | 'listening_comprehension'
  | 'vocab_in_context'
  | 'grammar_application'
  | 'short_writing'
  | 'speaking_prompt'
  | 'dialogue_completion';

export interface MatchingPair {
  left: string;
  right: string;
}

export interface RubricCriterion {
  criterion: string;
  maxScore: number;
  descriptionVi: string;
}

export interface SharedQuestion {
  questionId: string;
  curriculumId: string;
  curriculumVersion: string;
  grade: Grade;
  unitId: string;
  lessonId?: string;
  skill: Skill;
  topic: string;
  knowledgePoint: string;
  difficulty: LessonDifficulty;
  questionType: QuestionType;
  prompt: string;
  contextText?: string; // reading excerpt, audio transcript excerpt, or situation context
  options?: string[]; // for multiple choice
  correctIndex?: number; // for single-choice multiple choice
  correctIndices?: number[]; // for multi-select
  blankAnswers?: string[]; // acceptable text answers for fill_in_the_blanks
  matchingPairs?: MatchingPair[]; // for matching questions
  orderedItems?: string[]; // for sentence ordering
  rubric?: RubricCriterion[]; // for speaking & writing evaluations
  explanationVi: string; // clear rationale for why the answer is correct
  sourceType: SourceType;
  sourceReference: string;
  contentStatus: ContentStatus;
  reviewStatus: ContentStatus;
  verifiedNotes?: string;
  tags?: string[];
}

export interface UnitAssessment {
  id: string;
  unitId: string;
  grade: Grade;
  curriculumVersion: string;
  title: string;
  titleVi: string;
  descriptionVi: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  questionIds: string[];
  skillDistribution: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
    vocabulary: number;
    grammar: number;
  };
  status: ContentStatus;
}

export interface QuestionBankValidationReport {
  totalQuestions: number;
  questionsByGrade: Record<Grade, number>;
  questionsBySkill: Record<Skill, number>;
  questionsByType: Record<QuestionType, number>;
  statusCounts: Record<ContentStatus, number>;
  duplicateIds: string[];
  brokenUnitRefs: string[];
  missingExplanations: string[];
  missingAnswerKeys: string[];
  verifiedCount: number;
  needsReviewCount: number;
  contentGapsCount: number;
}

export interface UnitCoverageReport {
  unitId: string;
  unitNumber: number;
  titleVi: string;
  grade: Grade;
  totalQuestions: number;
  totalLessons: number;
  skillsCovered: Skill[];
  skillsPercentages: Record<Skill, number>;
  isBalanced: boolean;
  contentGaps: string[];
  status: ContentStatus;
}
