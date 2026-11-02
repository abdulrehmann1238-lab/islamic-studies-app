import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Sparkles,
  BarChart2,
  MessageSquare,
  Settings,
  Flame,
  Award,
  BookOpen,
} from 'lucide-react';

export const StudentSidebar: React.FC = () => {
  const { studentProfile } = useDemo();

  const links = [
    { name: 'Overview', path: '/student', icon: LayoutDashboard },
    { name: 'My Teachers', path: '/student/teachers', icon: Users },
    { name: 'My Lessons', path: '/student/lessons', icon: Calendar },
    { name: 'Micro-Learning', path: '/learn', icon: Sparkles },
    { name: 'Progress & XP', path: '/student/progress', icon: BarChart2 },
    { name: 'Messages', path: '/student/messages', icon: MessageSquare },
    { name: 'Parent Controls', path: '/student/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#E7E6DE] flex flex-col h-full flex-shrink-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#E7E6DE]">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold shadow-card">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
            </svg>
          </div>
          <div>
            <span className="font-heading font-extrabold text-base tracking-wider text-[#1C382D] block leading-none">
              NOOR
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A66A]">
              Student Portal
            </span>
          </div>
        </Link>
      </div>

      {/* Student Badge Card */}
      <div className="p-4 mx-3 my-3 bg-[#F8F7F2] rounded-card border border-[#E7E6DE]">
        <div className="flex items-center gap-3">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-10 h-10 rounded-xl object-cover border border-[#A7B9A8]"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-[#1C382D] truncate">
              {studentProfile.name}
            </h4>
            <p className="text-[10px] text-[#737B74] truncate">
              Parent: {studentProfile.parentName}
            </p>
          </div>
        </div>

        {/* Quick Streak & XP Pill */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#E7E6DE] text-xs">
          <div className="flex items-center gap-1 text-[#C5A66A] font-bold">
            <Flame className="w-3.5 h-3.5 fill-[#C5A66A]" />
            <span>{studentProfile.streakDays}d Streak</span>
          </div>
          <div className="flex items-center gap-1 text-[#284C3D] font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>{studentProfile.totalXp} XP</span>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/student'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-control text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#284C3D] text-white shadow-card'
                    : 'text-[#737B74] hover:text-[#252C28] hover:bg-[#F8F7F2]'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Marketplace Link */}
      <div className="p-4 border-t border-[#E7E6DE] bg-[#F8F7F2]">
        <Link
          to="/teachers"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-control bg-[#DDE8DF] text-[#1C382D] text-xs font-bold hover:bg-[#A7B9A8]/40 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#284C3D]" />
          <span>Book Another Teacher</span>
        </Link>
      </div>
    </aside>
  );
};

