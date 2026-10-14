/**
 * Original speaking practice scenarios mapped to common Vietnamese upper-secondary English themes.
 * Topic alignment is thematic; exact unit order and vocabulary vary by textbook series.
 */
export interface SpeakingScenario {
  id: string;
  grade: 10 | 11 | 12;
  title: string;
  theme: string;
  level: 'A2' | 'B1' | 'B1+' | 'B2';
  role: string;
  objective: string;
  prompt: string;
  vocabulary: Array<{ word: string; meaningVi: string }>;
  phrases: string[];
  followUp: string;
}

export const speakingScenarios: SpeakingScenario[] = [
  {
    id: 'g10-friends', grade: 10, title: 'Getting to know a new classmate', theme: 'School life & relationships', level: 'A2',
    role: 'AI đóng vai bạn học mới', objective: 'Chào hỏi, giới thiệu bản thân, hỏi về môn học và sở thích.',
    prompt: 'Hi! I’m new to this class. Could you introduce yourself and tell me what you enjoy doing after school?',
    vocabulary: [{word:'classmate',meaningVi:'bạn cùng lớp'},{word:'be interested in',meaningVi:'quan tâm / yêu thích'},{word:'after-school activity',meaningVi:'hoạt động sau giờ học'}],
    phrases: ['Nice to meet you.','I’m really interested in…','What about you?','My favourite subject is… because…'],
    followUp: 'Ask the student about a school club they might like to join.'
  },
  {
    id: 'g10-family', grade: 10, title: 'Sharing family responsibilities', theme: 'Family & daily routines', level: 'A2',
    role: 'AI đóng vai anh/chị/em trong gia đình', objective: 'Nói về việc nhà, lịch sinh hoạt và phân chia trách nhiệm.',
    prompt: 'We both have a busy week. How can we share the household chores fairly?',
    vocabulary: [{word:'household chores',meaningVi:'việc nhà'},{word:'do the washing-up',meaningVi:'rửa bát'},{word:'be responsible for',meaningVi:'chịu trách nhiệm về'}],
    phrases: ['I can take care of…','Why don’t we…?','That sounds fair.','I usually help by…'],
    followUp: 'Ask which chore the student finds easiest and why.'
  },
  {
    id: 'g10-healthy', grade: 10, title: 'Giving advice about a healthy lifestyle', theme: 'Health & lifestyle', level: 'A2',
    role: 'AI đóng vai người bạn muốn sống lành mạnh hơn', objective: 'Mô tả thói quen và đưa lời khuyên bằng should / shouldn’t.',
    prompt: 'I often feel tired because I stay up late and skip breakfast. What should I change?',
    vocabulary: [{word:'balanced diet',meaningVi:'chế độ ăn cân bằng'},{word:'get enough sleep',meaningVi:'ngủ đủ giấc'},{word:'regular exercise',meaningVi:'tập thể dục đều đặn'}],
    phrases: ['You should try to…','You shouldn’t…','It would help if you…','A healthy habit I recommend is…'],
    followUp: 'Ask the student to suggest a simple weekday routine.'
  },
  {
    id: 'g10-community', grade: 10, title: 'Planning a community volunteer day', theme: 'Community & volunteering', level: 'A2',
    role: 'AI đóng vai trưởng nhóm tình nguyện', objective: 'Đề xuất hoạt động, phân công việc và thống nhất kế hoạch.',
    prompt: 'Our class wants to help the local community this weekend. What activity should we organise?',
    vocabulary: [{word:'volunteer',meaningVi:'tình nguyện viên / tình nguyện'},{word:'donate',meaningVi:'quyên góp'},{word:'raise awareness',meaningVi:'nâng cao nhận thức'}],
    phrases: ['How about…?','We could…','I’d be happy to…','Let’s make sure that…'],
    followUp: 'Ask the student how the class could encourage more volunteers to join.'
  },
  {
    id: 'g10-environment', grade: 10, title: 'Making our school greener', theme: 'Environment & sustainability', level: 'A2',
    role: 'AI đóng vai thành viên câu lạc bộ xanh', objective: 'Đề xuất hành động giảm rác thải và tiết kiệm năng lượng.',
    prompt: 'Our school produces a lot of plastic waste. What practical changes could students make?',
    vocabulary: [{word:'reusable',meaningVi:'có thể tái sử dụng'},{word:'sort waste',meaningVi:'phân loại rác'},{word:'save energy',meaningVi:'tiết kiệm năng lượng'}],
    phrases: ['We should reduce…','One easy change is…','If we…, we can…','For example,…'],
    followUp: 'Ask the student to choose one action and explain how to measure its success.'
  },
  {
    id: 'g10-entertainment', grade: 10, title: 'Recommending music, films or books', theme: 'Entertainment & preferences', level: 'A2',
    role: 'AI đóng vai bạn muốn tìm nội dung giải trí mới', objective: 'Nêu sở thích và giải thích lý do bằng tính từ phù hợp.',
    prompt: 'I want to watch a good film or listen to something new. What would you recommend, and why?',
    vocabulary: [{word:'soundtrack',meaningVi:'nhạc phim'},{word:'plot',meaningVi:'cốt truyện'},{word:'inspiring',meaningVi:'truyền cảm hứng'}],
    phrases: ['I’d recommend… because…','What I like most is…','It’s worth watching because…','If you enjoy…, you might like…'],
    followUp: 'Ask the student to compare two kinds of entertainment.'
  },
  {
    id: 'g11-technology', grade: 11, title: 'Using technology responsibly', theme: 'Technology & digital life', level: 'B1',
    role: 'AI đóng vai bạn cùng nhóm làm dự án số', objective: 'Cân nhắc lợi ích/rủi ro và đề xuất cách dùng công nghệ có trách nhiệm.',
    prompt: 'Our group wants to use AI tools for a school project. How can we use them responsibly and still do our own thinking?',
    vocabulary: [{word:'reliable source',meaningVi:'nguồn đáng tin cậy'},{word:'verify information',meaningVi:'kiểm chứng thông tin'},{word:'digital footprint',meaningVi:'dấu vết số'}],
    phrases: ['One advantage is…','However, we should…','We need to verify…','In my view, technology works best when…'],
    followUp: 'Ask how students can protect their privacy online.'
  },
  {
    id: 'g11-relationships', grade: 11, title: 'Resolving a disagreement politely', theme: 'Relationships & communication', level: 'B1',
    role: 'AI đóng vai bạn cùng nhóm có ý kiến khác', objective: 'Lắng nghe, đồng tình/không đồng tình lịch sự và tìm giải pháp.',
    prompt: 'I think we should do the whole group presentation my way. How would you explain your own idea without starting an argument?',
    vocabulary: [{word:'compromise',meaningVi:'thỏa hiệp'},{word:'point of view',meaningVi:'quan điểm'},{word:'misunderstanding',meaningVi:'hiểu lầm'}],
    phrases: ['I see your point, but…','Could we consider…?','What if we…?','Let’s find a solution that…'],
    followUp: 'Ask the student to summarise the other person’s viewpoint fairly.'
  },
  {
    id: 'g11-heritage', grade: 11, title: 'Introducing Vietnamese culture to a visitor', theme: 'Culture & heritage', level: 'B1',
    role: 'AI đóng vai học sinh trao đổi quốc tế', objective: 'Giới thiệu phong tục, món ăn hoặc lễ hội và giải thích ý nghĩa.',
    prompt: 'I’m visiting Viet Nam for the first time. Which local festival, traditional food or custom would you introduce to me?',
    vocabulary: [{word:'heritage',meaningVi:'di sản'},{word:'traditional custom',meaningVi:'phong tục truyền thống'},{word:'take part in',meaningVi:'tham gia'}],
    phrases: ['I’d love to introduce you to…','It is celebrated when…','One important tradition is…','It represents…'],
    followUp: 'Ask how young people can help preserve cultural heritage.'
  },
  {
    id: 'g11-environment', grade: 11, title: 'Discussing climate action at school', theme: 'Environment & climate change', level: 'B1',
    role: 'AI đóng vai thành viên hội đồng học sinh', objective: 'Trình bày vấn đề, nguyên nhân và giải pháp khả thi.',
    prompt: 'The student council has a small budget for an environmental project. Which action should we fund first, and why?',
    vocabulary: [{word:'carbon footprint',meaningVi:'lượng phát thải carbon'},{word:'renewable energy',meaningVi:'năng lượng tái tạo'},{word:'single-use plastic',meaningVi:'nhựa dùng một lần'}],
    phrases: ['The main issue is…','A cost-effective solution would be…','If we invest in…, we will…','The long-term benefit is…'],
    followUp: 'Ask the student to respond to a concern about cost.'
  },
  {
    id: 'g11-asean', grade: 11, title: 'Planning an ASEAN cultural exchange', theme: 'ASEAN & global citizenship', level: 'B1',
    role: 'AI đóng vai học sinh đến từ một nước ASEAN', objective: 'Trao đổi về điểm chung, khác biệt văn hóa và hợp tác khu vực.',
    prompt: 'Our schools are planning an online exchange. What could students from Viet Nam and other ASEAN countries learn from one another?',
    vocabulary: [{word:'cultural diversity',meaningVi:'đa dạng văn hóa'},{word:'cooperation',meaningVi:'sự hợp tác'},{word:'mutual understanding',meaningVi:'sự thấu hiểu lẫn nhau'}],
    phrases: ['One thing we have in common is…','We could exchange ideas about…','This would help us understand…','I agree, especially because…'],
    followUp: 'Ask the student to suggest one collaborative student project.'
  },
  {
    id: 'g11-media', grade: 11, title: 'Evaluating news and social media posts', theme: 'Media literacy & learning', level: 'B1',
    role: 'AI đóng vai bạn vừa chia sẻ một tin chưa kiểm chứng', objective: 'Đặt câu hỏi phản biện và giải thích cách kiểm tra nguồn.',
    prompt: 'I’ve just shared a surprising news post. It has thousands of likes, so it must be true, right?',
    vocabulary: [{word:'misleading',meaningVi:'gây hiểu lầm'},{word:'evidence',meaningVi:'bằng chứng'},{word:'cross-check',meaningVi:'đối chiếu kiểm tra'}],
    phrases: ['Popularity does not necessarily mean…','Let’s check whether…','According to the source…','We should avoid sharing it until…'],
    followUp: 'Ask what clues might suggest that a post is unreliable.'
  },
  {
    id: 'g12-career', grade: 12, title: 'Career guidance and a mock interview', theme: 'Career & future plans', level: 'B1+',
    role: 'AI đóng vai nhà tuyển dụng / cố vấn hướng nghiệp', objective: 'Giới thiệu điểm mạnh, kỹ năng và mục tiêu tương lai có ví dụ.',
    prompt: 'Thank you for coming. Could you tell me about one strength you have, a skill you are improving, and a career you are considering?',
    vocabulary: [{word:'transferable skills',meaningVi:'kỹ năng có thể áp dụng ở nhiều nghề'},{word:'work experience',meaningVi:'kinh nghiệm làm việc'},{word:'career prospects',meaningVi:'triển vọng nghề nghiệp'}],
    phrases: ['One of my strengths is…','For example, when I…','I am working on improving…','In the long term, I hope to…'],
    followUp: 'Ask the student to describe a challenge they overcame and what they learned.'
  },
  {
    id: 'g12-education', grade: 12, title: 'Choosing a course or university', theme: 'Education & lifelong learning', level: 'B1+',
    role: 'AI đóng vai cố vấn tuyển sinh', objective: 'So sánh lựa chọn và giải thích quyết định dựa trên tiêu chí.',
    prompt: 'You have two study options. One matches your interests, while the other offers a scholarship. What factors would you consider?',
    vocabulary: [{word:'entry requirements',meaningVi:'điều kiện đầu vào'},{word:'tuition fees',meaningVi:'học phí'},{word:'scholarship',meaningVi:'học bổng'}],
    phrases: ['The most important factor for me is…','Compared with…, this option…','I would also take into account…','My final decision would depend on…'],
    followUp: 'Ask how the student would make a realistic study plan.'
  },
  {
    id: 'g12-global', grade: 12, title: 'Discussing global challenges', theme: 'Global issues & citizenship', level: 'B2',
    role: 'AI đóng vai người điều phối thảo luận', objective: 'Nêu quan điểm có lập luận, phản hồi ý kiến và đưa ví dụ.',
    prompt: 'Some people believe individual actions cannot solve global problems. Do you agree or disagree? Please support your view.',
    vocabulary: [{word:'collective action',meaningVi:'hành động tập thể'},{word:'long-term impact',meaningVi:'tác động dài hạn'},{word:'raise awareness',meaningVi:'nâng cao nhận thức'}],
    phrases: ['I partly agree because…','A good example of this is…','Although individual action matters,…','Ultimately, progress depends on…'],
    followUp: 'Ask the student to respond to the opposite viewpoint respectfully.'
  },
  {
    id: 'g12-ai-ethics', grade: 12, title: 'Debating AI in education', theme: 'Science, innovation & ethics', level: 'B2',
    role: 'AI đóng vai bạn tranh biện', objective: 'Cân bằng lợi ích và hạn chế, sử dụng từ nối lập luận.',
    prompt: 'AI can make learning more personalised, but it may also encourage students to depend on it. What is your position?',
    vocabulary: [{word:'personalised learning',meaningVi:'học tập cá nhân hóa'},{word:'critical thinking',meaningVi:'tư duy phản biện'},{word:'academic integrity',meaningVi:'liêm chính học thuật'}],
    phrases: ['There is no doubt that…','That said, we must consider…','The key distinction is between…','To use AI ethically, students should…'],
    followUp: 'Ask the student to propose two clear rules for classroom AI use.'
  },
  {
    id: 'g12-exam', grade: 12, title: 'Explaining an exam preparation plan', theme: 'Revision & study skills', level: 'B1+',
    role: 'AI đóng vai giáo viên hướng dẫn ôn tập', objective: 'Mô tả kế hoạch, ưu tiên kỹ năng và giải thích cách theo dõi tiến bộ.',
    prompt: 'Your graduation exam is approaching. How are you organising your English revision, and which skill needs the most attention?',
    vocabulary: [{word:'revision schedule',meaningVi:'thời gian biểu ôn tập'},{word:'identify weaknesses',meaningVi:'xác định điểm yếu'},{word:'practice under timed conditions',meaningVi:'luyện tập có giới hạn thời gian'}],
    phrases: ['I have divided my revision into…','My main priority is…','I track my progress by…','If I struggle with…, I will…'],
    followUp: 'Ask the student to explain how they will adjust the plan after a mock test.'
  },
  {
    id: 'g12-volunteering', grade: 12, title: 'Presenting a volunteering project', theme: 'Community & social responsibility', level: 'B1+',
    role: 'AI đóng vai đại diện tổ chức cộng đồng', objective: 'Thuyết phục người nghe bằng mục tiêu, tác động và kế hoạch cụ thể.',
    prompt: 'We need students to join a community project. What local problem would you address, and how would your project help?',
    vocabulary: [{word:'underprivileged',meaningVi:'có hoàn cảnh khó khăn'},{word:'make a contribution',meaningVi:'đóng góp'},{word:'assess the impact',meaningVi:'đánh giá tác động'}],
    phrases: ['Our project aims to…','The people who would benefit are…','We plan to measure success by…','Even a small contribution can…'],
    followUp: 'Ask how the team would keep the project going after the first event.'
  },
  {
    id: 'g10-shopping', grade: 10, title: 'Making a practical shopping decision', theme: 'Everyday communication & consumer choices', level: 'A2',
    role: 'AI đóng vai nhân viên cửa hàng', objective: 'Hỏi giá, so sánh sản phẩm và diễn đạt nhu cầu lịch sự.',
    prompt: 'Hello! Are you looking for anything in particular today? I can help you compare a few options.',
    vocabulary: [{word:'affordable',meaningVi:'có giá phải chăng'},{word:'fit',meaningVi:'vừa vặn / phù hợp'},{word:'exchange',meaningVi:'đổi hàng'}],
    phrases: ['How much does this cost?','Do you have this in a different size?','It is a little over my budget.','Could I exchange it if…?'],
    followUp: 'Ask the student to explain which option offers better value for money.'
  },
  {
    id: 'g11-travel', grade: 11, title: 'Helping a visitor plan a local trip', theme: 'Travel & cultural experiences', level: 'B1',
    role: 'AI đóng vai khách quốc tế', objective: 'Đưa chỉ dẫn, gợi ý lịch trình và giải thích lựa chọn.',
    prompt: 'I have one day to explore your area. Where should I go, what should I try, and how can I get around?',
    vocabulary: [{word:'local attraction',meaningVi:'điểm tham quan địa phương'},{word:'public transport',meaningVi:'phương tiện công cộng'},{word:'local speciality',meaningVi:'đặc sản địa phương'}],
    phrases: ['I would recommend visiting…','You can get there by…','Make sure you try…','If you have time, you could…'],
    followUp: 'Ask the student to adapt the plan for a visitor on a limited budget.'
  },
  {
    id: 'g11-health', grade: 11, title: 'Discussing stress and study-life balance', theme: 'Health & wellbeing', level: 'B1',
    role: 'AI đóng vai bạn học đang bị quá tải', objective: 'Thể hiện sự đồng cảm và gợi ý giải pháp thực tế.',
    prompt: 'I have too many assignments and feel stressed. How can I manage my time without giving up everything I enjoy?',
    vocabulary: [{word:'workload',meaningVi:'khối lượng công việc'},{word:'prioritise',meaningVi:'ưu tiên'},{word:'wellbeing',meaningVi:'sức khỏe và trạng thái tinh thần'}],
    phrases: ['That sounds challenging.','Have you tried…?','It might help to…','Remember to make time for…'],
    followUp: 'Ask the student how they could ask a teacher or trusted adult for support.'
  },
  {
    id: 'g12-environment', grade: 12, title: 'Persuading others to support a green solution', theme: 'Sustainable development', level: 'B2',
    role: 'AI đóng vai người phản biện trong buổi thuyết trình', objective: 'Bảo vệ giải pháp bằng bằng chứng và trả lời phản biện.',
    prompt: 'Your proposal to reduce school waste sounds expensive. Why should the school invest in it?',
    vocabulary: [{word:'feasible',meaningVi:'khả thi'},{word:'resource-efficient',meaningVi:'sử dụng tài nguyên hiệu quả'},{word:'measurable outcome',meaningVi:'kết quả đo lường được'}],
    phrases: ['I understand that concern; however,…','The initial cost could be offset by…','We could start with a pilot project.','We would measure the results by…'],
    followUp: 'Ask the student to offer a lower-cost first step and defend it.'
  }
];
