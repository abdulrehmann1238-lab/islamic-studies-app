import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Flame,
  Heart,
  Award,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  BookOpen,
  ChevronRight,
  Plus,
} from 'lucide-react';

export const LearningHomePage: React.FC = () => {
  const { courses, studentProfile, refillHearts } = useDemo();
  const navigate = useNavigate();

  const [activeCourseId, setActiveCourseId] = useState(courses[0]?.id || 'course-quran-foundations');
  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  const handleStartLesson = (lessonId: string, isLocked: boolean) => {
    if (isLocked) return;
    navigate(`/learn/lesson/${lessonId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Gamification Stats Header */}
      <div className="bg-white rounded-feature border border-[#E7E6DE] p-5 shadow-card flex flex-wrap items-center justify-between gap-4">
        {/* Course Title & Level */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
            Current Learning Course
          </span>
          <h1 className="text-xl font-extrabold text-[#1C382D] font-heading">
            {activeCourse?.title}
          </h1>
        </div>

        {/* Gamification Pills */}
        <div className="flex items-center gap-3">
          {/* Streak */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F4EDDC] text-[#1C382D] text-xs font-bold shadow-xs"
            title="Active learning streak"
          >
            <Flame className="w-4 h-4 text-[#C5A66A] fill-[#C5A66A]" />
            <span>{studentProfile.streakDays} Days</span>
          </div>

          {/* XP */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#DDE8DF] text-[#1C382D] text-xs font-bold shadow-xs"
            title="Total Experience Points"
          >
            <Award className="w-4 h-4 text-[#284C3D]" />
            <span>{studentProfile.totalXp} XP</span>
          </div>

          {/* Hearts */}
          <div
            onClick={refillHearts}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FDF2F0] text-[#B86D65] text-xs font-bold cursor-pointer hover:bg-red-100 transition-colors shadow-xs"
            title="Click to refill hearts"
          >
            <Heart className="w-4 h-4 text-[#B86D65] fill-[#B86D65]" />
            <span>{studentProfile.hearts}/{studentProfile.maxHearts}</span>
          </div>
        </div>
      </div>

      {/* Course Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setActiveCourseId(course.id)}
            className={`px-4 py-2 rounded-control text-xs font-bold flex-shrink-0 transition-all ${
              activeCourseId === course.id
                ? 'bg-[#284C3D] text-white shadow-card'
                : 'bg-white text-[#737B74] border border-[#E7E6DE] hover:bg-[#F8F7F2]'
            }`}
          >
            {course.title}
          </button>
        ))}
      </div>

      {/* Vertical Learning Path */}
      <div className="space-y-10">
        {activeCourse?.units.map((unit, uIdx) => (
          <div key={unit.id} className="space-y-6">
            {/* Unit Header Banner */}
            <div className="bg-[#284C3D] text-white p-5 rounded-2xl shadow-card flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                  Unit {uIdx + 1}
                </span>
                <h2 className="text-base font-bold font-heading">{unit.title}</h2>
                <p className="text-xs text-[#DDE8DF] mt-0.5">{unit.description}</p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center font-bold text-xs text-[#C5A66A]">
                {unit.lessons.filter((l) => studentProfile.completedLessonIds.includes(l.id)).length} / {unit.lessons.length}
              </div>
            </div>

            {/* Stepped Learning Journey Path */}
            <div className="relative py-4 flex flex-col items-center space-y-6">
              {unit.lessons.map((lesson, lIdx) => {
                const isCompleted = studentProfile.completedLessonIds.includes(lesson.id);
                // First lesson is always unlocked, otherwise unlocked if previous is completed
                const prevLesson = lIdx > 0 ? unit.lessons[lIdx - 1] : null;
                const isUnlocked = lIdx === 0 || (prevLesson && studentProfile.completedLessonIds.includes(prevLesson.id));

                // Alternate horizontal offset to create a natural snake curve path
                const offsets = ['translate-x-0', 'translate-x-8', 'translate-x-0', '-translate-x-8'];
                const offsetClass = offsets[lIdx % offsets.length];

                return (
                  <div
                    key={lesson.id}
                    className={`flex flex-col items-center transition-transform ${offsetClass}`}
                  >
                    {/* Lesson Node Bubble */}
                    <button
                      type="button"
                      disabled={!isUnlocked}
                      onClick={() => handleStartLesson(lesson.id, !isUnlocked)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-card ${
                        isCompleted
                          ? 'bg-[#648B70] text-white ring-4 ring-[#DDE8DF] hover:scale-105'
                          : isUnlocked
                          ? 'bg-[#284C3D] text-[#C5A66A] ring-4 ring-[#C5A66A]/40 hover:scale-105 animate-pulse-subtle'
                          : 'bg-[#E7E6DE] text-[#737B74] opacity-60 cursor-not-allowed'
                      }`}
                      title={lesson.title}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-7 h-7" />
                      ) : isUnlocked ? (
                        <Play className="w-7 h-7 fill-[#C5A66A] ml-1" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}

                      {/* XP Label Badge */}
                      <span className="absolute -bottom-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#1C382D] shadow-xs border border-[#E7E6DE]">
                        +{lesson.xpReward} XP
                      </span>
                    </button>

                    {/* Lesson Info Card */}
                    <div className="mt-3 text-center max-w-[200px]">
                      <h4 className="text-xs font-bold text-[#1C382D] leading-tight line-clamp-1">
                        {lesson.title}
                      </h4>
                      <span className="text-[10px] text-[#737B74]">
                        {lesson.difficulty} • ~{lesson.estimatedMinutes}m
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

