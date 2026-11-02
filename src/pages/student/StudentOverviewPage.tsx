import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  Flame,
  Award,
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Video,
  Calendar,
  CheckCircle2,
  Users,
  Star,
} from 'lucide-react';

export const StudentOverviewPage: React.FC = () => {
  const { studentProfile, bookings, teachers, courses } = useDemo();
  const navigate = useNavigate();

  const upcomingBookings = bookings.filter((b) => b.status === 'upcoming');
  const nextLesson = upcomingBookings[0];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Student Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-0.5">
            Assalamu Alaikum, {studentProfile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-[#737B74] mt-1">
            "Ready for another day of knowledge and growth?"
          </p>
        </div>

        <Link
          to="/teachers"
          className="self-start sm:self-auto px-4 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
        >
          <span>Find & Book Teachers</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A66A]" />
        </Link>
      </div>

      {/* 4 Metric Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-4 sm:p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EDDC] text-[#C5A66A] flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 fill-[#C5A66A]" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#1C382D] font-heading block">
              {studentProfile.streakDays}-Day
            </span>
            <span className="text-xs text-[#737B74] font-medium">Daily Streak 🔥</span>
          </div>
        </div>

        {/* Total XP */}
        <div className="p-4 sm:p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#1C382D] font-heading block">
              {studentProfile.totalXp} XP
            </span>
            <span className="text-xs text-[#737B74] font-medium">Earned This Term</span>
          </div>
        </div>

        {/* Completed Lessons */}
        <div className="p-4 sm:p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F8F7F2] text-[#284C3D] flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#1C382D] font-heading block">
              {studentProfile.completedLessonIds.length} Modules
            </span>
            <span className="text-xs text-[#737B74] font-medium">Completed</span>
          </div>
        </div>

        {/* Learning Time */}
        <div className="p-4 sm:p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EDDC] text-[#284C3D] flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-extrabold text-[#1C382D] font-heading block">
              3.5 Hours
            </span>
            <span className="text-xs text-[#737B74] font-medium">Live & Practice Time</span>
          </div>
        </div>
      </div>

      {/* Hero Banner: Continue Micro-Learning */}
      <div className="p-6 sm:p-8 rounded-feature bg-[#1C382D] text-white shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-3 z-10 max-w-lg">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#284C3D] text-[#C5A66A] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Micro-Learning</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-heading text-white">
            Continue Your Daily Lesson
          </h2>
          <p className="text-xs text-[#DDE8DF] leading-relaxed">
            Course: <strong className="text-white">Quran Reading Foundations</strong> • Lesson 3: Letter Connections (Beginning, Middle, End).
          </p>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
            <div className="h-full bg-[#C5A66A] w-2/3 rounded-full" />
          </div>
        </div>

        <Link
          to="/learn/lesson/lesson-3"
          className="z-10 px-6 py-3.5 rounded-control bg-[#C5A66A] hover:bg-white text-[#1C382D] font-bold text-xs shadow-card flex items-center gap-2 flex-shrink-0 transition-all hover:scale-102"
        >
          <span>Continue Lesson 3</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Two Column Section: Upcoming Lessons & Connected Teachers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Upcoming Live Classroom Sessions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1C382D] font-heading flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#284C3D]" />
              <span>Upcoming Live Tutoring Lessons</span>
            </h3>
            <Link to="/student/lessons" className="text-xs font-semibold text-[#284C3D] hover:underline">
              View all ({bookings.length})
            </Link>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="p-8 rounded-card bg-white border border-[#E7E6DE] text-center space-y-3">
              <p className="text-xs text-[#737B74]">No scheduled lessons for today.</p>
              <Link
                to="/teachers"
                className="inline-block px-4 py-2 rounded-control bg-[#284C3D] text-white text-xs font-bold"
              >
                Book a Teacher Lesson
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-card bg-white border border-[#E7E6DE] hover:border-[#284C3D] shadow-subtle transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={b.teacherAvatar}
                      alt={b.teacherName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#E7E6DE]"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                        {b.date} • {b.time}
                      </span>
                      <h4 className="text-sm font-bold text-[#1C382D]">{b.subject}</h4>
                      <p className="text-xs text-[#737B74]">Teacher: {b.teacherName}</p>
                    </div>
                  </div>

                  <Link
                    to={`/classroom/${b.id}`}
                    className="w-full sm:w-auto py-2.5 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center justify-center gap-2 transition-all flex-shrink-0"
                  >
                    <Video className="w-3.5 h-3.5 text-[#C5A66A]" />
                    <span>Join Classroom</span>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 5 Cols: My Teachers Shortcut */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1C382D] font-heading flex items-center gap-2">
              <Users className="w-4 h-4 text-[#284C3D]" />
              <span>My Mentors & Tutors</span>
            </h3>
            <Link to="/student/teachers" className="text-xs font-semibold text-[#284C3D] hover:underline">
              View profiles
            </Link>
          </div>

          <div className="space-y-3">
            {teachers.slice(0, 3).map((teacher) => (
              <div
                key={teacher.id}
                className="p-4 rounded-card bg-white border border-[#E7E6DE] flex items-center justify-between shadow-subtle"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#1C382D]">{teacher.name}</h5>
                    <p className="text-[10px] text-[#737B74] line-clamp-1">{teacher.specialities.join(', ')}</p>
                  </div>
                </div>

                <Link
                  to={`/teachers/${teacher.id}`}
                  className="text-xs font-bold text-[#284C3D] hover:underline"
                >
                  Book →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

