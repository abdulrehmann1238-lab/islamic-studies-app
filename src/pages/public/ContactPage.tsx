import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Phone, MapPin, Globe } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast({ type: 'error', title: 'Please complete all required fields.' });
      return;
    }
    setSubmitted(true);
    showToast({
      type: 'success',
      title: 'Message Sent!',
      message: 'Demo support ticket logged successfully.',
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          We Are Here To Assist
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C382D] font-heading mt-1">
          Contact Our Education Team
        </h1>
        <p className="text-xs sm:text-sm text-[#737B74] mt-2">
          Have inquiries regarding custom teacher curriculums, school partnerships, or technical support?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div className="md:col-span-5 bg-[#1C382D] text-white p-8 rounded-feature shadow-card space-y-6">
          <h3 className="text-xl font-bold font-heading">Get in Touch</h3>
          <p className="text-xs text-[#DDE8DF] leading-relaxed">
            Our advisory team helps parents and institutions match with the right educators.
          </p>

          <div className="space-y-4 text-xs pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#C5A66A]" />
              <span className="font-mono text-white/90">hello@noor-learning.demo</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#C5A66A]" />
              <span>Available in UK, Europe, North America, UAE & Global</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-[#A7B9A8]">
            <p className="font-semibold text-white mb-1">Demo Platform Notice</p>
            <p>This is a frontend demonstration build. Form submissions simulate an active help desk.</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-white rounded-feature border border-[#E7E6DE] p-8 shadow-card">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#1C382D]">Thank you for your message!</h3>
              <p className="text-xs text-[#737B74] max-w-sm mx-auto">
                Your question has been received. Our demo advisor team would reply within 2 hours in a live system.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold rounded-control border border-[#E7E6DE] text-[#252C28]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#1C382D] mb-1">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Tariq Ahmed"
                    className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1C382D] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. tariq@example.com"
                    className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C382D] mb-1">Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Teacher Matching">Teacher Matching Advice</option>
                  <option value="Technical Support">Classroom Technical Question</option>
                  <option value="Teacher Application">Educator Application Status</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1C382D] mb-1">Message</label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you and your family?"
                  className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center justify-center gap-2 transition-all"
              >
                <span>Send Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

