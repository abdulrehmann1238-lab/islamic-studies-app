import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { StudentSidebar } from '../components/student/StudentSidebar';
import { RoleSwitcher } from '../components/common/RoleSwitcher';
import { useDemo } from '../context/DemoContext';
import {
  LayoutDashboard,
  Calendar,
  Sparkles,
  BarChart2,
  Users,
  Flame,
  Award,
  Bell,
} from 'lucide-react';

export const StudentLayout: React.FC = () => {
  const { studentProfile } = useDemo();
  const location = useLocation();

  const mobileTabs = [
    { name: 'Dashboard', path: '/student', icon: LayoutDashboard },
    { name: 'Lessons', path: '/student/lessons', icon: Calendar },
    { name: 'Learn', path: '/learn', icon: Sparkles },
    { name: 'Teachers', path: '/student/teachers', icon: Users },
    { name: 'Progress', path: '/student/progress', icon: BarChart2 },
  ];

  return (
    <div className="flex h-screen bg-[#F8F7F2] text-[#252C28] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <StudentSidebar />
      </div>

      {/* Main Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Top Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E7E6DE]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-sm tracking-wider text-[#1C382D]">
              NOOR
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs font-bold text-[#C5A66A] px-2 py-0.5 rounded-full bg-[#F4EDDC]">
              <Flame className="w-3.5 h-3.5 fill-[#C5A66A]" />
              <span>{studentProfile.streakDays}d</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#284C3D] px-2 py-0.5 rounded-full bg-[#DDE8DF]">
              <Award className="w-3.5 h-3.5" />
              <span>{studentProfile.totalXp} XP</span>
            </div>
            <img
              src={studentProfile.avatar}
              alt={studentProfile.name}
              className="w-7 h-7 rounded-full object-cover border"
            />
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E6DE] py-2 px-3 flex items-center justify-around z-30 shadow-elevated">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.path === '/student'
              ? location.pathname === '/student'
              : location.pathname.startsWith(tab.path);

            return (
              <NavLink
                key={tab.name}
                to={tab.path}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-[#284C3D]' : 'text-[#737B74] hover:text-[#252C28]'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-[#DDE8DF]' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span>{tab.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <RoleSwitcher />
    </div>
  );
};

