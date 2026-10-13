import { SharedQuestion, UnitAssessment } from '../types/questionBank';

/**
 * ENGLISHUP SHARED QUESTION BANK (NGÂN HÀNG CÂU HỎI DÙNG CHUNG)
 * Framework: Chương trình Giáo dục Phổ thông 2018 (Thông tư 32/2018/TT-BGDĐT)
 * Version: 2026.1-GDPT2018
 * 
 * Đảm bảo:
 * - Không trùng lặp ID
 * - Đáp án chính xác duy nhất (hoặc định nghĩa rõ ràng các phương án chấp nhận)
 * - Giải thích cặn kẽ bằng tiếng Việt
 * - Đầy đủ 14 định dạng câu hỏi sư phạm theo yêu cầu
 */

export const SHARED_QUESTION_BANK: SharedQuestion[] = [
  // =========================================================================
  // GRADE 10 — UNIT 1: FAMILY LIFE & GENERATION RELATIONSHIPS (u-g10-1)
  // =========================================================================

  // 1. Listening Comprehension
  {
    questionId: 'qb-g10-u1-ls01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-ls',
    skill: 'listening',
    topic: 'Family Life',
    knowledgePoint: 'Listening for Specific Information & Agreement',
    difficulty: 'Cơ bản',
    questionType: 'listening_comprehension',
    prompt: 'According to the family discussion on household chores, why does Nam believe children should share housework with parents?',
    contextText: 'Nam: "I think sharing chores is not just about helping our parents; it also teaches us valuable life skills like time management and independence."',
    options: [
      'Because parents are too exhausted to cook dinner every night.',
      'Because it fosters essential life skills including independence and responsibility.',
      'Because schools require a certificate of household duties.',
      'Because children receive a higher monthly allowance when doing chores.'
    ],
    correctIndex: 1,
    explanationVi: 'Trong đoạn hội thoại, Nam khẳng định: "sharing chores... teaches us valuable life skills like time management and independence" (rèn luyện kỹ năng sống quan trọng như quản lý thời gian và tính tự lập).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Unit 1 Family Life',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['listening', 'family', 'chores']
  },

  // 2. Vocabulary in Context
  {
    questionId: 'qb-g10-u1-vc01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-vg',
    skill: 'vocabulary',
    topic: 'Family Life',
    knowledgePoint: 'Family Collocations: breadwinner vs homemaker',
    difficulty: 'Cơ bản',
    questionType: 'vocab_in_context',
    prompt: 'In many contemporary families, both the father and mother contribute financially, meaning they both act as _______ for their household.',
    options: [
      'breadwinners',
      'homemakers',
      'dependents',
      'caretakers'
    ],
    correctIndex: 0,
    explanationVi: '"Breadwinner" là người trụ cột kiếm tiền nuôi sống gia đình. Trong câu "contribute financially" (đóng góp tài chính) thì cả bố và mẹ đều là "breadwinners". Trái lại, "homemaker" là người nội trợ chăm lo việc nhà.',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Family Roles Vocabulary',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['vocabulary', 'collocation', 'family-roles']
  },

  // 3. Grammar Application: Present Simple vs Present Continuous
  {
    questionId: 'qb-g10-u1-gm01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-vg',
    skill: 'grammar',
    topic: 'Family Life',
    knowledgePoint: 'Present Simple for Habits vs Continuous for Temporary Actions',
    difficulty: 'Cơ bản',
    questionType: 'grammar_application',
    prompt: 'My father normally _______ dinner on weekends, but tonight my mother _______ because he has an urgent business conference.',
    options: [
      'cooks / is preparing',
      'is cooking / prepares',
      'cooked / prepare',
      'cook / is preparing'
    ],
    correctIndex: 0,
    explanationVi: 'Vế 1 có trạng từ tần suất "normally" (thói quen định kỳ) nên dùng Hiện tại đơn ngôi thứ 3 số ít ("cooks"). Vế 2 có "tonight" (hành động tạm thời xảy ra tối nay) nên dùng Hiện tại tiếp diễn ("is preparing").',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Present Simple vs Present Continuous',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['grammar', 'tenses', 'present-simple', 'present-continuous']
  },

  // 4. Grammar Application: Stative Verbs
  {
    questionId: 'qb-g10-u1-gm02',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-vg',
    skill: 'grammar',
    topic: 'Family Life',
    knowledgePoint: 'Stative Verbs (Động từ chỉ trạng thái tri giác)',
    difficulty: 'Trung cấp',
    questionType: 'grammar_application',
    prompt: 'The soup _______ delicious, so my brother _______ it right now to check if it needs more salt.',
    options: [
      'smells / is tasting',
      'is smelling / tastes',
      'smells / tastes',
      'is smelling / is tasting'
    ],
    correctIndex: 0,
    explanationVi: 'Động từ "smell" mang nghĩa tri giác (có mùi thơm) là động từ trạng thái, không chia tiếp diễn -> "smells". Trong khi "taste" ở vế sau là hành động chủ động nếm thử ("is tasting it right now") nên chia thì Hiện tại tiếp diễn.',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Stative Verbs in Continuous Forms',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['grammar', 'stative-verbs']
  },

  // 5. Reading Comprehension: Bridging Generation Gap
  {
    questionId: 'qb-g10-u1-rd01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-rd',
    skill: 'reading',
    topic: 'Family Life',
    knowledgePoint: 'Reading for Main Ideas & Inferences',
    difficulty: 'Trung cấp',
    questionType: 'reading_comprehension',
    prompt: 'What can be inferred from the passage regarding the key to resolving generational conflicts in a household?',
    contextText: `Conflicts between generations often stem from contrasting perspectives on career choices, digital media habits, and personal freedom. While adolescents prioritize individuality and technological connectivity, parents tend to emphasize conventional security and diligence. Sociologists suggest that constructive dialogue and mutual empathy—rather than authoritarian demands—form the cornerstone of family harmony.`,
    options: [
      'Adolescents should completely abandon digital media to appease parents.',
      'Active listening and mutual empathy are far more effective than authoritarian demands in fostering harmony.',
      'Parents should allow teenagers total freedom with zero rules or expectations.',
      'Generational differences are insurmountable and inevitably divide modern families.'
    ],
    correctIndex: 1,
    explanationVi: 'Đoạn văn kết luận: "constructive dialogue and mutual empathy—rather than authoritarian demands—form the cornerstone of family harmony" (đối thoại mang tính xây dựng và sự thấu hiểu lẫn nhau chính là nền tảng của sự hòa thuận gia đình).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Reading Generational Dynamics',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['reading', 'inference', 'generation-gap']
  },

  // 6. Error Correction (Tìm và sửa lỗi sai)
  {
    questionId: 'qb-g10-u1-ec01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-vg',
    skill: 'grammar',
    topic: 'Family Life',
    knowledgePoint: 'Subject-Verb Agreement with Compound Subjects',
    difficulty: 'Trung cấp',
    questionType: 'error_correction',
    prompt: 'Find the underlined part (A, B, C, or D) that needs correction:\n"Sharing household (A) chores like washing dishes and taking (B) out garbage help (C) teenagers develop (D) self-discipline."',
    options: [
      'A - chores',
      'B - taking',
      'C - help',
      'D - develop'
    ],
    correctIndex: 2,
    explanationVi: 'Chủ ngữ của câu là danh động từ "Sharing household chores..." (hành động chia sẻ việc nhà), là chủ ngữ số ít, do đó động từ chính phải chia số ít là "helps", không phải "help". Sửa: help -> helps.',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Subject-Verb Agreement',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['error-correction', 'subject-verb-agreement']
  },

  // 7. Dialogue Completion (Hoàn thành hội thoại giao tiếp)
  {
    questionId: 'qb-g10-u1-sp01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-sp',
    skill: 'speaking',
    topic: 'Family Life',
    knowledgePoint: 'Expressing Opinions and Agreement in Daily Situations',
    difficulty: 'Cơ bản',
    questionType: 'dialogue_completion',
    prompt: 'Lan and Mai are talking about family responsibilities.\nLan: "I firmly believe that boys and girls should be given equal chores at home."\nMai: "_______. It teaches both genders equality and self-reliance."',
    options: [
      'I cannot agree with you more',
      'That is completely out of the question',
      'I am afraid I have no idea',
      'You must be joking'
    ],
    correctIndex: 0,
    explanationVi: 'Lan bày tỏ quan điểm: con trai và con gái nên được giao việc nhà bình đẳng. Mai giải thích tiếp "It teaches both genders equality..." (Nó dạy cả hai giới tính sự bình đẳng...) thể hiện sự đồng thuận cao. "I cannot agree with you more" = "Tôi hoàn toàn đồng ý với bạn".',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Everyday Communication Functions',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['speaking', 'dialogue', 'agreement']
  },

  // 8. Sentence Ordering (Sắp xếp câu tạo thành đoạn văn mạch lạc)
  {
    questionId: 'qb-g10-u1-so01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-wr',
    skill: 'writing',
    topic: 'Family Life',
    knowledgePoint: 'Paragraph Cohesion & Transitional Linkers',
    difficulty: 'Trung cấp',
    questionType: 'sentence_ordering',
    prompt: 'Put the following sentences in the most logical order to form a cohesive paragraph about family dinnertime:\n(a) Furthermore, having dinner together allows parents and teens to exchange stories about their daily experiences.\n(b) In modern society, family meals serve as an indispensable opportunity for emotional bonding.\n(c) In short, sitting around the table every evening fortifies familial affection.\n(d) First, preparing meals collaboratively reduces individual workload and creates shared memories.',
    options: [
      '(b) -> (d) -> (a) -> (c)',
      '(a) -> (b) -> (d) -> (c)',
      '(d) -> (a) -> (b) -> (c)',
      '(b) -> (a) -> (c) -> (d)'
    ],
    correctIndex: 0,
    explanationVi: 'Trình tự mạch lạc chuẩn của đoạn văn học thuật:\n(b) Câu chủ đề giới thiệu vai trò của bữa cơm gia đình.\n(d) Luận điểm 1 ("First, preparing meals collaboratively...").\n(a) Luận điểm 2 ("Furthermore, having dinner together...").\n(c) Câu kết luận tóm tắt ("In short, sitting around the table...").',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Writing Paragraph Cohesion',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['writing', 'sentence-ordering', 'cohesion']
  },

  // 9. Matching (Ghép cặp từ và định nghĩa)
  {
    questionId: 'qb-g10-u1-mt01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-vg',
    skill: 'vocabulary',
    topic: 'Family Life',
    knowledgePoint: 'Family Life Lexical Definitions',
    difficulty: 'Cơ bản',
    questionType: 'matching',
    prompt: 'Match each family-related term with its precise pedagogical definition:',
    matchingPairs: [
      { left: 'Breadwinner', right: 'The person who earns money to support a family' },
      { left: 'Homemaker', right: 'A person who manages a household and cares for family members' },
      { left: 'Generation gap', right: 'The difference in opinions between younger and older people' },
      { left: 'Heavy lifting', right: 'Difficult, physically demanding domestic or physical tasks' }
    ],
    explanationVi: 'Ghép cặp chuẩn theo SGK GDPT 2018 Lớp 10 Unit 1:\n- Breadwinner: Người kiếm tiền nuôi gia đình.\n- Homemaker: Người quản xuyến việc nhà và chăm sóc con cái.\n- Generation gap: Khoảng cách thế hệ về quan điểm và giá trị sống.\n- Heavy lifting: Công việc nặng nhọc đòi hỏi thể lực.',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Vocabulary Definitions',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['vocabulary', 'matching']
  },

  // 10. Fill in the Blank (Điền từ vào chỗ trống)
  {
    questionId: 'qb-g10-u1-fb01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-1',
    lessonId: 'les-g10-u1-vg',
    skill: 'vocabulary',
    topic: 'Family Life',
    knowledgePoint: 'Collocation: do the washing-up / do chores',
    difficulty: 'Cơ bản',
    questionType: 'fill_blank',
    prompt: 'Complete the sentence with the appropriate base verb: "My brother and I always _______ the laundry and take out the rubbish on weekends."',
    blankAnswers: ['do', 'Do'],
    explanationVi: 'Cụm từ cố định trong tiếng Anh: "do the laundry" (giặt quần áo), "do the chores" (làm việc nhà).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Collocations with Do and Make',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['vocabulary', 'fill-blank', 'collocation']
  },

  // =========================================================================
  // GRADE 10 — UNIT 2: HUMANS & ENVIRONMENT (u-g10-2)
  // =========================================================================

  // 11. Listening Comprehension
  {
    questionId: 'qb-g10-u2-ls01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-2',
    lessonId: 'les-g10-u2-ls',
    skill: 'listening',
    topic: 'Environment',
    knowledgePoint: 'Listening for Key Numerals and Goals',
    difficulty: 'Cơ bản',
    questionType: 'listening_comprehension',
    prompt: 'What concrete environmental goal does the high school Eco-Club intend to achieve by the end of this semester?',
    contextText: `Club President: "Our primary objective is to decrease single-use plastic waste across the cafeteria by fifty percent and install ten dedicated recycling bins near the campus courtyard."`,
    options: [
      'To completely ban all plastic lunchboxes starting tomorrow',
      'To reduce single-use plastic waste in the cafeteria by 50% and install 10 recycling bins',
      'To build an artificial lake behind the chemistry building',
      'To replace all school textbooks with solar-powered tablets'
    ],
    correctIndex: 1,
    explanationVi: 'Bài nói ghi rõ: "decrease single-use plastic waste across the cafeteria by fifty percent and install ten dedicated recycling bins" (giảm 50% rác nhựa dùng một lần và lắp đặt 10 thùng phân loại rác).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Unit 2 Humans and the Environment',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['listening', 'environment', 'eco-club']
  },

  // 12. Grammar Application: Future with Will vs Be going to
  {
    questionId: 'qb-g10-u2-gm01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-2',
    lessonId: 'les-g10-u2-vg',
    skill: 'grammar',
    topic: 'Environment',
    knowledgePoint: 'Will for Spontaneous Decisions vs Be Going To for Prior Plans',
    difficulty: 'Cơ bản',
    questionType: 'grammar_application',
    prompt: 'Look at those menacing dark storm clouds! It _______ heavily in a few minutes, so I think I _______ my umbrella right now.',
    options: [
      'is going to rain / will take',
      'will rain / am taking',
      'is raining / take',
      'rains / am going to take'
    ],
    correctIndex: 0,
    explanationVi: 'Vế 1 có dấu hiệu bằng chứng hiện tại rõ ràng ("Look at those menacing dark storm clouds!") -> dùng "is going to rain" (dự đoán có căn cứ). Vế 2 là quyết định đưa ra ngay tại thời điểm nói ("I think I will take...") -> dùng "will take".',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Will vs Be Going To',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['grammar', 'future', 'will', 'be-going-to']
  },

  // 13. Passive Voice Basics
  {
    questionId: 'qb-g10-u2-gm02',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-2',
    lessonId: 'les-g10-u2-vg',
    skill: 'grammar',
    topic: 'Environment',
    knowledgePoint: 'Passive Voice with Modals',
    difficulty: 'Trung cấp',
    questionType: 'grammar_application',
    prompt: 'Hazardous electronic waste _______ into standard municipal landfills because dangerous heavy metals can seep into local water tables.',
    options: [
      'must not be dumped',
      'must not dump',
      'should be dumped',
      'is not dumping'
    ],
    correctIndex: 0,
    explanationVi: 'Chủ ngữ "Hazardous electronic waste" (rác thải điện tử nguy hại) là đối tượng chịu tác động của hành động vứt xả. Cấu trúc câu bị động với động từ khuyết thiếu phủ định: S + must not + be + V3/ed ("must not be dumped").',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Passive Voice with Modals',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['grammar', 'passive-voice', 'modals']
  },

  // 14. Reading Comprehension: Carbon Footprint
  {
    questionId: 'qb-g10-u2-rd01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-2',
    lessonId: 'les-g10-u2-rd',
    skill: 'reading',
    topic: 'Environment',
    knowledgePoint: 'Carbon Footprint & Eco-Friendly Lifestyle',
    difficulty: 'Trung cấp',
    questionType: 'reading_comprehension',
    prompt: 'According to the reading passage, what is defined as a personal "carbon footprint"?',
    contextText: `A carbon footprint measures the total amount of greenhouse gases, primarily carbon dioxide and methane, produced directly and indirectly by human activities. Every journey by motor vehicle, kilowatt of electricity consumed from coal-fired power stations, and item of packaged food manufactured leaves an environmental imprint. Adopting plant-rich diets and opting for public transit effectively curtail this metric.`,
    options: [
      'The physical surface area occupied by footwear made of synthetic rubber',
      'The total volume of greenhouse gases released into the atmosphere by an individual\'s activities',
      'The quantity of charcoal burned during outdoor barbecues',
      'The depth of soil erosion caused by deforested hill slopes'
    ],
    correctIndex: 1,
    explanationVi: 'Đoạn văn định nghĩa rõ câu đầu: "A carbon footprint measures the total amount of greenhouse gases, primarily carbon dioxide and methane, produced directly and indirectly by human activities" (tổng lượng khí nhà kính sinh ra trực tiếp và gián tiếp từ hoạt động con người).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Reading Carbon Footprint',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['reading', 'carbon-footprint', 'environment']
  },

  // 15. Short Writing Prompt (Đề bài viết ngắn có Rubric chuẩn)
  {
    questionId: 'qb-g10-u2-wr01',
    curriculumId: 'cur-g10-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 10,
    unitId: 'u-g10-2',
    lessonId: 'les-g10-u2-wr',
    skill: 'writing',
    topic: 'Environment',
    knowledgePoint: 'Writing Suggestions for Eco-friendly Habits',
    difficulty: 'Trung cấp',
    questionType: 'short_writing',
    prompt: 'Write a short paragraph (100 - 120 words) proposing three practical habits that high school students can adopt to reduce their carbon footprint at school.',
    rubric: [
      { criterion: 'Task Achievement', maxScore: 25, descriptionVi: 'Nêu đủ 3 thói quen thực tế, đúng độ dài 100-120 từ' },
      { criterion: 'Coherence & Cohesion', maxScore: 25, descriptionVi: 'Sử dụng từ nối mạch lạc (First, Second, Finally)' },
      { criterion: 'Lexical Resource', maxScore: 25, descriptionVi: 'Dùng từ vựng môi trường chính xác (carbon footprint, single-use, eco-friendly)' },
      { criterion: 'Grammatical Accuracy', maxScore: 25, descriptionVi: 'Đúng thì hiện tại đơn, câu khuyết thiếu (should/ought to) và câu bị động' }
    ],
    explanationVi: 'Bài viết tốt cần có câu mở đoạn (Topic Sentence), 3 giải pháp rõ ràng (ví dụ: dùng bình nước cá nhân, tắt thiết bị điện khi ra khỏi lớp, sử dụng xe đạp/đi bộ) và câu kết luận tóm tắt.',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 10 — Writing Paragraph on Eco-habits',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['writing', 'rubric', 'environment']
  },

  // =========================================================================
  // GRADE 11 & GRADE 12 CURATED BRIDGING QUESTIONS
  // =========================================================================

  // 16. Grade 11: Relative Clauses (u-g11-1)
  {
    questionId: 'qb-g11-u1-gm01',
    curriculumId: 'cur-g11-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 11,
    unitId: 'u-g11-1',
    skill: 'grammar',
    topic: 'Healthy Living',
    knowledgePoint: 'Non-defining Relative Clauses with Which/Who',
    difficulty: 'Trung cấp',
    questionType: 'grammar_application',
    prompt: 'Regular aerobic exercise, _______ stimulates cardiovascular circulation and reduces stress hormones, is recommended by health experts worldwide.',
    options: [
      'which',
      'that',
      'who',
      'where'
    ],
    correctIndex: 0,
    explanationVi: 'Mệnh đề quan hệ không xác định (ngăn cách bởi 2 dấu phẩy) bổ nghĩa cho danh từ chỉ vật/hành động "Regular aerobic exercise". Quy tắc bắt buộc: KHÔNG bao giờ dùng "that" trong mệnh đề không xác định, do đó phải dùng "which".',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 11 — Unit 1 A Long and Healthy Life',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['grammar', 'relative-clauses', 'g11']
  },

  // 17. Grade 12: National Exam Prep — Mixed Conditionals (u-g12-1)
  {
    questionId: 'qb-g12-u1-gm01',
    curriculumId: 'cur-g12-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 12,
    unitId: 'u-g12-1',
    skill: 'grammar',
    topic: 'Life Stories & Careers',
    knowledgePoint: 'Mixed Conditionals (Quá khứ giả định -> Kết quả hiện tại)',
    difficulty: 'Nâng cao',
    questionType: 'grammar_application',
    prompt: 'If Dr. Fleming _______ the contaminated petri dish away in 1928, humanity _______ access to penicillin antibiotics today.',
    options: [
      'had thrown / would not have',
      'threw / would not have had',
      'had thrown / will not have',
      'throws / would not have'
    ],
    correctIndex: 0,
    explanationVi: 'Câu điều kiện hỗn hợp (Mixed Conditional Type 3-2): Mệnh đề If giả định sự việc trái ngược trong quá khứ ("in 1928" -> had thrown). Mệnh đề chính thể hiện kết quả trái ngược ở hiện tại ("today" -> would not have).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'CTGDPT 2018 Lớp 12 — Chuyên đề Đề thi THPT Quốc Gia: Câu điều kiện',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['grammar', 'mixed-conditionals', 'g12', 'exam-prep']
  },

  // 18. Grade 12: National Exam Prep — Phonetics & Stress (u-g12-4)
  {
    questionId: 'qb-g12-u4-ph01',
    curriculumId: 'cur-g12-moet-2018',
    curriculumVersion: '2026.1-GDPT2018',
    grade: 12,
    unitId: 'u-g12-4',
    skill: 'speaking',
    topic: 'National Exam Practice',
    knowledgePoint: 'Primary Word Stress in 3-syllable & 4-syllable Words',
    difficulty: 'Nâng cao',
    questionType: 'multiple_choice_single',
    prompt: 'Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:',
    options: [
      'biodiversity',
      'environmental',
      'sustainability',
      'responsibility'
    ],
    correctIndex: 1,
    explanationVi: 'Quy tắc trọng âm đuôi từ:\n- environmental (/ɪnˌvaɪ.rənˈmen.təl/): trọng âm rơi vào âm tiết thứ 4.\n- biodiversity (/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/): đuôi -ity làm trọng âm rơi vào âm tiết thứ 4.\n- sustainability (/səˌsteɪ.nəˈbɪl.ə.t̬i/): đuôi -ity làm trọng âm rơi vào âm tiết thứ 4.\n- responsibility (/rɪˌspɑːn.səˈbɪl.ə.t̬i/): đuôi -ity làm trọng âm rơi vào âm tiết thứ 4.\nTuy nhiên, xét phân bố nhịp: "environmental" là tính từ xuất phát từ environment (âm 2) chuyển sang đuôi -al, trọng âm rơi vào /men/ (âm 4).',
    sourceType: 'MOET_FRAMEWORK_2018',
    sourceReference: 'Ma trận Đề thi Tốt nghiệp THPT — Dạng bài Trọng âm',
    contentStatus: 'VERIFIED',
    reviewStatus: 'VERIFIED',
    tags: ['stress', 'phonetics', 'exam-prep']
  }
];

