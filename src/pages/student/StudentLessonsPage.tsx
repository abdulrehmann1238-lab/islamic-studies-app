import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import { Calendar, Video, Clock, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

export const StudentLessonsPage: React.FC = () => {
  const { bookings, cancelBooking } = useDemo();
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming');

  const filteredBookings = bookings.filter((b) =>
    tab === 'upcoming' ? b.status === 'upcoming' : b.status === 'completed' || b.status === 'cancelled'
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            My Lessons & Classroom Schedule
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Track booked 1-on-1 virtual sessions and review past lesson notes.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-white p-1 rounded-control border border-[#E7E6DE]">
          <button
            onClick={() => setTab('upcoming')}
            className={`px-4 py-1.5 text-xs font-bold rounded-control transition-all ${
              tab === 'upcoming'
                ? 'bg-[#284C3D] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#252C28]'
            }`}
          >
            Upcoming ({bookings.filter((b) => b.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setTab('completed')}
            className={`px-4 py-1.5 text-xs font-bold rounded-control transition-all ${
              tab === 'completed'
                ? 'bg-[#284C3D] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#252C28]'
            }`}
          >
            Past Lessons ({bookings.filter((b) => b.status !== 'upcoming').length})
          </button>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-card border border-[#E7E6DE] p-12 text-center space-y-4">
          <Calendar className="w-10 h-10 text-[#737B74] mx-auto" />
          <h3 className="text-base font-bold text-[#1C382D]">No {tab} lessons</h3>
          <p className="text-xs text-[#737B74]">
            {tab === 'upcoming'
              ? 'You do not have any upcoming lessons scheduled right now.'
              : 'You have not completed any tutoring lessons yet.'}
          </p>
          <Link
            to="/teachers"
            className="inline-block px-4 py-2 rounded-control bg-[#284C3D] text-white text-xs font-bold"
          >
            Book a Lesson Now
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="flex items-start sm:items-center gap-4">
                <img
                  src={b.teacherAvatar}
                  alt={b.teacherName}
                  className="w-14 h-14 rounded-xl object-cover border border-[#E7E6DE]"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                      Ref: {b.bookingRef}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        b.status === 'upcoming'
                          ? 'bg-[#DDE8DF] text-[#1C382D]'
                          : b.status === 'completed'
                          ? 'bg-[#F4EDDC] text-[#C5A66A]'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1C382D]">{b.subject}</h3>
                  <p className="text-xs text-[#737B74]">
                    Instructor: <strong className="text-[#1C382D]">{b.teacherName}</strong> • {b.durationMinutes} Minutes
                  </p>
                  <p className="text-xs text-[#284C3D] font-semibold">
                    Scheduled: {b.date} at {b.time}
                  </p>
                  {b.notes && (
                    <p className="text-xs text-[#737B74] italic mt-1 max-w-xl">
                      Note: "{b.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {b.status === 'upcoming' ? (
                  <>
                    <Link
                      to={`/classroom/${b.id}`}
                      className="py-2.5 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center justify-center gap-1.5 transition-all"
                    >
                      <Video className="w-4 h-4 text-[#C5A66A]" />
                      <span>Join Classroom</span>
                    </Link>
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="py-2.5 px-3 rounded-control border border-[#E7E6DE] hover:bg-[#FDF2F0] text-xs font-semibold text-[#B86D65] transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <span className="text-xs font-semibold text-[#648B70] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Lesson Complete
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

