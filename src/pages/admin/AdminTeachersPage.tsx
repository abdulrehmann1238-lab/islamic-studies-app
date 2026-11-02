import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  ExternalLink,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';

export const AdminTeachersPage: React.FC = () => {
  const { teachers, teacherApplications, updateApplicationStatus } = useDemo();

  const [activeTab, setActiveTab] = useState<'applications' | 'active'>('applications');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredApps = teacherApplications.filter((app) => {
    if (statusFilter !== 'all' && app.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        app.fullName.toLowerCase().includes(q) ||
        app.country.toLowerCase().includes(q) ||
        app.specialities.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const filteredActiveTeachers = teachers.filter((t) => {
    if (search) {
      const q = search.toLowerCase();
      return (
        t.name.toLowerCase().includes(q) ||
        t.specialities.some((s) => s.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
            Educator Vetting & Directory Management
          </h1>
          <p className="text-xs text-[#737B74] mt-1">
            Review submitted instructor applications, inspect Ijazahs, and manage active faculty credentials.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-white p-1 rounded-control border border-[#E7E6DE]">
          <button
            onClick={() => setActiveTab('applications')}
            className={`px-4 py-1.5 text-xs font-bold rounded-control transition-all ${
              activeTab === 'applications'
                ? 'bg-[#284C3D] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#252C28]'
            }`}
          >
            Applications ({teacherApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-1.5 text-xs font-bold rounded-control transition-all ${
              activeTab === 'active'
                ? 'bg-[#284C3D] text-white shadow-xs'
                : 'text-[#737B74] hover:text-[#252C28]'
            }`}
          >
            Active Faculty ({teachers.length})
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 bg-white rounded-card border border-[#E7E6DE] flex flex-col sm:flex-row gap-3 items-center justify-between shadow-subtle">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#737B74] absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search educator or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
        </div>

        {activeTab === 'applications' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#737B74]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-1.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] text-[#252C28] font-semibold"
            >
              <option value="all">All Applications</option>
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}
      </div>

      {/* Applications Table / Cards */}
      {activeTab === 'applications' ? (
        <div className="space-y-4">
          {filteredApps.length === 0 ? (
            <div className="p-12 bg-white rounded-card border border-[#E7E6DE] text-center text-xs text-[#737B74]">
              No applications match this filter criteria.
            </div>
          ) : (
            filteredApps.map((app) => (
              <div
                key={app.id}
                className="p-6 rounded-card bg-white border border-[#E7E6DE] shadow-subtle flex flex-col lg:flex-row lg:items-center justify-between gap-6"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-[#1C382D]">{app.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F8F7F2] text-[#737B74] font-medium">
                      {app.country} • {app.gender}
                    </span>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        app.status === 'pending'
                          ? 'bg-[#F4EDDC] text-[#C5A66A]'
                          : app.status === 'approved'
                          ? 'bg-[#DDE8DF] text-[#1C382D]'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <p className="text-xs text-[#737B74] leading-relaxed">
                    Bio: "{app.bio}"
                  </p>

                  <div className="text-xs text-[#284C3D] font-medium flex flex-wrap gap-4 pt-1">
                    <span>Subjects: <strong>{app.specialities.join(', ')}</strong></span>
                    <span>Rate: <strong>£{app.hourlyRate}/hr</strong></span>
                    <span>Certifications: <em>{app.certifications}</em></span>
                  </div>
                </div>

                {/* Approval / Rejection Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {app.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'approved')}
                        className="py-2 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#C5A66A]" />
                        <span>Approve Application</span>
                      </button>
                      <button
                        onClick={() => updateApplicationStatus(app.id, 'rejected')}
                        className="py-2 px-3 rounded-control border border-[#B86D65] text-[#B86D65] hover:bg-red-50 text-xs font-semibold"
                      >
                        Reject
                      </button>
                    </>
                  ) : app.status === 'approved' ? (
                    <span className="text-xs font-bold text-[#648B70] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Live in Marketplace
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#B86D65] flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Application Rejected
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* Active Teachers Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActiveTeachers.map((t) => (
            <div
              key={t.id}
              className="p-5 rounded-card bg-white border border-[#E7E6DE] shadow-subtle space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-[#1C382D]">{t.name}</h3>
                    <p className="text-[11px] text-[#737B74]">{t.title}</p>
                    <span className="text-[11px] font-bold text-[#284C3D]">
                      £{t.hourlyRate}/hr • ★ {t.rating.toFixed(2)}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[#737B74] line-clamp-2">{t.bio}</p>
              </div>

              <div className="pt-3 border-t border-[#E7E6DE] flex justify-between items-center text-xs">
                <span className="text-[#648B70] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
                <Link
                  to={`/teachers/${t.id}`}
                  className="font-bold text-[#284C3D] hover:underline flex items-center gap-1"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

