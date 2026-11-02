import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { TeacherCard } from '../../components/marketplace/TeacherCard';
import { BookingModal } from '../../components/marketplace/BookingModal';
import { Teacher } from '../../types';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  BookOpen,
  Award,
  Flame,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Volume2,
  Play,
  Heart,
  Star,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { speakArabic, playSound } from '../../utils/soundEffects';

export const LandingPage: React.FC = () => {
  const { teachers, categories } = useDemo();
  const navigate = useNavigate();

  // Booking modal state
  const [selectedTeacherForBooking, setSelectedTeacherForBooking] = useState<Teacher | null>(null);

  // FAQ Accordion
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Mini Preview Question in Hero / Section
  const [miniAnswer, setMiniAnswer] = useState<string | null>(null);
  const [miniSubmitted, setMiniSubmitted] = useState(false);

  const handleMiniCheck = (ans: string) => {
    setMiniAnswer(ans);
    setMiniSubmitted(true);
    if (ans === 'Ba') {
      playSound('correct');
    } else {
      playSound('wrong');
    }
  };

  const faqs = [
    {
      q: 'How do I find an Islamic Studies teacher?',
      a: 'Browse our verified teacher marketplace, filter by speciality (Quran, Tajweed, Fiqh, Arabic), language, budget, and schedule, and book a lesson directly into your calendar.',
    },
    {
      q: 'Can I choose a teacher based on language and speciality?',
      a: 'Yes. All teacher profiles clearly indicate their spoken languages (English, Arabic, Urdu, Bengali, French) and specialisations, along with student reviews and sample introductory videos.',
    },
    {
      q: 'How does online learning work?',
      a: 'Lessons take place in our calm, distraction-free virtual classroom featuring two-way video, audio, an interactive shared reading board with colour-coded Tajweed, and live teacher annotations.',
    },
    {
      q: 'Can parents manage a student’s learning?',
      a: 'Yes! Parents have full visibility through the Student Portal to track completed lessons, schedule sessions, monitor daily XP and streaks, and communicate directly with teachers.',
    },
    {
      q: 'What are interactive micro-lessons?',
      a: 'Short 5-minute gamified exercises designed to reinforce Arabic phonics, Harakat, vocabulary, and daily Duas between live tutoring sessions, complete with XP and streak rewards.',
    },
    {
      q: 'How can teachers join the platform?',
      a: 'Educators can submit an application via our "Become a Teacher" portal. Each profile undergoes verification of qualifications and pedagogy before being approved by our team.',
    },
    {
      q: 'How are lesson bookings handled?',
      a: 'Parents select an available time slot and confirm the simulated demo booking instantly. Both the student dashboard and teacher calendar update immediately in real-time.',
    },
  ];

  return (
    <div className="space-y-20 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:py-24 bg-subtle-pattern overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-radial from-[#DDE8DF]/60 via-[#F4EDDC]/30 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DDE8DF] text-[#1C382D] text-xs font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
                <span>PERSONALISED ISLAMIC EDUCATION</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1C382D] tracking-tight leading-[1.15] font-heading">
                Learn with purpose.{' '}
                <span className="text-[#284C3D] underline decoration-[#C5A66A] decoration-4 underline-offset-8">
                  Grow with knowledge.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-[#737B74] leading-relaxed max-w-xl">
                Connect with trusted Islamic Studies teachers, attend personalised 1-on-1 virtual lessons, and build a consistent learning habit through engaging daily practice.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/teachers"
                  className="px-6 py-3.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-elevated transition-all hover:scale-102"
                >
                  <span>Find Your Teacher</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A66A]" />
                </Link>

                <Link
                  to="/learn"
                  className="px-6 py-3.5 rounded-control bg-white hover:bg-[#F8F7F2] text-[#1C382D] border border-[#E7E6DE] hover:border-[#A7B9A8] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-subtle"
                >
                  <Sparkles className="w-4 h-4 text-[#284C3D]" />
                  <span>Explore Learning Path</span>
                </Link>
              </div>

              {/* Trust Details */}
              <p className="text-xs text-[#737B74] pt-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#648B70]" />
                <span>Thoughtfully designed for students, parents, and verified educators.</span>
              </p>
            </div>

            {/* Right Product Preview Composition */}
            <div className="lg:col-span-5 relative">
              {/* Product preview card */}
              <div className="relative bg-white rounded-feature border border-[#E7E6DE] shadow-elevated p-6 space-y-5">
                {/* Simulated video hero loop preview / calm study aesthetic */}
                <div className="relative h-48 rounded-xl overflow-hidden bg-[#1C382D] shadow-inner group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-80"
                    poster="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800"
                  >
                    <source
                      src="https://assets.mixkit.co/videos/preview/mixkit-hand-turning-pages-of-a-book-43407-large.mp4"
                      type="video/mp4"
                    />
                  </video>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#14241C] via-transparent to-black/30 p-4 flex flex-col justify-between">
                    <span className="self-start text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#1C382D]/90 text-[#F4EDDC] border border-white/10 flex items-center gap-1.5 backdrop-blur-xs">
                      <span className="w-2 h-2 rounded-full bg-[#648B70] animate-pulse" />
                      Live Virtual Classroom
                    </span>

                    <div>
                      <h4 className="text-white font-bold text-sm">Tajweed Articulation & Makharij</h4>
                      <p className="text-[11px] text-[#DDE8DF]">Ustadhah Aisha Rahman • Today at 4:30 PM</p>
                    </div>
                  </div>
                </div>

                {/* Floating Daily Habit Card */}
                <div className="p-4 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5 fill-[#C5A66A]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#1C382D]">5-Day Streak!</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#DDE8DF] text-[#1C382D] font-bold">Active</span>
                      </div>
                      <p className="text-[11px] text-[#737B74]">Today: 35 / 50 XP Goal</p>
                    </div>
                  </div>
                  <Link
                    to="/learn"
                    className="text-xs font-bold text-[#284C3D] hover:underline"
                  >
                    Practise →
                  </Link>
                </div>

                {/* Quick teacher quote */}
                <div className="flex items-center gap-3 pt-1">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                    alt="Aisha Rahman"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-xs text-[#737B74] italic">
                    "Every letter recited with love illuminates the heart."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-[#E7E6DE] bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C382D]">Verified Teacher Profiles</h4>
                <p className="text-[11px] text-[#737B74]">Vetted Ijazahs & credentials</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C382D]">Personalised 1-on-1 Learning</h4>
                <p className="text-[11px] text-[#737B74]">Customised to each child’s pace</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C382D]">Flexible Scheduling</h4>
                <p className="text-[11px] text-[#737B74]">Book slots around your week</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-[#C5A66A]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1C382D]">Interactive Daily Practice</h4>
                <p className="text-[11px] text-[#737B74]">Bite-sized gamified lessons</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TEACHER DISCOVERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
              Educator Showcase
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-1">
              Meet teachers who make learning meaningful.
            </h2>
            <p className="text-sm text-[#737B74] mt-1 max-w-xl">
              Explore experienced educators across Quran, Tajweed, Fiqh, Islamic History, and Arabic.
            </p>
          </div>

          <Link
            to="/teachers"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#284C3D] hover:underline"
          >
            <span>Explore All 24 Teachers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Sample Teacher Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teachers.slice(0, 4).map((teacher) => (
            <TeacherCard
              key={teacher.id}
              teacher={teacher}
              onBookNow={(t) => setSelectedTeacherForBooking(t)}
            />
          ))}
        </div>
      </section>

      {/* 4. SIGNATURE MICRO-LEARNING PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C382D] rounded-feature text-white p-8 sm:p-12 overflow-hidden relative shadow-elevated">
          {/* Subtle Islamic star background */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-radial from-[#C5A66A]/10 to-transparent blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
                Gamified Micro-Learning
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
                Small lessons. Meaningful progress.
              </h2>
              <p className="text-sm text-[#DDE8DF] leading-relaxed">
                Students retain what they study through short 5-minute daily challenges inspired by the best language-learning apps, reimagined specifically for Islamic studies and Arabic literacy.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center">
                  <Flame className="w-5 h-5 text-[#C5A66A] mx-auto mb-1" />
                  <span className="text-base font-bold block">Daily Streaks</span>
                  <span className="text-[10px] text-[#A7B9A8]">Habit building</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center">
                  <Heart className="w-5 h-5 text-[#B86D65] fill-[#B86D65] mx-auto mb-1" />
                  <span className="text-base font-bold block">5 Hearts</span>
                  <span className="text-[10px] text-[#A7B9A8]">Encourages focus</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-center">
                  <Award className="w-5 h-5 text-[#C5A66A] mx-auto mb-1" />
                  <span className="text-base font-bold block">XP & Badges</span>
                  <span className="text-[10px] text-[#A7B9A8]">Milestone rewards</span>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  to="/learn"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-control bg-[#C5A66A] hover:bg-white text-[#1C382D] font-bold text-xs shadow-card transition-all"
                >
                  <span>Play Interactive Learning Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right: Live Interactive Question Component Preview */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#252C28] rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DE]">
                  <span className="text-xs font-bold text-[#737B74]">
                    Interactive Arabic Challenge
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#C5A66A] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-[#C5A66A]" /> 5
                    </span>
                    <span className="text-xs font-bold text-[#B86D65] flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-[#B86D65]" /> 5
                    </span>
                  </div>
                </div>

                <div className="py-4 space-y-4">
                  <p className="text-sm font-bold text-[#1C382D]">
                    Which Arabic letter has one single dot underneath?
                  </p>

                  <div className="p-6 bg-[#F8F7F2] rounded-xl text-center border border-[#E7E6DE]">
                    <span className="font-arabic text-6xl text-[#1C382D] select-none">ب</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {['Alif', 'Ba', 'Ta', 'Tha'].map((letter) => {
                      const isSelected = miniAnswer === letter;
                      let btnCls = 'border-[#E7E6DE] hover:bg-[#F8F7F2]';

                      if (miniSubmitted) {
                        if (letter === 'Ba') {
                          btnCls = 'bg-[#DDE8DF] border-[#648B70] text-[#1C382D] font-bold';
                        } else if (isSelected) {
                          btnCls = 'bg-[#FDF2F0] border-[#B86D65] text-[#B86D65]';
                        }
                      }

                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => handleMiniCheck(letter)}
                          className={`p-3 rounded-control border text-xs font-semibold text-center transition-all ${btnCls}`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>

                  {miniSubmitted && (
                    <div className="p-3 rounded-xl bg-[#DDE8DF]/50 border border-[#A7B9A8] text-xs text-[#1C382D] animate-fade-in flex items-center justify-between">
                      <span>Correct! Ba (ب) carries one dot underneath.</span>
                      <span className="font-bold text-[#284C3D]">+20 XP</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Simple 3-Step Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-1">
            How NOOR works for your family
          </h2>
          <p className="text-sm text-[#737B74] mt-1">
            From discovering qualified teachers to daily habit-forming practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle hover:shadow-card transition-all">
            <span className="text-3xl font-extrabold text-[#C5A66A] font-heading block mb-3">
              01
            </span>
            <h3 className="text-base font-bold text-[#1C382D]">Discover</h3>
            <p className="text-xs text-[#737B74] mt-2 leading-relaxed">
              Find a certified teacher based on your subject, language preferences, budget, and time availability with verified reviews.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle hover:shadow-card transition-all">
            <span className="text-3xl font-extrabold text-[#284C3D] font-heading block mb-3">
              02
            </span>
            <h3 className="text-base font-bold text-[#1C382D]">Learn</h3>
            <p className="text-xs text-[#737B74] mt-2 leading-relaxed">
              Book convenient time slots and attend focused 1-on-1 virtual classrooms with two-way video and shared interactive Quran reading boards.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle hover:shadow-card transition-all">
            <span className="text-3xl font-extrabold text-[#648B70] font-heading block mb-3">
              03
            </span>
            <h3 className="text-base font-bold text-[#1C382D]">Grow</h3>
            <p className="text-xs text-[#737B74] mt-2 leading-relaxed">
              Build lasting consistency with 5-minute interactive micro-lessons between live tutoring, earning XP and tracking progress badges.
            </p>
          </div>
        </div>
      </section>

      {/* 6. SUBJECT SPECIALITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Curriculum Categories
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-1">
            Comprehensive Islamic Studies
          </h2>
          <p className="text-sm text-[#737B74] mt-1">
            Choose from specialised subjects delivered by certified educators.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/teachers?speciality=${encodeURIComponent(cat.name)}`)}
              className="p-5 rounded-card bg-white border border-[#E7E6DE] hover:border-[#284C3D] hover:shadow-card cursor-pointer transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#DDE8DF] text-[#284C3D] group-hover:bg-[#284C3D] group-hover:text-[#C5A66A] flex items-center justify-center mb-3 transition-colors">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-[#1C382D] group-hover:text-[#284C3D]">
                {cat.name}
              </h4>
              <p className="text-[11px] text-[#737B74] mt-1 line-clamp-2">
                {cat.description}
              </p>
              <span className="text-[11px] font-semibold text-[#284C3D] mt-3 inline-flex items-center gap-1 group-hover:underline">
                Find Teachers <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. TEACHER RECRUITMENT BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-feature bg-[#F4EDDC] border border-[#C5A66A]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
              Join Our Teaching Community
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading">
              Share your knowledge. Inspire the next generation.
            </h3>
            <p className="text-xs sm:text-sm text-[#737B74] leading-relaxed">
              Create your verified teaching profile, connect with dedicated students and families globally, manage your calendar, and grow your independent teaching practice.
            </p>
          </div>

          <Link
            to="/become-a-teacher"
            className="px-6 py-3.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-bold text-xs shadow-card flex items-center gap-2 flex-shrink-0 transition-all hover:scale-102"
          >
            <GraduationCap className="w-4 h-4 text-[#C5A66A]" />
            <span>Become a Teacher</span>
          </Link>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Parent & Student Voices
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-1">
            Loved by families worldwide
          </h2>
          <p className="text-sm text-[#737B74] mt-1">
            Illustrative demo testimonials reflecting genuine user feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              author: 'Samira Patel',
              role: 'Parent of Zayd, Age 8 (London, UK)',
              comment: 'Ustadhah Aisha transformed my son’s confidence with Quranic phonics. The shared reading board makes it feel like she is sitting right next to him in the room.',
            },
            {
              author: 'Dr. Tariq Al-Masri',
              role: 'Parent of Adam, Age 10 (Manchester)',
              comment: 'The combination of weekly live lessons with daily 5-minute Duolingo-style micro exercises has created the most consistent Quran habit we have ever seen in our home.',
            },
            {
              author: 'Farhan Mahmood',
              role: 'Adult Arabic Learner (Canada)',
              comment: 'Finding a native Arabic teacher who could explain the grammatical subtleties of classical Nahw at my own schedule was effortless with NOOR.',
            },
          ].map((t, idx) => (
            <div key={idx} className="p-6 rounded-card bg-white border border-[#E7E6DE] shadow-subtle space-y-3">
              <div className="flex items-center gap-1 text-[#C5A66A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#C5A66A]" />
                ))}
              </div>
              <p className="text-xs text-[#252C28] leading-relaxed italic">
                "{t.comment}"
              </p>
              <div className="pt-2 border-t border-[#E7E6DE]">
                <h5 className="text-xs font-bold text-[#1C382D]">{t.author}</h5>
                <p className="text-[10px] text-[#737B74]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
            Common Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E7E6DE] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#1C382D] hover:bg-[#F8F7F2]"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#284C3D] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#737B74] flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#737B74] leading-relaxed border-t border-[#E7E6DE]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#284C3D] text-white rounded-feature p-10 sm:p-14 text-center space-y-6 shadow-elevated relative overflow-hidden">
          <div className="max-w-xl mx-auto space-y-3 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A66A]">
              Start Your Journey Today
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              Make every learning day count.
            </h2>
            <p className="text-xs sm:text-sm text-[#DDE8DF] leading-relaxed">
              Start with a teacher who understands your goals and an interactive learning experience that helps your family stay consistent.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link
              to="/teachers"
              className="px-6 py-3.5 rounded-control bg-[#C5A66A] hover:bg-white text-[#1C382D] font-bold text-xs shadow-card transition-all"
            >
              Find a Teacher
            </Link>
            <Link
              to="/learn"
              className="px-6 py-3.5 rounded-control bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition-all"
            >
              Start Free Learning Path
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Booking Modal Component */}
      <BookingModal
        teacher={selectedTeacherForBooking}
        isOpen={!!selectedTeacherForBooking}
        onClose={() => setSelectedTeacherForBooking(null)}
      />
    </div>
  );
};

