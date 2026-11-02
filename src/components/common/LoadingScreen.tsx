import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadingOut(true);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 15;
      });
    }, 70);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8F7F2] transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Soft circular light aura */}
        <div className="absolute -inset-10 bg-radial from-[#C5A66A]/20 via-[#DDE8DF]/30 to-transparent rounded-full blur-2xl animate-pulse-subtle pointer-events-none" />

        {/* Minimal Islamic Star/Geometric Icon */}
        <div className="relative mb-5 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#284C3D] text-[#C5A66A] shadow-card">
          <svg className="w-9 h-9 animate-spin" style={{ animationDuration: '16s' }} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-widest text-[#1C382D] font-heading">
            NOOR
          </h1>
          <p className="text-xs uppercase tracking-widest text-[#C5A66A] font-semibold mt-1">
            Islamic Learning
          </p>
        </div>

        {/* Thin progress line */}
        <div className="w-48 h-1 bg-[#E7E6DE] rounded-full overflow-hidden mt-8">
          <div
            className="h-full bg-[#284C3D] rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle */}
        <p className="text-xs text-[#737B74] mt-3 font-sans">
          A better way to learn and grow.
        </p>
      </div>
    </div>
  );
};

