import React from 'react';
import { Teacher } from '../../types';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, Heart, Calendar, Languages, Clock, ArrowRight } from 'lucide-react';

interface TeacherCardProps {
  teacher: Teacher;
  onBookNow: (teacher: Teacher) => void;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher, onBookNow }) => {
  const { isFavoriteTeacher, toggleFavoriteTeacher } = useDemo();
  const isFav = isFavoriteTeacher(teacher.id);

  return (
    <div className="group bg-white rounded-card border border-[#E7E6DE] hover:border-[#A7B9A8] shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col overflow-hidden">
      {/* Top Banner & Avatar Area */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="relative">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-subtle group-hover:scale-102 transition-transform"
              loading="lazy"
            />
            {teacher.verified && (
              <div
                className="absolute -bottom-1 -right-1 bg-[#284C3D] text-[#C5A66A] p-1 rounded-full shadow-xs"
                title="Verified Verified Islamic Educator"
              >
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Pricing & Favorite */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavoriteTeacher(teacher.id);
                }}
                className={`p-2 rounded-full border transition-colors ${
                  isFav
                    ? 'bg-[#B86D65]/10 border-[#B86D65]/30 text-[#B86D65]'
                    : 'border-[#E7E6DE] text-[#737B74] hover:text-[#252C28] hover:bg-[#F8F7F2]'
                }`}
                title={isFav ? 'Remove from favorites' : 'Save teacher'}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B86D65]' : ''}`} />
              </button>
            </div>
            <div className="mt-2 text-right">
              <span className="text-xl font-extrabold text-[#1C382D] font-heading">
                £{teacher.hourlyRate}
              </span>
              <span className="text-xs text-[#737B74]"> / hour</span>
            </div>
          </div>
        </div>

        {/* Identity & Badges */}
        <div className="mt-4">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#1C382D] font-heading group-hover:text-[#284C3D] transition-colors">
              {teacher.name}
            </h3>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold">
              {teacher.gender}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F4EDDC] text-[#C5A66A] font-semibold">
              {teacher.experienceYears}+ yrs exp
            </span>
          </div>

          <p className="text-xs text-[#737B74] font-medium mt-0.5 line-clamp-1">
            {teacher.title}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-2 text-xs">
            <div className="flex items-center gap-1 text-[#C5A66A] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#C5A66A]" />
              <span>{teacher.rating.toFixed(2)}</span>
            </div>
            <span className="text-[#737B74]">({teacher.reviewCount} reviews)</span>
            <span className="text-[#E7E6DE]">•</span>
            <span className="text-[#648B70] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#648B70]" />
              Available this week
            </span>
          </div>
        </div>

        {/* Short Bio */}
        <p className="text-xs text-[#737B74] mt-3 line-clamp-2 leading-relaxed">
          {teacher.bio}
        </p>
      </div>

      {/* Specialities & Languages */}
      <div className="px-5 py-3 bg-[#F8F7F2]/60 border-t border-b border-[#E7E6DE]/60 flex flex-col gap-2 mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {teacher.specialities.map((spec) => (
            <span
              key={spec}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-white border border-[#E7E6DE] text-[#252C28] font-medium"
            >
              {spec}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[11px] text-[#737B74]">
          <Languages className="w-3.5 h-3.5 text-[#284C3D]" />
          <span>Speaks: {teacher.languages.join(', ')}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 bg-white grid grid-cols-2 gap-2">
        <Link
          to={`/teachers/${teacher.id}`}
          className="text-center py-2 px-3 rounded-control border border-[#E7E6DE] hover:border-[#284C3D] hover:bg-[#F8F7F2] text-[#252C28] text-xs font-semibold transition-all"
        >
          View Profile
        </Link>
        <button
          onClick={() => onBookNow(teacher)}
          className="py-2 px-3 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs"
        >
          <span>Book Lesson</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A66A]" />
        </button>
      </div>
    </div>
  );
};

