import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  LayoutDashboard,
  GraduationCap,
  Users,
  Calendar,
  Layers,
  Tag,
  CreditCard,
  BarChart2,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { teacherApplications } = useDemo();
  const pendingCount = teacherApplications.filter((a) => a.status === 'pending').length;

  const links = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Teachers & Apps', path: '/admin/teachers', icon: GraduationCap, badge: pendingCount > 0 ? pendingCount : null },
    { name: 'Student Roster', path: '/admin/students', icon: Users },
    { name: 'Booking Log', path: '/admin/bookings', icon: Calendar },
    { name: 'Learning CMS', path: '/admin/learning', icon: Layers },
    { name: 'Subject Categories', path: '/admin/categories', icon: Tag },
    { name: 'Payments & Split', path: '/admin/payments', icon: CreditCard },
    { name: 'Analytics & Reports', path: '/admin/reports', icon: BarChart2 },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#14241C] border-r border-white/10 flex flex-col h-full flex-shrink-0 text-white">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold shadow-card">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
            </svg>
          </div>
          <div>
            <span className="font-heading font-extrabold text-base tracking-wider text-white block leading-none">
              NOOR
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A66A]">
              Platform Admin
            </span>
          </div>
        </Link>
      </div>

      {/* Admin User Card */}
      <div className="p-3.5 mx-3 my-3 bg-white/5 rounded-card border border-white/10 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center font-bold">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-white truncate">Operations Portal</h4>
          <p className="text-[10px] text-[#A7B9A8]">Super Admin Control</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-control text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#284C3D] text-white shadow-card border border-[#C5A66A]/40'
                    : 'text-[#A7B9A8] hover:text-white hover:bg-white/5'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-[#C5A66A]" />
                <span>{link.name}</span>
              </div>
              {link.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#B86D65] text-white font-bold">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer info */}
      <div className="p-4 border-t border-white/10 text-[11px] text-[#A7B9A8]">
        <div className="flex items-center justify-between">
          <span>Demo Environment</span>
          <span className="text-[#648B70] font-bold">Live Synced</span>
        </div>
      </div>
    </aside>
  );
};

