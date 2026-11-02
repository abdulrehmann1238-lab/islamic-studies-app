import React, { useState } from 'react';
import { Check, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const PricingPage: React.FC = () => {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'premium'>('premium');

  const handleSelectPlan = (plan: 'free' | 'premium') => {
    setSelectedPlan(plan);
    showToast({
      type: 'success',
      title: `${plan === 'premium' ? 'Premium Learning Pass' : 'Free Learning Pass'} Selected`,
      message: 'Demo subscription state updated. No actual payment method billed.',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Transparent Plans
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C382D] font-heading mt-1">
          Simple, family-first pricing
        </h1>
        <p className="text-xs sm:text-sm text-[#737B74] mt-2">
          Pay per 1-on-1 teacher lesson or unlock unlimited gamified micro-learning for your entire household.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-feature border border-[#E7E6DE] p-8 shadow-card flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-[#1C382D]">Standard Access</h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#F8F7F2] text-[#737B74]">
                Always Free
              </span>
            </div>
            <p className="text-xs text-[#737B74] mt-2">
              Essential teacher booking and foundational Arabic letter lessons.
            </p>

            <div className="mt-6 mb-8">
              <span className="text-4xl font-extrabold text-[#1C382D] font-heading">£0</span>
              <span className="text-xs text-[#737B74]"> / forever</span>
            </div>

            <ul className="space-y-3 text-xs text-[#252C28]">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#648B70]" />
                <span>Search and book any verified teacher</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#648B70]" />
                <span>Pay only per booked lesson (£14–£25/hr)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#648B70]" />
                <span>Full access to Live Virtual Classroom & Board</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#648B70]" />
                <span>First 4 introductory micro-lessons included</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('free')}
            className={`w-full py-3 rounded-control text-xs font-bold border transition-all ${
              selectedPlan === 'free'
                ? 'bg-[#284C3D] text-white border-[#284C3D]'
                : 'bg-white hover:bg-[#F8F7F2] text-[#1C382D] border-[#E7E6DE]'
            }`}
          >
            {selectedPlan === 'free' ? 'Current Demo Plan' : 'Select Free Access'}
          </button>
        </div>

        {/* Premium Learning Subscription */}
        <div className="bg-[#1C382D] text-white rounded-feature border border-[#284C3D] p-8 shadow-elevated flex flex-col justify-between space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#C5A66A] text-[#1C382D] text-[10px] font-bold uppercase tracking-wider px-4 py-1 rounded-bl-xl">
            Most Popular
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">NOOR Family Premium</h3>
            </div>
            <p className="text-xs text-[#DDE8DF] mt-2">
              Unlimited gamified micro-learning, infinite hearts, and detailed phonetics analytics.
            </p>

            <div className="mt-6 mb-8">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white font-heading">£8.99</span>
                <span className="text-xs text-[#A7B9A8]"> / month</span>
              </div>
              <span className="text-[10px] text-[#C5A66A] font-semibold mt-0.5 block">
                Covers up to 4 children in one family
              </span>
            </div>

            <ul className="space-y-3 text-xs text-white/90">
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A66A]" />
                <span>Unlimited micro-lessons across all 50+ modules</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A66A]" />
                <span>Unlimited Hearts (practice without interruption)</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A66A]" />
                <span>Parental weekly progress reports & audio playback</span>
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#C5A66A]" />
                <span>10% platform discount on all teacher bookings</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => handleSelectPlan('premium')}
            className="w-full py-3 rounded-control text-xs font-bold bg-[#C5A66A] hover:bg-white text-[#1C382D] shadow-card transition-all flex items-center justify-center gap-2"
          >
            <span>{selectedPlan === 'premium' ? 'Active Demo Premium' : 'Upgrade to Family Premium'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto mt-12 p-4 rounded-xl bg-white border border-[#E7E6DE] text-center text-xs text-[#737B74] flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#648B70]" />
        <span>Demonstration billing simulated with zero payment transaction.</span>
      </div>
    </div>
  );
};

