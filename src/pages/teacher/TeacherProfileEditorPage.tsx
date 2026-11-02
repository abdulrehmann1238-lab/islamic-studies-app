import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { User, Award, BookOpen, Save, CheckCircle2 } from 'lucide-react';

export const TeacherProfileEditorPage: React.FC = () => {
  const { teachers, updateTeacherProfile } = useDemo();
  const { showToast } = useToast();
  const currentTeacher = teachers[0]; // Aisha Rahman

  const [title, setTitle] = useState(currentTeacher.title);
  const [bio, setBio] = useState(currentTeacher.bio);
  const [hourlyRate, setHourlyRate] = useState(currentTeacher.hourlyRate);
  const [specialitiesInput, setSpecialitiesInput] = useState(currentTeacher.specialities.join(', '));
  const [languagesInput, setLanguagesInput] = useState(currentTeacher.languages.join(', '));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSpecialities = specialitiesInput.split(',').map((s) => s.trim()).filter(Boolean);
    const updatedLanguages = languagesInput.split(',').map((l) => l.trim()).filter(Boolean);

    updateTeacherProfile(currentTeacher.id, {
      title,
      bio,
      hourlyRate: Number(hourlyRate),
      specialities: updatedSpecialities,
      languages: updatedLanguages,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Edit Public Educator Profile
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Changes update live in the public marketplace and on your profile page.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-card border border-[#E7E6DE] p-6 sm:p-8 shadow-card space-y-5">
        <div className="flex items-center gap-4 pb-4 border-b border-[#E7E6DE]">
          <img
            src={currentTeacher.avatar}
            alt={currentTeacher.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#284C3D]"
          />
          <div>
            <h3 className="text-base font-bold text-[#1C382D]">{currentTeacher.name}</h3>
            <span className="text-xs text-[#284C3D] font-semibold">Verified Faculty Member</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1C382D] mb-1">Professional Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1C382D] mb-1">Detailed Biography</label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#1C382D] mb-1">Hourly Rate (£ GBP)</label>
            <input
              type="number"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#1C382D] mb-1">
              Specialities (comma-separated)
            </label>
            <input
              type="text"
              value={specialitiesInput}
              onChange={(e) => setSpecialitiesInput(e.target.value)}
              className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1C382D] mb-1">
            Spoken Languages (comma-separated)
          </label>
          <input
            type="text"
            value={languagesInput}
            onChange={(e) => setLanguagesInput(e.target.value)}
            className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
        </div>

        <div className="pt-4 border-t border-[#E7E6DE]">
          <button
            type="submit"
            className="px-6 py-3 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4 text-[#C5A66A]" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>
    </div>
  );
};

