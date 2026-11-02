import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { ClassroomControls } from '../../components/classroom/ClassroomControls';
import { ClassroomChat } from '../../components/classroom/ClassroomChat';
import { SharedReadingMaterial } from '../../components/classroom/SharedReadingMaterial';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  PhoneOff,
  Clock,
  ArrowRight,
  User,
} from 'lucide-react';

export const ClassroomPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { bookings, teachers, studentProfile, role } = useDemo();

  // Find booking details or default
  const booking = bookings.find((b) => b.id === lessonId) || bookings[0];
  const teacher = teachers.find((t) => t.id === booking?.teacherId) || teachers[0];

  // Classroom control states
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [handRaised, setHandRaised] = useState(false);

  // Leave confirmation modal
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [lessonSummaryOpen, setLessonSummaryOpen] = useState(false);

  const handleConfirmLeave = () => {
    setLeaveModalOpen(false);
    setLessonSummaryOpen(true);
  };

  return (
    <div className="h-screen w-screen bg-[#14241C] text-white flex flex-col overflow-hidden select-none">
      {/* Top Classroom Bar */}
      <header className="h-16 px-6 bg-[#1C382D]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white">
                {booking ? booking.subject : 'Tajweed & Quran Recitation'}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#284C3D] text-[#C5A66A] font-bold">
                Demo Classroom
              </span>
            </div>
            <p className="text-[11px] text-[#A7B9A8]">
              Teacher: {teacher.name} • Student: {studentProfile.name}
            </p>
          </div>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#648B70] animate-pulse" />
            <span className="font-mono text-[#DDE8DF]">Connected (00:24:18)</span>
          </div>
        </div>
      </header>

      {/* Center Stage: Video Feeds & Shared Reading Material */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Stage */}
        <div className="flex-1 p-4 flex flex-col lg:flex-row gap-4 overflow-hidden">
          {/* Left/Main: Shared Reading Material (when toggled on) or Large Video */}
          {screenSharing ? (
            <div className="flex-1 h-full min-h-[300px]">
              <SharedReadingMaterial />
            </div>
          ) : (
            /* Large Teacher Video Stream View */
            <div className="flex-1 h-full relative rounded-2xl overflow-hidden bg-[#1C382D] border border-white/10 flex items-center justify-center shadow-2xl">
              <img
                src={teacher.avatar}
                alt={teacher.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-6 flex flex-col justify-between">
                <span className="self-start px-3 py-1 rounded-full bg-[#14241C]/80 text-[#C5A66A] text-xs font-bold border border-white/10">
                  {teacher.name} (Teacher)
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#648B70]" />
                    <span className="text-xs font-semibold">Microphone Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right/Side Video Columns */}
          <div className="w-full lg:w-72 flex lg:flex-col gap-4 flex-shrink-0">
            {/* Teacher PiP Video Feed (when board is visible) */}
            {screenSharing && (
              <div className="flex-1 lg:h-48 relative rounded-xl overflow-hidden bg-[#1C382D] border border-white/10 shadow-lg">
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2.5 flex items-end justify-between">
                  <span className="text-[11px] font-bold text-white">
                    {teacher.name}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#648B70]" />
                </div>
              </div>
            )}

            {/* Student Video PiP Feed */}
            <div className="flex-1 lg:h-48 relative rounded-xl overflow-hidden bg-[#14241C] border border-white/10 shadow-lg">
              {cameraOn ? (
                <img
                  src={studentProfile.avatar}
                  alt={studentProfile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/50 space-y-2">
                  <VideoOff className="w-8 h-8" />
                  <span className="text-[11px]">Camera Off</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-2.5 flex items-end justify-between">
                <span className="text-[11px] font-bold text-white">
                  {studentProfile.name} (You)
                </span>
                <div className="flex items-center gap-1">
                  {!micOn && <MicOff className="w-3.5 h-3.5 text-[#B86D65]" />}
                  {handRaised && (
                    <span className="text-[10px] bg-[#C5A66A] text-[#1C382D] font-bold px-1.5 py-0.2 rounded">
                      ✋ Hand
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* In-Classroom Chat Side Drawer */}
        <ClassroomChat
          isOpen={chatOpen}
          onClose={() => setChatOpen(false)}
          teacherName={teacher.name}
        />
      </div>

      {/* Bottom Floating Control Dock */}
      <div className="p-4 flex items-center justify-center z-20">
        <ClassroomControls
          micOn={micOn}
          setMicOn={setMicOn}
          cameraOn={cameraOn}
          setCameraOn={setCameraOn}
          screenSharing={screenSharing}
          setScreenSharing={setScreenSharing}
          chatOpen={chatOpen}
          setChatOpen={setChatOpen}
          handRaised={handRaised}
          setHandRaised={setHandRaised}
          onLeave={() => setLeaveModalOpen(true)}
        />
      </div>

      {/* Leave Classroom Confirmation Dialog */}
      {leaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#1C382D] text-white rounded-feature p-6 sm:p-8 max-w-sm w-full text-center space-y-4 border border-white/10 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-[#B86D65]/20 text-[#B86D65] flex items-center justify-center mx-auto">
              <PhoneOff className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-heading">Leave Live Classroom?</h3>
            <p className="text-xs text-[#A7B9A8] leading-relaxed">
              Are you sure you want to exit your lesson with {teacher.name}? Your attendance and notes will be saved.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setLeaveModalOpen(false)}
                className="py-2.5 rounded-control bg-white/10 hover:bg-white/20 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLeave}
                className="py-2.5 rounded-control bg-[#B86D65] hover:bg-red-700 text-xs font-bold"
              >
                Yes, Leave
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Ended Summary Modal */}
      {lessonSummaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white text-[#252C28] rounded-feature p-8 max-w-md w-full text-center space-y-5 shadow-2xl border border-[#E7E6DE]">
            <div className="w-16 h-16 rounded-full bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center mx-auto shadow-card">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                Classroom Session Concluded
              </span>
              <h2 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-1">
                Alhamdulillah for Knowledge
              </h2>
              <p className="text-xs text-[#737B74] mt-1">
                Lesson with <span className="font-bold text-[#1C382D]">{teacher.name}</span> concluded smoothly.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-[#737B74]">Subject:</span>
                <span className="font-bold text-[#1C382D]">{booking?.subject || 'Tajweed Practice'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737B74]">Duration:</span>
                <span className="font-bold text-[#284C3D]">45 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737B74]">Teacher Notes:</span>
                <span className="text-[#1C382D] italic">"Adam showed remarkable focus on Surah Al-Fatiha."</span>
              </div>
            </div>

            <button
              onClick={() => navigate(role === 'teacher' ? '/teacher' : '/student')}
              className="w-full py-3 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center justify-center gap-2"
            >
              <span>Return to {role === 'teacher' ? 'Teacher' : 'Student'} Dashboard</span>
              <ArrowRight className="w-4 h-4 text-[#C5A66A]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

