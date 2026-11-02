import React from 'react';
import { Question } from '../../types';
import { Check, X } from 'lucide-react';

interface QuestionImageSelectProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  isAnswerSubmitted: boolean;
}

export const QuestionImageSelect: React.FC<QuestionImageSelectProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  isAnswerSubmitted,
}) => {
  const options = question.imageOptions || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          let cardStyle = 'border-[#E7E6DE] bg-white hover:border-[#A7B9A8]';

          if (isAnswerSubmitted) {
            if (opt.isCorrect) {
              cardStyle = 'border-[#648B70] bg-[#DDE8DF]/50 ring-2 ring-[#648B70]';
            } else if (isSelected && !opt.isCorrect) {
              cardStyle = 'border-[#B86D65] bg-[#FDF2F0] ring-2 ring-[#B86D65]';
            } else {
              cardStyle = 'border-[#E7E6DE] opacity-40';
            }
          } else if (isSelected) {
            cardStyle = 'border-[#284C3D] bg-[#DDE8DF]/30 ring-2 ring-[#284C3D] shadow-card';
          }

          return (
            <div
              key={opt.id}
              onClick={() => !isAnswerSubmitted && onSelectOption(opt.id)}
              className={`p-3 rounded-card border cursor-pointer transition-all flex flex-col items-center overflow-hidden ${cardStyle}`}
            >
              <div className="w-full h-32 rounded-lg overflow-hidden bg-[#F8F7F2] relative mb-3">
                <img
                  src={opt.imageUrl}
                  alt={opt.label}
                  className="w-full h-full object-cover"
                />
                {opt.arabicLabel && (
                  <div className="absolute inset-0 bg-[#1C382D]/70 flex items-center justify-center text-white font-arabic text-4xl">
                    {opt.arabicLabel}
                  </div>
                )}
              </div>

              <div className="w-full flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#1C382D]">{opt.label}</span>
                {isAnswerSubmitted && opt.isCorrect && (
                  <Check className="w-4 h-4 text-[#648B70]" />
                )}
                {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                  <X className="w-4 h-4 text-[#B86D65]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

