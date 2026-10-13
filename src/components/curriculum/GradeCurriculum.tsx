import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, GraduationCap, CheckCircle2, ChevronDown, ChevronUp, Lightbulb, PenLine, MessageCircle, BookMarked } from 'lucide-react';
import { supplementaryEnglishLessons } from '../../../data/supplementaryEnglishLessons';

type Grade = 10 | 11 | 12;

const gradeMeta: Record<Grade, { subtitle: string; level: string; focus: string }> = {
  10: { subtitle: 'Củng cố nền tảng và xây dựng thói quen học tiếng Anh', level: 'Nền tảng · A2', focus: 'Từ vựng theo chủ đề, ngữ pháp cốt lõi, đọc hiểu và giao tiếp gần gũi' },
  11: { subtitle: 'Phát triển tư duy, diễn đạt ý kiến và sử dụng tiếng Anh độc lập hơn', level: 'Phát triển · B1', focus: 'Đọc hiểu thông tin, câu điều kiện, lập luận và kỹ năng học tập' },
  12: { subtitle: 'Ôn tập có định hướng, lập luận và chuẩn bị cho kỳ thi cuối cấp', level: 'Nâng cao · B2 mục tiêu', focus: 'Ngữ pháp tổng hợp, đọc hiểu dài hơn, từ vựng học thuật và viết có cấu trúc' },
};

