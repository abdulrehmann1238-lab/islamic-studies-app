import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Layers,
  Plus,
  ArrowUp,
  ArrowDown,
  Eye,
  Trash2,
  Edit3,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react';

export const AdminLearningCMSPage: React.FC = () => {
  const { courses, deleteLessonFromCourse, reorderLessonsInUnit, togglePublishLesson } = useDemo();
  const navigate = useNavigate();

  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-quran-foundations');
  const activeCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            Learning Curriculum CMS
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Author interactive lessons, build question sets, reorder sequence, and publish to the learning path.
          </p>
        </div>

        <Link
          to={`/admin/learning/${activeCourse?.id}/new`}
          className="self-start sm:self-auto px-4 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4 text-[#C5A66A]" />
          <span>Create New Lesson</span>
        </Link>
      </div>

      {/* Course Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {courses.map((course) => (
          <button
            key={course.id}
            onClick={() => setSelectedCourseId(course.id)}
            className={`px-4 py-2 rounded-control text-xs font-bold flex-shrink-0 transition-all ${
              selectedCourseId === course.id
                ? 'bg-[#284C3D] text-white shadow-card'
                : 'bg-white text-[#737B74] border border-[#E7E6DE] hover:bg-[#F8F7F2]'
            }`}
          >
            {course.title}
          </button>
        ))}
      </div>

      {/* Course Units & Lessons Hierarchical List */}
      <div className="space-y-8">
        {activeCourse?.units.map((unit) => (
          <div
            key={unit.id}
            className="bg-white rounded-feature border border-[#E7E6DE] shadow-subtle overflow-hidden"
          >
            {/* Unit Header */}
            <div className="p-5 bg-[#F8F7F2] border-b border-[#E7E6DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                  Unit {unit.order}
                </span>
                <h3 className="text-base font-bold text-[#1C382D]">{unit.title}</h3>
                <p className="text-xs text-[#737B74]">{unit.description}</p>
              </div>

              <Link
                to={`/admin/learning/${activeCourse.id}/new?unitId=${unit.id}`}
                className="self-start sm:self-auto px-3 py-1.5 rounded-control bg-white border border-[#E7E6DE] hover:border-[#284C3D] text-xs font-bold text-[#284C3D] flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Lesson to Unit</span>
              </Link>
            </div>

            {/* Lessons Table in Unit */}
            <div className="divide-y divide-[#E7E6DE]">
              {unit.lessons.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#737B74]">
                  No lessons in this unit. Click "Add Lesson to Unit" to create one.
                </div>
              ) : (
                unit.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F8F7F2]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Order and reorder buttons */}
                      <div className="flex flex-col items-center gap-1 text-[#737B74]">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => reorderLessonsInUnit(activeCourse.id, unit.id, 'up', idx)}
                          className="p-1 hover:text-[#284C3D] disabled:opacity-20"
                          title="Move Lesson Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[11px] font-mono font-bold">{idx + 1}</span>
                        <button
                          type="button"
                          disabled={idx === unit.lessons.length - 1}
                          onClick={() => reorderLessonsInUnit(activeCourse.id, unit.id, 'down', idx)}
                          className="p-1 hover:text-[#284C3D] disabled:opacity-20"
                          title="Move Lesson Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-[#1C382D]">{lesson.title}</h4>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold">
                            {lesson.difficulty}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#F4EDDC] text-[#C5A66A] font-bold">
                            +{lesson.xpReward} XP
                          </span>
                        </div>
                        <p className="text-xs text-[#737B74] mt-0.5 line-clamp-1">{lesson.description}</p>
                        <span className="text-[11px] text-[#737B74] font-medium mt-1 inline-block">
                          {lesson.questions.length} questions • ~{lesson.estimatedMinutes} mins
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-auto flex-shrink-0">
                      {/* Toggle Publish */}
                      <button
                        onClick={() => togglePublishLesson(activeCourse.id, unit.id, lesson.id)}
                        className={`px-2.5 py-1.5 rounded-control text-xs font-bold flex items-center gap-1 transition-colors ${
                          lesson.isPublished
                            ? 'bg-[#DDE8DF] text-[#1C382D]'
                            : 'bg-[#FDF2F0] text-[#B86D65]'
                        }`}
                        title="Toggle visibility"
                      >
                        {lesson.isPublished ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> Published
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> Draft
                          </>
                        )}
                      </button>

                      {/* Preview In Lesson Player */}
                      <Link
                        to={`/learn/lesson/${lesson.id}`}
                        className="p-2 rounded-control border border-[#E7E6DE] text-[#252C28] hover:bg-[#F8F7F2]"
                        title="Preview Lesson Player"
                      >
                        <Eye className="w-4 h-4 text-[#284C3D]" />
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => deleteLessonFromCourse(activeCourse.id, unit.id, lesson.id)}
                        className="p-2 rounded-control border border-[#E7E6DE] text-[#B86D65] hover:bg-[#FDF2F0]"
                        title="Delete Lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

