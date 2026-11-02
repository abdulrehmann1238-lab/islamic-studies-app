import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Clock, Calendar, MessageSquare, ArrowRight } from 'lucide-react';

export const TeacherStudentsPage: React.FC = () => {
  const { studentProfile } = useDemo();

  const mockStudents = [
    {
      id: studentProfile.id,
      name: studentProfile.name,
      parent: studentProfile.parentName,
      age: studentProfile.age,
      subject: 'Tajweed & Quran Recitation',
      progress: 'Level 2: Intermediate',
      lastLesson: 'Yesterday',
      avatar: studentProfile.avatar,
      notes: 'Excellent grasp of throat letters (Haa & Ayn). Working on Qalqalah bounce next.',
    },
    {
      id: 'st-2',
      name: 'Maryam Ali',
      parent: 'Farida Ali',
      age: 8,
      subject: 'Quran Reading (Noorani Qaida)',
      progress: 'Unit 2: Harakat Vowels',
      lastLesson: '3 days ago',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
      notes: 'Very enthusiastic with letter songs. Needs gentle reminder on Kasra placement.',
    },
    {
      id: 'st-3',
      name: 'Zayd Patel',
      parent: 'Samira Patel',
      age: 11,
      subject: 'Quran Memorisation (Juz Amma)',
      progress: 'Surah Al-Ala to Surah An-Nas',
      lastLesson: 'Last week',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
      notes: 'Strong retention. Murajaah (revision) routine is working well.',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Student Roster & Profiles
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Review individual student notes, enrolled subjects, and pedagogical progress.
        </p>
      </div>

      <div className="space-y-4">
        {mockStudents.map((st) => (
          <div
            key={st.id}
            className="p-6 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start sm:items-center gap-4">
              <img
                src={st.avatar}
                alt={st.name}
                className="w-14 h-14 rounded-2xl object-cover border border-[#E7E6DE]"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1C382D]">{st.name}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold">
                    Age {st.age}
                  </span>
                </div>
                <p className="text-xs text-[#737B74]">
                  Parent Contact: <strong className="text-[#1C382D]">{st.parent}</strong>
                </p>
                <p className="text-xs text-[#284C3D] font-semibold">
                  Course: {st.subject} • {st.progress}
                </p>
                <p className="text-xs text-[#737B74] italic max-w-xl">
                  Teacher Notes: "{st.notes}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/teacher/messages"
                className="py-2 px-3 rounded-control border border-[#E7E6DE] bg-white text-xs font-semibold hover:bg-[#F8F7F2] flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#284C3D]" />
                <span>Message Parent</span>
              </Link>
              <Link
                to="/classroom/booking-101"
                className="py-2 px-3 rounded-control bg-[#284C3D] text-white text-xs font-bold hover:bg-[#1C382D]"
              >
                Launch Board
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

