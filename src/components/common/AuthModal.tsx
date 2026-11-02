import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, GraduationCap, UserCheck, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode }) => {
  const { setRole } = useDemo();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'admin'>('student');

  if (!isOpen) return null;

  const handleInstantLogin = (role: 'student' | 'teacher' | 'admin') => {
    setRole(role);
    onClose();
    if (role === 'student') navigate('/student');
    else if (role === 'teacher') navigate('/teacher');
    else navigate('/admin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-feature shadow-2xl border border-[#E7E6DE] overflow-hidden">
        {/* Header */}
        <div className="relative p-6 bg-[#284C3D] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#C5A66A] text-[#1C382D] flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-heading font-extrabold tracking-wider text-base">NOOR</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h2 className="text-xl font-bold font-heading mt-4">
            {mode === 'login' ? 'Welcome Back to NOOR' : 'Create Your NOOR Account'}
          </h2>
          <p className="text-xs text-white/80 mt-1">
            {mode === 'login'
              ? 'Select a demo profile for instant password-free access.'
              : 'Choose your journey as a student/parent, educator, or administrator.'}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#737B74]">
            Instant Demo Sign In Profiles
          </p>

          <div className="space-y-2.5">
            {/* Student Account */}
            <div
              onClick={() => setSelectedRole('student')}
              className={`p-3.5 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                selectedRole === 'student'
                  ? 'border-[#284C3D] bg-[#DDE8DF]/30 ring-1 ring-[#284C3D]'
                  : 'border-[#E7E6DE] hover:bg-[#F8F7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C382D]">Adam & Tariq Ahmed</h4>
                  <p className="text-xs text-[#737B74]">Student / Parent Account</p>
                </div>
              </div>
              {selectedRole === 'student' && <CheckCircle2 className="w-5 h-5 text-[#284C3D]" />}
            </div>

            {/* Teacher Account */}
            <div
              onClick={() => setSelectedRole('teacher')}
              className={`p-3.5 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                selectedRole === 'teacher'
                  ? 'border-[#C5A66A] bg-[#F4EDDC]/40 ring-1 ring-[#C5A66A]'
                  : 'border-[#E7E6DE] hover:bg-[#F8F7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#C5A66A] text-[#1C382D] flex items-center justify-center">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C382D]">Ustadhah Aisha Rahman</h4>
                  <p className="text-xs text-[#737B74]">Verified Educator Account</p>
                </div>
              </div>
              {selectedRole === 'teacher' && <CheckCircle2 className="w-5 h-5 text-[#C5A66A]" />}
            </div>

            {/* Admin Account */}
            <div
              onClick={() => setSelectedRole('admin')}
              className={`p-3.5 rounded-card border cursor-pointer transition-all flex items-center justify-between ${
                selectedRole === 'admin'
                  ? 'border-[#1C382D] bg-[#DDE8DF]/40 ring-1 ring-[#1C382D]'
                  : 'border-[#E7E6DE] hover:bg-[#F8F7F2]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1C382D] text-white flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1C382D]">Platform Operations Admin</h4>
                  <p className="text-xs text-[#737B74]">Management & Verification Portal</p>
                </div>
              </div>
              {selectedRole === 'admin' && <CheckCircle2 className="w-5 h-5 text-[#1C382D]" />}
            </div>
          </div>

          <button
            onClick={() => handleInstantLogin(selectedRole)}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-semibold text-sm shadow-card transition-all"
          >
            <span>Continue as {selectedRole === 'student' ? 'Student / Parent' : selectedRole === 'teacher' ? 'Teacher' : 'Administrator'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#F8F7F2] border-t border-[#E7E6DE] text-center">
          <p className="text-[11px] text-[#737B74]">
            Interactive Demo Mode — Instant one-click authentication without passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

