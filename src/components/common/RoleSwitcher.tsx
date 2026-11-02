import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { UserRole } from '../../types';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ShieldCheck, GraduationCap, RotateCcw, X, Sparkles, ChevronUp, ChevronDown } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, resetDemoData } = useDemo();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = (newRole: UserRole, targetRoute: string) => {
    setRole(newRole);
    setIsOpen(false);
    navigate(targetRoute);
  };

  const roleMeta = {
    student: {
      label: 'Student / Parent',
      badge: 'Adam (Age 10)',
      icon: GraduationCap,
      color: 'bg-[#284C3D] text-white',
    },
    teacher: {
      label: 'Teacher',
      badge: 'Aisha Rahman',
      icon: UserCheck,
      color: 'bg-[#C5A66A] text-[#1C382D]',
    },
    admin: {
      label: 'Platform Admin',
      badge: 'Portal Admin',
      icon: ShieldCheck,
      color: 'bg-[#1C382D] text-white',
    },
  };

  const CurrentIcon = roleMeta[role].icon;

  return (
    <>
      {/* Floating Demo Access Pill */}
      <div className="fixed bottom-5 left-5 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#1C382D] text-white shadow-elevated border border-[#284C3D] hover:bg-[#284C3D] transition-all text-xs font-medium group"
          title="Switch Demo Role"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A66A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C5A66A]"></span>
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-white/90">
            <CurrentIcon className="w-3.5 h-3.5 text-[#C5A66A]" />
            Role: <span className="text-[#F4EDDC]">{roleMeta[role].label}</span>
          </span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
          )}
        </button>
      </div>

      {/* Role Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md bg-white rounded-feature shadow-2xl border border-[#E7E6DE] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-[#F8F7F2] border-b border-[#E7E6DE]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#284C3D] flex items-center justify-center text-[#C5A66A]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C382D]">Demo Role Switcher</h3>
                  <p className="text-xs text-[#737B74]">Explore NOOR across all three platform perspectives</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-[#737B74] hover:text-[#252C28] hover:bg-[#E7E6DE] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role Options */}
            <div className="p-5 space-y-3">
              {/* Option 1: Student / Parent */}
              <button
                onClick={() => handleSwitch('student', '/student')}
                className={`w-full text-left p-3.5 rounded-card border transition-all flex items-start gap-3.5 ${
                  role === 'student'
                    ? 'border-[#284C3D] bg-[#DDE8DF]/30 ring-1 ring-[#284C3D]'
                    : 'border-[#E7E6DE] hover:border-[#A7B9A8] hover:bg-[#F8F7F2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1C382D]">Student / Parent</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-medium">
                      Adam (Age 10)
                    </span>
                  </div>
                  <p className="text-xs text-[#737B74] mt-1 leading-relaxed">
                    Book verified teachers, join live classroom, practice daily micro-lessons, and track learning streaks & XP.
                  </p>
                </div>
              </button>

              {/* Option 2: Teacher */}
              <button
                onClick={() => handleSwitch('teacher', '/teacher')}
                className={`w-full text-left p-3.5 rounded-card border transition-all flex items-start gap-3.5 ${
                  role === 'teacher'
                    ? 'border-[#C5A66A] bg-[#F4EDDC]/40 ring-1 ring-[#C5A66A]'
                    : 'border-[#E7E6DE] hover:border-[#A7B9A8] hover:bg-[#F8F7F2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#C5A66A] text-[#1C382D] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1C382D]">Teacher</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F4EDDC] text-[#1C382D] font-medium">
                      Aisha Rahman
                    </span>
                  </div>
                  <p className="text-xs text-[#737B74] mt-1 leading-relaxed">
                    Manage students, view schedule & bookings, launch live classroom with shared board, and review earnings.
                  </p>
                </div>
              </button>

              {/* Option 3: Platform Admin */}
              <button
                onClick={() => handleSwitch('admin', '/admin')}
                className={`w-full text-left p-3.5 rounded-card border transition-all flex items-start gap-3.5 ${
                  role === 'admin'
                    ? 'border-[#1C382D] bg-[#DDE8DF]/40 ring-1 ring-[#1C382D]'
                    : 'border-[#E7E6DE] hover:border-[#A7B9A8] hover:bg-[#F8F7F2]'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-[#1C382D] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1C382D]">Platform Admin</span>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#E7E6DE] text-[#252C28] font-medium">
                      Ops Manager
                    </span>
                  </div>
                  <p className="text-xs text-[#737B74] mt-1 leading-relaxed">
                    Verify teacher applications, manage curriculum CMS (add/reorder lessons), set commission, and monitor bookings.
                  </p>
                </div>
              </button>
            </div>

            {/* Footer with Reset Data */}
            <div className="p-4 bg-[#F8F7F2] border-t border-[#E7E6DE] flex items-center justify-between">
              <button
                onClick={() => {
                  resetDemoData();
                  setIsOpen(false);
                  navigate('/');
                }}
                className="flex items-center gap-1.5 text-xs text-[#B86D65] hover:text-red-700 font-medium transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Demo Data
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate('/');
                }}
                className="text-xs text-[#284C3D] hover:underline font-medium"
              >
                Return to Landing Page
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

