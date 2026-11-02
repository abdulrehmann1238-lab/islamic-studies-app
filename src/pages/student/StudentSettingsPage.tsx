import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { Shield, Bell, User, Clock, CheckCircle2, Lock } from 'lucide-react';

export const StudentSettingsPage: React.FC = () => {
  const { studentProfile } = useDemo();
  const { showToast } = useToast();

  const [name, setName] = useState(studentProfile.name);
  const [parentName, setParentName] = useState(studentProfile.parentName);
  const [age, setAge] = useState(studentProfile.age);
  const [dailyGoal, setDailyGoal] = useState(studentProfile.dailyGoalXp);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [weekendPractice, setWeekendPractice] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Parent Settings Saved',
      message: 'Daily goals and notifications preferences updated.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Family Account
        </span>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-0.5">
          Parent Controls & Learner Settings
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Manage learner profile details, daily XP goals, and safety preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Child Profile Section */}
        <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E7E6DE]">
            <User className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-sm font-bold text-[#1C382D]">Learner Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C382D] mb-1">Student First Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1C382D] mb-1">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1C382D] mb-1">Parent / Guardian Name</label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Daily Goal Slider */}
        <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DE]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#284C3D]" />
              <h3 className="text-sm font-bold text-[#1C382D]">Daily Practice Target</h3>
            </div>
            <span className="text-xs font-bold text-[#284C3D]">{dailyGoal} XP / Day</span>
          </div>

          <div>
            <input
              type="range"
              min="20"
              max="100"
              step="10"
              value={dailyGoal}
              onChange={(e) => setDailyGoal(Number(e.target.value))}
              className="w-full accent-[#284C3D] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#737B74] mt-1">
              <span>Casual (20 XP / ~5m)</span>
              <span>Regular (50 XP / ~12m)</span>
              <span>Intensive (100 XP / ~25m)</span>
            </div>
          </div>
        </div>

        {/* Safety & Notifications */}
        <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E7E6DE]">
            <Shield className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-sm font-bold text-[#1C382D]">Safety & Parent Supervisions</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F2] cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#1C382D] block">
                  Parent Lesson Attendance Alerts
                </span>
                <span className="text-[11px] text-[#737B74]">
                  Send SMS / Email reminders 30 minutes before live teacher classes begin.
                </span>
              </div>
              <input
                type="checkbox"
                checked={notificationsEnabled}
                onChange={(e) => setNotificationsEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#284C3D]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F2] cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#1C382D] block">
                  Weekend Learning Streaks
                </span>
                <span className="text-[11px] text-[#737B74]">
                  Maintain streak count even if practice is skipped on Saturdays and Sundays.
                </span>
              </div>
              <input
                type="checkbox"
                checked={weekendPractice}
                onChange={(e) => setWeekendPractice(e.target.checked)}
                className="w-4 h-4 accent-[#284C3D]"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card transition-all"
        >
          Save Parent Settings
        </button>
      </form>
    </div>
  );
};

