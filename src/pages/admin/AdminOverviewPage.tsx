import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import {
  Users,
  GraduationCap,
  Calendar,
  Layers,
  DollarSign,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const AdminOverviewPage: React.FC = () => {
  const { teachers, teacherApplications, bookings, commissionRate, courses } = useDemo();

  const pendingApps = teacherApplications.filter((a) => a.status === 'pending');

  const bookingGrowthData = [
    { month: 'Jun', bookings: 120, revenue: 1800 },
    { month: 'Jul', bookings: 155, revenue: 2325 },
    { month: 'Aug', bookings: 190, revenue: 2850 },
    { month: 'Sep', bookings: 245, revenue: 3675 },
    { month: 'Oct', bookings: 310, revenue: 4650 },
    { month: 'Nov', bookings: 380, revenue: 5700 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Executive Operations
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1C382D] font-heading mt-0.5">
          Platform Overview & KPI Metrics
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Monitor marketplace bookings, educator credentialing, curriculum health, and platform splits.
        </p>
      </div>

      {/* 6 High-Level Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Students */}
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-[11px] text-[#737B74] font-medium">Total Students</span>
          <span className="text-xl font-extrabold text-[#1C382D] block mt-1 font-heading">
            1,420
          </span>
          <span className="text-[10px] text-[#648B70] font-semibold mt-0.5 block">+14% this month</span>
        </div>

        {/* Active Teachers */}
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-[11px] text-[#737B74] font-medium">Active Teachers</span>
          <span className="text-xl font-extrabold text-[#1C382D] block mt-1 font-heading">
            {teachers.length}
          </span>
          <span className="text-[10px] text-[#284C3D] font-semibold mt-0.5 block">100% verified</span>
        </div>

        {/* Pending Applications */}
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-[11px] text-[#737B74] font-medium">Pending Apps</span>
          <span className="text-xl font-extrabold text-[#B86D65] block mt-1 font-heading">
            {pendingApps.length}
          </span>
          <Link to="/admin/teachers" className="text-[10px] text-[#B86D65] hover:underline font-bold mt-0.5 block">
            Review queue →
          </Link>
        </div>

        {/* Total Bookings */}
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-[11px] text-[#737B74] font-medium">Total Bookings</span>
          <span className="text-xl font-extrabold text-[#1C382D] block mt-1 font-heading">
            842
          </span>
          <span className="text-[10px] text-[#648B70] font-semibold mt-0.5 block">Live tracked</span>
        </div>

        {/* Lessons Completed */}
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-[11px] text-[#737B74] font-medium">Curriculum Units</span>
          <span className="text-xl font-extrabold text-[#1C382D] block mt-1 font-heading">
            50+
          </span>
          <Link to="/admin/learning" className="text-[10px] text-[#284C3D] hover:underline font-bold mt-0.5 block">
            Manage CMS →
          </Link>
        </div>

        {/* Platform Revenue */}
        <div className="p-4 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <span className="text-[11px] text-[#737B74] font-medium">Est. Platform Fee</span>
          <span className="text-xl font-extrabold text-[#284C3D] block mt-1 font-heading">
            £12,630
          </span>
          <span className="text-[10px] text-[#C5A66A] font-semibold mt-0.5 block">({commissionRate}% split)</span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1C382D]">Monthly Platform Booking Volume</h3>
            <span className="text-xs text-[#737B74]">GBP Gross Volume</span>
          </div>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={bookingGrowthData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#284C3D" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#284C3D" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E6DE" />
                <XAxis dataKey="month" stroke="#737B74" fontSize={11} tickLine={false} />
                <YAxis stroke="#737B74" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#14241C',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val) => [`${val} Bookings`, 'Total']}
                />
                <Area type="monotone" dataKey="bookings" stroke="#284C3D" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pending Teacher Queue Preview */}
        <div className="lg:col-span-4 bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E7E6DE]">
              <h3 className="text-sm font-bold text-[#1C382D]">Teacher Vetting Queue</h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-bold">
                {pendingApps.length} Pending
              </span>
            </div>

            {pendingApps.length === 0 ? (
              <p className="text-xs text-[#737B74] py-8 text-center">
                All teacher applications have been reviewed!
              </p>
            ) : (
              <div className="space-y-2.5">
                {pendingApps.slice(0, 3).map((app) => (
                  <div key={app.id} className="p-3 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1C382D]">{app.fullName}</span>
                      <span className="text-[10px] text-[#737B74]">{app.submittedAt}</span>
                    </div>
                    <p className="text-[11px] text-[#737B74] line-clamp-1">
                      {app.specialities.join(', ')} • {app.country}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/admin/teachers"
            className="w-full py-2.5 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C5A66A]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

