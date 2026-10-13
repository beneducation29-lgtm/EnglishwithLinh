import { Grade, Skill, StudentProfile } from '../types';
import { 
  LearningSession, 
  DiagnosticResult, 
  AdaptiveStudyPlan, 
  SessionActivity, 
  DiagnosticSkillScore
} from '../types/session';
import { SHARED_QUESTION_BANK } from '../data/questionBankData';
import { SharedQuestion } from '../types/questionBank';
import { ALL_CURRICULA } from '../data/curriculumEngineData';
import { VOCABULARY_LIST, GRAMMAR_TOPICS } from '../data/curriculumData';
import { StorageService } from './storage';

export const LearningEngineService = {
  /**
   * Helper to retrieve all units for a given grade curriculum
   */
  getAllUnitsForGrade(grade: Grade) {
    const program = ALL_CURRICULA[grade] || ALL_CURRICULA[11];
    return program.semesters.flatMap(sem => sem.units);
  },

  /**
   * Selects 8 calibrated questions for the initial diagnostic test
   * based on the student's Grade (10, 11, or 12), balancing Vocab, Grammar, Reading, and Listening.
   */
  getDiagnosticQuestions(grade: Grade): SharedQuestion[] {
    const gradeQuestions = SHARED_QUESTION_BANK.filter(q => q.grade === grade);

    // Pick 2 vocab
    const vocabQs = gradeQuestions.filter(q => q.skill === 'vocabulary').slice(0, 2);
    // Pick 2 grammar
    const grammarQs = gradeQuestions.filter(q => q.skill === 'grammar').slice(0, 2);
    // Pick 2 reading
    const readingQs = gradeQuestions.filter(q => q.skill === 'reading').slice(0, 2);
    // Pick 2 listening
    const listeningQs = gradeQuestions.filter(q => q.skill === 'listening').slice(0, 2);

    let combined = [...vocabQs, ...grammarQs, ...readingQs, ...listeningQs];

    // If any skill has fewer than 2, fill from other questions to guarantee 8 solid questions
    if (combined.length < 8) {
      const remainingNeeded = 8 - combined.length;
      const additional = SHARED_QUESTION_BANK
        .filter(q => !combined.some(c => c.questionId === q.questionId))
        .slice(0, remainingNeeded);
      combined = [...combined, ...additional];
    }

    return combined.slice(0, 8);
  },

  /**
   * Evaluates diagnostic responses and produces an actionable assessment
   * calibrated against MOET Grade standards.
   */
  evaluateDiagnostic(
    answers: Record<string, number | string>,
    questions: SharedQuestion[],
    grade: Grade
  ): DiagnosticResult {
    let correctCount = 0;
    const skillTally: Record<string, { correct: number; total: number; nameVi: string }> = {
      vocabulary: { correct: 0, total: 0, nameVi: 'Từ vựng trọng tâm' },
      grammar: { correct: 0, total: 0, nameVi: 'Ngữ pháp & Cấu trúc' },
      reading: { correct: 0, total: 0, nameVi: 'Đọc hiểu & Ngữ cảnh' },
      listening: { correct: 0, total: 0, nameVi: 'Nghe hiểu hội thoại' },
    };

    questions.forEach(q => {
      const userAns = answers[q.questionId];
      let isCorrect = false;

      if (q.correctIndex !== undefined) {
        isCorrect = userAns === q.correctIndex;
      } else if (q.blankAnswers && q.blankAnswers.length > 0 && typeof userAns === 'string') {
        isCorrect = q.blankAnswers.some(ans => ans.toLowerCase().trim() === userAns.toLowerCase().trim());
      }
      
      const skillKey = q.skill in skillTally ? q.skill : 'vocabulary';
      skillTally[skillKey].total += 1;
      if (isCorrect) {
        correctCount += 1;
        skillTally[skillKey].correct += 1;
      }
    });

    const totalQuestions = questions.length || 8;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

    // Grade Alignment Calibration
    let gradeAlignment: 'below_grade' | 'at_grade' | 'above_grade';
    let gradeAlignmentVi: string;
    let estimatedLevel: 'A2' | 'B1' | 'B2';

    if (scorePercentage < 50) {
      gradeAlignment = 'below_grade';
      gradeAlignmentVi = `Cần củng cố nền tảng Lớp ${grade}`;
      estimatedLevel = 'A2';
    } else if (scorePercentage <= 75) {
      gradeAlignment = 'at_grade';
      gradeAlignmentVi = `Đạt chuẩn yêu cầu Lớp ${grade}`;
      estimatedLevel = 'B1';
    } else {
      gradeAlignment = 'above_grade';
      gradeAlignmentVi = `Vượt chuẩn kỳ vọng Lớp ${grade}`;
      estimatedLevel = 'B2';
    }

    // Build skill scores array
    const skillScores: DiagnosticSkillScore[] = Object.entries(skillTally).map(([skill, data]) => ({
      skill: skill as Skill,
      nameVi: data.nameVi,
      correct: data.correct,
      total: data.total,
      percentage: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
    }));

    // Strengths vs Weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const recommendedFocusSkills: Skill[] = [];

    skillScores.forEach(s => {
      if (s.percentage >= 70) {
        strengths.push(`${s.nameVi} (${s.percentage}%)`);
      } else {
        weaknesses.push(`${s.nameVi} (${s.percentage}%) - cần bổ trợ bài tập`);
        recommendedFocusSkills.push(s.skill);
      }
    });

    if (strengths.length === 0) {
      strengths.push(`Tinh thần học tập tích cực, đã sẵn sàng với lộ trình Lớp ${grade}`);
    }
    if (weaknesses.length === 0) {
      weaknesses.push('Duy trì luyện đề tốc độ và từ vựng nâng cao');
      recommendedFocusSkills.push('reading', 'writing');
    }

    const baselineRationale = 
      `Đánh giá ban đầu dựa trên 8 câu hỏi khảo sát năng lực thực tế Lớp ${grade} theo CT GDPT 2018. ` +
      `Đây là chỉ số định hướng ban đầu, không phải kỳ thi chứng chỉ chính thức. Hệ thống sẽ liên tục tự điều chỉnh lộ trình thích ứng sau mỗi buổi thực hành.`;

    const result: DiagnosticResult = {
      takenAt: new Date().toISOString(),
      grade,
      totalQuestions,
      correctCount,
      scorePercentage,
      estimatedLevel,
      gradeAlignment,
      gradeAlignmentVi,
      skillScores,
      strengths,
      weaknesses,
      recommendedFocusSkills,
      baselineRationale,
    };

    return result;
  },

  /**
   * Generates a coherent, adaptive study plan based on diagnostic baseline,
   * actual lab results, mistake bank items, and the selected grade's curriculum.
   */
  generateAdaptiveStudyPlan(profile: StudentProfile): AdaptiveStudyPlan {
    const grade = profile.grade;
    const allUnits = this.getAllUnitsForGrade(grade);
    const unit1 = allUnits[0] || { id: 'u1', title: 'Life Stories', titleVi: 'Câu chuyện cuộc sống' };
    const unit2 = allUnits[1] || unit1;

    // Detect weak skills
    const focusSkills: Skill[] = [];
    const weakTopics: string[] = [];

    if (profile.diagnosticResult) {
      profile.diagnosticResult.skillScores.forEach(s => {
        if (s.percentage < 65) {
          focusSkills.push(s.skill);
          weakTopics.push(s.nameVi);
        }
      });
    }

    // Check mistake bank for recurring weakness
    if (profile.mistakeBank && profile.mistakeBank.length > 0) {
      const unreviewed = profile.mistakeBank.filter(m => !m.reviewed);
      if (unreviewed.length >= 2) {
        const topMistakeSkill = unreviewed[0].skill;
        if (!focusSkills.includes(topMistakeSkill)) {
          focusSkills.push(topMistakeSkill);
        }
        weakTopics.push(`Sổ tay lỗi sai: ${unreviewed.length} câu chưa ôn`);
      }
    }

    // Default fallbacks if empty
    if (focusSkills.length === 0) {
      focusSkills.push('vocabulary', 'grammar', 'reading');
    }

    // Formulate next recommended session
    let nextTitle = `${unit1.titleVi}: Từ vựng & Ngữ pháp trọng tâm`;
    let nextSkill: Skill = 'vocabulary';
    let nextRationale = `Khởi động lộ trình Lớp ${grade} với chủ đề trọng tâm ${unit1.title}`;
    let nextTargetTab = 'vocabulary';

    if (focusSkills.includes('grammar')) {
      nextTitle = `${unit1.titleVi}: Luyện cấu trúc câu & Ngữ pháp`;
      nextSkill = 'grammar';
      nextRationale = `Củng cố nền tảng ngữ pháp Unit 1 theo khuyến nghị từ đánh giá ban đầu`;
      nextTargetTab = 'grammar';
    } else if (focusSkills.includes('listening')) {
      nextTitle = `${unit1.titleVi}: Luyện nghe hiểu có phụ đề song ngữ`;
      nextSkill = 'listening';
      nextRationale = `Tăng cường phản xạ nghe bắt từ khóa trong ngữ cảnh hội thoại`;
      nextTargetTab = 'listening';
    } else if (focusSkills.includes('reading')) {
      nextTitle = `${unit1.titleVi}: Đọc hiểu văn bản & Chiến thuật Skimming`;
      nextSkill = 'reading';
      nextRationale = `Thực hành kỹ thuật đọc quét và trả lời câu hỏi trắc nghiệm ngữ cảnh`;
      nextTargetTab = 'reading';
    }

    const plan: AdaptiveStudyPlan = {
      planId: `plan-${grade}-${Date.now()}`,
      grade,
      targetExamYear: profile.targetExamYear || (2024 + (13 - grade)),
      dailyMinutesTarget: profile.dailyGoalMinutes || 15,
      weeklyTargetDays: 5,
      currentFocusSkills: focusSkills,
      weakTopics: weakTopics.length > 0 ? weakTopics : ['Duy trì tiến độ học bài mới'],
      phases: [
        {
          phase: 'foundations',
          phaseTitleVi: 'Giai đoạn 1: Nền tảng Ngữ âm & Từ vựng chủ điểm',
          descriptionVi: `Nắm vững 30 từ vựng cốt lõi và các hiện tượng ngữ pháp trọng tâm của ${unit1.titleVi}`,
          targetUnits: [unit1.id],
          recommendedLab: 'vocabulary',
          status: 'current'
        },
        {
          phase: 'application',
          phaseTitleVi: 'Giai đoạn 2: Vận dụng 4 Kỹ năng (Nghe - Nói - Đọc - Viết)',
          descriptionVi: `Luyện tập đọc hiểu đoạn văn dài, nghe hội thoại bản ngữ và luyện phát âm có AI chấm điểm`,
          targetUnits: [unit1.id, unit2.id],
          recommendedLab: 'reading',
          status: 'upcoming'
        },
        {
          phase: 'consolidation',
          phaseTitleVi: 'Giai đoạn 3: Củng cố Sổ lỗi sai & Đề kiểm tra Unit',
          descriptionVi: `Khắc phục triệt để các câu làm sai trong Sổ tay lỗi và hoàn thành bài kiểm tra cuối Unit`,
          targetUnits: [unit1.id],
          recommendedLab: 'exam',
          status: 'upcoming'
        }
      ],
      nextRecommendedSession: {
        title: nextTitle,
        skill: nextSkill,
        unitId: unit1.id,
        unitTitle: unit1.titleVi,
        rationale: nextRationale,
        durationMinutes: profile.dailyGoalMinutes || 15,
        difficulty: 'Cơ bản',
        status: 'READY',
        targetTab: nextTargetTab
      },
      lastEvaluatedAt: new Date().toISOString()
    };

    return plan;
  },

  /**
   * Creates an active 5-step Guided Learning Session matching student's grade and focus
   */
  createGuidedSession(profile: StudentProfile, customSkillFocus?: Skill): LearningSession {
    const grade = profile.grade;
    const allUnits = this.getAllUnitsForGrade(grade);
    const unit = allUnits[0] || { id: 'u1', title: 'Life Stories', titleVi: 'Câu chuyện cuộc sống', lessons: [] };
    const lesson = unit.lessons[0] || { id: 'les-gen', title: 'Core Skills' };
    
    const skill: Skill = customSkillFocus || 
      (profile.currentPlan?.nextRecommendedSession.skill) || 
      'vocabulary';

    // 1. Warm-up Vocab
    const relevantVocab = VOCABULARY_LIST.filter(v => v.grade === grade).slice(0, 3);
    const warmupItems = relevantVocab.map(v => ({
      word: v.word,
      ipa: v.ipa,
      meaningVi: v.meaningVi,
      exampleEn: v.exampleEn
    }));

    // 2. Core Lesson Content
    const grammarTopic = GRAMMAR_TOPICS.find(g => g.grade === grade) || GRAMMAR_TOPICS[0];

    // 3. Practice Questions from Question Bank
    const matchedQuestions = SHARED_QUESTION_BANK
      .filter(q => q.grade === grade && (q.skill === skill || q.skill === 'vocabulary'))
      .slice(0, 3);

    const questionIds = matchedQuestions.map(q => q.questionId);

    const activities: SessionActivity[] = [
      {
        id: 'act-1-warmup',
        type: 'warmup_vocab',
        title: 'Khởi động: 3 Từ vựng Trọng tâm',
        descriptionVi: 'Lắng nghe phát âm chuẩn và ghi nhớ ngữ nghĩa ứng dụng trong ngữ cảnh bài học.',
        skill: 'vocabulary',
        estimatedMinutes: 3,
        status: 'in_progress',
        contentPayload: {
          vocabItems: warmupItems
        }
      },
      {
        id: 'act-2-core',
        type: 'core_lesson',
        title: `Trọng tâm Kiến thức: ${unit.titleVi}`,
        descriptionVi: 'Quy tắc ngữ pháp và mẫu câu chuẩn SGK GDPT 2018.',
        skill: skill,
        estimatedMinutes: 5,
        status: 'pending',
        contentPayload: {
          grammarFormula: grammarTopic.formula,
          grammarRuleVi: grammarTopic.summaryVi,
          readingPassage: {
            title: `Bản tin thực hành ${unit.titleVi}`,
            text: `High school students explore new dimensions in ${unit.title}. Consistent practice helps you master key structures and vocabulary.`,
            viTranslation: `Học sinh THPT khám phá các góc nhìn mới trong chủ đề ${unit.titleVi}. Luyện tập kiên trì giúp bạn làm chủ cấu trúc và từ vựng.`
          }
        }
      },
      {
        id: 'act-3-practice',
        type: 'practice_questions',
        title: 'Thực hành Tương tác: 3 Câu hỏi Ứng dụng',
        descriptionVi: 'Vận dụng kiến thức vừa học, nhận phản hồi giải thích chi tiết ngay lập tức.',
        skill: skill,
        estimatedMinutes: 5,
        status: 'pending',
        contentPayload: {
          questionIds: questionIds
        }
      },
      {
        id: 'act-4-check',
        type: 'check_understanding',
        title: 'Kiểm tra Nhanh Mức độ Thấu hiểu',
        descriptionVi: 'Xác nhận mức độ nắm vững trước khi cập nhật hồ sơ năng lực.',
        skill: skill,
        estimatedMinutes: 2,
        status: 'pending',
        contentPayload: {
          questionIds: questionIds.slice(0, 1)
        }
      }
    ];

    const session: LearningSession = {
      sessionId: `ses-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      curriculumVersion: 'GDPT 2018 (Thông tư 32/2018/TT-BGDĐT)',
      grade,
      learningObjective: `Làm chủ kiến thức trọng tâm ${unit.titleVi} (${skill.toUpperCase()})`,
      skillFocus: skill,
      selectedLessonId: lesson.id,
      unitTitle: unit.titleVi,
      questionIds,
      targetDurationMinutes: profile.dailyGoalMinutes || 15,
      activitySequence: activities,
      currentActivityIndex: 0,
      learnerResponses: {},
      createdAt: new Date().toISOString(),
      status: 'IN_PROGRESS'
    };

    return session;
  },

  /**
   * Finalizes a learning session, updates the student profile,
   * logs mistakes into the Mistake Bank, and recalibrates the adaptive study plan.
   */
  completeSession(
    session: LearningSession,
    userAnswers: Record<string, number | string>,
    timeSpentMinutes: number
  ): { session: LearningSession; updatedProfile: StudentProfile } {
    // Grade questions
    const questions = SHARED_QUESTION_BANK.filter(q => session.questionIds.includes(q.questionId));
    let correct = 0;
    const missedIds: string[] = [];

    questions.forEach(q => {
      const ans = userAnswers[q.questionId];
      let isCorrect = false;

      if (q.correctIndex !== undefined) {
        isCorrect = ans === q.correctIndex;
      } else if (q.blankAnswers && q.blankAnswers.length > 0 && typeof ans === 'string') {
        isCorrect = q.blankAnswers.some(b => b.toLowerCase().trim() === ans.toLowerCase().trim());
      }

      if (isCorrect) {
        correct++;
      } else {
        missedIds.push(q.questionId);
        // Record into Mistake Bank
        let correctDisplay = '';
        if (q.options && q.correctIndex !== undefined) {
          correctDisplay = q.options[q.correctIndex] || `Đáp án ${String.fromCharCode(65 + q.correctIndex)}`;
        } else if (q.blankAnswers && q.blankAnswers.length > 0) {
          correctDisplay = q.blankAnswers[0];
        } else {
          correctDisplay = 'Đáp án chuẩn SGK';
        }

        let userDisplay = 'Chưa chọn';
        if (typeof ans === 'number' && q.options && q.options[ans]) {
          userDisplay = q.options[ans];
        } else if (ans !== undefined) {
          userDisplay = String(ans);
        }

        StorageService.recordMistake({
          skill: q.skill,
          topic: q.topic || session.unitTitle,
          questionText: q.prompt,
          userAnswer: userDisplay,
          correctAnswer: correctDisplay,
          explanation: q.explanationVi || 'Xem lại quy tắc ngữ pháp và từ vựng của bài học.'
        });
      }
    });

    const scorePercentage = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 100;

    // Log study time
    StorageService.logStudyMinutes(timeSpentMinutes);

    // Complete lesson in profile
    const updatedProfile = StorageService.completeLesson(
      session.selectedLessonId,
      session.skillFocus,
      scorePercentage
    );

    // Build session summary
    const strengths: string[] = [];
    const areasToImprove: string[] = [];

    if (scorePercentage >= 80) {
      strengths.push(`Nắm vững kiến thức ${session.unitTitle} với độ chính xác cao (${scorePercentage}%)`);
    } else {
      areasToImprove.push(`Cần ôn lại các câu đã ghi vào Sổ tay lỗi sai (${missedIds.length} câu)`);
    }

    session.scorePercentage = scorePercentage;
    session.status = 'COMPLETED';
    session.completedAt = new Date().toISOString();
    session.results = {
      scorePercentage,
      strengths,
      areasToImprove,
      missedQuestionIds: missedIds,
      nextRecommendedTitle: `Luyện tập kỹ năng tiếp theo (${session.skillFocus === 'vocabulary' ? 'Ngữ pháp' : 'Đọc hiểu'})`,
      nextRecommendedTab: session.skillFocus === 'vocabulary' ? 'grammar' : 'reading',
      summaryFeedback: scorePercentage >= 80
        ? `Rất xuất sắc! Bạn đã hoàn thành mục tiêu học tập hôm nay và sẵn sàng mở rộng kiến thức mới.`
        : `Bạn đã hoàn thành phiên học! Hệ thống đã tự động lưu các câu chưa đúng vào Sổ tay lỗi sai để ôn tập lại.`
    };

    // Recalculate adaptive plan
    const updatedPlan = this.generateAdaptiveStudyPlan(updatedProfile);
    updatedProfile.currentPlan = updatedPlan;
    updatedProfile.activeSession = undefined;
    StorageService.saveProfile(updatedProfile);

    return { session, updatedProfile };
  }
};
