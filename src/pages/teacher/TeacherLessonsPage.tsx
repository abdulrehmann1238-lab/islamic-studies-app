import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { Link } from 'react-router-dom';
import { BookOpen, Video, CheckCircle2, Save, MessageSquare } from 'lucide-react';

export const TeacherLessonsPage: React.FC = () => {
  const { bookings, teachers } = useDemo();
  const { showToast } = useToast();
  const currentTeacher = teachers[0]; // Aisha Rahman

  const teacherBookings = bookings.filter(
    (b) => b.teacherId === currentTeacher.id || b.teacherName === currentTeacher.name
  );

  const [notesState, setNotesState] = useState<{ [id: string]: string }>({
    'booking-101': 'Focus on throat letters Ayn and Haa. Ready for Surah Al-Fatiha recitation.',
    'booking-102': 'Completed Surah An-Nas through Surah Al-Kawthar. Recitation rhythm was steady.',
  });

  const handleSaveNotes = (bookingId: string) => {
    showToast({
      type: 'success',
      title: 'Pedagogical Notes Saved',
      message: 'Student record updated and accessible in the student portal.',
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Lesson History & Student Notes
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Review past sessions, launch classrooms, and maintain continuous pedagogical records.
        </p>
      </div>

      <div className="space-y-4">
        {teacherBookings.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-card bg-white border border-[#E7E6DE] shadow-subtle space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7E6DE]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                  Booking Ref: {b.bookingRef}
                </span>
                <h3 className="text-base font-bold text-[#1C382D]">{b.subject}</h3>
                <p className="text-xs text-[#737B74]">
                  Student: <strong className="text-[#1C382D]">{b.studentName}</strong> • {b.date} at {b.time} ({b.durationMinutes}m)
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                    b.status === 'upcoming'
                      ? 'bg-[#DDE8DF] text-[#1C382D]'
                      : 'bg-[#F4EDDC] text-[#C5A66A]'
                  }`}
                >
                  {b.status.toUpperCase()}
                </span>
                <Link
                  to={`/classroom/${b.id}`}
                  className="py-1.5 px-3 rounded-control bg-[#284C3D] text-white text-xs font-bold hover:bg-[#1C382D] flex items-center gap-1 shadow-xs"
                >
                  <Video className="w-3.5 h-3.5 text-[#C5A66A]" />
                  <span>Classroom</span>
                </Link>
              </div>
            </div>

            {/* Editable Notes Area */}
            <div>
              <label className="block text-xs font-bold text-[#1C382D] mb-1">
                Teacher Notes for this Lesson (Shared with Parent):
              </label>
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={notesState[b.id] || ''}
                  onChange={(e) =>
                    setNotesState({ ...notesState, [b.id]: e.target.value })
                  }
                  placeholder="Record homework, Makhraj feedback, or next chapter goals..."
                  className="flex-1 p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                />
                <button
                  onClick={() => handleSaveNotes(b.id)}
                  className="self-end px-3 py-2.5 rounded-control bg-[#284C3D] text-white text-xs font-bold hover:bg-[#1C382D] flex items-center gap-1 transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A66A]" />
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

