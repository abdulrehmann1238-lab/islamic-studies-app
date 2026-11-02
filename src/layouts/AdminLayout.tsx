import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { RoleSwitcher } from '../components/common/RoleSwitcher';
import { useDemo } from '../context/DemoContext';
import { ShieldCheck, ExternalLink, Globe } from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { commissionRate } = useDemo();

  return (
    <div className="flex h-screen bg-[#F8F7F2] text-[#252C28] overflow-hidden">
      {/* Desktop Admin Sidebar */}
      <div className="hidden lg:block h-full">
        <AdminSidebar />
      </div>

      {/* Main Admin Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Admin Operational Top Bar */}
        <header className="h-16 px-6 bg-white border-b border-[#E7E6DE] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-bold text-[#737B74]">
              Platform Administration
            </span>
            <span className="hidden sm:inline-block text-[#E7E6DE]">|</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#284C3D] font-semibold bg-[#DDE8DF]/50 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Commission: {commissionRate}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/teachers"
              className="text-xs font-semibold text-[#737B74] hover:text-[#284C3D] flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Public Marketplace</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      <RoleSwitcher />
    </div>
  );
};

