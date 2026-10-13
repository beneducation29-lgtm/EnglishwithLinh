import { 
  GrammarTopic, 
  ListeningLesson, 
  ReadingLesson, 
  WritingPrompt, 
  VocabularyItem, 
  ScienceEnglishTopic,
  Question 
} from '../types';

export const VOCABULARY_LIST: VocabularyItem[] = [
  {
    id: 'voc-1',
    word: 'biodiversity',
    ipa: '/ˌbaɪ.oʊ.daɪˈvɝː.sə.t̬i/',
    pos: 'n',
    meaningVi: 'đa dạng sinh học',
    exampleEn: 'Protecting rainforests is essential for conserving global biodiversity.',
    exampleVi: 'Bảo vệ rừng nhiệt đới là điều tối quan trọng để bảo tồn đa dạng sinh học toàn cầu.',
    collocations: ['conserve biodiversity', 'threat to biodiversity', 'biodiversity loss'],
    grade: 11,
    topic: 'Environment & Bioscience',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
    synonyms: ['ecological diversity'],
  },
  {
    id: 'voc-2',
    word: 'sustainable',
    ipa: '/səˈsteɪ.nə.bəl/',
    pos: 'adj',
    meaningVi: 'bền vững, thân thiện với môi trường',
    exampleEn: 'We must adopt sustainable agricultural practices to protect soil fertility.',
    exampleVi: 'Chúng ta phải áp dụng các phương pháp nông nghiệp bền vững để bảo vệ độ phì nhiêu của đất.',
    collocations: ['sustainable development', 'sustainable energy', 'sustainable future'],
    grade: 10,
    topic: 'Environment',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
    antonyms: ['unsustainable'],
  },
  {
    id: 'voc-3',
    word: 'photosynthesis',
    ipa: '/ˌfoʊ.t̬oʊˈsɪn.θə.sɪs/',
    pos: 'n',
    meaningVi: 'quá trình quang hợp',
    exampleEn: 'Through photosynthesis, green plants convert sunlight and carbon dioxide into chemical energy.',
    exampleVi: 'Thông qua quang hợp, cây xanh chuyển đổi ánh sáng mặt trời và khí cacbonic thành năng lượng hóa học.',
    collocations: ['rate of photosynthesis', 'light-dependent photosynthesis', 'chloroplast in photosynthesis'],
    grade: 11,
    topic: 'Science & Biology',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: 'voc-4',
    word: 'artificial intelligence',
    ipa: '/ˌɑːr.t̬ə.fɪʃ.əl ɪnˈtel.ə.dʒəns/',
    pos: 'n',
    meaningVi: 'trí tuệ nhân tạo',
    exampleEn: 'Artificial intelligence is reshaping high school education and scientific research.',
    exampleVi: 'Trí tuệ nhân tạo đang định hình lại giáo dục trung học phổ thông và nghiên cứu khoa học.',
    collocations: ['applications of AI', 'generative artificial intelligence', 'ethical AI'],
    grade: 12,
    topic: 'Technology & Future',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: 'voc-5',
    word: 'endangered',
    ipa: '/ɪnˈdeɪn.dʒɚd/',
    pos: 'adj',
    meaningVi: 'có nguy cơ tuyệt chủng',
    exampleEn: 'The red-shanked douc is one of the most endangered primate species in Vietnam.',
    exampleVi: 'Voọc chà vá chân đỏ là một trong những loài linh trưởng có nguy cơ tuyệt chủng cao nhất ở Việt Nam.',
    collocations: ['endangered species', 'critically endangered', 'protect endangered wildlife'],
    grade: 10,
    topic: 'Wildlife & Nature',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: 'voc-6',
    word: 'genetic mutation',
    ipa: '/dʒəˈnet̬.ɪk mjuːˈteɪ.ʃən/',
    pos: 'n',
    meaningVi: 'đột biến di truyền',
    exampleEn: 'A single genetic mutation in the DNA sequence can alter protein synthesis.',
    exampleVi: 'Một đột biến di truyền duy nhất trong chuỗi DNA có thể làm thay đổi quá trình tổng hợp protein.',
    collocations: ['spontaneous mutation', 'mutation rate', 'genetic variation'],
    grade: 12,
    topic: 'Bioscience & Genetics',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: 'voc-7',
    word: 'curriculum',
    ipa: '/kəˈrɪk.jə.ləm/',
    pos: 'n',
    meaningVi: 'chương trình giảng dạy',
    exampleEn: 'The revised National High School curriculum emphasizes critical thinking and communication.',
    exampleVi: 'Chương trình THPT mới chú trọng vào tư duy phản biện và khả năng giao tiếp.',
    collocations: ['high school curriculum', 'core curriculum', 'extracurricular activities'],
    grade: 11,
    topic: 'School & Education',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
  },
  {
    id: 'voc-8',
    word: 'perseverance',
    ipa: '/ˌpɝː.səˈvɪr.əns/',
    pos: 'n',
    meaningVi: 'sự kiên trì, bền bỉ',
    exampleEn: 'Preparing for the National High School Graduation Exam requires both discipline and perseverance.',
    exampleVi: 'Chuẩn bị cho kỳ thi tốt nghiệp THPT đòi hỏi cả tính kỷ luật và sự kiên trì.',
    collocations: ['show perseverance', 'reward for perseverance', 'remarkable perseverance'],
    grade: 12,
    topic: 'Personal Growth & Exams',
    srsStage: 0,
    nextReviewDate: new Date().toISOString(),
  }
];

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'gram-conditional',
    title: 'Conditional Sentences (Type 1, 2, 3 & Mixed)',
    titleVi: 'Câu điều kiện loại 1, 2, 3 và hỗn hợp',
    grade: 11,
    category: 'Cấu trúc câu trọng điểm THPT',
    formula: 'Type 1: If + S + V(hiện tại đơn), S + will/can + V-inf\nType 2: If + S + V2/ed (were), S + would/could + V-inf\nType 3: If + S + had + V3/ed, S + would have + V3/ed',
    summaryVi: 'Chuyên đề trọng điểm xuất hiện trong 100% đề thi Tốt nghiệp THPT và kiểm tra trên lớp.',
    usageRules: [
      {
        rule: 'Điều kiện loại 1: Tình huống có thật hoặc có thể xảy ra ở hiện tại hoặc tương lai.',
        exampleEn: 'If you study consistently every day, you will achieve a high score in the English exam.',
        exampleVi: 'Nếu bạn học đều đặn mỗi ngày, bạn sẽ đạt điểm cao trong kỳ thi tiếng Anh.'
      },
      {
        rule: 'Điều kiện loại 2: Giả định trái ngược với thực tế ở hiện tại. Động từ "to be" chia "were" cho mọi ngôi.',
        exampleEn: 'If I were you, I would take comprehensive notes during listening drills.',
        exampleVi: 'Nếu tôi là bạn, tôi sẽ ghi chép kỹ lưỡng trong các bài luyện nghe.'
      },
      {
        rule: 'Điều kiện loại 3: Giả định trái ngược với sự thật trong quá khứ.',
        exampleEn: 'If she had revised the grammar formulas earlier, she would have completed the quiz in time.',
        exampleVi: 'Nếu cô ấy đã ôn lại các công thức ngữ pháp sớm hơn, cô ấy đã làm xong bài kiểm tra đúng giờ.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'If I will have free time tomorrow, I will join the English speaking club.',
        correct: 'If I have free time tomorrow, I will join the English speaking club.',
        explanationVi: 'Mệnh đề IF không dùng "will" khi diễn tả điều kiện tương lai; phải dùng thì hiện tại đơn.'
      },
      {
        wrong: 'If he studied harder last year, he would pass the exam.',
        correct: 'If he had studied harder last year, he would have passed the exam.',
        explanationVi: 'Sự việc xảy ra trong quá khứ ("last year") phải dùng điều kiện loại 3 (had + V3/ed và would have + V3/ed).'
      }
    ],
    practiceQuestions: [
      {
        id: 'gq-1',
        prompt: 'If environmental organizations _______ more funds last year, they would have preserved the forest.',
        options: ['receive', 'had received', 'received', 'would receive'],
        correctIndex: 1,
        explanationVi: 'Mệnh đề chính dùng "would have preserved" (loại 3) và có dấu hiệu "last year", nên mệnh đề IF cần thì quá khứ hoàn thành "had received".',
        skill: 'grammar',
        grade: 11
      },
      {
        id: 'gq-2',
        prompt: 'If I _______ a scientist, I would research RNA-based therapies for rare diseases.',
        options: ['am', 'were', 'will be', 'had been'],
        correctIndex: 1,
        explanationVi: 'Câu điều kiện loại 2 giả định ở hiện tại, động từ to be chia "were" cho tất cả các ngôi.',
        skill: 'grammar',
        grade: 11
      }
    ]
  },
  {
    id: 'gram-passive',
    title: 'The Passive Voice & Causative Form',
    titleVi: 'Thể bị động và thể nhờ bảo',
    grade: 10,
    category: 'Ngữ pháp căn bản & nâng cao',
    formula: 'Active: S + V + O  -->  Passive: S + Be + V3/ed (+ by O)',
    summaryVi: 'Dùng khi muốn nhấn mạnh vào hành động hoặc đối tượng chịu tác động, rất phổ biến trong văn bản khoa học và học thuật.',
    usageRules: [
      {
        rule: 'Hiện tại hoàn thành bị động: S + have/has + been + V3/ed',
        exampleEn: 'New renewable energy solutions have been implemented across Vietnam.',
        exampleVi: 'Các giải pháp năng lượng tái tạo mới đã được triển khai trên khắp Việt Nam.'
      },
      {
        rule: 'Bị động với động từ khuyết thiếu (Modals): S + modal + be + V3/ed',
        exampleEn: 'Endangered ecosystems must be protected by strict conservation laws.',
        exampleVi: 'Các hệ sinh thái có nguy cơ tuyệt chủng phải được bảo vệ bởi luật bảo tồn nghiêm ngặt.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'The biological samples were destroy by high temperature.',
        correct: 'The biological samples were destroyed by high temperature.',
        explanationVi: 'Động từ trong câu bị động luôn phải ở dạng phân từ hai (V3/ed).'
      }
    ],
    practiceQuestions: [
      {
        id: 'gq-3',
        prompt: 'Millions of trees _______ planted by high school volunteers since the project began.',
        options: ['have been', 'are being', 'were', 'had been'],
        correctIndex: 0,
        explanationVi: 'Dấu hiệu "since the project began" đòi hỏi thì hiện tại hoàn thành bị động (have been + V3).',
        skill: 'grammar',
        grade: 10
      }
    ]
  },
  {
    id: 'gram-relative',
    title: 'Relative Clauses (Mệnh đề quan hệ)',
    titleVi: 'Mệnh đề quan hệ xác định & không xác định',
    grade: 11,
    category: 'Ngữ pháp trọng điểm THPT',
    formula: 'Who (người), Whom (tân ngữ người), Which (vật), Whose (sở hữu), Where/When/Why',
    summaryVi: 'Dùng để nối câu, bổ nghĩa cho danh từ đứng trước, thường xuất hiện trong câu ghép và bài đọc hiểu.',
    usageRules: [
      {
        rule: 'Mệnh đề không xác định (có dấu phẩy): Không bao giờ dùng "that".',
        exampleEn: 'Dr. Nguyen, who discovered the new plant species, delivered a lecture yesterday.',
        exampleVi: 'Tiến sĩ Nguyễn, người đã phát hiện ra loài thực vật mới, đã có bài giảng hôm qua.'
      },
      {
        rule: 'Rút gọn mệnh đề quan hệ bằng V-ing (chủ động) hoặc V3/ed (bị động).',
        exampleEn: 'The students participating in the science fair prepared their models diligently.',
        exampleVi: 'Những học sinh tham gia hội chợ khoa học đã chuẩn bị mô hình rất chăm chỉ.'
      }
    ],
    commonMistakes: [
      {
        wrong: 'The scientist, that proposed the hypothesis, received an international award.',
        correct: 'The scientist, who proposed the hypothesis, received an international award.',
        explanationVi: 'Trong mệnh đề quan hệ không xác định (ngăn cách bởi dấu phẩy), không được dùng "that".'
      }
    ],
    practiceQuestions: [
      {
        id: 'gq-4',
        prompt: 'The research paper, _______ was published last week, explains cellular division in detail.',
        options: ['that', 'which', 'who', 'whose'],
        correctIndex: 1,
        explanationVi: 'Có dấu phẩy nên không dùng "that". "Research paper" là vật nên chọn "which".',
        skill: 'grammar',
        grade: 11
      }
    ]
  }
];

