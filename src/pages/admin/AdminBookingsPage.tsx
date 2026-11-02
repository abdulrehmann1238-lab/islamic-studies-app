import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Calendar, Search, Filter, X, ShieldCheck, Video, ExternalLink } from 'lucide-react';
import { Booking } from '../../types';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, commissionRate } = useDemo();
  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filtered = bookings.filter((b) => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            Live Booking Operations & Escrow
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Real-time audit log of all one-on-one sessions, platform splits, and classroom states.
          </p>
        </div>

        {/* Filter */}
        <div className="flex bg-white p-1 rounded-control border border-[#E7E6DE]">
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-bold rounded-control capitalize transition-all ${
                statusFilter === s
                  ? 'bg-[#284C3D] text-white shadow-xs'
                  : 'text-[#737B74] hover:text-[#252C28]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-card border border-[#E7E6DE] shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#F8F7F2] border-b border-[#E7E6DE] text-[#737B74] font-semibold">
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Instructor</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Scheduled Slot</th>
                <th className="py-3 px-4">Total Fee</th>
                <th className="py-3 px-4">Platform Fee ({commissionRate}%)</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E6DE]">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#F8F7F2]/40">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#284C3D]">
                    {b.bookingRef}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1C382D]">{b.studentName}</td>
                  <td className="py-3.5 px-4 text-[#252C28]">{b.teacherName}</td>
                  <td className="py-3.5 px-4">{b.subject}</td>
                  <td className="py-3.5 px-4 text-[#737B74]">
                    {b.date} • {b.time}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#1C382D]">
                    £{b.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-[#284C3D] font-semibold">
                    £{b.platformFee.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        b.status === 'upcoming'
                          ? 'bg-[#DDE8DF] text-[#1C382D]'
                          : b.status === 'completed'
                          ? 'bg-[#F4EDDC] text-[#C5A66A]'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-2.5 py-1 rounded border border-[#E7E6DE] text-xs font-semibold hover:bg-[#F8F7F2]"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Drawer */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E7E6DE]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A66A]">
                    Audit Record
                  </span>
                  <h3 className="text-base font-bold text-[#1C382D]">
                    Booking #{selectedBooking.bookingRef}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="p-1 rounded-lg text-[#737B74] hover:bg-[#F8F7F2]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F8F7F2] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#737B74]">Subject:</span>
                    <strong className="text-[#1C382D]">{selectedBooking.subject}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737B74]">Teacher:</span>
                    <strong className="text-[#1C382D]">{selectedBooking.teacherName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737B74]">Student:</span>
                    <strong className="text-[#1C382D]">{selectedBooking.studentName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737B74]">Date & Time:</span>
                    <strong className="text-[#284C3D]">{selectedBooking.date} • {selectedBooking.time}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F4EDDC]/50 border border-[#C5A66A]/40 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase text-[#C5A66A]">Split Breakdown</span>
                  <div className="flex justify-between">
                    <span className="text-[#737B74]">Gross Student Payment:</span>
                    <span className="font-bold text-[#1C382D]">£{selectedBooking.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737B74]">Platform Fee ({commissionRate}%):</span>
                    <span className="font-bold text-[#284C3D]">£{selectedBooking.platformFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-[#C5A66A]/30 pt-1">
                    <span className="text-[#737B74]">Teacher Payout:</span>
                    <span className="font-bold text-[#1C382D]">
                      £{(selectedBooking.totalAmount - selectedBooking.platformFee).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E6DE]">
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-full py-2.5 rounded-control bg-[#284C3D] text-white text-xs font-bold"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

