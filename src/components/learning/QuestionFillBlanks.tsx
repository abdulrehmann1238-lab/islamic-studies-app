import React from 'react';
import { Question } from '../../types';
import { Check, X } from 'lucide-react';

interface QuestionFillBlanksProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
  isAnswerSubmitted: boolean;
}

export const QuestionFillBlanks: React.FC<QuestionFillBlanksProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswerSubmitted,
}) => {
  const data = question.fillBlankSentence;
  if (!data) return null;

  const isCorrect = selectedAnswer === data.correctAnswer;

  return (
    <div className="space-y-8">
      {/* Target Word/Sentence Container */}
      <div className="flex items-center justify-center p-8 bg-[#F8F7F2] rounded-2xl border border-[#E7E6DE]">
        <div className="flex items-center gap-3 text-3xl sm:text-5xl font-arabic text-[#1C382D] dir-rtl">
          <span>{data.prefix}</span>
          <span
            className={`px-4 py-2 rounded-xl border-2 border-dashed min-w-[70px] text-center inline-block transition-all ${
              selectedAnswer
                ? isAnswerSubmitted
                  ? isCorrect
                    ? 'border-[#648B70] bg-[#DDE8DF] text-[#1C382D]'
                    : 'border-[#B86D65] bg-[#FDF2F0] text-[#B86D65]'
                  : 'border-[#284C3D] bg-white text-[#284C3D]'
                : 'border-[#A7B9A8] bg-white/70 text-[#737B74]'
            }`}
          >
            {selectedAnswer || '؟'}
          </span>
          <span>{data.suffix}</span>
        </div>
      </div>

      {/* Selectable Tiles */}
      <div>
        <p className="text-xs font-bold text-[#1C382D] uppercase tracking-wider text-center mb-3">
          Select the missing character:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {data.options.map((opt) => {
            const isSelected = selectedAnswer === opt;
            let btnStyle = 'border-[#E7E6DE] bg-white hover:border-[#284C3D] text-[#1C382D]';

            if (isAnswerSubmitted) {
              if (opt === data.correctAnswer) {
                btnStyle = 'border-[#648B70] bg-[#DDE8DF] text-[#1C382D] ring-2 ring-[#648B70] font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'border-[#B86D65] bg-[#FDF2F0] text-[#B86D65] ring-2 ring-[#B86D65]';
              } else {
                btnStyle = 'border-[#E7E6DE] bg-white opacity-40 text-[#737B74]';
              }
            } else if (isSelected) {
              btnStyle = 'border-[#284C3D] bg-[#284C3D] text-white shadow-card font-bold';
            }

            return (
              <button
                key={opt}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => onSelectAnswer(opt)}
                className={`w-16 h-16 rounded-xl border transition-all flex items-center justify-center font-arabic text-3xl shadow-xs ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

