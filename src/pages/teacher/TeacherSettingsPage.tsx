import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { Settings, Shield, Bell, CreditCard } from 'lucide-react';

export const TeacherSettingsPage: React.FC = () => {
  const { showToast } = useToast();

  const [bankAccount, setBankAccount] = useState('GB92 BARC 2000 0012 3456 78');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [instantBooking, setInstantBooking] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Teacher Settings Saved',
      message: 'Payout and notification configurations updated.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Teaching Studio Settings
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Configure payout destination, booking policies, and notification reminders.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-card border border-[#E7E6DE] p-6 sm:p-8 shadow-card space-y-6">
        {/* Payout Details */}
        <div className="space-y-3 pb-5 border-b border-[#E7E6DE]">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-sm font-bold text-[#1C382D]">Payout Account (Simulated Demo IBAN)</h3>
          </div>
          <p className="text-xs text-[#737B74]">
            Weekly lesson funds are remitted to this account automatically every Friday.
          </p>
          <input
            type="text"
            value={bankAccount}
            onChange={(e) => setBankAccount(e.target.value)}
            className="w-full p-2.5 text-xs font-mono rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
        </div>

        {/* Booking Preferences */}
        <div className="space-y-3 pb-5 border-b border-[#E7E6DE]">
          <h3 className="text-sm font-bold text-[#1C382D]">Booking Preferences</h3>
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F2] cursor-pointer">
            <div>
              <span className="text-xs font-bold text-[#1C382D] block">
                Instant Demo Booking
              </span>
              <span className="text-[11px] text-[#737B74]">
                Automatically accept lessons booked within your available schedule slots.
              </span>
            </div>
            <input
              type="checkbox"
              checked={instantBooking}
              onChange={(e) => setInstantBooking(e.target.checked)}
              className="w-4 h-4 accent-[#284C3D]"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F2] cursor-pointer">
            <div>
              <span className="text-xs font-bold text-[#1C382D] block">
                Classroom Email Alerts
              </span>
              <span className="text-[11px] text-[#737B74]">
                Receive immediate email confirmations when a student books a session.
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 accent-[#284C3D]"
            />
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card"
        >
          Save Studio Settings
        </button>
      </form>
    </div>
  );
};

