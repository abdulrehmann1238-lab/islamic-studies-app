import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { TeacherCard } from '../../components/marketplace/TeacherCard';
import { TeacherFilters, FilterState } from '../../components/marketplace/TeacherFilters';
import { BookingModal } from '../../components/marketplace/BookingModal';
import { Teacher } from '../../types';
import { Sparkles, ArrowUpDown } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { teachers } = useDemo();
  const [searchParams] = useSearchParams();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<Teacher | null>(null);

  const initialSpeciality = searchParams.get('speciality') || 'All';

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    speciality: initialSpeciality,
    language: 'All',
    maxHourlyRate: 35,
    gender: 'All',
    minRating: 0,
    availability: 'All',
    sortBy: 'recommended',
  });

  // Keep filter in sync if query param changes
  useEffect(() => {
    const sp = searchParams.get('speciality');
    if (sp) {
      setFilters((prev) => ({ ...prev, speciality: sp }));
    }
  }, [searchParams]);

  // Filter and sort teachers dynamically
  const filteredTeachers = useMemo(() => {
    return teachers
      .filter((t) => {
        // Search text
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchName = t.name.toLowerCase().includes(q);
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchSpec = t.specialities.some((s) => s.toLowerCase().includes(q));
          const matchLang = t.languages.some((l) => l.toLowerCase().includes(q));
          if (!matchName && !matchTitle && !matchSpec && !matchLang) return false;
        }

        // Speciality
        if (filters.speciality !== 'All') {
          if (!t.specialities.includes(filters.speciality)) return false;
        }

        // Language
        if (filters.language !== 'All') {
          if (!t.languages.includes(filters.language)) return false;
        }

        // Hourly rate
        if (t.hourlyRate > filters.maxHourlyRate) return false;

        // Gender
        if (filters.gender !== 'All') {
          if (t.gender !== filters.gender) return false;
        }

        // Rating
        if (t.rating < filters.minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rating') return b.rating - a.rating;
        if (filters.sortBy === 'price-asc') return a.hourlyRate - b.hourlyRate;
        if (filters.sortBy === 'price-desc') return b.hourlyRate - a.hourlyRate;
        // recommended
        return b.reviewCount - a.reviewCount;
      });
  }, [teachers, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Marketplace Header */}
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Verified Educator Directory
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C382D] font-heading mt-1">
          Find the right teacher for your learning journey.
        </h1>
        <p className="text-xs sm:text-sm text-[#737B74] mt-1 max-w-2xl leading-relaxed">
          Explore qualified educators across Quran, Tajweed, Fiqh, and Arabic, and connect with someone who matches your family's preferences and schedule.
        </p>

        {/* Sort selector for desktop */}
        <div className="hidden lg:flex items-center justify-between pt-4 mt-4 border-t border-[#E7E6DE]">
          <p className="text-xs text-[#737B74]">
            Showing <span className="font-bold text-[#1C382D]">{filteredTeachers.length}</span> educators available
          </p>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#737B74]">Sort by:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
              className="px-3 py-1.5 text-xs rounded-control bg-white border border-[#E7E6DE] focus:border-[#284C3D] text-[#252C28] font-semibold"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Filters Sidebar */}
        <TeacherFilters
          filters={filters}
          setFilters={setFilters}
          resultCount={filteredTeachers.length}
          mobileOpen={mobileFilterOpen}
          setMobileOpen={setMobileFilterOpen}
        />

        {/* Teachers Results Grid */}
        <div className="flex-1 w-full">
          {filteredTeachers.length === 0 ? (
            <div className="bg-white rounded-card border border-[#E7E6DE] p-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F8F7F2] text-[#737B74] flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#1C382D]">No teachers match these exact filters</h3>
              <p className="text-xs text-[#737B74] max-w-md mx-auto">
                Try widening your budget range or selecting "All Languages" to view more qualified educators.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    search: '',
                    speciality: 'All',
                    language: 'All',
                    maxHourlyRate: 35,
                    gender: 'All',
                    minRating: 0,
                    availability: 'All',
                    sortBy: 'recommended',
                  })
                }
                className="px-4 py-2 rounded-control bg-[#284C3D] text-white text-xs font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <TeacherCard
                  key={teacher.id}
                  teacher={teacher}
                  onBookNow={(t) => setSelectedTeacherForBooking(t)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        teacher={selectedTeacherForBooking}
        isOpen={!!selectedTeacherForBooking}
        onClose={() => setSelectedTeacherForBooking(null)}
      />
    </div>
  );
};