export const LISTENING_LESSONS: ListeningLesson[] = [
  {
    id: 'list-1',
    title: 'High School Green Project: School Garden & Composting',
    grade: 10,
    topic: 'Environment & School Life',
    difficulty: 'Cơ bản',
    estimatedMinutes: 8,
    audioText: "Hello everyone! Welcome to our high school eco-club meeting. Today, we are launching our new campus sustainability project. Over the next three weeks, our grade ten volunteers will build an organic vegetable garden behind the biology laboratory. We will also install two composting bins to process cafeteria food waste. By recycling organic leftovers, we reduce landfill waste and produce natural fertilizer for our plants. Every student who participates for at least ten hours will receive an environmental leadership certificate. Let's make our school greener together!",
    transcript: [
      {
        speaker: 'Eco-Club Leader',
        text: 'Hello everyone! Welcome to our high school eco-club meeting.',
        vi: 'Xin chào mọi người! Chào mừng các bạn đến với buổi họp câu lạc bộ sinh thái trường ta.'
      },
      {
        speaker: 'Eco-Club Leader',
        text: 'Today, we are launching our new campus sustainability project.',
        vi: 'Hôm nay, chúng ta chính thức khởi động dự án phát triển bền vững trong khuôn viên trường.'
      },
      {
        speaker: 'Eco-Club Leader',
        text: 'Over the next three weeks, our grade ten volunteers will build an organic vegetable garden behind the biology laboratory.',
        vi: 'Trong ba tuần tới, các tình nguyện viên lớp 10 sẽ xây dựng một vườn rau hữu cơ phía sau phòng thí nghiệm sinh học.'
      },
      {
        speaker: 'Eco-Club Leader',
        text: 'We will also install two composting bins to process cafeteria food waste.',
        vi: 'Chúng ta cũng sẽ lắp đặt hai thùng ủ phân để xử lý rác thải thực phẩm từ căng tin.'
      },
      {
        speaker: 'Eco-Club Leader',
        text: 'Every student who participates for at least ten hours will receive an environmental leadership certificate.',
        vi: 'Mỗi học sinh tham gia ít nhất 10 giờ sẽ nhận được chứng chỉ lãnh đạo môi trường.'
      }
    ],
    preListeningTips: [
      'Chú ý đến thời gian dự án kéo dài (how many weeks?)',
      'Xác định vị trí của khu vườn hữu cơ (where is it located?)',
      'Ghi nhận điều kiện để nhận chứng chỉ (how many hours?)'
    ],
    vocabularyHighlight: [
      { word: 'sustainability', meaningVi: 'tính bền vững' },
      { word: 'organic vegetable garden', meaningVi: 'vườn rau hữu cơ' },
      { word: 'composting bins', meaningVi: 'thùng ủ phân hữu cơ' },
      { word: 'leadership certificate', meaningVi: 'chứng chỉ năng lực lãnh đạo' }
    ],
    questions: [
      {
        id: 'lq-1',
        prompt: 'Where will the organic vegetable garden be situated?',
        options: [
          'In front of the main gate',
          'Behind the biology laboratory',
          'Next to the football stadium',
          'Inside the library courtyard'
        ],
        correctIndex: 1,
        explanationVi: 'Trong bài nghe: "build an organic vegetable garden behind the biology laboratory".',
        skill: 'listening',
        grade: 10
      },
      {
        id: 'lq-2',
        prompt: 'How many hours must a student participate to earn the certificate?',
        options: ['At least 5 hours', 'At least 10 hours', 'At least 15 hours', 'At least 20 hours'],
        correctIndex: 1,
        explanationVi: 'Người nói nêu rõ: "Every student who participates for at least ten hours will receive an environmental leadership certificate."',
        skill: 'listening',
        grade: 10
      },
      {
        id: 'lq-3',
        prompt: 'What is the purpose of the composting bins?',
        options: [
          'To collect plastic water bottles',
          'To recycle paper notebooks',
          'To process cafeteria food waste into natural fertilizer',
          'To store garden tools safely'
        ],
        correctIndex: 2,
        explanationVi: 'Bài nghe đề cập: "process cafeteria food waste... produce natural fertilizer for our plants".',
        skill: 'listening',
        grade: 10
      }
    ]
  },
  {
    id: 'list-2',
    title: 'Science Podcast: How Vaccines Train the Human Immune System',
    grade: 12,
    topic: 'Bioscience & Health Literacy',
    difficulty: 'Nâng cao',
    estimatedMinutes: 10,
    audioText: "Welcome to High School Science Focus. In today's episode, we explore immunology. When a pathogen enters the body, our white blood cells identify foreign surface proteins called antigens. Conventional vaccines introduce a harmless, weakened or inactivated form of the antigen. This stimulates B-lymphocytes to produce neutralizing antibodies and generate memory cells. If the real pathogen invades later, our immune response is rapid and potent, neutralizing the threat before severe illness occurs. Understanding this molecular mechanism empowers students to critically evaluate scientific claims.",
    transcript: [
      {
        speaker: 'Host',
        text: "Welcome to High School Science Focus. In today's episode, we explore immunology.",
        vi: 'Chào mừng các bạn đến với Chuyên đề Khoa học THPT. Trong số hôm nay, chúng ta khám phá ngành miễn dịch học.'
      },
      {
        speaker: 'Host',
        text: 'When a pathogen enters the body, our white blood cells identify foreign surface proteins called antigens.',
        vi: 'Khi mầm bệnh xâm nhập vào cơ thể, các tế bào bạch cầu nhận diện các protein bề mặt ngoại lai gọi là kháng nguyên.'
      },
      {
        speaker: 'Host',
        text: 'Conventional vaccines introduce a harmless, weakened or inactivated form of the antigen.',
        vi: 'Vaccine truyền thống đưa vào một dạng kháng nguyên vô hại, đã suy yếu hoặc bất hoạt.'
      },
      {
        speaker: 'Host',
        text: 'This stimulates B-lymphocytes to produce neutralizing antibodies and generate memory cells.',
        vi: 'Điều này kích thích tế bào lympho B sản sinh kháng thể trung hòa và tạo ra các tế bào nhớ.'
      }
    ],
    preListeningTips: [
      'Khái niệm sinh học: pathogen (mầm bệnh), antigen (kháng nguyên), antibody (kháng thể).',
      'Chú ý vai trò của "memory cells" (tế bào nhớ) trong phản ứng miễn dịch thứ phát.'
    ],
    vocabularyHighlight: [
      { word: 'pathogen', meaningVi: 'mầm bệnh (vi khuẩn, virus)' },
      { word: 'antigen', meaningVi: 'kháng nguyên' },
      { word: 'neutralizing antibodies', meaningVi: 'kháng thể trung hòa' },
      { word: 'memory cells', meaningVi: 'tế bào nhớ miễn dịch' }
    ],
    questions: [
      {
        id: 'lq-4',
        prompt: 'What foreign surface structures do white blood cells detect on pathogens?',
        options: ['Antibodies', 'Antigens', 'Chloroplasts', 'Enzymes'],
        correctIndex: 1,
        explanationVi: 'Theo bài nghe: "identify foreign surface proteins called antigens".',
        skill: 'listening',
        grade: 12
      },
      {
        id: 'lq-5',
        prompt: 'What enables the immune system to respond rapidly if the real pathogen invades later?',
        options: ['Antibiotics', 'Memory cells', 'Hemoglobin', 'Adrenaline'],
        correctIndex: 1,
        explanationVi: 'Bài nói rõ: "...generate memory cells. If the real pathogen invades later, our immune response is rapid and potent".',
        skill: 'listening',
        grade: 12
      }
    ]
  }
];

