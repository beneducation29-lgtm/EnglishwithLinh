/**
 * Curated supplementary English content for EnglishUp.
 * CEFR labels are approximate learning targets, not official certification.
 * These lessons are original practice materials, not quoted textbook content.
 */
export type LessonSkill = 'vocabulary' | 'grammar' | 'reading' | 'listening' | 'speaking' | 'writing';
export type LessonLevel = 'A2' | 'B1' | 'B2';

export interface PracticeQuestion {
  id: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  explanationVi: string;
}

export interface EnglishLessonContent {
  id: string;
  grade: 10 | 11 | 12;
  unit: number;
  title: string;
  titleVi: string;
  theme: string;
  level: LessonLevel;
  skills: LessonSkill[];
  objectives: string[];
  vocabulary: Array<{ word: string; ipa: string; meaningVi: string; example: string; exampleVi: string }>;
  grammar: { focus: string; formula: string; explanationVi: string; examples: Array<{ en: string; vi: string }> };
  reading: { title: string; text: string; questions: PracticeQuestion[] };
  speaking: { scenario: string; prompt: string; usefulExpressions: string[] };
  writing: { task: string; checklist: string[] };
}

export const supplementaryEnglishLessons: EnglishLessonContent[] = [
  {
    id: 'g10-u1-healthy-lifestyle',
    grade: 10,
    unit: 1,
    title: 'Building a Healthy Lifestyle',
    titleVi: 'Xây dựng lối sống lành mạnh',
    theme: 'Health and daily routines',
    level: 'A2',
    skills: ['vocabulary', 'grammar', 'reading', 'speaking', 'writing'],
    objectives: [
      'Describe healthy and unhealthy daily habits.',
      'Use the present simple to discuss routines and facts.',
      'Give one practical suggestion using should or should not.'
    ],
    vocabulary: [
      { word: 'balanced diet', ipa: '/ˌbælənst ˈdaɪət/', meaningVi: 'chế độ ăn cân bằng', example: 'A balanced diet includes vegetables, fruit, and protein.', exampleVi: 'Chế độ ăn cân bằng gồm rau, trái cây và chất đạm.' },
      { word: 'stay hydrated', ipa: '/steɪ ˈhaɪdreɪtɪd/', meaningVi: 'giữ đủ nước cho cơ thể', example: 'I carry a water bottle to stay hydrated.', exampleVi: 'Tôi mang theo bình nước để cơ thể đủ nước.' },
      { word: 'regular exercise', ipa: '/ˈreɡjələr ˈeksərsaɪz/', meaningVi: 'việc tập thể dục đều đặn', example: 'Regular exercise can improve your mood.', exampleVi: 'Tập thể dục đều đặn có thể cải thiện tâm trạng.' },
      { word: 'get enough sleep', ipa: '/ɡet ɪˈnʌf sliːp/', meaningVi: 'ngủ đủ giấc', example: 'Teenagers should get enough sleep.', exampleVi: 'Thanh thiếu niên nên ngủ đủ giấc.' },
      { word: 'cut down on', ipa: '/kʌt daʊn ɒn/', meaningVi: 'cắt giảm', example: 'I am trying to cut down on sugary drinks.', exampleVi: 'Tôi đang cố gắng cắt giảm đồ uống có đường.' }
    ],
    grammar: {
      focus: 'Present simple and should / should not',
      formula: 'S + V(s/es) for habits; S + should (not) + base verb for advice.',
      explanationVi: 'Thì hiện tại đơn diễn tả thói quen hoặc sự thật. Sau should/should not, động từ giữ nguyên mẫu; không thêm to.',
      examples: [
        { en: 'Lan walks to school every day.', vi: 'Lan đi bộ đến trường mỗi ngày.' },
        { en: 'You should take short breaks when studying.', vi: 'Bạn nên nghỉ giải lao ngắn khi học.' },
        { en: 'You should not skip breakfast.', vi: 'Bạn không nên bỏ bữa sáng.' }
      ]
    },
    reading: {
      title: 'Small Habits, Real Benefits',
      text: 'Minh used to stay up late and skip breakfast. He often felt tired in his first lessons. This month, he has started making small changes. He prepares his schoolbag before bed, drinks water during the day, and walks with a friend after school. He does not expect to change everything in one week. Instead, he chooses one realistic goal at a time and records his progress in a notebook.',
      questions: [
        { id: 'g10-u1-q1', prompt: 'Why did Minh often feel tired in his first lessons?', options: ['He stayed up late and skipped breakfast.', 'He walked with a friend.', 'He prepared his schoolbag early.', 'He wrote in a notebook.'], answerIndex: 0, explanationVi: 'Bài đọc nêu rõ Minh thường thức khuya và bỏ bữa sáng, vì vậy cậu ấy mệt trong các tiết học đầu tiên.' },
        { id: 'g10-u1-q2', prompt: 'What is Minh’s approach to changing his habits?', options: ['Change everything immediately.', 'Choose one realistic goal at a time.', 'Stop recording his progress.', 'Avoid walking after school.'], answerIndex: 1, explanationVi: 'Minh chọn từng mục tiêu thực tế thay vì cố thay đổi mọi thứ cùng lúc.' }
      ]
    },
    speaking: {
      scenario: 'A friendly conversation about everyday wellbeing',
      prompt: 'Describe one healthy habit you have and one habit you would like to improve. Explain why.',
      usefulExpressions: ['I usually...', 'I am trying to...', 'I would like to improve...', 'One reason is that...', 'I think I should...']
    },
    writing: {
      task: 'Write 80–100 words about three small habits that can help students feel healthier and study more effectively.',
      checklist: ['Include a clear topic sentence.', 'Use at least three words from the vocabulary list.', 'Use should / should not correctly.', 'Give one reason or example for each suggestion.', 'Check subject–verb agreement and punctuation.']
    }
  },
  {
    id: 'g11-u1-digital-wellbeing',
    grade: 11,
    unit: 1,
    title: 'Digital Wellbeing and Study Focus',
    titleVi: 'Sức khỏe số và khả năng tập trung học tập',
    theme: 'Technology and learning',
    level: 'B1',
    skills: ['vocabulary', 'grammar', 'reading', 'speaking', 'writing'],
    objectives: [
      'Explain how digital habits can affect concentration.',
      'Use first conditional sentences to discuss likely results.',
      'Suggest realistic ways to manage screen time.'
    ],
    vocabulary: [
      { word: 'distraction', ipa: '/dɪˈstrækʃən/', meaningVi: 'sự xao nhãng', example: 'Notifications can become a distraction during revision.', exampleVi: 'Thông báo có thể gây xao nhãng khi ôn tập.' },
      { word: 'set a limit', ipa: '/set ə ˈlɪmɪt/', meaningVi: 'đặt ra giới hạn', example: 'I set a limit on social media after 9 p.m.', exampleVi: 'Tôi đặt giới hạn dùng mạng xã hội sau 9 giờ tối.' },
      { word: 'stay focused', ipa: '/steɪ ˈfəʊkəst/', meaningVi: 'duy trì sự tập trung', example: 'A quiet desk helps me stay focused.', exampleVi: 'Bàn học yên tĩnh giúp tôi tập trung.' },
      { word: 'take a break', ipa: '/teɪk ə breɪk/', meaningVi: 'nghỉ giải lao', example: 'Take a short break after a focused study session.', exampleVi: 'Hãy nghỉ ngắn sau một phiên học tập trung.' },
      { word: 'reliable source', ipa: '/rɪˈlaɪəbl sɔːs/', meaningVi: 'nguồn đáng tin cậy', example: 'Check whether an article comes from a reliable source.', exampleVi: 'Hãy kiểm tra xem bài viết có đến từ nguồn đáng tin cậy không.' }
    ],
    grammar: {
      focus: 'First conditional',
      formula: 'If + present simple, will + base verb.',
      explanationVi: 'Câu điều kiện loại 1 nói về một điều kiện có thể xảy ra và kết quả có khả năng xuất hiện trong tương lai. Thông thường không dùng will ngay trong mệnh đề if.',
      examples: [
        { en: 'If I turn off notifications, I will concentrate better.', vi: 'Nếu tắt thông báo, tôi sẽ tập trung tốt hơn.' },
        { en: 'If students verify information, they will avoid some online misinformation.', vi: 'Nếu học sinh kiểm chứng thông tin, các bạn sẽ tránh được một phần thông tin sai lệch trên mạng.' }
      ]
    },
    reading: {
      title: 'Making Technology Work for You',
      text: 'Digital tools can make learning more flexible, but constant notifications may interrupt deep work. Some students try a simple routine: they choose one task, silence non-essential alerts, and work for twenty minutes before taking a short break. They also check information against more than one reliable source. The goal is not to reject technology. It is to use it deliberately, so that online tools support learning rather than control attention.',
      questions: [
        { id: 'g11-u1-q1', prompt: 'What is the main idea of the passage?', options: ['Students should stop using all technology.', 'Technology is useful when managed deliberately.', 'Notifications always improve concentration.', 'Only long study sessions are effective.'], answerIndex: 1, explanationVi: 'Đoạn văn nhấn mạnh việc sử dụng công nghệ có chủ đích để hỗ trợ học tập, không phải loại bỏ hoàn toàn công nghệ.' },
        { id: 'g11-u1-q2', prompt: 'Why does the passage recommend checking more than one source?', options: ['To make tasks take longer.', 'To avoid taking breaks.', 'To assess whether information is reliable.', 'To receive more notifications.'], answerIndex: 2, explanationVi: 'Đối chiếu nhiều nguồn giúp người học đánh giá độ tin cậy của thông tin.' }
      ]
    },
    speaking: {
      scenario: 'Discussing phone use with a classmate',
      prompt: 'Suggest two ways students can reduce digital distractions without losing the benefits of technology.',
      usefulExpressions: ['One practical solution is...', 'If we..., we will...', 'This can help because...', 'On the other hand...', 'For example...']
    },
    writing: {
      task: 'Write 120–150 words giving your opinion on how students can use digital devices responsibly while studying.',
      checklist: ['State your opinion clearly.', 'Include two practical suggestions.', 'Use at least one first conditional sentence.', 'Connect ideas with because, however, and for example.', 'Finish with a short conclusion.']
    }
  },
  {
    id: 'g12-u1-career-readiness',
    grade: 12,
    unit: 1,
    title: 'Preparing for Future Careers',
    titleVi: 'Chuẩn bị cho nghề nghiệp tương lai',
    theme: 'Career and lifelong learning',
    level: 'B2',
    skills: ['vocabulary', 'grammar', 'reading', 'speaking', 'writing'],
    objectives: [
      'Discuss transferable skills and career preparation.',
      'Use relative clauses to add precise information.',
      'Support an opinion with reasons and a relevant example.'
    ],
    vocabulary: [
      { word: 'transferable skills', ipa: '/trænsˈfɜːrəbl skɪlz/', meaningVi: 'kỹ năng có thể áp dụng ở nhiều công việc', example: 'Teamwork and problem-solving are transferable skills.', exampleVi: 'Làm việc nhóm và giải quyết vấn đề là những kỹ năng có thể áp dụng ở nhiều công việc.' },
      { word: 'work placement', ipa: '/wɜːk ˈpleɪsmənt/', meaningVi: 'đợt trải nghiệm/thực tập tại nơi làm việc', example: 'A work placement can help students understand a profession.', exampleVi: 'Một đợt trải nghiệm tại nơi làm việc có thể giúp học sinh hiểu về một nghề.' },
      { word: 'meet a deadline', ipa: '/miːt ə ˈdedlaɪn/', meaningVi: 'hoàn thành đúng hạn', example: 'Planning ahead helps a team meet a deadline.', exampleVi: 'Lên kế hoạch trước giúp nhóm hoàn thành đúng hạn.' },
      { word: 'career prospects', ipa: '/kəˈrɪə ˈprɒspekts/', meaningVi: 'triển vọng nghề nghiệp', example: 'Digital literacy may improve career prospects.', exampleVi: 'Năng lực số có thể cải thiện triển vọng nghề nghiệp.' },
      { word: 'continuous learning', ipa: '/kənˈtɪnjuəs ˈlɜːnɪŋ/', meaningVi: 'học tập liên tục', example: 'Continuous learning helps people adapt to change.', exampleVi: 'Học tập liên tục giúp mọi người thích nghi với thay đổi.' }
    ],
    grammar: {
      focus: 'Defining and non-defining relative clauses',
      formula: 'Noun + who / which / that + clause; use commas for non-defining clauses.',
      explanationVi: 'Mệnh đề quan hệ xác định cung cấp thông tin cần thiết để nhận diện danh từ. Mệnh đề không xác định bổ sung thông tin và được ngăn cách bằng dấu phẩy; không dùng that trong mệnh đề không xác định.',
      examples: [
        { en: 'Students who communicate clearly often work well in teams.', vi: 'Học sinh giao tiếp rõ ràng thường làm việc nhóm tốt.' },
        { en: 'My aunt, who works in healthcare, volunteers at a local school.', vi: 'Dì tôi, người làm trong ngành chăm sóc sức khỏe, làm tình nguyện tại một trường học địa phương.' }
      ]
    },
    reading: {
      title: 'Skills Beyond the Classroom',
      text: 'Preparing for a career involves more than choosing a job title. Students can build transferable skills through group projects, volunteering, and personal projects. These experiences give them opportunities to communicate, solve problems, and learn from feedback. A short work placement may also help a student discover whether a field matches their interests. Since industries change, continuous learning is important: people need to update their knowledge and remain open to new approaches throughout their working lives.',
      questions: [
        { id: 'g12-u1-q1', prompt: 'According to the passage, what can a work placement help students do?', options: ['Guarantee a high salary.', 'Avoid learning new skills.', 'Explore whether a field suits their interests.', 'Choose a career without experience.'], answerIndex: 2, explanationVi: 'Bài đọc cho biết trải nghiệm tại nơi làm việc có thể giúp học sinh khám phá ngành nghề có phù hợp sở thích hay không.' },
        { id: 'g12-u1-q2', prompt: 'Why is continuous learning important?', options: ['Industries and their requirements change.', 'Feedback is never useful.', 'Students should avoid group projects.', 'Career choices cannot be reconsidered.'], answerIndex: 0, explanationVi: 'Các ngành nghề thay đổi nên người lao động cần cập nhật kiến thức và sẵn sàng học cách tiếp cận mới.' }
      ]
    },
    speaking: {
      scenario: 'A short career-planning discussion',
      prompt: 'Describe one career you are considering, two skills it may require, and one action you can take this year to prepare.',
      usefulExpressions: ['I am considering...', 'A key skill for this role is...', 'This matters because...', 'One step I can take is...', 'In the long term...']
    },
    writing: {
      task: 'Write 150–180 words explaining which skills schools should help students develop for future employment.',
      checklist: ['Introduce the issue and your position.', 'Explain at least two skills.', 'Use a relative clause accurately.', 'Include an example to support one point.', 'Review paragraph structure, grammar, and word choice.']
    }
  },
  {
    id: 'g10-u2-family-life',
    grade: 10,
    unit: 2,
    title: 'Family Life and Shared Responsibilities',
    titleVi: 'Đời sống gia đình và trách nhiệm chung',
    theme: 'Family and community',
    level: 'A2',
    skills: ['vocabulary', 'grammar', 'reading', 'speaking', 'writing'],
    objectives: ['Talk about household chores and family responsibilities.', 'Use should, have to and need to to express advice or obligation.', 'Explain how sharing tasks can support family relationships.'],
    vocabulary: [
      { word: 'household chores', ipa: '/ˈhaʊshəʊld tʃɔːz/', meaningVi: 'việc nhà', example: 'Everyone can help with household chores.', exampleVi: 'Mọi người đều có thể giúp làm việc nhà.' },
      { word: 'share responsibility', ipa: '/ʃeə rɪˌspɒnsəˈbɪləti/', meaningVi: 'chia sẻ trách nhiệm', example: 'My brother and I share responsibility for cleaning.', exampleVi: 'Anh/em trai tôi và tôi chia sẻ trách nhiệm dọn dẹp.' },
      { word: 'do the laundry', ipa: '/duː ðə ˈlɔːndri/', meaningVi: 'giặt quần áo', example: 'I do the laundry at the weekend.', exampleVi: 'Tôi giặt quần áo vào cuối tuần.' },
      { word: 'supportive', ipa: '/səˈpɔːtɪv/', meaningVi: 'biết hỗ trợ, động viên', example: 'A supportive family listens to each other.', exampleVi: 'Một gia đình biết hỗ trợ sẽ lắng nghe nhau.' },
      { word: 'independent', ipa: '/ˌɪndɪˈpendənt/', meaningVi: 'tự lập', example: 'Doing simple chores helps teenagers become independent.', exampleVi: 'Làm việc nhà đơn giản giúp thanh thiếu niên tự lập hơn.' }
    ],
    grammar: {
      focus: 'Should, have to and need to',
      formula: 'should + V (advice); have to / need to + V (obligation or necessity).',
      explanationVi: 'Should thường dùng để đưa ra lời khuyên. Have to diễn tả việc phải làm do quy định hoặc hoàn cảnh; need to nhấn mạnh sự cần thiết.',
      examples: [
        { en: 'You should make a weekly chore list.', vi: 'Bạn nên lập danh sách việc nhà hằng tuần.' },
        { en: 'We have to keep the kitchen clean.', vi: 'Chúng tôi phải giữ bếp sạch sẽ.' },
        { en: 'I need to help my grandparents after school.', vi: 'Tôi cần giúp ông bà sau giờ học.' }
      ]
    },
    reading: {
      title: 'A Fairer Family Routine',
      text: 'In Mai’s family, everyone has a busy schedule. Her parents work, and Mai and her older brother attend school and extra classes. Last month, they discussed how to make home life easier. They wrote down the household chores and shared them fairly. Mai now prepares dinner twice a week, while her brother takes out the rubbish and does the laundry on Saturday. They still change the plan when someone has an exam or feels unwell. Mai says the new routine saves time and helps the family appreciate each other’s efforts.',
      questions: [
        { id: 'g10-u2-q1', prompt: 'What did Mai’s family do to improve their routine?', options: ['They stopped doing chores.', 'They shared household chores fairly.', 'They added more classes.', 'They asked Mai to do every task.'], answerIndex: 1, explanationVi: 'Gia đình Mai liệt kê việc nhà rồi phân chia công bằng giữa các thành viên.' },
        { id: 'g10-u2-q2', prompt: 'Why is the plan flexible?', options: ['People may have exams or feel unwell.', 'Nobody has a schedule.', 'The family does not value time.', 'Mai refuses to help.'], answerIndex: 0, explanationVi: 'Gia đình điều chỉnh kế hoạch khi có người thi cử hoặc không khỏe.' }
      ]
    },
    speaking: {
      scenario: 'Talking with a classmate about family routines',
      prompt: 'Describe two chores you do or could do at home and explain how your family shares responsibilities.',
      usefulExpressions: ['At home, I usually...', 'I have to...', 'I think we should...', 'It is fair to...', 'This helps my family because...']
    },
    writing: {
      task: 'Write 80–100 words about how teenagers can contribute to a happy family life.',
      checklist: ['Mention at least two responsibilities.', 'Use should and have to or need to.', 'Include three words from the vocabulary list.', 'Give a reason or example.', 'Check verb forms and punctuation.']
    }
  },
  {
    id: 'g11-u2-asean-community',
    grade: 11,
    unit: 2,
    title: 'Learning about ASEAN and Regional Cooperation',
    titleVi: 'Tìm hiểu ASEAN và hợp tác khu vực',
    theme: 'Culture and global citizenship',
    level: 'B1',
    skills: ['vocabulary', 'grammar', 'reading', 'speaking', 'writing'],
    objectives: ['Describe ways young people can learn about neighbouring countries.', 'Use passive voice to focus on actions and outcomes.', 'Explain the value of cultural exchange and cooperation.'],
    vocabulary: [
      { word: 'regional cooperation', ipa: '/ˈriːdʒənəl kəʊˌɒpəˈreɪʃən/', meaningVi: 'hợp tác khu vực', example: 'Regional cooperation can support shared goals.', exampleVi: 'Hợp tác khu vực có thể hỗ trợ những mục tiêu chung.' },
      { word: 'cultural exchange', ipa: '/ˈkʌltʃərəl ɪksˈtʃeɪndʒ/', meaningVi: 'giao lưu văn hóa', example: 'Our school organised a cultural exchange.', exampleVi: 'Trường chúng tôi tổ chức một hoạt động giao lưu văn hóa.' },
      { word: 'diversity', ipa: '/daɪˈvɜːsəti/', meaningVi: 'sự đa dạng', example: 'Students learn to respect cultural diversity.', exampleVi: 'Học sinh học cách tôn trọng sự đa dạng văn hóa.' },
      { word: 'neighbouring countries', ipa: '/ˈneɪbərɪŋ ˈkʌntriz/', meaningVi: 'các quốc gia láng giềng', example: 'We studied traditions in neighbouring countries.', exampleVi: 'Chúng tôi tìm hiểu truyền thống ở các nước láng giềng.' },
      { word: 'mutual understanding', ipa: '/ˈmjuːtʃuəl ˌʌndəˈstændɪŋ/', meaningVi: 'sự thấu hiểu lẫn nhau', example: 'Listening carefully builds mutual understanding.', exampleVi: 'Lắng nghe cẩn thận xây dựng sự thấu hiểu lẫn nhau.' }
    ],
    grammar: {
      focus: 'Passive voice in the present and past simple',
      formula: 'Present: am/is/are + past participle; Past: was/were + past participle.',
      explanationVi: 'Câu bị động nhấn mạnh người hoặc vật chịu tác động hay kết quả của hành động. Dùng be theo thì và quá khứ phân từ của động từ chính.',
      examples: [
        { en: 'Cultural festivals are celebrated across the region.', vi: 'Các lễ hội văn hóa được tổ chức khắp khu vực.' },
        { en: 'The student exchange was organised by our school.', vi: 'Chương trình trao đổi học sinh được trường chúng tôi tổ chức.' }
      ]
    },
    reading: {
      title: 'A Classroom without Borders',
      text: 'A group of students joined an online exchange with teenagers from two neighbouring countries. Before the meeting, each class prepared a short presentation about food, school life and local celebrations. During the exchange, students asked questions instead of making assumptions about unfamiliar customs. They discovered similarities as well as differences. Their teacher explained that regional cooperation is not only discussed at official meetings; it can also begin with respectful conversations, curiosity and shared projects among young people.',
      questions: [
        { id: 'g11-u2-q1', prompt: 'What did students prepare before the exchange?', options: ['A presentation about everyday culture.', 'A list of exam answers.', 'A travel advertisement.', 'A competition about grammar only.'], answerIndex: 0, explanationVi: 'Mỗi lớp chuẩn bị bài giới thiệu về ẩm thực, đời sống học đường và lễ hội địa phương.' },
        { id: 'g11-u2-q2', prompt: 'According to the passage, cooperation can begin with...', options: ['avoiding people from other countries.', 'making assumptions about customs.', 'respectful conversations and shared projects.', 'memorising country names only.'], answerIndex: 2, explanationVi: 'Bài đọc nhấn mạnh hội thoại tôn trọng, sự tò mò và dự án chung của người trẻ.' }
      ]
    },
    speaking: {
      scenario: 'Planning an international school exchange',
      prompt: 'Suggest one activity that could help students learn about a neighbouring country and explain what they would learn.',
      usefulExpressions: ['One activity we could organise is...', 'Students would have a chance to...', 'This would help us understand...', 'We should be respectful of...', 'A possible challenge is...']
    },
    writing: {
      task: 'Write 120–150 words explaining why cultural exchange can benefit secondary-school students.',
      checklist: ['Write a clear introduction and conclusion.', 'Give two benefits with examples.', 'Use at least one passive sentence.', 'Use linking words such as moreover and therefore.', 'Check subject–verb agreement.']
    }
  },
  {
    id: 'g12-u2-ai-and-learning',
    grade: 12,
    unit: 2,
    title: 'Artificial Intelligence and Responsible Learning',
    titleVi: 'Trí tuệ nhân tạo và học tập có trách nhiệm',
    theme: 'Technology and lifelong learning',
    level: 'B2',
    skills: ['vocabulary', 'grammar', 'reading', 'speaking', 'writing'],
    objectives: ['Evaluate benefits and limitations of AI learning tools.', 'Use reported speech to summarise advice and opinions.', 'Support a balanced argument with examples and responsible-use principles.'],
    vocabulary: [
      { word: 'personalised feedback', ipa: '/ˈpɜːsənəlaɪzd ˈfiːdbæk/', meaningVi: 'phản hồi được cá nhân hóa', example: 'Personalised feedback can help learners notice repeated errors.', exampleVi: 'Phản hồi cá nhân hóa có thể giúp người học nhận ra lỗi lặp lại.' },
      { word: 'verify information', ipa: '/ˈverɪfaɪ ˌɪnfəˈmeɪʃən/', meaningVi: 'kiểm chứng thông tin', example: 'Students should verify information before using it.', exampleVi: 'Học sinh nên kiểm chứng thông tin trước khi sử dụng.' },
      { word: 'academic integrity', ipa: '/ˌækəˈdemɪk ɪnˈteɡrəti/', meaningVi: 'tính trung thực học thuật', example: 'Academic integrity means presenting your own work honestly.', exampleVi: 'Trung thực học thuật nghĩa là trình bày trung thực bài làm của mình.' },
      { word: 'critical thinking', ipa: '/ˌkrɪtɪkəl ˈθɪŋkɪŋ/', meaningVi: 'tư duy phản biện', example: 'Critical thinking helps students evaluate AI suggestions.', exampleVi: 'Tư duy phản biện giúp học sinh đánh giá gợi ý của AI.' },
      { word: 'learning outcome', ipa: '/ˈlɜːnɪŋ ˈaʊtkʌm/', meaningVi: 'kết quả học tập', example: 'A good tool should improve the learning outcome, not replace effort.', exampleVi: 'Công cụ tốt nên cải thiện kết quả học tập chứ không thay thế nỗ lực.' }
    ],
    grammar: {
      focus: 'Reported speech for statements and advice',
      formula: 'said (that) + clause; advised + object + to-infinitive.',
      explanationVi: 'Câu tường thuật thuật lại lời nói mà không trích nguyên văn. Khi động từ tường thuật ở quá khứ, thì và đại từ thường thay đổi theo ngữ cảnh; advise có thể đi với tân ngữ + to V.',
      examples: [
        { en: 'The teacher said that students should check AI-generated facts.', vi: 'Giáo viên nói rằng học sinh nên kiểm tra sự thật do AI tạo ra.' },
        { en: 'Our teacher advised us to use AI as a study assistant.', vi: 'Giáo viên khuyên chúng tôi sử dụng AI như một trợ lý học tập.' }
      ]
    },
    reading: {
      title: 'Using AI without Giving Up Your Thinking',
      text: 'AI tools can explain a difficult concept in different ways, generate practice questions and offer quick feedback. However, a fluent answer is not necessarily an accurate one. Students need to compare claims with trusted sources, protect personal information and follow their school’s rules about assistance. One useful approach is to attempt a task independently, ask a tool to explain the parts that remain unclear, and then write a final answer in their own words. Used thoughtfully, AI can support learning while responsibility remains with the student.',
      questions: [
        { id: 'g12-u2-q1', prompt: 'Why should students verify AI-generated information?', options: ['Fluent answers are always correct.', 'AI answers can sound convincing but be inaccurate.', 'Verification prevents all learning.', 'Schools never have rules about AI.'], answerIndex: 1, explanationVi: 'Bài đọc lưu ý câu trả lời trôi chảy không đồng nghĩa với chính xác.' },
        { id: 'g12-u2-q2', prompt: 'Which approach best reflects responsible AI use?', options: ['Submit every generated answer unchanged.', 'Share private information to get better results.', 'Try independently, clarify gaps, then write in your own words.', 'Avoid checking sources.'], answerIndex: 2, explanationVi: 'Người học nên tự làm trước, dùng công cụ để làm rõ điểm chưa hiểu và tự viết câu trả lời cuối cùng.' }
      ]
    },
    speaking: {
      scenario: 'A class discussion about AI in education',
      prompt: 'Give a balanced opinion on AI study tools. Mention one benefit, one risk and one rule students should follow.',
      usefulExpressions: ['One clear benefit is...', 'A possible risk is...', 'The information should be verified because...', 'Students remain responsible for...', 'In my view, a balanced approach...']
    },
    writing: {
      task: 'Write 150–180 words discussing how secondary-school students can use AI tools responsibly for learning.',
      checklist: ['Present a balanced viewpoint.', 'Explain at least one benefit and one risk.', 'Use a reported-speech structure.', 'Include practical advice about verification or privacy.', 'Use clear paragraphs and linking expressions.']
    }
  }
];

export function getSupplementaryLesson(id: string): EnglishLessonContent | undefined {
  return supplementaryEnglishLessons.find((lesson) => lesson.id === id);
}

export function getSupplementaryLessonsByGrade(grade: 10 | 11 | 12): EnglishLessonContent[] {
  return supplementaryEnglishLessons.filter((lesson) => lesson.grade === grade);
}
