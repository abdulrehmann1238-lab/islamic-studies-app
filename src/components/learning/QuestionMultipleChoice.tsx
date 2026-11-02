import React from 'react';
import { Question } from '../../types';
import { Check, X } from 'lucide-react';

interface QuestionMultipleChoiceProps {
  question: Question;
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
  isAnswerSubmitted: boolean;
}

export const QuestionMultipleChoice: React.FC<QuestionMultipleChoiceProps> = ({
  question,
  selectedOptionId,
  onSelectOption,
  isAnswerSubmitted,
}) => {
  return (
    <div className="space-y-6">
      {/* Arabic Character Showcase */}
      {question.arabicText && (
        <div className="flex items-center justify-center p-8 bg-[#F8F7F2] rounded-2xl border border-[#E7E6DE]">
          <span className="font-arabic text-7xl sm:text-8xl text-[#1C382D] select-none">
            {question.arabicText}
          </span>
        </div>
      )}

      {/* Answer Options */}
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

