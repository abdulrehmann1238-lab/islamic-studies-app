import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { Lesson, Question, QuestionType } from '../../types';
import {
  Save,
  Eye,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';

export const AdminLessonEditorPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { courses, addLessonToCourse, updateLessonInCourse } = useDemo();
  const { showToast } = useToast();

  const activeCourse = courses.find((c) => c.id === courseId) || courses[0];
  const preselectedUnitId = searchParams.get('unitId') || activeCourse?.units[0]?.id || '';

  // Form State
  const [title, setTitle] = useState('New Interactive Lesson');
  const [description, setDescription] = useState('Master letter articulation and recognition with guided feedback.');
  const [unitId, setUnitId] = useState(preselectedUnitId);
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Beginner');
  const [estimatedMinutes, setEstimatedMinutes] = useState(6);
  const [xpReward, setXpReward] = useState(25);
  const [isPublished, setIsPublished] = useState(true);

  // Questions Builder State
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 'q-new-1',
      type: 'multiple_choice',
      prompt: 'Which Arabic letter is displayed in the central panel?',
      subprompt: 'Look carefully at the dot placed on the character.',
      arabicText: 'ج',
      options: [
        { id: 'opt-1', text: 'Haa (ح)', isCorrect: false },
        { id: 'opt-2', text: 'Jeem (ج)', isCorrect: true },
        { id: 'opt-3', text: 'Khaa (خ)', isCorrect: false },
        { id: 'opt-4', text: 'Daal (د)', isCorrect: false },
      ],
      explanation: 'Jeem (ج) has one single dot cradled safely inside its central curve.',
    },
    {
      id: 'q-new-2',
      type: 'listening',
      prompt: 'Listen to the recited character and select the matching phoneme.',
      arabicText: 'ح',
      options: [
        { id: 'opt-l1', text: 'Jeem (ج)', isCorrect: false },
        { id: 'opt-l2', text: 'Haa (ح) - Middle Throat', isCorrect: true },
        { id: 'opt-l3', text: 'Khaa (خ)', isCorrect: false },
      ],
      explanation: 'The un-dotted Haa (ح) produces a smooth, clear breath sound from the centre of the throat.',
    },
  ]);

  const handleAddQuestion = () => {
    const newQ: Question = {
      id: 'q-builder-' + Date.now(),
      type: 'multiple_choice',
      prompt: 'Identify the correct Tajweed or letter rule:',
      arabicText: 'د',
      options: [
        { id: 'opt-a', text: 'Option A', isCorrect: true },
        { id: 'opt-b', text: 'Option B', isCorrect: false },
        { id: 'opt-c', text: 'Option C', isCorrect: false },
      ],
      explanation: 'Explanation for learner feedback after submission.',
    };
    setQuestions([...questions, newQ]);
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestions(questions.filter((_, i) => i !== idx));
  };

  const handleSave = (publish: boolean) => {
    if (!title) {
      showToast({ type: 'error', title: 'Please enter a lesson title.' });
      return;
    }

    const createdLesson = addLessonToCourse(activeCourse.id, unitId, {
      title,
      description,
      order: 10,
      difficulty,
      estimatedMinutes,
      xpReward,
      isPublished: publish,
      questions,
      courseId: activeCourse.id,
      unitId,
    });

    navigate('/admin/learning');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/learning"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#737B74] hover:text-[#284C3D]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Curriculum CMS</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSave(false)}
            className="px-4 py-2 rounded-control border border-[#E7E6DE] bg-white hover:bg-[#F8F7F2] text-xs font-bold text-[#252C28]"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            className="px-5 py-2 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Publish to Live Path</span>
          </button>
        </div>
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Lesson Authoring Tool
        </span>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-0.5">
          Curriculum Lesson Editor
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Course: <strong className="text-[#1C382D]">{activeCourse?.title}</strong>
        </p>
      </div>

      {/* Lesson Metadata Card */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-[#1C382D]">Lesson Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1C382D] mb-1">Lesson Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C382D] mb-1">Target Unit</label>
            <select
              value={unitId}
              onChange={(e) => setUnitId(e.target.value)}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
            >
              {activeCourse?.units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1C382D] mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-[#1C382D] mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE]"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C382D] mb-1">Est. Duration (mins)</label>
            <input
              type="number"
              value={estimatedMinutes}
              onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C382D] mb-1">XP Reward</label>
            <input
              type="number"
              value={xpReward}
              onChange={(e) => setXpReward(Number(e.target.value))}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE]"
            />
          </div>
        </div>
      </div>

      {/* Question Builder Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-[#1C382D] font-heading">
            Questions ({questions.length})
          </h3>
          <button
            type="button"
            onClick={handleAddQuestion}
            className="px-3.5 py-1.5 rounded-control bg-[#284C3D] text-white text-xs font-bold flex items-center gap-1 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Add Question</span>
          </button>
        </div>

        {questions.map((q, idx) => (
          <div
            key={q.id}
            className="bg-white rounded-card border border-[#E7E6DE] p-5 shadow-subtle space-y-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E6DE]">
              <span className="text-xs font-bold text-[#284C3D]">
                Question #{idx + 1}
              </span>
              <div className="flex items-center gap-2">
                <select
                  value={q.type}
                  onChange={(e) => {
                    const newType = e.target.value as QuestionType;
                    setQuestions((prev) =>
                      prev.map((item, i) => (i === idx ? { ...item, type: newType } : item))
                    );
                  }}
                  className="px-2 py-1 text-xs rounded-md bg-[#F8F7F2] border border-[#E7E6DE] font-semibold"
                >
                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="listening">Listening Task</option>
                  <option value="matching">Match Pairs</option>
                  <option value="fill_blank">Fill in the Blank</option>
                  <option value="image_select">Image Selection</option>
                </select>

                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(idx)}
                  className="p-1 rounded text-[#B86D65] hover:bg-red-50"
                  title="Delete Question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-[#1C382D] mb-1">Question Prompt</label>
                <input
                  type="text"
                  value={q.prompt}
                  onChange={(e) => {
                    const val = e.target.value;
                    setQuestions((prev) =>
                      prev.map((item, i) => (i === idx ? { ...item, prompt: val } : item))
                    );
                  }}
                  className="w-full p-2 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#1C382D] mb-1">Arabic Character / Word</label>
                <input
                  type="text"
                  value={q.arabicText || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setQuestions((prev) =>
                      prev.map((item, i) => (i === idx ? { ...item, arabicText: val } : item))
                    );
                  }}
                  className="w-full p-2 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] font-arabic text-xl"
                />
              </div>
            </div>

            {/* Answer Options */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] font-bold text-[#1C382D]">Options & Correctness:</label>
              {q.options?.map((opt, oIdx) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${q.id}`}
                    checked={opt.isCorrect}
                    onChange={() => {
                      setQuestions((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? {
                                ...item,
                                options: item.options?.map((o, oi) => ({
                                  ...o,
                                  isCorrect: oi === oIdx,
                                })),
                              }
                            : item
                        )
                      );
                    }}
                    className="accent-[#284C3D]"
                    title="Mark as correct answer"
                  />
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuestions((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? {
                                ...item,
                                options: item.options?.map((o, oi) =>
                                  oi === oIdx ? { ...o, text: val } : o
                                ),
                              }
                            : item
                        )
                      );
                    }}
                    className="flex-1 p-1.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE]"
                  />
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div>
              <label className="block text-[11px] font-bold text-[#1C382D] mb-1">Feedback Explanation</label>
              <input
                type="text"
                value={q.explanation}
                onChange={(e) => {
                  const val = e.target.value;
                  setQuestions((prev) =>
                    prev.map((item, i) => (i === idx ? { ...item, explanation: val } : item))
                  );
                }}
                className="w-full p-2 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