export function GradeCurriculum({ currentGrade }: { currentGrade: Grade }) {
  const [grade, setGrade] = useState<Grade>(currentGrade);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  useEffect(() => { setGrade(currentGrade); }, [currentGrade]);
  const lessons = useMemo(() => supplementaryEnglishLessons.filter((lesson) => lesson.grade === grade), [grade]);

  return (
    <section className="curriculum-panel mt-6 rounded-3xl border border-slate-700/60 bg-slate-900/70 p-4 sm:p-6 lg:p-7 shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-300"><GraduationCap className="h-6 w-6" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-300">Lộ trình theo khối lớp</p>
            <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">English with Linh · Lớp {grade}</h2>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">{gradeMeta[grade].subtitle}</p>
          </div>
        </div>
        <div className="flex w-full gap-2 sm:w-auto" role="group" aria-label="Chọn khối lớp">
          {([10, 11, 12] as Grade[]).map((item) => (
            <button key={item} onClick={() => { setGrade(item); setExpanded(null); }} className={`min-h-11 flex-1 rounded-xl border px-4 text-sm font-bold transition sm:flex-none ${grade === item ? 'border-indigo-400 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-indigo-400'}`}>
              Lớp {item}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-700/70 bg-slate-800/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Định hướng học tập</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{gradeMeta[grade].focus}</p>
        </div>
        <div className="rounded-2xl border border-slate-700/70 bg-slate-800/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Mục tiêu tham khảo</p>
          <p className="mt-2 text-sm leading-6 text-slate-200">{gradeMeta[grade].level}. Nội dung luyện tập tự biên soạn theo chủ đề và kỹ năng; không thay thế mục lục sách giáo khoa cụ thể của trường.</p>
        </div>
      </div>
      <div className="mt-6 flex items-center gap-2"><BookOpen className="h-5 w-5 text-indigo-300" /><h3 className="text-lg font-bold">Bài học và luyện tập</h3><span className="ml-auto rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">{lessons.length} bài mẫu</span></div>
      <div className="mt-3 space-y-3">
        {lessons.map((lesson) => {
          const isOpen = expanded === lesson.id;
          return <article key={lesson.id} className="overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-800/45">
            <button className="flex min-h-16 w-full items-center gap-3 p-4 text-left sm:p-5" onClick={() => setExpanded(isOpen ? null : lesson.id)} aria-expanded={isOpen}>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300"><BookMarked className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-bold uppercase tracking-wide text-indigo-300">Unit {lesson.unit} · {lesson.theme}</span><span className="mt-1 block font-bold text-slate-100">{lesson.title}</span><span className="mt-1 block text-sm text-slate-400">{lesson.titleVi}</span></span>
              {isOpen ? <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" /> : <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />}
            </button>
            {isOpen && <div className="space-y-6 border-t border-slate-700/70 p-4 sm:p-5">
              <div><h4 className="font-bold text-slate-100">Mục tiêu bài học</h4><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-300">{lesson.objectives.map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
              <div><h4 className="font-bold text-slate-100">Từ vựng trọng tâm</h4><div className="mt-3 grid gap-3 sm:grid-cols-2">{lesson.vocabulary.map((word) => <div key={word.word} className="rounded-xl border border-slate-700 bg-slate-900/50 p-3"><div className="flex flex-wrap items-baseline justify-between gap-2"><span className="font-bold text-indigo-200">{word.word}</span><span className="text-xs text-slate-500">{word.ipa}</span></div><p className="mt-1 text-sm text-slate-300">{word.meaningVi}</p><p className="mt-2 text-sm text-slate-200">{word.example}</p><p className="mt-1 text-xs text-slate-400">{word.exampleVi}</p></div>)}</div></div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4"><div className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-amber-300"/><h4 className="font-bold text-slate-100">Ngữ pháp: {lesson.grammar.focus}</h4></div><p className="mt-2 rounded-lg bg-slate-950/40 p-3 font-mono text-sm text-amber-100">{lesson.grammar.formula}</p><p className="mt-3 text-sm leading-6 text-slate-300">{lesson.grammar.explanationVi}</p><div className="mt-3 space-y-2">{lesson.grammar.examples.map((example) => <div key={example.en} className="text-sm"><p className="font-medium text-slate-100">{example.en}</p><p className="text-slate-400">{example.vi}</p></div>)}</div></div>
              <div><h4 className="font-bold text-slate-100">Reading · {lesson.reading.title}</h4><p className="mt-2 text-sm leading-7 text-slate-300">{lesson.reading.text}</p><div className="mt-4 space-y-4">{lesson.reading.questions.map((question, index) => { const selected = answers[question.id]; const checked = selected !== undefined; return <div key={question.id} className="rounded-xl border border-slate-700 bg-slate-900/40 p-4"><p className="text-sm font-semibold text-slate-100">{index + 1}. {question.prompt}</p><div className="mt-3 grid gap-2">{question.options.map((option, optionIndex) => <button key={option} onClick={() => setAnswers((old) => ({ ...old, [question.id]: optionIndex }))} className={`min-h-10 rounded-lg border px-3 py-2 text-left text-sm transition ${checked && optionIndex === question.answerIndex ? 'border-emerald-500/70 bg-emerald-500/10 text-emerald-200' : checked && selected === optionIndex ? 'border-rose-500/70 bg-rose-500/10 text-rose-200' : 'border-slate-700 text-slate-300 hover:border-indigo-400'}`}>{String.fromCharCode(65 + optionIndex)}. {option}</button>)}</div>{checked && <p className="mt-3 text-sm leading-6 text-slate-300"><span className={selected === question.answerIndex ? 'font-bold text-emerald-300' : 'font-bold text-amber-300'}>{selected === question.answerIndex ? 'Chính xác!' : 'Chưa đúng.'}</span> {question.explanationVi}</p>}</div>; })}</div></div>
              <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4"><div className="flex items-center gap-2"><MessageCircle className="h-5 w-5 text-sky-300"/><h4 className="font-bold text-slate-100">Speaking</h4></div><p className="mt-2 text-sm text-slate-300">{lesson.speaking.prompt}</p><p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">Gợi ý diễn đạt</p><div className="mt-2 flex flex-wrap gap-2">{lesson.speaking.usefulExpressions.map((expression) => <span key={expression} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-sky-200">{expression}</span>)}</div></div><div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4"><div className="flex items-center gap-2"><PenLine className="h-5 w-5 text-violet-300"/><h4 className="font-bold text-slate-100">Writing</h4></div><p className="mt-2 text-sm leading-6 text-slate-300">{lesson.writing.task}</p><ul className="mt-3 space-y-2 text-sm text-slate-400">{lesson.writing.checklist.map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-300"/>{item}</li>)}</ul></div></div>
            </div>}
          </article>;
        })}
      </div>
    </section>
  );
}
