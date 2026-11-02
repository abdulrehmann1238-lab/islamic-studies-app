import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Trophy, Heart, Target, ArrowRight, RotateCcw, Home } from 'lucide-react';

interface LessonCompletionModalProps {
  lessonTitle: string;
  earnedXp: number;
  accuracy: number;
  heartsRemaining: number;
  isOpen: boolean;
  onContinue: () => void;
  onRetry: () => void;
}

export const LessonCompletionModal: React.FC<LessonCompletionModalProps> = ({
  lessonTitle,
  earnedXp,
  accuracy,
  heartsRemaining,
  isOpen,
  onContinue,
  onRetry,
}) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-feature shadow-2xl border border-[#E7E6DE] overflow-hidden text-center p-6 sm:p-8">
        {/* Celebratory Icon */}
        <div className="relative w-20 h-20 rounded-full bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center mx-auto mb-4 shadow-card">
          <Trophy className="w-10 h-10 text-[#C5A66A]" />
          <span className="absolute -top-1 -right-1 flex h-6 w-6">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C5A66A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-6 w-6 bg-[#284C3D] text-[#C5A66A] items-center justify-center text-xs">
              ★
            </span>
          </span>
        </div>

        {/* Heading */}
        <span className="text-xs font-bold uppercase tracking-widest text-[#C5A66A]">
          Lesson Mastered
        </span>
        <h2 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-1">
          MashaAllah!
        </h2>
        <p className="text-xs text-[#737B74] mt-1 max-w-xs mx-auto">
          You completed <span className="font-semibold text-[#1C382D]">{lessonTitle}</span> with dedication.
        </p>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 my-6">
          {/* XP */}
          <div className="p-3.5 rounded-card bg-[#F4EDDC]/60 border border-[#C5A66A]/40">
            <Sparkles className="w-5 h-5 text-[#C5A66A] mx-auto mb-1" />
            <span className="text-lg font-extrabold text-[#1C382D] block font-heading">
              +{earnedXp}
            </span>
            <span className="text-[10px] text-[#737B74] uppercase font-bold tracking-wider">
              XP Earned
            </span>
          </div>

          {/* Accuracy */}
          <div className="p-3.5 rounded-card bg-[#DDE8DF]/50 border border-[#A7B9A8]/50">
            <Target className="w-5 h-5 text-[#284C3D] mx-auto mb-1" />
            <span className="text-lg font-extrabold text-[#1C382D] block font-heading">
              {accuracy}%
            </span>
            <span className="text-[10px] text-[#737B74] uppercase font-bold tracking-wider">
              Accuracy
            </span>
          </div>

          {/* Hearts */}
          <div className="p-3.5 rounded-card bg-[#FDF2F0] border border-[#B86D65]/30">
            <Heart className="w-5 h-5 text-[#B86D65] fill-[#B86D65] mx-auto mb-1" />
            <span className="text-lg font-extrabold text-[#1C382D] block font-heading">
              {heartsRemaining}/5
            </span>
            <span className="text-[10px] text-[#737B74] uppercase font-bold tracking-wider">
              Hearts Left
            </span>
          </div>
        </div>

        {/* Achievement Unlock Notice */}
        <div className="p-3 bg-[#F8F7F2] rounded-xl border border-[#E7E6DE] flex items-center gap-2.5 text-left mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#284C3D] text-[#C5A66A] flex items-center justify-center flex-shrink-0">
            ★
          </div>
          <div className="text-xs">
            <span className="font-bold text-[#1C382D] block">Daily Streak Active!</span>
            <span className="text-[#737B74] text-[11px]">Your 5-day habit continues to flourish.</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <button
            onClick={onContinue}
            className="w-full py-3 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-bold text-xs shadow-card flex items-center justify-center gap-2 transition-all"
          >
            <span>Continue Learning Journey</span>
            <ArrowRight className="w-4 h-4 text-[#C5A66A]" />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRetry}
              className="py-2.5 px-3 rounded-control border border-[#E7E6DE] bg-white hover:bg-[#F8F7F2] text-xs font-semibold text-[#737B74] hover:text-[#252C28] flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Lesson
            </button>
            <button
              onClick={() => navigate('/student')}
              className="py-2.5 px-3 rounded-control border border-[#E7E6DE] bg-white hover:bg-[#F8F7F2] text-xs font-semibold text-[#737B74] hover:text-[#252C28] flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

