import React from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';
import { TeacherSidebar } from '../components/teacher/TeacherSidebar';
import { RoleSwitcher } from '../components/common/RoleSwitcher';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  MessageSquare,
  BookOpen,
} from 'lucide-react';

export const TeacherLayout: React.FC = () => {
  const location = useLocation();

  const mobileTabs = [
    { name: 'Dashboard', path: '/teacher', icon: LayoutDashboard },
    { name: 'Schedule', path: '/teacher/schedule', icon: Calendar },
    { name: 'Students', path: '/teacher/students', icon: Users },
    { name: 'Earnings', path: '/teacher/earnings', icon: DollarSign },
    { name: 'Messages', path: '/teacher/messages', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen bg-[#F8F7F2] text-[#252C28] overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <TeacherSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-[#E7E6DE]">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-sm tracking-wider text-[#1C382D]">
              NOOR Teacher
            </span>
          </Link>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4EDDC] text-[#C5A66A] font-bold">
            Ustadhah Aisha
          </span>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7E6DE] py-2 px-3 flex items-center justify-around z-30 shadow-elevated">
          {mobileTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.path === '/teacher'
              ? location.pathname === '/teacher'
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

