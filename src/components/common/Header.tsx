import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import { NotificationDrawer } from './NotificationDrawer';
import { AuthModal } from './AuthModal';
import {
  Menu,
  X,
  Bell,
  Sparkles,
  User,
  GraduationCap,
  LayoutDashboard,
} from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, notifications } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDrawerOpen, setNotifDrawerOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Find Teachers', path: '/teachers' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'Learning', path: '/learn' },
    { name: 'For Teachers', path: '/become-a-teacher' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(path.replace('/#', ''));
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(path.replace('/#', ''));
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const getDashboardRoute = () => {
    if (role === 'teacher') return '/teacher';
    if (role === 'admin') return '/admin';
    return '/student';
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-[#F8F7F2]/90 backdrop-blur-md border-b border-[#E7E6DE] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Brand Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-10 h-10 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center shadow-card group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 8.6L21.5 9.5L16.2 14.3L17.8 21.3L12 17.8L6.2 21.3L7.8 14.3L2.5 9.5L9.6 8.6L12 2Z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-wider text-[#1C382D] leading-none">
                NOOR
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#C5A66A] mt-0.5">
                Islamic Learning
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/teachers'
                  ? location.pathname.startsWith('/teachers')
                  : link.path === '/learn'
                  ? location.pathname.startsWith('/learn')
                  : link.path === '/become-a-teacher'
                  ? location.pathname === '/become-a-teacher'
                  : false;

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-sm font-medium transition-colors hover:text-[#284C3D] relative py-1 ${
                    isActive ? 'text-[#284C3D] font-bold' : 'text-[#737B74]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#284C3D] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-3.5">
            {/* Notification Bell */}
            <button
              onClick={() => setNotifDrawerOpen(true)}
              className="relative p-2.5 rounded-full text-[#252C28] hover:bg-[#E7E6DE] transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-[#284C3D]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C5A66A]" />
              )}
            </button>

            {/* Quick Switch to Active Portal */}
            <Link
              to={getDashboardRoute()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-control text-xs font-semibold text-[#1C382D] bg-[#DDE8DF]/60 hover:bg-[#DDE8DF] border border-[#A7B9A8]/40 transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#284C3D]" />
              <span>{role === 'student' ? 'Student Portal' : role === 'teacher' ? 'Teacher Portal' : 'Admin Portal'}</span>
            </Link>

            <button
              onClick={() => openAuth('login')}
              className="text-xs font-semibold text-[#252C28] hover:text-[#284C3D] px-3 py-2 transition-colors"
            >
              Log In
            </button>

            <button
              onClick={() => openAuth('signup')}
              className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white shadow-card transition-all hover:shadow-elevated"
            >
              <span>Get Started</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setNotifDrawerOpen(true)}
              className="relative p-2 rounded-lg text-[#252C28] hover:bg-[#E7E6DE]"
            >
              <Bell className="w-5 h-5 text-[#284C3D]" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#C5A66A]" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#252C28] hover:bg-[#E7E6DE]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E6DE] bg-[#F8F7F2] px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className="text-left py-2.5 px-3 rounded-lg text-sm font-semibold text-[#252C28] hover:bg-[#E7E6DE] transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E7E6DE] flex flex-col gap-2">
              <Link
                to={getDashboardRoute()}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-control bg-[#DDE8DF] text-[#1C382D] font-semibold text-xs"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to {role === 'student' ? 'Student' : role === 'teacher' ? 'Teacher' : 'Admin'} Dashboard</span>
              </Link>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  onClick={() => openAuth('login')}
                  className="py-2.5 text-center text-xs font-semibold rounded-control border border-[#E7E6DE] bg-white text-[#252C28]"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuth('signup')}
                  className="py-2.5 text-center text-xs font-semibold rounded-control bg-[#284C3D] text-white"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Notification Drawer Component */}
      <NotificationDrawer
        isOpen={notifDrawerOpen}
        onClose={() => setNotifDrawerOpen(false)}
      />

      {/* Auth Modal Component */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </>
  );
};