export const READING_LESSONS: ReadingLesson[] = [
  {
    id: 'read-1',
    title: 'The Role of Coral Reefs in Marine Ecosystems & Climate Regulation',
    grade: 11,
    topic: 'Environment, Ecology & Bioscience',
    difficulty: 'Trung cấp',
    estimatedMinutes: 12,
    sourceBadge: 'Chương trình THPT mới — Chuyên đề Đọc hiểu Hệ sinh thái',
    passageText: `Coral reefs are frequently referred to as the "rainforests of the sea" because they foster unparalleled biodiversity. Although they occupy less than one percent of the ocean floor, they provide habitats, nurseries, and feeding grounds for more than twenty-five percent of all marine species.

At the core of this vibrant ecosystem is a delicate symbiotic relationship. Coral polyps host microscopic photosynthetic algae known as zooxanthellae within their tissues. Through photosynthesis, these algae produce organic nutrients and oxygen that nourish the coral host. In exchange, the coral polyp provides the algae with a protected environment and essential metabolic compounds, such as carbon dioxide and ammonium. This reciprocal partnership allows coral structures to build massive calcium carbonate skeletons over millennia.

However, anthropogenic climate change represents a severe threat to reef survival. When sea surface temperatures elevate by even one to two degrees Celsius above historical summer averages, corals experience physiological stress. Under thermal stress, corals expel their symbiotic zooxanthellae, causing the coral colonies to turn starkly white—a phenomenon termed coral bleaching. Without their photosynthetic partners, bleached corals suffer from severe nutrient deprivation and become highly susceptible to infectious diseases.

Marine biologists emphasize that preserving coral reefs is not merely an ecological sentiment; it directly impacts human welfare. Reef barriers attenuate up to ninety-seven percent of incoming wave energy, shielding coastal villages from erosive storm surges. Furthermore, bioactive compounds synthesized by reef organisms have yielded novel antimicrobial and anticancer drugs. Global climate mitigation and local marine protection zones are urgently required to ensure these underwater sanctuaries persist for future generations.`,
    passageTranslationVi: `Các rạn san hô thường được ví như "rừng mưa nhiệt đới của đại dương" bởi chúng nuôi dưỡng sự đa dạng sinh học vô song. Dù chỉ chiếm chưa đầy 1% diện tích đáy đại dương, chúng là nơi cư trú, ươm mầm và kiếm ăn của hơn 25% các loài sinh vật biển...`,
    vocabularyGlossary: [
      { word: 'unparalleled', pos: 'adj', meaningVi: 'vô song, không gì sánh bằng' },
      { word: 'symbiotic relationship', pos: 'n', meaningVi: 'mối quan hệ cộng sinh' },
      { word: 'anthropogenic', pos: 'adj', meaningVi: 'do con người gây ra' },
      { word: 'coral bleaching', pos: 'n', meaningVi: 'hiện tượng tẩy trắng san hô' },
      { word: 'attenuate', pos: 'v', meaningVi: 'làm giảm bớt, suy giảm (sóng, lực)' },
      { word: 'bioactive compounds', pos: 'n', meaningVi: 'các hợp chất có hoạt tính sinh học' }
    ],
    questions: [
      {
        id: 'rq-1',
        prompt: 'What is the primary topic of the passage?',
        options: [
          'The economic costs of marine fishing gear',
          'The ecological significance, symbiotic nature, and threats confronting coral reefs',
          'The historical development of coastal navigation instruments',
          'The chemical composition of deep-sea trenches'
        ],
        correctIndex: 1,
        explanationVi: 'Bài đọc bao quát về tầm quan trọng sinh thái, cơ chế cộng sinh và hiểm họa biến đổi khí hậu đối với rạn san hô.',
        skill: 'reading',
        grade: 11
      },
      {
        id: 'rq-2',
        prompt: 'According to paragraph 2, what do zooxanthellae provide to the coral host?',
        options: [
          'Calcium carbonate skeletons and carbon dioxide',
          'Organic nutrients and oxygen via photosynthesis',
          'A sheltered physical environment',
          'Protection from large predatory sharks'
        ],
        correctIndex: 1,
        explanationVi: 'Đoạn 2 ghi: "Through photosynthesis, these algae produce organic nutrients and oxygen that nourish the coral host."',
        skill: 'reading',
        grade: 11
      },
      {
        id: 'rq-3',
        prompt: 'The word "attenuate" in paragraph 4 is closest in meaning to:',
        options: ['magnify', 'diminish', 'generate', 'disrupt'],
        correctIndex: 1,
        explanationVi: '"Attenuate" có nghĩa là làm giảm nhẹ, suy giảm năng lượng sóng biển (= diminish / reduce).',
        skill: 'reading',
        grade: 11
      },
      {
        id: 'rq-4',
        prompt: 'What causes coral bleaching according to paragraph 3?',
        options: [
          'A sudden drop in ocean salinity',
          'Thermal stress causing corals to expel their photosynthetic algae',
          'Overharvesting of coral skeletons for jewelry',
          'Lack of sunlight in deep ocean trenches'
        ],
        correctIndex: 1,
        explanationVi: 'Đoạn 3 chỉ rõ: "Under thermal stress, corals expel their symbiotic zooxanthellae, causing the coral colonies to turn starkly white—a phenomenon termed coral bleaching."',
        skill: 'reading',
        grade: 11
      }
    ]
  },
  {
    id: 'read-2',
    title: 'CRISPR-Cas9 & Genetic Engineering in Modern High School Biology',
    grade: 12,
    topic: 'Biotechnology & Science Ethics',
    difficulty: 'Nâng cao',
    estimatedMinutes: 14,
    sourceBadge: 'Khoa học Sinh học THPT & Định hướng Đề thi THPT Quốc Gia',
    passageText: `Few scientific breakthroughs in the twenty-first century have generated as much optimism and debate as the CRISPR-Cas9 genome editing system. Originally discovered in bacteria as an adaptive immune defense against invading viruses, CRISPR allows researchers to alter DNA sequences with unprecedented precision.

The molecular mechanism relies on two essential components: the Cas9 endonuclease enzyme, which functions like molecular scissors, and a synthetic guide RNA (gRNA). The guide RNA contains a sequence tailored to match a specific locus on the target genome. Once guided to the desired location, Cas9 introduces a double-strand break in the DNA. Cell repair pathways then either disable a dysfunctional gene or facilitate the insertion of a corrected genetic sequence.

In agriculture, CRISPR-edited crops are engineered to withstand prolonged droughts, extreme heat, and devastating fungal infections, directly bolstering food security. In biomedicine, clinical trials targeting genetic blood disorders such as sickle cell disease have demonstrated remarkable therapeutic efficacy. Patients who previously endured chronic pain and frequent blood transfusions have achieved functional cures after receiving autologous stem cells edited with CRISPR technology.

Nevertheless, the widespread adoption of gene editing prompts profound ethical inquiries. Bioethicists caution against germline modifications—alterations introduced into human embryos or reproductive cells—because such changes are heritable and could introduce unpredictable consequences for future generations. High school students studying modern biology are encouraged not only to comprehend the biochemical machinery of gene editing but also to participate in ethical dialogues regarding responsible scientific stewardship.`,
    vocabularyGlossary: [
      { word: 'endonuclease', pos: 'n', meaningVi: 'enzyme cắt giới hạn / enzyme cắt DNA' },
      { word: 'unprecedented precision', pos: 'n', meaningVi: 'độ chính xác chưa từng có' },
      { word: 'double-strand break', pos: 'n', meaningVi: 'đứt gãy mạch kép của DNA' },
      { word: 'germline modifications', pos: 'n', meaningVi: 'chỉnh sửa dòng tế bào sinh dục / phôi' },
      { word: 'stewardship', pos: 'n', meaningVi: 'sự quản lý có trách nhiệm' }
    ],
    questions: [
      {
        id: 'rq-5',
        prompt: 'What was the natural biological function of CRISPR in bacteria prior to its biotechnology application?',
        options: [
          'Producing photosynthetic pigments',
          'An adaptive immune defense against viral pathogens',
          'Synthesizing toxic waste products to deter predators',
          'Accelerating cell division during cold weather'
        ],
        correctIndex: 1,
        explanationVi: 'Đoạn 1 nêu rõ: "Originally discovered in bacteria as an adaptive immune defense against invading viruses..."',
        skill: 'reading',
        grade: 12
      },
      {
        id: 'rq-6',
        prompt: 'What role does the guide RNA (gRNA) perform in the CRISPR-Cas9 complex?',
        options: [
          'It provides metabolic energy to speed up chemical reactions.',
          'It directs the Cas9 enzyme to a specific target sequence on the genome.',
          'It repairs damaged cell walls.',
          'It prevents foreign proteins from entering the nucleus.'
        ],
        correctIndex: 1,
        explanationVi: 'Đoạn 2: "The guide RNA contains a sequence tailored to match a specific locus on the target genome. Once guided to the desired location, Cas9 introduces a double-strand break..."',
        skill: 'reading',
        grade: 12
      }
    ]
  }
];

