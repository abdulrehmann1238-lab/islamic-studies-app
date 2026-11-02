import React, { useState } from 'react';
import { Teacher, Booking } from '../../types';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface BookingModalProps {
  teacher: Teacher | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ teacher, isOpen, onClose }) => {
  const { createBooking, commissionRate, studentProfile } = useDemo();
  const navigate = useNavigate();

  // Booking Wizard Step: 1 to 6
  const [step, setStep] = useState(1);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-04');
  const [selectedTime, setSelectedTime] = useState<string>('04:00 PM');
  const [selectedStudent, setSelectedStudent] = useState<string>('Adam (Age 10)');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  if (!isOpen || !teacher) return null;

  // Initialize defaults when opening
  if (!selectedSubject && teacher.specialities.length > 0) {
    setSelectedSubject(teacher.specialities[0]);
  }

  // Available days and time slots
  const availableSlots = [
    '09:00 AM',
    '10:30 AM',
    '02:00 PM',
    '03:30 PM',
    '04:30 PM',
    '06:00 PM',
  ];

  const handleNext = () => setStep((s) => Math.min(s + 1, 6));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const handleConfirm = () => {
    const booking = createBooking({
      studentId: studentProfile.id,
      studentName: selectedStudent,
      teacherId: teacher.id,
      teacherName: teacher.name,
      teacherAvatar: teacher.avatar,
      subject: selectedSubject,
      date: selectedDate,
      time: selectedTime,
      durationMinutes: 45,
      hourlyRate: teacher.hourlyRate,
      notes: notes || 'Tajweed articulation focus on throat and tongue letters.',
    });
    setConfirmedBooking(booking);
    setStep(6);
  };

  const handleFinish = (targetPath: string) => {
    onClose();
    setStep(1);
    setConfirmedBooking(null);
    navigate(targetPath);
  };

  const calculatedFee = Number(((teacher.hourlyRate * commissionRate) / 100).toFixed(2));
  const teacherPayout = Number((teacher.hourlyRate - calculatedFee).toFixed(2));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl bg-white rounded-feature shadow-2xl border border-[#E7E6DE] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 bg-[#284C3D] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={teacher.avatar}
              alt={teacher.name}
              className="w-10 h-10 rounded-xl object-cover border border-white/20"
            />
            <div>
              <h3 className="text-sm font-bold font-heading">Book a Lesson with {teacher.name}</h3>
              <p className="text-xs text-[#DDE8DF]">
                Step {step} of 5 {step === 6 ? '— Booking Complete' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 6 && (
          <div className="bg-[#F8F7F2] px-6 py-2 border-b border-[#E7E6DE] flex items-center justify-between text-[11px] font-semibold text-[#737B74]">
            <span className={step >= 1 ? 'text-[#284C3D] font-bold' : ''}>1. Subject</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#284C3D] font-bold' : ''}>2. Date</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#284C3D] font-bold' : ''}>3. Time</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#284C3D] font-bold' : ''}>4. Student</span>
            <span>→</span>
            <span className={step >= 5 ? 'text-[#284C3D] font-bold' : ''}>5. Review</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: Select Subject */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm font-bold text-[#1C382D]">Choose the Subject of Instruction:</h4>
              <p className="text-xs text-[#737B74]">
                Ustadhah {teacher.name} is certified to teach the following subjects:
              </p>
              <div className="space-y-2.5 pt-2">
                {teacher.specialities.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setSelectedSubject(spec)}
                    className={`w-full text-left p-3.5 rounded-card border transition-all flex items-center justify-between ${
                      selectedSubject === spec
                        ? 'border-[#284C3D] bg-[#DDE8DF]/40 ring-1 ring-[#284C3D]'
                        : 'border-[#E7E6DE] hover:bg-[#F8F7F2]'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-[#1C382D]">{spec}</p>
                      <p className="text-[11px] text-[#737B74] mt-0.5">
                        45-minute interactive one-to-one session with live board
                      </p>
                    </div>
                    {selectedSubject === spec && (
                      <CheckCircle2 className="w-5 h-5 text-[#284C3D]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Select Date */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm font-bold text-[#1C382D]">Select Lesson Date:</h4>
              <p className="text-xs text-[#737B74]">
                Choose an upcoming day that fits your family's routine.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  { label: 'Tomorrow', date: '2026-11-04', day: 'Wednesday' },
                  { label: 'In 2 Days', date: '2026-11-05', day: 'Thursday' },
                  { label: 'This Friday', date: '2026-11-06', day: 'Friday' },
                  { label: 'This Saturday', date: '2026-11-07', day: 'Saturday' },
                  { label: 'This Sunday', date: '2026-11-08', day: 'Sunday' },
                  { label: 'Next Monday', date: '2026-11-09', day: 'Monday' },
                ].map((d) => (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-3 rounded-card border text-left transition-all ${
                      selectedDate === d.date
                        ? 'border-[#284C3D] bg-[#DDE8DF]/40 ring-1 ring-[#284C3D]'
                        : 'border-[#E7E6DE] hover:bg-[#F8F7F2]'
                    }`}
                  >
                    <span className="text-[10px] font-semibold text-[#737B74] block uppercase">
                      {d.label}
                    </span>
                    <span className="text-xs font-bold text-[#1C382D] block mt-0.5">{d.day}</span>
                    <span className="text-[11px] text-[#284C3D] font-mono">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Select Time */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm font-bold text-[#1C382D]">Choose Lesson Start Time:</h4>
              <p className="text-xs text-[#737B74]">
                Available slots for {selectedDate} (Local UK / Europe Time):
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {availableSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-card border text-center transition-all flex items-center justify-center gap-1.5 ${
                      selectedTime === time
                        ? 'border-[#284C3D] bg-[#284C3D] text-white shadow-card font-bold'
                        : 'border-[#E7E6DE] text-[#252C28] hover:bg-[#F8F7F2]'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs">{time}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#737B74] italic mt-2">
                * All lessons are 45 minutes of live interactive teaching + 5 minutes teacher recap.
              </p>
            </div>
          )}

          {/* STEP 4: Select Student */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm font-bold text-[#1C382D]">Who is attending this lesson?</h4>
              <p className="text-xs text-[#737B74]">
                Select the child or learner profile associated with your family account:
              </p>
              <div className="space-y-2.5 pt-2">
                {[
                  { name: 'Adam (Age 10)', level: 'Level 2: Quran Reader', avatar: studentProfile.avatar },
                  { name: 'Maryam (Age 8)', level: 'Level 1: Arabic Phonics', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200' },
                ].map((st) => (
                  <button
                    key={st.name}
                    type="button"
                    onClick={() => setSelectedStudent(st.name)}
                    className={`w-full p-3.5 rounded-card border text-left flex items-center justify-between transition-all ${
                      selectedStudent === st.name
                        ? 'border-[#284C3D] bg-[#DDE8DF]/40 ring-1 ring-[#284C3D]'
                        : 'border-[#E7E6DE] hover:bg-[#F8F7F2]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={st.avatar}
                        alt={st.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#1C382D]">{st.name}</p>
                        <p className="text-[11px] text-[#737B74]">{st.level}</p>
                      </div>
                    </div>
                    {selectedStudent === st.name && (
                      <CheckCircle2 className="w-5 h-5 text-[#284C3D]" />
                    )}
                  </button>
                ))}
              </div>

              {/* Learning goal / notes */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-[#1C382D] mb-1">
                  Learning Notes for {teacher.name} (Optional):
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Please focus on the articulation of Ayn and Haa during the opening verses..."
                  className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 5: Review & Checkout Split Breakdown */}
          {step === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h4 className="text-sm font-bold text-[#1C382D]">Review Lesson Booking Details</h4>

              <div className="p-4 rounded-card bg-[#F8F7F2] border border-[#E7E6DE] space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-[#E7E6DE]">
                  <span className="text-[#737B74]">Teacher</span>
                  <span className="font-bold text-[#1C382D]">{teacher.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7E6DE]">
                  <span className="text-[#737B74]">Subject</span>
                  <span className="font-bold text-[#1C382D]">{selectedSubject}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7E6DE]">
                  <span className="text-[#737B74]">Student</span>
                  <span className="font-bold text-[#1C382D]">{selectedStudent}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7E6DE]">
                  <span className="text-[#737B74]">Date & Time</span>
                  <span className="font-bold text-[#284C3D]">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E7E6DE]">
                  <span className="text-[#737B74]">Lesson Duration</span>
                  <span className="font-bold text-[#1C382D]">45 Minutes</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-card bg-[#F4EDDC]/40 border border-[#C5A66A]/40 space-y-2 text-xs">
                <div className="flex justify-between text-[#737B74]">
                  <span>Teacher Rate ({teacher.hourlyRate}/hr)</span>
                  <span className="font-medium text-[#252C28]">£{teacherPayout.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#737B74]">
                  <span>Platform Service & Safety Fee ({commissionRate}%)</span>
                  <span className="font-medium text-[#252C28]">£{calculatedFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#C5A66A]/30 text-sm font-bold text-[#1C382D]">
                  <span>Total Due</span>
                  <span className="text-base text-[#284C3D]">£{teacher.hourlyRate.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 rounded-control bg-[#DDE8DF]/50 border border-[#A7B9A8]/50 flex items-center gap-2.5 text-xs text-[#1C382D]">
                <ShieldCheck className="w-4 h-4 text-[#284C3D] flex-shrink-0" />
                <span className="font-medium">
                  Demo booking — no real payment card processed.
                </span>
              </div>
            </div>
          )}

          {/* STEP 6: Confirmation Receipt */}
          {step === 6 && confirmedBooking && (
            <div className="text-center py-4 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center mx-auto shadow-card">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold text-[#C5A66A] tracking-wider uppercase">
                  Booking Confirmed
                </span>
                <h3 className="text-xl font-extrabold text-[#1C382D] font-heading mt-1">
                  Alhamdulillah! Your Lesson Is Booked
                </h3>
                <p className="text-xs text-[#737B74] mt-1">
                  We have added this lesson to your Student Portal and notified {teacher.name}.
                </p>
              </div>

              <div className="p-4 rounded-card bg-[#F8F7F2] border border-[#E7E6DE] text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#737B74]">Booking Ref:</span>
                  <span className="font-mono font-bold text-[#284C3D]">{confirmedBooking.bookingRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B74]">Subject:</span>
                  <span className="font-bold text-[#1C382D]">{confirmedBooking.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B74]">Date & Time:</span>
                  <span className="font-bold text-[#1C382D]">
                    {confirmedBooking.date} • {confirmedBooking.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737B74]">Status:</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold text-[10px]">
                    Confirmed & Scheduled
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 max-w-sm mx-auto">
                <button
                  onClick={() => handleFinish(`/classroom/${confirmedBooking.id}`)}
                  className="py-2.5 px-3 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Enter Live Classroom</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C5A66A]" />
                </button>
                <button
                  onClick={() => handleFinish('/student')}
                  className="py-2.5 px-3 rounded-control border border-[#E7E6DE] bg-white hover:bg-[#F8F7F2] text-[#252C28] text-xs font-semibold transition-all"
                >
                  View in Student Portal
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        {step < 6 && (
          <div className="p-4 bg-[#F8F7F2] border-t border-[#E7E6DE] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrev}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#737B74] hover:text-[#252C28] px-3 py-2 rounded-control"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#284C3D] hover:bg-[#1C382D] px-4 py-2.5 rounded-control shadow-card transition-all"
              >
                Continue <ArrowRight className="w-3.5 h-3.5 text-[#C5A66A]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleConfirm}
                className="flex items-center gap-2 text-xs font-bold text-white bg-[#284C3D] hover:bg-[#1C382D] px-5 py-2.5 rounded-control shadow-elevated transition-all"
              >
                <span>Confirm Booking (£{teacher.hourlyRate.toFixed(2)})</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

