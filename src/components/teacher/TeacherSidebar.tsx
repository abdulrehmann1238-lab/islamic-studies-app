import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  DollarSign,
  User,
  Settings,
  Star,
  Video,
} from 'lucide-react';

export const TeacherSidebar: React.FC = () => {
  const { teachers } = useDemo();
  // Active demo teacher is Aisha Rahman
  const teacher = teachers[0] || {
    name: 'Aisha Rahman',
    rating: 4.95,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600',
    title: 'Tajweed Specialist',
  };

  const links = [
    { name: 'Overview', path: '/teacher', icon: LayoutDashboard },
    { name: 'My Students', path: '/teacher/students', icon: Users },
    { name: 'Schedule & Slots', path: '/teacher/schedule', icon: Calendar },
    { name: 'Lesson History & Notes', path: '/teacher/lessons', icon: BookOpen },
    { name: 'Messages', path: '/teacher/messages', icon: MessageSquare },
    { name: 'Earnings & Payouts', path: '/teacher/earnings', icon: DollarSign },
    { name: 'Profile Editor', path: '/teacher/profile', icon: User },
    { name: 'Settings', path: '/teacher/settings', icon: Settings },
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
              Teacher Studio
            </span>
          </div>
        </Link>
      </div>

      {/* Teacher Profile Card */}
      <div className="p-4 mx-3 my-3 bg-[#F4EDDC]/40 rounded-card border border-[#C5A66A]/30">
        <div className="flex items-center gap-3">
          <img
            src={teacher.avatar}
            alt={teacher.name}
            className="w-10 h-10 rounded-xl object-cover border border-[#C5A66A]"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-[#1C382D] truncate">
              {teacher.name}
            </h4>
            <p className="text-[10px] text-[#737B74] truncate">
              {teacher.title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#C5A66A]/20 text-xs">
          <div className="flex items-center gap-1 text-[#C5A66A] font-bold">
            <Star className="w-3.5 h-3.5 fill-[#C5A66A]" />
            <span>{teacher.rating.toFixed(2)} Rating</span>
          </div>
          <span className="text-[11px] font-bold text-[#284C3D]">
            £{teacher.hourlyRate}/hr
          </span>
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
              end={link.path === '/teacher'}
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

      {/* Join Classroom Quick Launch */}
      <div className="p-4 border-t border-[#E7E6DE] bg-[#F8F7F2]">
        <Link
          to="/classroom/booking-101"
          className="flex items-center justify-center gap-2 py-2 px-3 rounded-control bg-[#284C3D] text-white text-xs font-bold hover:bg-[#1C382D] transition-colors shadow-card"
        >
          <Video className="w-3.5 h-3.5 text-[#C5A66A]" />
          <span>Launch Live Classroom</span>
        </Link>
      </div>
    </aside>
  );
};

