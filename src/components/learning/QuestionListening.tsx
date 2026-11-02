import React, { useState } from 'react';
import { Question } from '../../types';
import { Volume2, Play, RotateCcw, Check, X } from 'lucide-react';
import { speakArabic, playSound } from '../../utils/soundEffects';

interface QuestionListeningProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  isAnswerSubmitted: boolean;
}

export const QuestionListening: React.FC<QuestionListeningProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  isAnswerSubmitted,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    if (question.arabicText) {
      speakArabic(question.arabicText);
    } else {
      playSound('correct');
    }
    setTimeout(() => setIsPlaying(false), 900);
  };

  return (
    <div className="space-y-6">
      {/* Audio Wave Player Box */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#F4EDDC]/40 rounded-2xl border border-[#C5A66A]/40">
        <button
          onClick={handlePlayAudio}
          className={`w-20 h-20 rounded-full bg-[#284C3D] hover:bg-[#1C382D] text-[#C5A66A] flex items-center justify-center shadow-elevated transition-transform ${
            isPlaying ? 'scale-110 ring-8 ring-[#C5A66A]/30' : 'hover:scale-105'
          }`}
          title="Play audio pronunciation"
        >
          <Volume2 className="w-9 h-9" />
        </button>

        <div className="flex items-center gap-1.5 mt-4">
          <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">
            {isPlaying ? 'Playing articulation...' : 'Tap to Listen'}
          </span>
        </div>

        {/* Subtle Audio Waveform Visual */}
        <div className="flex items-center gap-1 mt-3 h-6">
          {[40, 70, 95, 60, 85, 100, 75, 50, 80, 45].map((height, idx) => (
            <span
              key={idx}
              className={`w-1 rounded-full bg-[#C5A66A] transition-all duration-200 ${
                isPlaying ? 'opacity-100' : 'opacity-40'
              }`}
              style={{
                height: isPlaying ? `${height}%` : '20%',
                transitionDelay: `${idx * 20}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {question.options?.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let btnStyle = 'border-[#E7E6DE] bg-white hover:border-[#A7B9A8] hover:bg-[#F8F7F2] text-[#252C28]';

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              btnStyle = 'border-[#648B70] bg-[#DDE8DF] text-[#1C382D] ring-2 ring-[#648B70] font-bold';
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = 'border-[#B86D65] bg-[#FDF2F0] text-[#B86D65] ring-2 ring-[#B86D65] line-through';
            } else {
              btnStyle = 'border-[#E7E6DE] bg-white opacity-40 text-[#737B74]';
            }
          } else if (isSelected) {
            btnStyle = 'border-[#284C3D] bg-[#DDE8DF]/40 text-[#1C382D] ring-2 ring-[#284C3D] font-bold shadow-xs';
          }

          return (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswerSubmitted}
              onClick={() => onSelectOption(opt.id)}
              className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
            >
              <span>{opt.text}</span>
              {isAnswerSubmitted && opt.isCorrect && (
                <div className="w-6 h-6 rounded-full bg-[#648B70] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}
              {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                <div className="w-6 h-6 rounded-full bg-[#B86D65] text-white flex items-center justify-center">
                  <X className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

