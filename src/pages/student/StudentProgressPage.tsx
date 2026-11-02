import React from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  Flame,
  Award,
  BookOpen,
  Calendar,
  Sparkles,
  Trophy,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const StudentProgressPage: React.FC = () => {
  const { studentProfile, achievements } = useDemo();

  // Illustrative weekly XP chart data
  const weeklyData = [
    { day: 'Mon', xp: 45 },
    { day: 'Tue', xp: 60 },
    { day: 'Wed', xp: 35 },
    { day: 'Thu', xp: 50 },
    { day: 'Fri', xp: 75 },
    { day: 'Sat', xp: 90 },
    { day: 'Sun (Today)', xp: studentProfile.todayEarnedXp },
  ];

  const subjects = [
    { name: 'Quran Reading Foundations', progress: 68, color: 'bg-[#284C3D]' },
    { name: 'Tajweed Rules & Phonics', progress: 42, color: 'bg-[#C5A66A]' },
    { name: 'Arabic Vocabulary & Grammar', progress: 30, color: 'bg-[#648B70]' },
    { name: 'Daily Duas & Supplications', progress: 55, color: 'bg-[#1C382D]' },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Learning Analytics
        </span>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-0.5">
          Progress & Achievements
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Monitor your consistency, XP accumulation, and unlocked milestone badges.
        </p>
      </div>

      {/* Top 4 KPI Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Current Streak</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Flame className="w-5 h-5 text-[#C5A66A] fill-[#C5A66A]" />
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              {studentProfile.streakDays} Days
            </span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Total XP Earned</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Award className="w-5 h-5 text-[#284C3D]" />
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              {studentProfile.totalXp} XP
            </span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Lessons Completed</span>
          <div className="flex items-center gap-1.5 mt-1">
            <BookOpen className="w-5 h-5 text-[#648B70]" />
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              {studentProfile.completedLessonIds.length}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Achievements Unlocked</span>
          <div className="flex items-center gap-1.5 mt-1">
            <Trophy className="w-5 h-5 text-[#C5A66A]" />
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              {achievements.filter((a) => a.unlocked).length} / {achievements.length}
            </span>
          </div>
        </div>
      </div>

      {/* Charts & Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Weekly Activity Chart */}
        <div className="lg:col-span-7 bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1C382D]">Weekly XP Activity Chart</h3>
            <span className="text-xs font-semibold text-[#284C3D] bg-[#DDE8DF] px-2.5 py-0.5 rounded-full">
              Goal: {studentProfile.dailyGoalXp} XP / day
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E6DE" />
                <XAxis dataKey="day" stroke="#737B74" fontSize={11} tickLine={false} />
                <YAxis stroke="#737B74" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C382D',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                  itemStyle={{ color: '#C5A66A' }}
                />
                <Bar dataKey="xp" fill="#284C3D" radius={[6, 6, 0, 0]} name="XP Gained" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 5 Cols: Subject Progress Bars */}
        <div className="lg:col-span-5 bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-5">
          <h3 className="text-sm font-bold text-[#1C382D]">Curriculum Subject Mastery</h3>
          <div className="space-y-4">
            {subjects.map((sub) => (
              <div key={sub.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1C382D] truncate">{sub.name}</span>
                  <span className="font-bold text-[#284C3D]">{sub.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#E7E6DE] overflow-hidden">
                  <div
                    className={`h-full ${sub.color} rounded-full transition-all duration-500`}
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievement Badges Section */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-6 sm:p-8 shadow-subtle space-y-6">
        <div>
          <h3 className="text-base font-bold text-[#1C382D] font-heading">
            Milestone Achievement Badges
          </h3>
          <p className="text-xs text-[#737B74] mt-0.5">
            Badges unlock automatically as you complete lessons and preserve your daily learning habit.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-xl border text-center flex flex-col items-center justify-between space-y-2 transition-all ${
                ach.unlocked
                  ? 'bg-[#F4EDDC]/50 border-[#C5A66A]/60 shadow-xs'
                  : 'bg-[#F8F7F2] border-[#E7E6DE] opacity-50'
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  ach.unlocked
                    ? 'bg-[#284C3D] text-[#C5A66A] shadow-md ring-2 ring-[#C5A66A]/40'
                    : 'bg-[#E7E6DE] text-[#737B74]'
                }`}
              >
                {ach.unlocked ? <Trophy className="w-6 h-6" /> : <Lock className="w-5 h-5" />}
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1C382D] leading-tight">
                  {ach.title}
                </h4>
                <p className="text-[10px] text-[#737B74] mt-1 leading-snug">
                  {ach.description}
                </p>
              </div>

              <span
                className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  ach.unlocked ? 'bg-[#DDE8DF] text-[#1C382D]' : 'bg-[#E7E6DE] text-[#737B74]'
                }`}
              >
                {ach.unlocked ? 'Unlocked' : 'Locked'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

