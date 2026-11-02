import React, { useState, useEffect } from 'react';
import { Question, MatchingPair } from '../../types';
import { Check, Sparkles } from 'lucide-react';
import { playSound, speakArabic } from '../../utils/soundEffects';

interface QuestionMatchingProps {
  question: Question;
  onAllMatched: () => void;
  isAnswerSubmitted: boolean;
}

export const QuestionMatching: React.FC<QuestionMatchingProps> = ({
  question,
  onAllMatched,
  isAnswerSubmitted,
}) => {
  const pairs = question.pairs || [];
  const [selectedArabicId, setSelectedArabicId] = useState<string | null>(null);
  const [selectedEnglishId, setSelectedEnglishId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [wrongPair, setWrongPair] = useState<boolean>(false);

  // Shuffled items for right column
  const [shuffledEnglish, setShuffledEnglish] = useState<MatchingPair[]>([]);

  useEffect(() => {
    // deterministic shuffle
    const copy = [...pairs];
    copy.reverse();
    setShuffledEnglish(copy);
    setMatchedIds([]);
    setSelectedArabicId(null);
    setSelectedEnglishId(null);
  }, [question.id]);

  const handleArabicClick = (pair: MatchingPair) => {
    if (matchedIds.includes(pair.id) || isAnswerSubmitted) return;
    speakArabic(pair.arabic);
    setSelectedArabicId(pair.id);

    if (selectedEnglishId) {
      checkMatch(pair.id, selectedEnglishId);
    }
  };

  const handleEnglishClick = (pair: MatchingPair) => {
    if (matchedIds.includes(pair.id) || isAnswerSubmitted) return;
    playSound('click');
    setSelectedEnglishId(pair.id);

    if (selectedArabicId) {
      checkMatch(selectedArabicId, pair.id);
    }
  };

  const checkMatch = (arabicId: string, englishId: string) => {
    if (arabicId === englishId) {
      playSound('correct');
      const newMatched = [...matchedIds, arabicId];
      setMatchedIds(newMatched);
      setSelectedArabicId(null);
      setSelectedEnglishId(null);
      if (newMatched.length === pairs.length) {
        onAllMatched();
      }
    } else {
      playSound('wrong');
      setWrongPair(true);
      setTimeout(() => {
        setSelectedArabicId(null);
        setSelectedEnglishId(null);
        setWrongPair(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column: Arabic Characters */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider block text-center mb-1">
            Arabic
          </span>
          {pairs.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedArabicId === pair.id;

            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched || isAnswerSubmitted}
                onClick={() => handleArabicClick(pair)}
                className={`w-full py-4 px-3 rounded-card border transition-all text-center flex items-center justify-center font-arabic text-3xl sm:text-4xl shadow-xs ${
                  isMatched
                    ? 'bg-[#DDE8DF] border-[#648B70] text-[#1C382D] opacity-60'
                    : isSelected
                    ? wrongPair
                      ? 'bg-[#FDF2F0] border-[#B86D65] ring-2 ring-[#B86D65]'
                      : 'bg-[#DDE8DF]/50 border-[#284C3D] ring-2 ring-[#284C3D] text-[#1C382D]'
                    : 'bg-white border-[#E7E6DE] hover:border-[#A7B9A8] hover:bg-[#F8F7F2] text-[#1C382D]'
                }`}
              >
                <span>{pair.arabic}</span>
                {isMatched && <Check className="w-4 h-4 text-[#648B70] ml-2" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: English Meaning */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider block text-center mb-1">
            English
          </span>
          {shuffledEnglish.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedEnglishId === pair.id;

            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched || isAnswerSubmitted}
                onClick={() => handleEnglishClick(pair)}
                className={`w-full py-4 px-3 rounded-card border transition-all text-center flex items-center justify-center text-xs sm:text-sm font-semibold shadow-xs ${
                  isMatched
                    ? 'bg-[#DDE8DF] border-[#648B70] text-[#1C382D] opacity-60'
                    : isSelected
                    ? wrongPair
                      ? 'bg-[#FDF2F0] border-[#B86D65] ring-2 ring-[#B86D65]'
                      : 'bg-[#F4EDDC] border-[#C5A66A] ring-2 ring-[#C5A66A] text-[#1C382D]'
                    : 'bg-white border-[#E7E6DE] hover:border-[#A7B9A8] hover:bg-[#F8F7F2] text-[#252C28]'
                }`}
              >
                <span>{pair.english}</span>
                {isMatched && <Check className="w-4 h-4 text-[#648B70] ml-2" />}
              </button>
            );
          })}
        </div>
      </div>

      {matchedIds.length === pairs.length && (
        <div className="p-3 bg-[#DDE8DF]/60 rounded-xl border border-[#648B70] text-center text-xs text-[#1C382D] font-bold flex items-center justify-center gap-1.5 animate-fade-in">
          <Sparkles className="w-4 h-4 text-[#C5A66A]" />
          <span>All pairs successfully matched! Press Continue below.</span>
        </div>
      )}
    </div>
  );
};

