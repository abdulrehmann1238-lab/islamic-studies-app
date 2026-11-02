import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  Clock,
  Star,
  Video,
  DollarSign,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const TeacherOverviewPage: React.FC = () => {
  const { teachers, bookings, commissionRate } = useDemo();
  const currentTeacher = teachers[0]; // Aisha Rahman

  // Upcoming lessons for this teacher
  const teacherBookings = bookings.filter((b) => b.teacherId === currentTeacher.id || b.teacherName === currentTeacher.name);
  const upcomingLessons = teacherBookings.filter((b) => b.status === 'upcoming');

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Teaching Studio
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-0.5">
            Assalamu Alaikum, {currentTeacher.name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-[#737B74] mt-1">
            "Here's what's happening with your teaching schedule today."
          </p>
        </div>

        <Link
          to="/teacher/schedule"
          className="self-start sm:self-auto px-4 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C5A66A]" />
          <span>Manage Availability</span>
        </Link>
      </div>

      {/* 4 Key Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading block">
              {upcomingLessons.length} Lessons
            </span>
            <span className="text-xs text-[#737B74]">Upcoming Today</span>
          </div>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EDDC] text-[#C5A66A] flex items-center justify-center flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading block">
              {currentTeacher.studentCount} Students
            </span>
            <span className="text-xs text-[#737B74]">Active Roster</span>
          </div>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F8F7F2] text-[#284C3D] flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading block">
              420 Hours
            </span>
            <span className="text-xs text-[#737B74]">Teaching Logged</span>
          </div>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#F4EDDC] text-[#C5A66A] flex items-center justify-center flex-shrink-0">
            <Star className="w-6 h-6 fill-[#C5A66A]" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading block">
              {currentTeacher.rating.toFixed(2)}
            </span>
            <span className="text-xs text-[#737B74]">Average Rating</span>
          </div>
        </div>
      </div>

      {/* Today's Chronological Schedule */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DE]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-base font-bold text-[#1C382D] font-heading">
              Today's Teaching Schedule
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#648B70] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#648B70]" />
            Live Classroom Ready
          </span>
        </div>

        {upcomingLessons.length === 0 ? (
          <div className="text-center py-10 text-xs text-[#737B74]">
            No lessons booked for today. Check your schedule calendar to open more availability slots.
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="p-4 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#284C3D]">{lesson.time}</span>
                    <span className="text-[10px] text-[#737B74] font-mono">({lesson.date})</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-[#DDE8DF] text-[#1C382D] font-bold">
                      {lesson.durationMinutes}m
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1C382D]">{lesson.subject}</h4>
                  <p className="text-xs text-[#737B74]">
                    Student: <strong className="text-[#1C382D]">{lesson.studentName}</strong>
                  </p>
                  {lesson.notes && (
                    <p className="text-xs text-[#737B74] italic">
                      Parent note: "{lesson.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/classroom/${lesson.id}`}
                    className="py-2.5 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
                  >
                    <Video className="w-4 h-4 text-[#C5A66A]" />
                    <span>Join Classroom</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Earnings Quick Summary Bar */}
      <div className="p-6 rounded-card bg-[#F4EDDC]/50 border border-[#C5A66A]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Financial Overview
          </span>
          <h3 className="text-lg font-bold text-[#1C382D]">Estimated Next Payout</h3>
          <p className="text-xs text-[#737B74] mt-0.5">
            Platform fee ({commissionRate}%) deducted automatically on completed sessions.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading block">
              £384.50
            </span>
            <span className="text-[10px] text-[#648B70] font-semibold">Available for Payout</span>
          </div>
          <Link
            to="/teacher/earnings"
            className="py-2 px-3 rounded-control border border-[#C5A66A] bg-white text-xs font-bold text-[#1C382D] hover:bg-[#F4EDDC]"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