export const WRITING_PROMPTS: WritingPrompt[] = [
  {
    id: 'w-trans-1',
    title: 'Sentence Transformation: Conditionals & Inversions',
    grade: 11,
    type: 'sentence_transformation',
    promptEn: 'Rewrite the following sentences so that the meaning stays the same as the original sentence, using the given word in parentheses.',
    promptVi: 'Viết lại các câu sau sao cho nghĩa không đổi, sử dụng từ gợi ý trong ngoặc (Dạng đề quen thuộc trong kiểm tra & đề thi THPT).',
    wordCountMin: 5,
    wordCountMax: 30,
    suggestedStructures: [
      'Had + S + V3/ed, S + would have + V3/ed (Inversion Condition 3)',
      'If it had not been for + N, S + would have...'
    ],
    sampleGoodAnswer: 'Had he checked his laboratory notes, he would not have contaminated the cell culture.'
  },
  {
    id: 'w-essay-1',
    title: 'Opinion Paragraph: Should AI be integrated into High School Classrooms?',
    grade: 12,
    type: 'short_paragraph',
    promptEn: 'Write a paragraph (120 - 150 words) presenting your opinion on whether Artificial Intelligence tools should be utilized by high school students to support homework and learning projects. Provide at least two reasons and specific examples.',
    promptVi: 'Viết một đoạn văn (120 - 150 từ) bày tỏ quan điểm của bạn về việc liệu học sinh THPT có nên sử dụng các công cụ Trí tuệ Nhân tạo để hỗ trợ bài tập về nhà và dự án học tập hay không. Đưa ra ít nhất 2 lý do và ví dụ cụ thể.',
    wordCountMin: 120,
    wordCountMax: 170,
    suggestedStructures: [
      'From my perspective, ...',
      'First and foremost, AI empowers learners to ...',
      'Furthermore, it provides instantaneous feedback on ...',
      'However, students must maintain academic integrity by ...',
      'In conclusion, ...'
    ],
    sampleGoodAnswer: 'From my perspective, integrating Artificial Intelligence into high school education is immensely advantageous when approached with academic discipline...'
  },
  {
    id: 'w-letter-1',
    title: 'Email: Inquiring about a University Environmental Club',
    grade: 10,
    type: 'letter_email',
    promptEn: 'Write a formal email (100 - 120 words) to the coordinator of the Youth Green Earth project, asking for information on volunteer eligibility, project schedules, and expected duties for high school students.',
    promptVi: 'Viết một bức thư điện tử trang trọng (100 - 120 từ) gửi cho điều phối viên dự án Trái Đất Xanh, hỏi thông tin về tiêu chuẩn đăng ký, lịch trình và nhiệm vụ dự kiến dành cho học sinh THPT.',
    wordCountMin: 90,
    wordCountMax: 140,
    suggestedStructures: [
      'Dear Project Coordinator,',
      'I am writing to express my keen interest in ...',
      'Could you kindly inform me about ...',
      'I look forward to hearing from you soon.',
      'Sincerely yours, [Your Name]'
    ]
  }
];

