import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Send, CheckCircle2, Globe, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast({ type: 'error', title: 'Please complete all contact form fields.' });
      return;
    }
    setSubmitted(true);
    showToast({
      type: 'success',
      title: 'Demo Message Received',
      message: 'Thank you for reaching out. In production, our support team responds within 2 hours.',
    });
  };

  return (
    <footer className="bg-[#F0EFE8] border-t border-[#E7E6DE] text-[#252C28] pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E7E6DE]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#284C3D] text-[#C5A66A] flex items-center justify-center shadow-card">
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

            <p className="text-sm text-[#737B74] leading-relaxed max-w-sm">
              A premium, trustworthy learning platform connecting students and families with verified Islamic Studies teachers, 1-on-1 virtual classrooms, and interactive daily practice.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#737B74]">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#DDE8DF]/70 text-[#1C382D] font-medium">
                <Globe className="w-3.5 h-3.5 text-[#284C3D]" />
                <span>Global Demo Platform</span>
              </div>
              <span>•</span>
              <span>English & Arabic</span>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] font-heading">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-[#737B74]">
              <li>
                <Link to="/teachers" className="hover:text-[#284C3D] transition-colors">
                  Find Teachers
                </Link>
              </li>
              <li>
                <Link to="/teachers?speciality=Tajweed" className="hover:text-[#284C3D] transition-colors">
                  Tajweed Recitation
                </Link>
              </li>
              <li>
                <Link to="/learn" className="hover:text-[#284C3D] transition-colors">
                  Micro-Learning Path
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#284C3D] transition-colors">
                  Learning Plans
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Teachers */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] font-heading">
              For Teachers
            </h4>
            <ul className="space-y-2 text-sm text-[#737B74]">
              <li>
                <Link to="/become-a-teacher" className="hover:text-[#284C3D] transition-colors font-medium text-[#284C3D]">
                  Become a Teacher →
                </Link>
              </li>
              <li>
                <Link to="/teacher" className="hover:text-[#284C3D] transition-colors">
                  Teaching Dashboard
                </Link>
              </li>
              <li>
                <Link to="/teacher/schedule" className="hover:text-[#284C3D] transition-colors">
                  Schedule & Calendar
                </Link>
              </li>
              <li>
                <Link to="/teacher/earnings" className="hover:text-[#284C3D] transition-colors">
                  Earnings & Payouts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] font-heading">
              Support & Help
            </h4>
            <ul className="space-y-2 text-sm text-[#737B74]">
              <li>
                <Link to="/faq" className="hover:text-[#284C3D] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#284C3D] transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <span className="text-xs text-[#737B74]">Demo Support Email:</span>
                <span className="block text-xs font-mono text-[#284C3D] font-medium">hello@noor-learning.demo</span>
              </li>
              <li>
                <span className="inline-block mt-1 text-[11px] px-2 py-0.5 rounded bg-[#F4EDDC] text-[#C5A66A] font-semibold">
                  Child Safety Protected
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form Section in Footer */}
        <div className="my-10 p-6 rounded-card bg-white border border-[#E7E6DE] shadow-subtle">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div>
              <span className="text-xs font-bold text-[#C5A66A] uppercase tracking-wider">
                Get In Touch With NOOR
              </span>
              <h3 className="text-base font-bold text-[#1C382D] font-heading mt-1">
                Have questions regarding teachers or curriculum?
              </h3>
              <p className="text-xs text-[#737B74] mt-1 leading-relaxed">
                Send our pedagogical advisors a note. All demo submissions are acknowledged instantly.
              </p>
            </div>

            <div className="lg:col-span-2">
              {submitted ? (
                <div className="p-4 rounded-xl bg-[#DDE8DF]/50 border border-[#A7B9A8] flex items-center gap-3 text-xs text-[#1C382D]">
                  <CheckCircle2 className="w-5 h-5 text-[#284C3D] flex-shrink-0" />
                  <div>
                    <p className="font-bold">Message simulated successfully!</p>
                    <p className="text-[#737B74]">Thank you for testing the contact interaction.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="px-3.5 py-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="px-3.5 py-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                    required
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Your question..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-semibold flex items-center justify-center transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#737B74] gap-4">
          <p>© {new Date().getFullYear()} NOOR Islamic Learning Platform. Interactive Demonstration Build.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Safety Guidelines</span>
            <span className="flex items-center gap-1 text-[#284C3D]">
              Designed with <Heart className="w-3 h-3 text-[#B86D65] fill-[#B86D65]" /> for knowledge
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

