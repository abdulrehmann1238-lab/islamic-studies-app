import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import { BookingModal } from '../../components/marketplace/BookingModal';
import { Teacher } from '../../types';
import { Star, MessageSquare, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';

export const StudentTeachersPage: React.FC = () => {
  const { teachers, favoriteTeacherIds } = useDemo();
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  // Filter teachers to shortlisted or booked ones
  const myTeachers = teachers.filter(
    (t) => favoriteTeacherIds.includes(t.id) || t.id === 'teacher-1' || t.id === 'teacher-2'
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            My Connected Teachers
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Educators you have booked or saved for ongoing Islamic Studies guidance.
          </p>
        </div>

        <Link
          to="/teachers"
          className="px-4 py-2 rounded-control bg-[#284C3D] text-white text-xs font-bold"
        >
          + Find More Teachers
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-sm font-bold text-[#1C382D]">{teacher.name}</h3>
                  <p className="text-xs text-[#737B74]">{teacher.title}</p>
                  <div className="flex items-center gap-1 text-[11px] text-[#C5A66A] font-bold mt-0.5">
                    <Star className="w-3 h-3 fill-[#C5A66A]" />
                    <span>{teacher.rating.toFixed(2)}</span>
                    <span className="text-[#737B74] font-normal">({teacher.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#F8F7F2] text-xs space-y-1">
                <p className="text-[#737B74]">
                  Subjects: <strong className="text-[#1C382D]">{teacher.specialities.join(', ')}</strong>
                </p>
                <p className="text-[#737B74]">
                  Rate: <strong className="text-[#284C3D]">£{teacher.hourlyRate}/hr</strong>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E7E6DE]">
              <Link
                to={`/teachers/${teacher.id}`}
                className="py-2 text-center text-xs font-semibold rounded-control border border-[#E7E6DE] text-[#252C28] hover:bg-[#F8F7F2]"
              >
                Profile
              </Link>
              <button
                onClick={() => setSelectedTeacher(teacher)}
                className="py-2 rounded-control bg-[#284C3D] text-white text-xs font-bold hover:bg-[#1C382D]"
              >
                Book Lesson
              </button>
            </div>
          </div>
        ))}
      </div>

      <BookingModal
        teacher={selectedTeacher}
        isOpen={!!selectedTeacher}
        onClose={() => setSelectedTeacher(null)}
      />
    </div>
  );
};

