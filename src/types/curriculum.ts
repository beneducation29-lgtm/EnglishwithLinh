import { Grade, Skill, LessonDifficulty } from './index';

export type ContentStatus = 
  | 'DRAFT'
  | 'NEEDS_REVIEW'
  | 'VERIFIED'
  | 'PUBLISHED'
  | 'CONTENT_GAP';

export type SourceType = 
  | 'MOET_FRAMEWORK_2018'      // Khung chương trình GDPT 2018 Bộ GD&ĐT
  | 'SUPPLEMENTARY_AI_LAB'     // Học liệu mở rộng bổ trợ AI Lab
  | 'NATIONAL_EXAM_PREP'       // Chuyên đề luyện thi tốt nghiệp THPT
  | 'REAL_COMMUNICATION';      // Giao tiếp phản xạ thực tế

export interface SkillBalanceDistribution {
  listeningPercent: number;  // Target: 20%
  speakingPercent: number;   // Target: 20%
  readingPercent: number;    // Target: 20%
  writingPercent: number;    // Target: 20%
  vocabGrammarPercent: number; // Target: 20% (10% Vocab + 10% Grammar)
}

export interface CurriculumLesson {
  id: string;
  unitId: string;
  grade: Grade;
  curriculumVersion: string;
  title: string;
  titleVi: string;
  skillFocus: Skill;
  learningObjectives: string[];
  prerequisites: string[];
  estimatedMinutes: number;
  difficulty: LessonDifficulty;
  vocabularyRefs: string[]; // List of vocabulary item IDs or headwords
  grammarRefs: string[];    // List of grammar topic IDs
  activityRefId?: string;   // Reference to Listening/Reading/Writing/Speaking dataset ID
  assessmentQuestionIds?: string[];
  reviewDrillId?: string;
  status: ContentStatus;
  statusNotes?: string;
}

export interface CurriculumUnit {
  id: string;
  unitNumber: number;
  title: string;
  titleVi: string;
  grade: Grade;
  theme: string;
  sourceType: SourceType;
  sourceReference?: string;
  knowledgeObjectives: string[];
  keyVocabularyWords: string[];
  keyGrammarTopics: string[];
  skillsCovered: Skill[];
  lessons: CurriculumLesson[];
  skillsBalance: SkillBalanceDistribution;
  prerequisites?: string[];
  reviewStatus: ContentStatus;
  verifiedSourceNotes?: string;
}

export interface Semester {
  semesterId: string;
  semesterNumber: 1 | 2;
  name: string;
  nameVi: string;
  units: CurriculumUnit[];
}

export interface CurriculumGradeProgram {
  curriculumId: string;
  curriculumVersion: string; // e.g. "CTGDPT-2018-v2.1"
  grade: Grade;
  name: string;
  descriptionVi: string;
  sourceType: SourceType;
  sourceReference: string;
  status: ContentStatus;
  reviewStatus: ContentStatus;
  createdAt: string;
  updatedAt: string;
  semesters: Semester[];
}

export interface CurriculumValidationIssue {
  type: 'DUPLICATE_ID' | 'BROKEN_REFERENCE' | 'MISSING_OBJECTIVE' | 'SKILL_GAP' | 'INVALID_STATUS' | 'BALANCE_IMBALANCE';
  severity: 'error' | 'warning' | 'info';
  entityId: string;
  message: string;
}

export interface CoverageReport {
  grade: Grade;
  totalUnits: number;
  totalLessons: number;
  totalMinutes: number;
  skillsCounts: Record<Skill, number>;
  statusCounts: Record<ContentStatus, number>;
  balanceScore: number; // 0 - 100 indicating closeness to 20-20-20-20-20
  hasBrokenRefs: boolean;
  issuesCount: number;
}