export const SCIENCE_ENGLISH_TOPICS: ScienceEnglishTopic[] = [
  {
    id: 'sci-1',
    term: 'Rubisco (Ribulose-1,5-bisphosphate carboxylase-oxygenase)',
    ipa: '/ruːˈbɪs.koʊ/',
    pos: 'n',
    vietnameseTerm: 'Enzyme Rubisco (Cố định Carbon trong Quang hợp)',
    domain: 'Hóa sinh & Enzyme',
    englishDefinition: 'The primary enzyme responsible for carbon fixation during the Calvin cycle in photosynthetic organisms.',
    vietnameseExplanation: 'Enzyme phổ biến nhất trên Trái Đất, xúc tác phản ứng gắn CO2 vào chất nhận hữu cơ trong pha tối của quang hợp ở thực vật.',
    highSchoolContext: 'Bài học Sinh học 11: Quang hợp ở thực vật (Pha sáng và Pha tối Calvin Cycle) & Đề thi Đọc hiểu Tiếng Anh chủ đề Nông nghiệp bền vững.',
    curriculumUnit: 'Grade 11 Unit 7: Ecological Preservation & Biology',
    proteinOrGeneRef: 'UniProt P00875 (rbcL - Rubisco large subunit)',
    curatedSource: 'Literature curated: UniProtKB / RCSB PDB Structure 1RCX',
    sampleReadingText: 'Rubisco catalyzes the crucial first rate-limiting step of carbon dioxide assimilation. Despite its ubiquity, Rubisco is notoriously slow, fixing only a few CO2 molecules per second. Molecular biologists are actively researching genetic enhancements to optimize Rubisco efficiency, potentially increasing crop yields by up to sixty percent under drought stress.',
    sampleQuestions: [
      {
        id: 'sciq-1',
        prompt: 'Why is Rubisco considered a rate-limiting factor in plant growth?',
        options: [
          'It is completely destroyed by sunlight.',
          'Its catalytic reaction speed fixing CO2 is relatively slow.',
          'It only functions in deep oceanic environments.',
          'It cannot bind to water molecules.'
        ],
        correctIndex: 1,
        explanationVi: 'Đoạn văn ghi: "Rubisco is notoriously slow, fixing only a few CO2 molecules per second", làm hạn chế tốc độ quang hợp tối đa.',
        skill: 'science',
        grade: 11
      }
    ]
  },
  {
    id: 'sci-2',
    term: 'p53 Tumor Suppressor Protein (Guardian of the Genome)',
    ipa: '/ˌpiː.fɪf.tiˈθriː/',
    pos: 'n',
    vietnameseTerm: 'Protein ức chế khối u p53 (Người gác cổng bộ gen)',
    domain: 'Di truyền & Tế bào',
    englishDefinition: 'A nuclear transcription factor that coordinates the cell cycle, DNA repair, and programmed cell death (apoptosis) in response to cellular stress.',
    vietnameseExplanation: 'Protein kiểm soát chu kỳ tế bào: khi phát hiện DNA bị tổn thương, p53 kích hoạt cơ chế sửa chữa hoặc kích hoạt quá trình tự chết (apoptosis) để ngăn tế bào biến thành ung thư.',
    highSchoolContext: 'Sinh học 10 & 12: Chu kỳ tế bào, Đột biến gen và Cơ chế phân bào nguyên phân / giảm phân.',
    curriculumUnit: 'Grade 12 Unit 10: Medical Innovations & Genetics',
    proteinOrGeneRef: 'UniProt P04637 (TP53 - Cellular tumor antigen p53)',
    curatedSource: 'Literature curated: PubMed / AlphaFold DB AF-P04637-F1',
    sampleReadingText: 'When human cells undergo genomic DNA damage due to ultraviolet radiation or chemical mutagens, the p53 protein accumulates rapidly. It halts the cell cycle at the G1 checkpoint, allowing repair enzymes time to mend damaged nucleotide sequences. If the genetic lesion is irreparable, p53 triggers apoptosis, preventing the propagation of deleterious mutations.',
    sampleQuestions: [
      {
        id: 'sciq-2',
        prompt: 'What occurs if DNA damage inside the cell cannot be repaired by enzymes?',
        options: [
          'The cell divides twice as fast.',
          'p53 triggers apoptosis (programmed cell death) to protect the organism.',
          'The cell becomes resistant to all medications.',
          'The cell transforms immediately into a bacterium.'
        ],
        correctIndex: 1,
        explanationVi: 'Theo bài đọc: "If the genetic lesion is irreparable, p53 triggers apoptosis, preventing the propagation of deleterious mutations."',
        skill: 'science',
        grade: 12
      }
    ]
  },
  {
    id: 'sci-3',
    term: 'CRISPR-Cas9 Endonuclease',
    ipa: '/ˈkrɪs.pɚ kæs naɪn/',
    pos: 'n',
    vietnameseTerm: 'Hệ thống chỉnh sửa gen CRISPR-Cas9',
    domain: 'Công nghệ sinh học & Y sinh',
    englishDefinition: 'An RNA-guided enzyme derived from bacterial immunity capable of making site-specific double-strand cuts in chromosomal DNA.',
    vietnameseExplanation: 'Công cụ chỉnh sửa gen cách mạng nhận giải Nobel 2020: dùng phân tử RNA định hướng enzyme Cas9 tới đúng vị trí DNA cần sửa để cắt hoặc ghép đoạn mã mới.',
    highSchoolContext: 'Sinh học 12: Đột biến gen, Công nghệ gen và Đạo đức sinh học trong thời đại 4.0.',
    curriculumUnit: 'Grade 12 Unit 9: Biotechnology & Future Careers',
    proteinOrGeneRef: 'PDB ID: 4UN3 (Streptococcus pyogenes Cas9 in complex with guide RNA)',
    curatedSource: 'Literature curated: Science / PDB 4UN3 / European PMC',
    sampleReadingText: 'By utilizing a programmable single guide RNA sequence, CRISPR-Cas9 can precisely target any twenty-base-pair genetic address. This molecular tool has enabled researchers to disable defective viral receptors in human T-cells and engineer disease-resistant livestock with unprecedented accuracy.',
    sampleQuestions: [
      {
        id: 'sciq-3',
        prompt: 'How does the Cas9 enzyme identify the correct genetic location to cut?',
        options: [
          'Through a programmable single guide RNA sequence matching the target DNA',
          'By sensing temperature differentials in the blood',
          'By measuring the weight of the nucleus',
          'Through random collisions with cellular lipids'
        ],
        correctIndex: 0,
        explanationVi: 'Theo bài đọc: "By utilizing a programmable single guide RNA sequence, CRISPR-Cas9 can precisely target any twenty-base-pair genetic address."',
        skill: 'science',
        grade: 12
      }
    ]
  }
];

