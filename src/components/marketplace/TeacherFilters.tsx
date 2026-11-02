import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Search, Filter, RotateCcw, X, SlidersHorizontal } from 'lucide-react';

export interface FilterState {
  search: string;
  speciality: string;
  language: string;
  maxHourlyRate: number;
  gender: string;
  minRating: number;
  availability: string;
  sortBy: 'recommended' | 'rating' | 'price-asc' | 'price-desc';
}

interface TeacherFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resultCount: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const TeacherFilters: React.FC<TeacherFiltersProps> = ({
  filters,
  setFilters,
  resultCount,
  mobileOpen,
  setMobileOpen,
}) => {
  const { categories } = useDemo();

  const handleReset = () => {
    setFilters({
      search: '',
      speciality: 'All',
      language: 'All',
      maxHourlyRate: 35,
      gender: 'All',
      minRating: 0,
      availability: 'All',
      sortBy: 'recommended',
    });
  };

  const activeSpecialities = categories.filter((c) => c.active).map((c) => c.name);
  const languagesList = ['All', 'English', 'Arabic', 'Urdu', 'Bengali', 'French'];
  const genderList = ['All', 'Female', 'Male'];
  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4.5+ ★', value: 4.5 },
    { label: '4.7+ ★', value: 4.7 },
    { label: '4.9+ ★', value: 4.9 },
  ];

  const filterContent = (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-[#1C382D] mb-2 uppercase tracking-wider">
          Search
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-[#737B74] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search teachers, subjects, languages..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-control bg-white border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
        </div>
      </div>

      {/* Speciality Filter */}
      <div>
        <label className="block text-xs font-bold text-[#1C382D] mb-2 uppercase tracking-wider">
          Speciality / Subject
        </label>
        <select
          value={filters.speciality}
          onChange={(e) => setFilters({ ...filters, speciality: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-control bg-white border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
        >
          <option value="All">All Subjects & Specialities</option>
          {activeSpecialities.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Hourly Rate Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">
            Max Hourly Rate
          </label>
          <span className="text-xs font-bold text-[#284C3D]">
            Up to £{filters.maxHourlyRate}/hr
          </span>
        </div>
        <input
          type="range"
          min="12"
          max="35"
          step="1"
          value={filters.maxHourlyRate}
          onChange={(e) => setFilters({ ...filters, maxHourlyRate: Number(e.target.value) })}
          className="w-full accent-[#284C3D] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#737B74] mt-1">
          <span>£12/hr</span>
          <span>£25/hr</span>
          <span>£35/hr</span>
        </div>
      </div>

      {/* Gender Preference */}
      <div>
        <label className="block text-xs font-bold text-[#1C382D] mb-2 uppercase tracking-wider">
          Teacher Gender
        </label>
        <div className="grid grid-cols-3 gap-2">
          {genderList.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setFilters({ ...filters, gender: g })}
              className={`py-2 text-xs font-semibold rounded-control border transition-all ${
                filters.gender === g
                  ? 'bg-[#284C3D] text-white border-[#284C3D]'
                  : 'bg-white text-[#737B74] border-[#E7E6DE] hover:border-[#A7B9A8]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Language */}
      <div>
        <label className="block text-xs font-bold text-[#1C382D] mb-2 uppercase tracking-wider">
          Instruction Language
        </label>
        <select
          value={filters.language}
          onChange={(e) => setFilters({ ...filters, language: e.target.value })}
          className="w-full px-3 py-2 text-xs rounded-control bg-white border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
        >
          {languagesList.map((lang) => (
            <option key={lang} value={lang}>
              {lang === 'All' ? 'All Languages' : lang}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Rating */}
      <div>
        <label className="block text-xs font-bold text-[#1C382D] mb-2 uppercase tracking-wider">
          Minimum Rating
        </label>
        <div className="grid grid-cols-2 gap-2">
          {ratingOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setFilters({ ...filters, minRating: opt.value })}
              className={`py-1.5 px-2 text-xs font-medium rounded-control border transition-all ${
                filters.minRating === opt.value
                  ? 'bg-[#C5A66A] text-[#1C382D] border-[#C5A66A] font-bold'
                  : 'bg-white text-[#737B74] border-[#E7E6DE] hover:bg-[#F8F7F2]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="pt-2">
        <button
          onClick={handleReset}
          className="w-full py-2.5 px-3 rounded-control border border-[#E7E6DE] bg-[#F8F7F2] hover:bg-[#E7E6DE] text-xs font-semibold text-[#737B74] hover:text-[#252C28] flex items-center justify-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar Filter Card */}
      <div className="hidden lg:block w-72 bg-white rounded-card border border-[#E7E6DE] p-5 shadow-card flex-shrink-0 self-start sticky top-24">
        <div className="flex items-center justify-between pb-4 border-b border-[#E7E6DE] mb-5">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-sm font-bold text-[#1C382D]">Filter Teachers</h3>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold">
            {resultCount} found
          </span>
        </div>
        {filterContent}
      </div>

      {/* Mobile Filters Trigger Bar */}
      <div className="lg:hidden flex items-center justify-between p-3.5 bg-white rounded-card border border-[#E7E6DE] shadow-subtle mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-[#1C382D] px-3 py-1.5 rounded-control bg-[#DDE8DF]"
        >
          <Filter className="w-3.5 h-3.5 text-[#284C3D]" />
          <span>Filters ({resultCount} Teachers)</span>
        </button>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
          className="text-xs px-2.5 py-1.5 rounded-control bg-[#F8F7F2] border border-[#E7E6DE] text-[#252C28] font-medium"
        >
          <option value="recommended">Recommended</option>
          <option value="rating">Highest Rating</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Mobile Slide-Over Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs lg:hidden">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl p-5 overflow-y-auto flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#E7E6DE] mb-4">
              <h3 className="text-base font-bold text-[#1C382D]">Filter Teachers</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg text-[#737B74] hover:bg-[#F8F7F2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1">{filterContent}</div>
            <div className="pt-4 border-t border-[#E7E6DE] mt-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full py-3 rounded-control bg-[#284C3D] text-white font-semibold text-xs shadow-card"
              >
                Show {resultCount} Teachers
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

