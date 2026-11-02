import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { BookingModal } from '../../components/marketplace/BookingModal';
import { INITIAL_REVIEWS } from '../../data/mockData';
import {
  Star,
  CheckCircle2,
  Heart,
  Calendar,
  Languages,
  Clock,
  Sparkles,
  Award,
  BookOpen,
  MessageSquare,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';

export const TeacherProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { teachers, isFavoriteTeacher, toggleFavoriteTeacher, sendMessage } = useDemo();

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  const teacher = teachers.find((t) => t.id === id) || teachers[0];
  const isFav = isFavoriteTeacher(teacher.id);

  const teacherReviews = INITIAL_REVIEWS.filter((r) => r.teacherId === teacher.id);
  const allReviews = teacherReviews.length > 0 ? teacherReviews : INITIAL_REVIEWS.slice(0, 2);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMsg.trim()) return;
    sendMessage(teacher.id, teacher.name, quickMsg);
    setMsgSent(true);
    setQuickMsg('');
    setTimeout(() => {
      navigate('/student/messages');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Back to Marketplace */}
      <Link
        to="/teachers"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#737B74] hover:text-[#284C3D] transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Teacher Directory</span>
      </Link>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-feature border border-[#E7E6DE] p-6 sm:p-8 shadow-card">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-[#F8F7F2] shadow-elevated"
              />
              {teacher.verified && (
                <div className="absolute -bottom-2 -right-2 bg-[#284C3D] text-[#C5A66A] p-1.5 rounded-full shadow-md">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading">
                  {teacher.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold">
                  {teacher.gender} Teacher
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F4EDDC] text-[#C5A66A] font-bold">
                  Verified Instructor
                </span>
              </div>

              <p className="text-sm font-semibold text-[#284C3D]">
                {teacher.title}
              </p>

              <div className="flex items-center gap-3 text-xs text-[#737B74] flex-wrap">
                <div className="flex items-center gap-1 text-[#C5A66A] font-bold">
                  <Star className="w-4 h-4 fill-[#C5A66A]" />
                  <span>{teacher.rating.toFixed(2)}</span>
                </div>
                <span>({teacher.reviewCount} parent reviews)</span>
                <span>•</span>
                <span>{teacher.experienceYears}+ years experience</span>
                <span>•</span>
                <span>{teacher.completedLessonsCount} lessons taught</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#737B74] pt-1">
                <Languages className="w-3.5 h-3.5 text-[#284C3D]" />
                <span>Languages: {teacher.languages.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Pricing & Primary Action Card */}
          <div className="w-full lg:w-72 p-5 bg-[#F8F7F2] rounded-card border border-[#E7E6DE] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold text-[#737B74] uppercase tracking-wider block">
                Standard Lesson Rate
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-[#1C382D] font-heading">
                  £{teacher.hourlyRate}
                </span>
                <span className="text-xs text-[#737B74]"> / 45-min lesson</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setBookingModalOpen(true)}
                className="w-full py-3 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-bold text-xs shadow-card flex items-center justify-center gap-2 transition-all hover:scale-102"
              >
                <span>Book a Lesson</span>
                <ArrowRight className="w-4 h-4 text-[#C5A66A]" />
              </button>

              <div className="flex gap-2">
                <a
                  href="#message-section"
                  className="flex-1 py-2 px-3 rounded-control border border-[#E7E6DE] bg-white hover:bg-[#F8F7F2] text-[#252C28] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#284C3D]" />
                  <span>Message</span>
                </a>
                <button
                  onClick={() => toggleFavoriteTeacher(teacher.id)}
                  className={`p-2 rounded-control border transition-colors ${
                    isFav
                      ? 'bg-[#B86D65]/10 border-[#B86D65]/30 text-[#B86D65]'
                      : 'border-[#E7E6DE] bg-white text-[#737B74] hover:text-[#252C28]'
                  }`}
                  title={isFav ? 'Remove from saved' : 'Save teacher'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-[#B86D65]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout: Detailed Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Columns */}
        <div className="lg:col-span-8 space-y-8">
          {/* About */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-3">
            <h3 className="text-base font-bold text-[#1C382D] font-heading">About {teacher.name}</h3>
            <p className="text-xs sm:text-sm text-[#737B74] leading-relaxed whitespace-pre-line">
              {teacher.bio}
            </p>
          </div>

          {/* Specialities */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#1C382D] font-heading">Specialities & Curriculum</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teacher.specialities.map((spec) => (
                <div
                  key={spec}
                  className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C382D]">{spec}</h4>
                    <p className="text-[11px] text-[#737B74] mt-0.5">
                      Tailored progressive modules from foundational rules to fluent mastery.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Introduction Video */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#1C382D] font-heading">
              Video Introduction
            </h3>
            <div className="relative rounded-2xl overflow-hidden bg-[#14241C] aspect-video flex items-center justify-center group shadow-elevated">
              <video
                src={teacher.introVideoFallback}
                className="w-full h-full object-cover"
                loop
                muted={!isPlayingVideo}
                controls={isPlayingVideo}
                poster={teacher.avatar}
              />
              {!isPlayingVideo && (
                <button
                  onClick={() => setIsPlayingVideo(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#C5A66A] text-[#1C382D] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                >
                  <Play className="w-7 h-7 ml-1" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-[#737B74] italic">
              * Sample video preview illustrating tutor presence and articulation clarity.
            </p>
          </div>

          {/* Teaching Approach */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#1C382D] font-heading">
              Teaching Methodology
            </h3>
            <div className="space-y-3">
              {teacher.teachingApproach.map((app, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#F4EDDC]/40 border border-[#C5A66A]/30 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#284C3D] text-[#C5A66A] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-[#1C382D]">{app.title}</h4>
                    <p className="text-xs text-[#737B74] mt-0.5 leading-relaxed">{app.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Qualifications & Certifications */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
            <h3 className="text-base font-bold text-[#1C382D] font-heading">
              Verified Qualifications
            </h3>
            <div className="space-y-2.5">
              {teacher.qualifications.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#284C3D]" />
                    <div>
                      <span className="font-bold text-[#1C382D] block">{q.title}</span>
                      <span className="text-[#737B74] text-[11px]">{q.institution}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#284C3D]">{q.year}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#737B74] italic">
              * Qualifications are verified during onboarding under NOOR's verification framework.
            </p>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#1C382D] font-heading">Student & Parent Reviews</h3>
              <div className="flex items-center gap-1 text-xs text-[#C5A66A] font-bold">
                <Star className="w-3.5 h-3.5 fill-[#C5A66A]" />
                <span>{teacher.rating.toFixed(2)} / 5.0</span>
              </div>
            </div>

            <div className="space-y-3">
              {allReviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1C382D]">{rev.author}</span>
                    <span className="text-[10px] text-[#737B74]">{rev.date}</span>
                  </div>
                  <span className="text-[11px] text-[#284C3D] font-medium block">{rev.role}</span>
                  <p className="text-xs text-[#737B74] italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Availability Calendar & Quick Message */}
        <div className="lg:col-span-4 space-y-6">
          {/* Availability Calendar Card */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-card space-y-4 sticky top-24">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#284C3D]" />
              <h3 className="text-sm font-bold text-[#1C382D]">Weekly Availability</h3>
            </div>
            <p className="text-xs text-[#737B74]">
              Select a slot to immediately pre-fill your booking:
            </p>

            <div className="space-y-3">
              {teacher.availabilitySlots.map((slot) => (
                <div key={slot.day} className="p-3 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE]">
                  <span className="text-xs font-bold text-[#1C382D] block mb-1.5">{slot.day}</span>
                  <div className="flex flex-wrap gap-1.5">
                    {slot.times.map((t) => (
                      <button
                        key={t}
                        onClick={() => setBookingModalOpen(true)}
                        className="px-2 py-1 text-[11px] font-semibold rounded-md bg-white border border-[#E7E6DE] hover:border-[#284C3D] hover:bg-[#DDE8DF] text-[#1C382D] transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-bold text-xs shadow-card flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Book From £{teacher.hourlyRate}/hr</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C5A66A]" />
            </button>
          </div>

          {/* Quick Message Section */}
          <div id="message-section" className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#284C3D]" />
              <h3 className="text-sm font-bold text-[#1C382D]">Send a Question</h3>
            </div>
            <p className="text-xs text-[#737B74]">
              Have a question about scheduling or custom syllabus?
            </p>

            {msgSent ? (
              <div className="p-3 rounded-xl bg-[#DDE8DF] border border-[#648B70] text-xs text-[#1C382D] font-medium">
                Message delivered to {teacher.name}! Redirecting to Messages...
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-2">
                <textarea
                  rows={3}
                  value={quickMsg}
                  onChange={(e) => setQuickMsg(e.target.value)}
                  placeholder={`Assalamu Alaikum ${teacher.name}, I would like to ask...`}
                  className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-control bg-[#1C382D] text-white text-xs font-semibold hover:bg-[#284C3D] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        teacher={teacher}
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
      />
    </div>
  );
};

