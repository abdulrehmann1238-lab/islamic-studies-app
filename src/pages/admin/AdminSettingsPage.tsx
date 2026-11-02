import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { useToast } from '../../context/ToastContext';
import { Settings, ShieldCheck, RotateCcw } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { resetDemoData } = useDemo();
  const { showToast } = useToast();

  const [platformName, setPlatformName] = useState('NOOR — Islamic Learning');
  const [supportEmail, setSupportEmail] = useState('hello@noor-learning.demo');
  const [autoApproveVerified, setAutoApproveVerified] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast({
      type: 'success',
      title: 'Platform System Settings Saved',
      message: 'Global configuration updated for all tenants.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Platform Configuration & Operations
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Global brand identity parameters, moderation thresholds, and reset controls.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-card border border-[#E7E6DE] p-6 sm:p-8 shadow-card space-y-6">
        <div className="space-y-4 pb-5 border-b border-[#E7E6DE]">
          <h3 className="text-sm font-bold text-[#1C382D]">General Branding & Support</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#1C382D] mb-1">Platform Brand Name</label>
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#1C382D] mb-1">Inquiry Support Email</label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Moderation Policies */}
        <div className="space-y-3 pb-5 border-b border-[#E7E6DE]">
          <h3 className="text-sm font-bold text-[#1C382D]">Educator Onboarding Policies</h3>
          <label className="flex items-center justify-between p-3 rounded-xl bg-[#F8F7F2] cursor-pointer">
            <div>
              <span className="text-xs font-bold text-[#1C382D] block">
                Manual Verification Gate
              </span>
              <span className="text-[11px] text-[#737B74]">
                Require Super Admin manual review of Ijazah and identity before listing teachers publicly.
              </span>
            </div>
            <input
              type="checkbox"
              checked={!autoApproveVerified}
              onChange={(e) => setAutoApproveVerified(!e.target.checked)}
              className="w-4 h-4 accent-[#284C3D]"
            />
          </label>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card"
          >
            Save Global Settings
          </button>

          <button
            type="button"
            onClick={resetDemoData}
            className="px-4 py-2.5 rounded-control border border-[#B86D65] text-[#B86D65] hover:bg-red-50 text-xs font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Entire Demo State</span>
          </button>
        </div>
      </form>
    </div>
  );
};