export const DIAGNOSTIC_TEST: Question[] = [
  {
    id: 'diag-1',
    prompt: 'Mark the letter A, B, C, or D to indicate the word whose underlined part differs from the other three in pronunciation:\nA. gene\nB. grow\nC. give\nD. gate',
    options: ['gene', 'grow', 'give', 'gate'],
    correctIndex: 0,
    explanationVi: 'Từ "gene" có âm "g" phát âm là /dʒ/, các từ còn lại phát âm là /ɡ/. (Dạng bài phát âm quen thuộc đề thi THPT).',
    skill: 'speaking',
    grade: 10,
    category: 'Phonetics'
  },
  {
    id: 'diag-2',
    prompt: 'Mark the letter A, B, C, or D to indicate the word that differs from the other three in the position of primary stress:\nA. biological\nB. environment\nC. diversity\nD. participate',
    options: ['biological', 'environment', 'diversity', 'participate'],
    correctIndex: 0,
    explanationVi: '"biological" có trọng âm rơi vào âm tiết thứ 3 (/ˌbaɪ.əˈlɑː.dʒɪ.kəl/), các từ còn lại có trọng âm rơi vào âm tiết thứ 2.',
    skill: 'speaking',
    grade: 11,
    category: 'Stress'
  },
  {
    id: 'diag-3',
    prompt: 'If our community _______ plastic waste more rigorously, our local rivers would be significantly cleaner today.',
    options: ['recycled', 'had recycled', 'recycles', 'will recycle'],
    correctIndex: 1,
    explanationVi: 'Câu điều kiện hỗn hợp (Mixed Conditional): Giả định hành động trong quá khứ ("had recycled") dẫn đến kết quả ở hiện tại ("would be... today").',
    skill: 'grammar',
    grade: 12,
    category: 'Conditionals'
  },
  {
    id: 'diag-4',
    prompt: 'The scientist _______ discovered the enzymatic pathway was awarded the Nobel Prize in Chemistry.',
    options: ['which', 'who', 'whom', 'whose'],
    correctIndex: 1,
    explanationVi: '"The scientist" chỉ người làm chủ ngữ cho mệnh đề quan hệ, do đó dùng đại từ quan hệ "who".',
    skill: 'grammar',
    grade: 10,
    category: 'Relative Clauses'
  },
  {
    id: 'diag-5',
    prompt: 'Solar energy and wind power are viable forms of _______ energy that do not deplete natural reserves.',
    options: ['sustainable', 'exhaustible', 'harmful', 'artificial'],
    correctIndex: 0,
    explanationVi: '"Sustainable energy" nghĩa là năng lượng bền vững, có thể tái tạo mà không làm cạn kiệt tài nguyên thiên nhiên.',
    skill: 'vocabulary',
    grade: 11,
    category: 'Vocabulary in context'
  },
  {
    id: 'diag-6',
    prompt: 'Mark the letter A, B, C, or D to indicate the sentence that is closest in meaning to:\n"They started renovating the science laboratory two months ago."',
    options: [
      'They have renovated the science laboratory for two months.',
      'They didn\'t renovate the science laboratory two months ago.',
      'They will renovate the science laboratory in two months.',
      'The science laboratory was renovated two months ago.'
    ],
    correctIndex: 0,
    explanationVi: 'Cấu trúc chuyển đổi giữa thì Quá khứ đơn ("started doing sth ... ago") và Hiện tại hoàn thành ("have done sth for...").',
    skill: 'writing',
    grade: 11,
    category: 'Sentence Transformation'
  },
  {
    id: 'diag-7',
    prompt: 'Read and answer: What is the primary purpose of an author using evidence in a scientific argumentative text?',
    options: [
      'To lengthen the essay to satisfy word count requirements',
      'To substantiate assertions and persuade readers through verified empirical data',
      'To confuse opponents by using obscure terminology',
      'To avoid stating a personal viewpoint'
    ],
    correctIndex: 1,
    explanationVi: 'Mục đích chính của dẫn chứng khoa học là chứng minh luận điểm ("substantiate assertions") bằng dữ liệu thực nghiệm đã kiểm chứng.',
    skill: 'reading',
    grade: 12,
    category: 'Reading Comprehension'
  },
  {
    id: 'diag-8',
    prompt: 'In listening, when a speaker says "On the other hand...", what transition are they signaling?',
    options: [
      'An addition of similar points',
      'A contrast or opposing viewpoint',
      'A chronological order of events',
      'A concluding remark'
    ],
    correctIndex: 1,
    explanationVi: '"On the other hand" báo hiệu sự đối lập, tương phản quan điểm (A contrast or opposing viewpoint).',
    skill: 'listening',
    grade: 10,
    category: 'Listening Discourse Markers'
  }
];
