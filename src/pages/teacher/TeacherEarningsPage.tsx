import React from 'react';
import { useDemo } from '../../context/DemoContext';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Download,
  ShieldCheck,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const TeacherEarningsPage: React.FC = () => {
  const { commissionRate } = useDemo();

  const monthlyEarningsData = [
    { month: 'Jun', earnings: 420 },
    { month: 'Jul', earnings: 510 },
    { month: 'Aug', earnings: 480 },
    { month: 'Sep', earnings: 620 },
    { month: 'Oct', earnings: 740 },
    { month: 'Nov (Current)', earnings: 384 },
  ];

  const recentTransactions = [
    {
      id: 'tx-1',
      date: '02 Nov 2026',
      student: 'Adam (Tariq Ahmed)',
      subject: 'Tajweed & Quran Recitation',
      gross: 18.0,
      fee: 2.7,
      net: 15.3,
      status: 'Ready for payout',
    },
    {
      id: 'tx-2',
      date: '30 Oct 2026',
      student: 'Maryam Ali',
      subject: 'Arabic Phonics',
      gross: 18.0,
      fee: 2.7,
      net: 15.3,
      status: 'Paid',
    },
    {
      id: 'tx-3',
      date: '28 Oct 2026',
      student: 'Zayd Patel',
      subject: 'Quran Memorisation',
      gross: 18.0,
      fee: 2.7,
      net: 15.3,
      status: 'Paid',
    },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Financial Ledger
        </span>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading mt-0.5">
          Earnings & Platform Payouts
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Review net lesson receipts, automated commission splits, and historical statements.
        </p>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Total Net Earnings</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              £3,154.00
            </span>
          </div>
          <span className="text-[10px] text-[#648B70] font-semibold mt-1 block">
            +18% from last month
          </span>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Pending Next Payout</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-[#284C3D] font-heading">
              £384.50
            </span>
          </div>
          <span className="text-[10px] text-[#737B74] mt-1 block">
            Scheduled for Friday
          </span>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Platform Service Fee</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              {commissionRate}%
            </span>
          </div>
          <span className="text-[10px] text-[#737B74] mt-1 block">
            Includes Classroom & Video Board
          </span>
        </div>

        <div className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-xs text-[#737B74]">Completed Lessons</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-extrabold text-[#1C382D] font-heading">
              420
            </span>
          </div>
          <span className="text-[10px] text-[#648B70] font-semibold mt-1 block">
            100% completion rate
          </span>
        </div>
      </div>

      {/* Monthly Chart */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
        <h3 className="text-sm font-bold text-[#1C382D]">Monthly Payout Growth (£ GBP)</h3>
        <div className="h-64 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEarningsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E6DE" />
              <XAxis dataKey="month" stroke="#737B74" fontSize={11} tickLine={false} />
              <YAxis stroke="#737B74" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1C382D',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(val) => [`£${val}`, 'Net Earnings']}
              />
              <Bar dataKey="earnings" fill="#284C3D" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#1C382D]">Recent Completed Sessions</h3>
          <span className="text-xs text-[#737B74]">All figures illustrative demo data</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#E7E6DE] text-[#737B74] font-semibold">
                <th className="py-2.5">Date</th>
                <th className="py-2.5">Student</th>
                <th className="py-2.5">Subject</th>
                <th className="py-2.5">Gross</th>
                <th className="py-2.5">Platform Fee ({commissionRate}%)</th>
                <th className="py-2.5">Net Payout</th>
                <th className="py-2.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E6DE]">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F8F7F2]/60">
                  <td className="py-3 text-[#737B74] font-mono">{tx.date}</td>
                  <td className="py-3 font-bold text-[#1C382D]">{tx.student}</td>
                  <td className="py-3 text-[#252C28]">{tx.subject}</td>
                  <td className="py-3 font-medium">£{tx.gross.toFixed(2)}</td>
                  <td className="py-3 text-[#737B74]">£{tx.fee.toFixed(2)}</td>
                  <td className="py-3 font-bold text-[#284C3D]">£{tx.net.toFixed(2)}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold text-[10px]">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

