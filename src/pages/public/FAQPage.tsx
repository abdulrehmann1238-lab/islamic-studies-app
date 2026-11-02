import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center mb-12">
        <div className="w-12 h-12 rounded-xl bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center mx-auto mb-3">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C382D] font-heading">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#737B74] mt-2">
          Everything you need to know about NOOR Islamic Learning Platform.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-card border border-[#E7E6DE] overflow-hidden transition-all shadow-subtle"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#1C382D] hover:bg-[#F8F7F2]"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#284C3D] flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#737B74] flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#737B74] leading-relaxed border-t border-[#E7E6DE]/60">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