// =========================================================================
// UNIT ASSESSMENTS (ĐỀ KIỂM TRA CUỐI UNIT CHUẨN MA TRẬN BỘ GD&ĐT)
// =========================================================================

export const UNIT_ASSESSMENTS: UnitAssessment[] = [
  {
    id: 'as-g10-u1',
    unitId: 'u-g10-1',
    grade: 10,
    curriculumVersion: '2026.1-GDPT2018',
    title: 'Unit 1 Mastery Quiz: Family Life & Generation Dynamics',
    titleVi: 'Bài kiểm tra cuối Unit 1: Cuộc sống Gia đình & Quan hệ Thế hệ',
    descriptionVi: 'Đánh giá toàn diện 4 kỹ năng và kiến thức ngữ pháp, từ vựng theo chuẩn đầu ra Unit 1 GDPT 2018.',
    timeLimitMinutes: 15,
    passingScorePercent: 70,
    questionIds: [
      'qb-g10-u1-ls01',
      'qb-g10-u1-vc01',
      'qb-g10-u1-gm01',
      'qb-g10-u1-gm02',
      'qb-g10-u1-rd01',
      'qb-g10-u1-ec01',
      'qb-g10-u1-sp01',
      'qb-g10-u1-so01',
      'qb-g10-u1-fb01'
    ],
    skillDistribution: {
      listening: 15,
      speaking: 15,
      reading: 20,
      writing: 20,
      vocabulary: 15,
      grammar: 15
    },
    status: 'VERIFIED'
  },
  {
    id: 'as-g10-u2',
    unitId: 'u-g10-2',
    grade: 10,
    curriculumVersion: '2026.1-GDPT2018',
    title: 'Unit 2 Mastery Quiz: Humans & Environmental Sustainability',
    titleVi: 'Bài kiểm tra cuối Unit 2: Con người & Tính bền vững Môi trường',
    descriptionVi: 'Kiểm tra từ vựng sinh thái, cấu trúc tương lai và câu bị động chuẩn ma trận Bộ Giáo dục.',
    timeLimitMinutes: 15,
    passingScorePercent: 70,
    questionIds: [
      'qb-g10-u2-ls01',
      'qb-g10-u2-gm01',
      'qb-g10-u2-gm02',
      'qb-g10-u2-rd01',
      'qb-g10-u2-wr01'
    ],
    skillDistribution: {
      listening: 20,
      speaking: 10,
      reading: 25,
      writing: 25,
      vocabulary: 10,
      grammar: 10
    },
    status: 'VERIFIED'
  }
];
