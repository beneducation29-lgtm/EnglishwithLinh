import { Grade, Skill } from '../types';
import { 
  SharedQuestion, 
  UnitAssessment, 
  QuestionBankValidationReport, 
  UnitCoverageReport 
} from '../types/questionBank';
import { SHARED_QUESTION_BANK, UNIT_ASSESSMENTS } from '../data/questionBankData';
import { ALL_CURRICULA } from '../data/curriculumEngineData';
import { ContentStatus } from '../types/curriculum';

export const QuestionBankService = {
  /**
   * Retrieve all verified questions in the shared repository
   */
  getAllQuestions(): SharedQuestion[] {
    return SHARED_QUESTION_BANK;
  },

  /**
   * Find a specific question by unique questionId
   */
  getQuestionById(questionId: string): SharedQuestion | undefined {
    return SHARED_QUESTION_BANK.find(q => q.questionId === questionId);
  },

  /**
   * Get all questions assigned to a specific curriculum Unit
   */
  getQuestionsForUnit(unitId: string): SharedQuestion[] {
    return SHARED_QUESTION_BANK.filter(q => q.unitId === unitId);
  },

  /**
   * Get all questions filtered by student's target Grade (10, 11, 12)
   */
  getQuestionsForGrade(grade: Grade): SharedQuestion[] {
    return SHARED_QUESTION_BANK.filter(q => q.grade === grade);
  },

  /**
   * Get questions by skill and optional grade
   */
  getQuestionsBySkill(skill: Skill, grade?: Grade): SharedQuestion[] {
    return SHARED_QUESTION_BANK.filter(q => {
      const matchSkill = q.skill === skill;
      const matchGrade = grade ? q.grade === grade : true;
      return matchSkill && matchGrade;
    });
  },

  /**
   * Retrieve the formal Unit Assessment for a given unit
   */
  getUnitAssessment(unitId: string): UnitAssessment | undefined {
    return UNIT_ASSESSMENTS.find(a => a.unitId === unitId);
  },

  /**
   * Retrieve questions populated inside a specific assessment
   */
  getAssessmentQuestions(assessment: UnitAssessment): SharedQuestion[] {
    return assessment.questionIds
      .map(id => this.getQuestionById(id))
      .filter((q): q is SharedQuestion => q !== undefined);
  },

  /**
   * ANTI-DUPLICATION & QUALITY AUDIT VALIDATOR (Prompt Section 7 & 8)
   * Systematically checks:
   * 1. Duplicate Question IDs
   * 2. Exact Duplicate Prompts
   * 3. Broken Unit references
   * 4. Missing answer keys
   * 5. Missing explanation text
   */
  validateQuestionBank(): QuestionBankValidationReport {
    const seenIds = new Set<string>();
    const duplicateIds: string[] = [];
    const seenPrompts = new Set<string>();
    const duplicatePrompts: string[] = [];
    const brokenUnitRefs: string[] = [];
    const missingAnswerKeys: string[] = [];
    const missingExplanations: string[] = [];

    // Collect all valid unit IDs across all curricula
    const validUnitIds = new Set<string>();
    Object.values(ALL_CURRICULA).forEach(prog => {
      prog.semesters.forEach(sem => {
        sem.units.forEach(u => validUnitIds.add(u.id));
      });
    });

    const questionsByGrade: Record<Grade, number> = { 10: 0, 11: 0, 12: 0 };
    const questionsBySkill: Record<Skill, number> = {
      listening: 0,
      speaking: 0,
      reading: 0,
      writing: 0,
      vocabulary: 0,
      grammar: 0,
      science: 0
    };
    const questionsByType: Record<string, number> = {};
    const statusCounts: Record<ContentStatus, number> = {
      DRAFT: 0,
      NEEDS_REVIEW: 0,
      VERIFIED: 0,
      PUBLISHED: 0,
      CONTENT_GAP: 0
    };

    let verifiedCount = 0;
    let needsReviewCount = 0;
    let contentGapsCount = 0;

    SHARED_QUESTION_BANK.forEach(q => {
      // 1. Check ID uniqueness
      if (seenIds.has(q.questionId)) {
        duplicateIds.push(q.questionId);
      } else {
        seenIds.add(q.questionId);
      }

      // 2. Check exact prompt uniqueness
      const normalizedPrompt = q.prompt.trim().toLowerCase();
      if (seenPrompts.has(normalizedPrompt)) {
        duplicatePrompts.push(q.questionId);
      } else {
        seenPrompts.add(normalizedPrompt);
      }

      // 3. Check unit reference validity
      if (q.unitId && !validUnitIds.has(q.unitId)) {
        brokenUnitRefs.push(`${q.questionId} -> invalid unit: ${q.unitId}`);
      }

      // 4. Check answer key integrity
      if (
        (q.questionType === 'multiple_choice_single' ||
         q.questionType === 'reading_comprehension' ||
         q.questionType === 'listening_comprehension' ||
         q.questionType === 'vocab_in_context' ||
         q.questionType === 'grammar_application' ||
         q.questionType === 'error_correction' ||
         q.questionType === 'dialogue_completion' ||
         q.questionType === 'sentence_ordering') &&
        (q.correctIndex === undefined || q.correctIndex < 0)
      ) {
        missingAnswerKeys.push(q.questionId);
      } else if (q.questionType === 'fill_blank' && (!q.blankAnswers || q.blankAnswers.length === 0)) {
        missingAnswerKeys.push(q.questionId);
      }

      // 5. Check explanation
      if (!q.explanationVi || q.explanationVi.trim().length === 0) {
        missingExplanations.push(q.questionId);
      }

      // Aggregates
      if (questionsByGrade[q.grade] !== undefined) {
        questionsByGrade[q.grade]++;
      }
      if (questionsBySkill[q.skill] !== undefined) {
        questionsBySkill[q.skill]++;
      }
      questionsByType[q.questionType] = (questionsByType[q.questionType] || 0) + 1;

      if (statusCounts[q.contentStatus] !== undefined) {
        statusCounts[q.contentStatus]++;
      }

      if (q.contentStatus === 'VERIFIED' || q.contentStatus === 'PUBLISHED') {
        verifiedCount++;
      } else if (q.contentStatus === 'NEEDS_REVIEW') {
        needsReviewCount++;
      } else if (q.contentStatus === 'CONTENT_GAP') {
        contentGapsCount++;
      }
    });

    return {
      totalQuestions: SHARED_QUESTION_BANK.length,
      questionsByGrade,
      questionsBySkill,
      questionsByType: questionsByType as any,
      statusCounts,
      duplicateIds,
      brokenUnitRefs,
      missingExplanations,
      missingAnswerKeys,
      verifiedCount,
      needsReviewCount,
      contentGapsCount
    };
  },

  /**
   * COVERAGE MATRIX & CONTENT GAP AUDIT (Prompt Section 9)
   * Evaluates units against the 20-20-20-20-10-10 pedagogical target
   */
  getCoverageMatrix(grade: Grade): UnitCoverageReport[] {
    const program = ALL_CURRICULA[grade];
    if (!program) return [];

    const reports: UnitCoverageReport[] = [];

    program.semesters.forEach(sem => {
      sem.units.forEach(u => {
        const unitQuestions = this.getQuestionsForUnit(u.id);
        const skillCounts: Record<Skill, number> = {
          listening: 0,
          speaking: 0,
          reading: 0,
          writing: 0,
          vocabulary: 0,
          grammar: 0,
          science: 0
        };

        unitQuestions.forEach(q => {
          if (skillCounts[q.skill] !== undefined) {
            skillCounts[q.skill]++;
          }
        });

        // Also count lessons in unit by skill
        u.lessons.forEach(l => {
          if (skillCounts[l.skillFocus] !== undefined) {
            skillCounts[l.skillFocus]++;
          }
        });

        const totalActivities = Object.values(skillCounts).reduce((a, b) => a + b, 0);

        const skillsPercentages: Record<Skill, number> = {
          listening: totalActivities > 0 ? Math.round((skillCounts.listening / totalActivities) * 100) : 0,
          speaking: totalActivities > 0 ? Math.round((skillCounts.speaking / totalActivities) * 100) : 0,
          reading: totalActivities > 0 ? Math.round((skillCounts.reading / totalActivities) * 100) : 0,
          writing: totalActivities > 0 ? Math.round((skillCounts.writing / totalActivities) * 100) : 0,
          vocabulary: totalActivities > 0 ? Math.round((skillCounts.vocabulary / totalActivities) * 100) : 0,
          grammar: totalActivities > 0 ? Math.round((skillCounts.grammar / totalActivities) * 100) : 0,
          science: totalActivities > 0 ? Math.round((skillCounts.science / totalActivities) * 100) : 0
        };

        const contentGaps: string[] = [];
        if (skillCounts.listening === 0) contentGaps.push('Chưa có câu hỏi/bài nghe Audio cho Unit này');
        if (skillCounts.speaking === 0) contentGaps.push('Chưa có hội thoại giao tiếp / luyện phát âm');
        if (skillCounts.writing === 0) contentGaps.push('Chưa có đề viết hoặc sắp xếp câu');
        if (skillCounts.reading === 0) contentGaps.push('Chưa có bài đọc hiểu văn bản');
        if (skillCounts.vocabulary === 0) contentGaps.push('Cần bổ sung bài tập từ vựng ngữ cảnh');

        // Balanced check (has activities in at least 4 key skills)
        const activeSkills = (['listening', 'speaking', 'reading', 'writing', 'vocabulary', 'grammar'] as Skill[])
          .filter(s => skillCounts[s] > 0);

        reports.push({
          unitId: u.id,
          unitNumber: u.unitNumber,
          titleVi: u.titleVi,
          grade,
          totalQuestions: unitQuestions.length,
          totalLessons: u.lessons.length,
          skillsCovered: activeSkills,
          skillsPercentages,
          isBalanced: activeSkills.length >= 4,
          contentGaps,
          status: contentGaps.length === 0 ? 'VERIFIED' : 'NEEDS_REVIEW'
        });
      });
    });

    return reports;
  }
};
