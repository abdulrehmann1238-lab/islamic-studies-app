import React from 'react';
import { BarChart2, TrendingUp, Users, Award, BookOpen } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export const AdminReportsPage: React.FC = () => {
  const retentionData = [
    { week: 'Week 1', rate: 94 },
    { week: 'Week 2', rate: 89 },
    { week: 'Week 3', rate: 86 },
    { week: 'Week 4', rate: 84 },
    { week: 'Week 5', rate: 88 },
    { week: 'Week 6', rate: 91 },
  ];

  const subjectPopularity = [
    { subject: 'Tajweed', students: 480 },
    { subject: 'Quran Reading', students: 560 },
    { subject: 'Quran Hifz', students: 310 },
    { subject: 'Arabic Lang', students: 390 },
    { subject: 'Fiqh', students: 210 },
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Pedagogical & Business Analytics
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Detailed breakdown of learner retention, subject demand, and curriculum throughput.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Subject Demand */}
        <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-[#1C382D]">Subject Enrollment Distribution</h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectPopularity}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E6DE" />
                <XAxis dataKey="subject" stroke="#737B74" fontSize={11} tickLine={false} />
                <YAxis stroke="#737B74" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C382D',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="students" fill="#284C3D" radius={[6, 6, 0, 0]} name="Active Learners" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Retention Line Chart */}
        <div className="bg-white rounded-card border border-[#E7E6DE] p-6 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-[#1C382D]">Student 6-Week Learning Retention (%)</h3>
          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={retentionData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E7E6DE" />
                <XAxis dataKey="week" stroke="#737B74" fontSize={11} tickLine={false} />
                <YAxis domain={[70, 100]} stroke="#737B74" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1C382D',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                  formatter={(val) => [`${val}%`, 'Retention Rate']}
                />
                <Line type="monotone" dataKey="rate" stroke="#C5A66A" strokeWidth={3} dot={{ r: 4, fill: '#284C3D' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

