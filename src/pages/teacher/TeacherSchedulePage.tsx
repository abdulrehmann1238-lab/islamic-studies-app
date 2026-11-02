import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { Calendar as CalendarIcon, Clock, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export const TeacherSchedulePage: React.FC = () => {
  const { teachers, updateTeacherProfile } = useDemo();
  const { showToast } = useToast();
  const currentTeacher = teachers[0]; // Aisha Rahman

  const [view, setView] = useState<'week' | 'month' | 'agenda'>('week');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [newTimeInput, setNewTimeInput] = useState('02:30 PM');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTimeInput) return;

    const currentSlots = [...currentTeacher.availabilitySlots];
    const dayEntry = currentSlots.find((s) => s.day === selectedDay);

    if (dayEntry) {
      if (!dayEntry.times.includes(newTimeInput)) {
        dayEntry.times.push(newTimeInput);
      }
    } else {
      currentSlots.push({ day: selectedDay, times: [newTimeInput] });
    }

    updateTeacherProfile(currentTeacher.id, { availabilitySlots: currentSlots });
    showToast({
      type: 'success',
      title: 'Slot Added',
      message: `Added ${newTimeInput} on ${selectedDay} to your public booking availability.`,
    });
  };

  const handleRemoveSlot = (day: string, time: string) => {
    const currentSlots = currentTeacher.availabilitySlots.map((s) => {
      if (s.day !== day) return s;
      return {
        ...s,
        times: s.times.filter((t) => t !== time),
      };
    });
    updateTeacherProfile(currentTeacher.id, { availabilitySlots: currentSlots });
    showToast({ type: 'info', title: `Removed ${time} slot from ${day}` });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            Availability & Calendar Slots
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Configure open teaching hours displayed to students in the public marketplace.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex bg-white p-1 rounded-control border border-[#E7E6DE]">
          {(['week', 'month', 'agenda'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-control capitalize transition-all ${
                view === v
                  ? 'bg-[#284C3D] text-white shadow-xs'
                  : 'text-[#737B74] hover:text-[#252C28]'
              }`}
            >
              {v} View
            </button>
          ))}
        </div>
      </div>

      {/* Add Slot Quick Form */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-5 shadow-subtle">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-3">
          Add Open Availability Window
        </h3>
        <form onSubmit={handleAddSlot} className="flex flex-wrap items-center gap-3">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="p-2 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] font-semibold text-[#1C382D]"
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={newTimeInput}
            onChange={(e) => setNewTimeInput(e.target.value)}
            placeholder="e.g. 03:00 PM"
            className="p-2 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] font-mono text-[#1C382D]"
          />

          <button
            type="submit"
            className="py-2 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Add Slot</span>
          </button>
        </form>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {days.map((day) => {
          const entry = currentTeacher.availabilitySlots.find((s) => s.day === day);
          const slots = entry ? entry.times : [];

          return (
            <div
              key={day}
              className="bg-white rounded-card border border-[#E7E6DE] p-4 shadow-subtle space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#E7E6DE]">
                <h4 className="text-xs font-bold text-[#1C382D]">{day}</h4>
                <span className="text-[10px] font-bold text-[#737B74]">
                  {slots.length} slots
                </span>
              </div>

              {slots.length === 0 ? (
                <p className="text-[11px] text-[#737B74] italic py-4 text-center">
                  Unavailable
                </p>
              ) : (
                <div className="space-y-1.5">
                  {slots.map((time) => (
                    <div
                      key={time}
                      className="p-2 rounded-lg bg-[#F8F7F2] border border-[#E7E6DE] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#284C3D]" />
                        <span className="font-semibold text-[#1C382D]">{time}</span>
                      </div>
                      <button
                        onClick={() => handleRemoveSlot(day, time)}
                        className="text-[#737B74] hover:text-[#B86D65] p-1"
                        title="Remove slot"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

