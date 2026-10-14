import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { GradeCurriculum } from './components/curriculum/GradeCurriculum';
import { Sidebar } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';
import { Dashboard } from './components/dashboard/Dashboard';
import { ListeningLab } from './components/listening/ListeningLab';
import { SpeakingLab } from './components/speaking/SpeakingLab';
import { ReadingLab } from './components/reading/ReadingLab';
import { WritingLab } from './components/writing/WritingLab';
import { VocabularyLab } from './components/vocabulary/VocabularyLab';
import { GrammarLab } from './components/grammar/GrammarLab';
import { ScienceEnglishLab } from './components/science/ScienceEnglishLab';
import { ExamPractice } from './components/exam/ExamPractice';
import { ProgressPage } from './components/progress/ProgressPage';
import { AITutorModal } from './components/tutor/AITutorModal';
import { DiagnosticModal } from './components/diagnostic/DiagnosticModal';
import { SettingsModal } from './components/settings/SettingsModal';
import { GuidedSessionModal } from './components/study/GuidedSessionModal';
import { StorageService } from './services/storage';
import { StudentProfile, Grade } from './types';
import { 
  LayoutDashboard, 
  Headphones, 
  Mic, 
  BookOpen, 
  PenTool, 
  Sparkles,
  BookA,
  Dna,
  GraduationCap
} from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<StudentProfile>(StorageService.getProfile());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try { return localStorage.getItem('englishwithlinh-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('englishwithlinh-theme', theme); } catch { /* Theme still works for this session. */ }
  }, [theme]);
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isAITutorOpen, setIsAITutorOpen] = useState(false);
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [isGuidedSessionOpen, setIsGuidedSessionOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Sync profile grade helper
  const handleSetGrade = (newGrade: Grade) => {
    const updated = StorageService.updateGrade(newGrade);
    setProfile({ ...updated });
  };

  const handleLogQuickTime = (mins: number) => {
    const updated = StorageService.logStudyMinutes(mins);
    setProfile({ ...updated });
  };

  const handleLessonCompleted = (lessonId: string, score: number) => {
    const updated = StorageService.completeLesson(lessonId, 'listening', score);
    setProfile({ ...updated });
  };

  const handleWritingSubmitted = (score: number) => {
    const updated = StorageService.completeLesson('writing-' + Date.now(), 'writing', score);
    setProfile({ ...updated });
  };

  const handleSaveVocab = (word: string, defVi: string) => {
    StorageService.saveVocabItem({
      id: 'voc-saved-' + Date.now(),
      word,
      ipa: '/.../',
      pos: 'n',
      meaningVi: defVi,
      exampleEn: `Sample sentence for ${word}.`,
      exampleVi: `Ví dụ tiếng Việt cho ${word}.`,
      collocations: [],
      grade: profile.grade,
      topic: 'Saved from Lessons',
      srsStage: 0,
      nextReviewDate: new Date().toISOString()
    });
    setProfile(StorageService.getProfile());
  };

  return (
    <div className="app-shell min-h-screen bg-[#0b0e14] text-slate-100 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      <button type="button" onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'} title={theme === 'dark' ? 'Bật giao diện sáng' : 'Bật giao diện tối'} className="theme-toggle fixed right-3 top-20 z-[60] inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-600 bg-slate-800/95 px-3 text-sm font-bold text-slate-100 shadow-xl backdrop-blur transition hover:scale-[1.02] sm:right-5 sm:top-5">
        {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-indigo-600" />}
        <span className="hidden sm:inline">{theme === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}</span>
      </button>
      {/* Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        grade={profile.grade}
        setGrade={handleSetGrade}
        streakDays={profile.streakDays}
        isOpenMobile={isMobileNavOpen}
        setIsOpenMobile={setIsMobileNavOpen}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenAITutor={() => setIsAITutorOpen(true)}
      />

      {/* Main Content Layout with 72px sidebar offset on desktop */}
      <div className="lg:pl-72 flex flex-col flex-1 pb-20 lg:pb-8">
        {/* Top Header */}
        <TopHeader
          currentTab={currentTab}
          onNavigate={(tab) => setCurrentTab(tab)}
          profile={profile}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
          onOpenAITutor={() => setIsAITutorOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Viewport Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {currentTab === 'dashboard' && (
            <>
              <Dashboard
                profile={profile}
                onNavigate={(tab) => setCurrentTab(tab)}
                onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
                onStartGuidedSession={() => setIsGuidedSessionOpen(true)}
                onLogTime={handleLogQuickTime}
                onOpenAITutor={() => setIsAITutorOpen(true)}
              />
              <GradeCurriculum currentGrade={profile.grade} />
            </>
          )}

          {currentTab === 'listening' && (
            <ListeningLab
              currentGrade={profile.grade}
              onLessonCompleted={handleLessonCompleted}
              onSaveVocab={handleSaveVocab}
            />
          )}

          {currentTab === 'speaking' && (
            <SpeakingLab
              currentGrade={profile.grade}
              onSessionComplete={(wordsSpoken, isNewSession = false) => {
                const p = StorageService.getProfile();
                if (isNewSession) p.skillStats.speaking.sessions += 1;
                p.skillStats.speaking.wordsSpoken = (p.skillStats.speaking.wordsSpoken || 0) + Math.max(0, wordsSpoken || 0);
                StorageService.logStudyMinutes(2);
                StorageService.saveProfile(p);
                setProfile({ ...p });
              }}
            />
          )}

          {currentTab === 'reading' && (
            <ReadingLab
              currentGrade={profile.grade}
              onLessonCompleted={handleLessonCompleted}
              onSaveVocab={handleSaveVocab}
            />
          )}

          {currentTab === 'writing' && (
            <WritingLab
              currentGrade={profile.grade}
              onWritingSubmitted={handleWritingSubmitted}
            />
          )}

          {currentTab === 'vocabulary' && (
            <VocabularyLab currentGrade={profile.grade} />
          )}

          {currentTab === 'grammar' && (
            <GrammarLab currentGrade={profile.grade} />
          )}

          {currentTab === 'science' && (
            <ScienceEnglishLab
              currentGrade={profile.grade}
              onSaveVocab={handleSaveVocab}
            />
          )}

          {currentTab === 'exam' && (
            <ExamPractice currentGrade={profile.grade} />
          )}

          {currentTab === 'progress' && (
            <ProgressPage
              profile={profile}
              onUpdateGoal={(mins) => {
                const updated = StorageService.updateDailyGoal(mins);
                setProfile({ ...updated });
              }}
              onOpenDiagnostic={() => setIsDiagnosticOpen(true)}
              onStartGuidedSession={() => setIsGuidedSessionOpen(true)}
              onNavigate={(tab) => setCurrentTab(tab)}
            />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Thumb friendly, Dark Theme) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#121620]/95 backdrop-blur-md border-t border-slate-800 px-2 py-1.5 flex items-center justify-around lg:hidden shadow-2xl">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold ${
            currentTab === 'dashboard' ? 'text-[#3B82F6]' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setCurrentTab('listening')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold ${
            currentTab === 'listening' ? 'text-amber-400' : 'text-slate-400'
          }`}
        >
          <Headphones className="w-4 h-4 mb-0.5" />
          <span>Nghe</span>
        </button>

        <button
          onClick={() => setCurrentTab('speaking')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold ${
            currentTab === 'speaking' ? 'text-[#A3E635]' : 'text-slate-400'
          }`}
        >
          <Mic className="w-4 h-4 mb-0.5" />
          <span>Nói</span>
        </button>

        <button
          onClick={() => setCurrentTab('vocabulary')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold ${
            currentTab === 'vocabulary' ? 'text-[#C084FC]' : 'text-slate-400'
          }`}
        >
          <BookA className="w-4 h-4 mb-0.5" />
          <span>Từ vựng</span>
        </button>

        <button
          onClick={() => setIsAITutorOpen(true)}
          className="flex flex-col items-center py-1 px-2 rounded-xl text-[10px] font-bold text-[#A3E635]"
        >
          <Sparkles className="w-4 h-4 mb-0.5 animate-pulse" />
          <span>AI Tutor</span>
        </button>
      </nav>

      {/* Global Modals */}
      <AITutorModal
        isOpen={isAITutorOpen}
        onClose={() => setIsAITutorOpen(false)}
        grade={profile.grade}
      />

      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        grade={profile.grade}
        onClose={() => setIsDiagnosticOpen(false)}
        onCompleted={(result) => {
          setProfile(StorageService.getProfile());
        }}
        onStartSession={() => setIsGuidedSessionOpen(true)}
      />

      <GuidedSessionModal
        isOpen={isGuidedSessionOpen}
        profile={profile}
        onClose={() => setIsGuidedSessionOpen(false)}
        onSessionCompleted={(session, updatedProfile) => {
          setProfile({ ...updatedProfile });
        }}
        onNavigateToLab={(tab) => {
          setCurrentTab(tab);
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={profile}
        onProfileUpdated={(updated) => setProfile({ ...updated })}
      />
    </div>
  );
}
