import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Users, Search, Flame, Award, BookOpen, ShieldCheck } from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const { studentProfile } = useDemo();
  const [search, setSearch] = useState('');

  const mockStudents = [
    {
      id: studentProfile.id,
      name: studentProfile.name,
      parent: studentProfile.parentName,
      email: studentProfile.email,
      age: studentProfile.age,
      streak: studentProfile.streakDays,
      xp: studentProfile.totalXp,
      lessonsCount: studentProfile.completedLessonIds.length,
      primaryTeacher: 'Aisha Rahman',
      status: 'Active',
      joined: '12 Oct 2026',
    },
    {
      id: 'st-02',
      name: 'Maryam Ali',
      parent: 'Farida Ali',
      email: 'farida.ali@example.com',
      age: 8,
      streak: 7,
      xp: 610,
      lessonsCount: 8,
      primaryTeacher: 'Maryam Ali',
      status: 'Active',
      joined: '04 Oct 2026',
    },
    {
      id: 'st-03',
      name: 'Zayd Patel',
      parent: 'Samira Patel',
      email: 'samira.patel@example.com',
      age: 11,
      streak: 3,
      xp: 290,
      lessonsCount: 5,
      primaryTeacher: 'Omar Abdullah',
      status: 'Active',
      joined: '18 Oct 2026',
    },
    {
      id: 'st-04',
      name: 'Ibrahim Farooq',
      parent: 'Dr. Usman Farooq',
      email: 'usman.f@example.com',
      age: 14,
      streak: 12,
      xp: 940,
      lessonsCount: 14,
      primaryTeacher: 'Ahmed Farooq',
      status: 'Active',
      joined: '15 Sep 2026',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            Student & Family Roster
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Overview of registered learners, parent contact details, and platform participation.
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#737B74] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search student or parent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-control bg-white border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-card border border-[#E7E6DE] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F8F7F2] border-b border-[#E7E6DE] text-[#737B74] font-semibold">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Parent Details</th>
                <th className="py-3 px-4">Age</th>
                <th className="py-3 px-4">Enrolled Tutor</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Total XP</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E6DE]">
              {mockStudents.map((st) => (
                <tr key={st.id} className="hover:bg-[#F8F7F2]/40">
                  <td className="py-3.5 px-4 font-bold text-[#1C382D]">{st.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#1C382D] block">{st.parent}</span>
                    <span className="text-[10px] text-[#737B74]">{st.email}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#737B74]">{st.age} yrs</td>
                  <td className="py-3.5 px-4 font-medium text-[#284C3D]">{st.primaryTeacher}</td>
                  <td className="py-3.5 px-4 font-bold text-[#C5A66A]">🔥 {st.streak}d</td>
                  <td className="py-3.5 px-4 font-bold text-[#1C382D]">{st.xp} XP</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold text-[10px]">
                      {st.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

