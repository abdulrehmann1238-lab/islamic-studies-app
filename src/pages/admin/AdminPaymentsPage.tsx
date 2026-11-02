import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { CreditCard, DollarSign, TrendingUp, Sliders, ShieldCheck } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const { commissionRate, setCommissionRate, bookings } = useDemo();

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Escrow & Revenue Management
        </span>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-0.5">
          Commission Settings & Payout Architecture
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Adjust the marketplace service take-rate and inspect aggregate simulated ledger flows.
        </p>
      </div>

      {/* Commission Slider Card */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DE]">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-sm font-bold text-[#1C382D]">Platform Service Fee Take-Rate</h3>
          </div>
          <span className="text-base font-extrabold text-[#284C3D] bg-[#DDE8DF] px-3 py-1 rounded-full">
            {commissionRate}%
          </span>
        </div>

        <p className="text-xs text-[#737B74]">
          Adjusting this percentage immediately recalculates the booking checkout split breakdown in the marketplace and the net payouts displayed on teacher earnings dashboards.
        </p>

        <div>
          <input
            type="range"
            min="5"
            max="30"
            step="1"
            value={commissionRate}
            onChange={(e) => setCommissionRate(Number(e.target.value))}
            className="w-full accent-[#284C3D] cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-[#737B74] mt-1">
            <span>5% (Community Minimum)</span>
            <span>15% (Recommended Baseline)</span>
            <span>30% (Premium Managed)</span>
          </div>
        </div>

        <div className="p-3 bg-[#F4EDDC]/50 rounded-xl border border-[#C5A66A]/30 text-xs text-[#1C382D] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A66A]" />
          <span>Simulation Mode: On £20.00 lesson, Teacher receives £{(20 * (1 - commissionRate / 100)).toFixed(2)} and NOOR reserves £{(20 * (commissionRate / 100)).toFixed(2)}.</span>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Gross Processed GMV</span>
          <span className="text-2xl font-extrabold text-[#1C382D] block mt-1 font-heading">
            £84,200.00
          </span>
          <span className="text-[10px] text-[#648B70] font-semibold mt-0.5 block">Simulated Volume</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Platform Take Net</span>
          <span className="text-2xl font-extrabold text-[#284C3D] block mt-1 font-heading">
            £12,630.00
          </span>
          <span className="text-[10px] text-[#284C3D] font-semibold mt-0.5 block">At {commissionRate}% Split</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Teacher Disbursals</span>
          <span className="text-2xl font-extrabold text-[#1C382D] block mt-1 font-heading">
            £71,570.00
          </span>
          <span className="text-[10px] text-[#648B70] font-semibold mt-0.5 block">Total Paid Out</span>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Pending Escrow</span>
          <span className="text-2xl font-extrabold text-[#C5A66A] block mt-1 font-heading">
            £1,840.00
          </span>
          <span className="text-[10px] text-[#737B74] mt-0.5 block">Upcoming Lessons</span>
        </div>
      </div>
    </div>
  );
};

