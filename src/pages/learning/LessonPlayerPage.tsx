import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { QuestionMultipleChoice } from '../../components/learning/QuestionMultipleChoice';
import { QuestionListening } from '../../components/learning/QuestionListening';
import { QuestionMatching } from '../../components/learning/QuestionMatching';
import { QuestionFillBlanks } from '../../components/learning/QuestionFillBlanks';
import { QuestionImageSelect } from '../../components/learning/QuestionImageSelect';
import { LessonCompletionModal } from '../../components/learning/LessonCompletionModal';
import { Lesson, Question } from '../../types';
import { playSound } from '../../utils/soundEffects';
import { X, Heart, ArrowRight, Check, AlertCircle, RotateCcw } from 'lucide-react';

export const LessonPlayerPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { courses, studentProfile, completeLesson, loseHeart, refillHearts } = useDemo();

  // Find target lesson
  const currentLesson: Lesson | null = useMemo(() => {
    for (const c of courses) {
      for (const u of c.units) {
        const found = u.lessons.find((l) => l.id === lessonId);
        if (found) return found;
      }
    }
    // Fallback to first lesson
    return courses[0]?.units[0]?.lessons[0] || null;
  }, [courses, lessonId]);

  const questions: Question[] = currentLesson?.questions || [];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // User selection states for different question types
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [fillBlankAnswer, setFillBlankAnswer] = useState<string | null>(null);
  const [matchingDone, setMatchingDone] = useState(false);

  // Answer submission feedback state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Out of hearts state
  const [outOfHearts, setOutOfHearts] = useState(false);

  // Lesson complete modal state
  const [isComplete, setIsComplete] = useState(false);

  const activeQuestion = questions[currentQuestionIndex];
  const progressPercent = questions.length > 0
    ? Math.round(((currentQuestionIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100)
    : 0;

  if (!currentLesson || !activeQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F7F2] p-4 text-center">
        <div className="space-y-4">
          <p className="text-sm text-[#737B74]">Lesson not found.</p>
          <button
            onClick={() => navigate('/learn')}
            className="px-4 py-2 rounded-control bg-[#284C3D] text-white text-xs font-bold"
          >
            Back to Learning Path
          </button>
        </div>
      </div>
    );
  }

  // Check answer logic
  const handleCheck = () => {
    let correct = false;

    if (activeQuestion.type === 'multiple_choice' || activeQuestion.type === 'listening') {
      const chosen = activeQuestion.options?.find((o) => o.id === selectedOptionId);
      correct = !!chosen?.isCorrect;
    } else if (activeQuestion.type === 'fill_blank') {
      correct = fillBlankAnswer === activeQuestion.fillBlankSentence?.correctAnswer;
    } else if (activeQuestion.type === 'image_select') {
      const chosen = activeQuestion.imageOptions?.find((o) => o.id === selectedOptionId);
      correct = !!chosen?.isCorrect;
    } else if (activeQuestion.type === 'matching') {
      correct = true; // completed by onAllMatched
    }

    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      playSound('correct');
      setCorrectCount((prev) => prev + 1);
    } else {
      const hasHeartsLeft = loseHeart();
      if (!hasHeartsLeft) {
        setOutOfHearts(true);
      }
    }
  };

  // Next Question logic
  const handleNext = () => {
    // Reset inputs
    setSelectedOptionId(null);
    setFillBlankAnswer(null);
    setMatchingDone(false);
    setIsSubmitted(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all questions in the lesson!
      const accuracy = Math.round(((correctCount + (isCorrect ? 1 : 0)) / questions.length) * 100);
      completeLesson(currentLesson.id, accuracy, currentLesson.xpReward);
      setIsComplete(true);
    }
  };

  const isCheckEnabled = () => {
    if (activeQuestion.type === 'matching') return matchingDone;
    if (activeQuestion.type === 'fill_blank') return !!fillBlankAnswer;
    return !!selectedOptionId;
  };

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex flex-col justify-between">
      {/* Top Header Bar */}
      <header className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <button
          onClick={() => navigate('/learn')}
          className="p-2 rounded-xl text-[#737B74] hover:text-[#252C28] hover:bg-[#E7E6DE] transition-colors"
          title="Exit Lesson"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 h-2.5 bg-[#E7E6DE] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#284C3D] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#B86D65] px-2.5 py-1 rounded-full bg-[#FDF2F0]">
          <Heart className="w-4 h-4 fill-[#B86D65]" />
          <span>{studentProfile.hearts}</span>
        </div>
      </header>

      {/* Main Question Body */}
      <main className="max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 flex flex-col justify-center">
        <div className="space-y-6">
          {/* Prompt Header */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
              Question {currentQuestionIndex + 1} of {questions.length} • {currentLesson.title}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1C382D] font-heading mt-1">
              {activeQuestion.prompt}
            </h2>
            {activeQuestion.subprompt && (
              <p className="text-xs text-[#737B74] mt-1">{activeQuestion.subprompt}</p>
            )}
          </div>

          {/* Interactive Question Component according to type */}
          {activeQuestion.type === 'multiple_choice' && (
            <QuestionMultipleChoice
              question={activeQuestion}
              selectedOptionId={selectedOptionId}
              onSelectOption={setSelectedOptionId}
              isAnswerSubmitted={isSubmitted}
            />
          )}

          {activeQuestion.type === 'listening' && (
            <QuestionListening
              question={activeQuestion}
              selectedOptionId={selectedOptionId}
              onSelectOption={setSelectedOptionId}
              isAnswerSubmitted={isSubmitted}
            />
          )}

          {activeQuestion.type === 'matching' && (
            <QuestionMatching
              question={activeQuestion}
              onAllMatched={() => setMatchingDone(true)}
              isAnswerSubmitted={isSubmitted}
            />
          )}

          {activeQuestion.type === 'fill_blank' && (
            <QuestionFillBlanks
              question={activeQuestion}
              selectedAnswer={fillBlankAnswer}
              onSelectAnswer={setFillBlankAnswer}
              isAnswerSubmitted={isSubmitted}
            />
          )}

          {activeQuestion.type === 'image_select' && (
            <QuestionImageSelect
              question={activeQuestion}
              selectedOptionId={selectedOptionId}
              onSelectOption={setSelectedOptionId}
              isAnswerSubmitted={isSubmitted}
            />
          )}
        </div>
      </main>

      {/* Bottom Feedback / Continue Bar */}
      <footer
        className={`w-full py-4 px-4 sm:px-8 border-t transition-colors duration-300 ${
          isSubmitted
            ? isCorrect
              ? 'bg-[#DDE8DF] border-[#A7B9A8]'
              : 'bg-[#FDF2F0] border-[#B86D65]/40'
            : 'bg-white border-[#E7E6DE]'
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {/* Explanation Text after answer submission */}
          {isSubmitted ? (
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                  isCorrect ? 'bg-[#648B70]' : 'bg-[#B86D65]'
                }`}
              >
                {isCorrect ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              </div>
              <div className="min-w-0">
                <p
                  className={`text-xs font-bold ${
                    isCorrect ? 'text-[#1C382D]' : 'text-[#B86D65]'
                  }`}
                >
                  {isCorrect ? 'Nicely done! Alhamdulillah' : 'Incorrect pronunciation / answer'}
                </p>
                <p className="text-[11px] text-[#737B74] truncate">
                  {activeQuestion.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="hidden sm:block text-xs text-[#737B74]">
              Select an answer and press check to test your knowledge.
            </div>
          )}

          {/* Action Button */}
          {!isSubmitted ? (
            <button
              type="button"
              disabled={!isCheckEnabled()}
              onClick={handleCheck}
              className={`px-6 py-3 rounded-control text-xs font-bold shadow-card transition-all ${
                isCheckEnabled()
                  ? 'bg-[#284C3D] hover:bg-[#1C382D] text-white hover:scale-102 cursor-pointer'
                  : 'bg-[#E7E6DE] text-[#737B74] opacity-50 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className={`px-6 py-3 rounded-control text-xs font-bold text-white shadow-card flex items-center gap-1.5 transition-all ${
                isCorrect ? 'bg-[#284C3D] hover:bg-[#1C382D]' : 'bg-[#B86D65] hover:bg-red-700'
              }`}
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </footer>

      {/* Out of Hearts Modal */}
      {outOfHearts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-feature p-6 sm:p-8 max-w-sm w-full text-center space-y-4 shadow-2xl border border-[#E7E6DE]">
            <div className="w-16 h-16 rounded-full bg-[#FDF2F0] text-[#B86D65] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-[#B86D65]" />
            </div>
            <h3 className="text-xl font-bold text-[#1C382D] font-heading">
              Out of Hearts!
            </h3>
            <p className="text-xs text-[#737B74]">
              Don't worry — learning requires patience and repetition. Refill your hearts to continue practicing.
            </p>
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  refillHearts();
                  setOutOfHearts(false);
                }}
                className="w-full py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card"
              >
                Refill 5 Hearts & Continue
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="w-full py-2.5 rounded-control border border-[#E7E6DE] text-[#737B74] text-xs font-semibold hover:bg-[#F8F7F2]"
              >
                Return to Learning Path
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Complete Modal */}
      <LessonCompletionModal
        isOpen={isComplete}
        lessonTitle={currentLesson.title}
        earnedXp={currentLesson.xpReward}
        accuracy={Math.round((correctCount / questions.length) * 100)}
        heartsRemaining={studentProfile.hearts}
        onContinue={() => navigate('/learn')}
        onRetry={() => {
          setIsComplete(false);
          setCurrentQuestionIndex(0);
          setCorrectCount(0);
          setIsSubmitted(false);
        }}
      />
    </div>
  );
};

