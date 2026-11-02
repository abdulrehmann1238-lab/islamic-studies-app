import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemo } from '../../context/DemoContext';
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const BecomeTeacherPage: React.FC = () => {
  const { submitTeacherApplication } = useDemo();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'United Kingdom',
    gender: 'Female' as 'Male' | 'Female',
    bio: '',
    experience: '',
    specialities: ['Tajweed', 'Quran Reading'],
    languages: ['English', 'Arabic'],
    certifications: '',
    hourlyRate: 20,
    availableDays: ['Monday', 'Wednesday', 'Saturday'],
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  const toggleSpeciality = (spec: string) => {
    setFormData((prev) => {
      const exists = prev.specialities.includes(spec);
      return {
        ...prev,
        specialities: exists
          ? prev.specialities.filter((s) => s !== spec)
          : [...prev.specialities, spec],
      };
    });
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.availableDays.includes(day);
      return {
        ...prev,
        availableDays: exists
          ? prev.availableDays.filter((d) => d !== day)
          : [...prev.availableDays, day],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitTeacherApplication({
      fullName: formData.fullName || 'Ustadhah Maryam Al-Sabah',
      email: formData.email || 'maryam.alsabah@example.com',
      country: formData.country,
      gender: formData.gender,
      bio: formData.bio || 'Dedicated Quran educator with 7 years of online and classroom teaching.',
      experience: formData.experience || '7 years tutoring in community madrasahs and virtual platforms.',
      specialities: formData.specialities,
      languages: formData.languages,
      certifications: formData.certifications || 'Ijazah in Hafs ‘an ‘Asim; Al-Azhar Certificate.',
      hourlyRate: formData.hourlyRate,
      availableDays: formData.availableDays,
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#C5A66A]">
          Join NOOR Educator Faculty
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1C382D] font-heading mt-1">
          Apply to Become an Educator
        </h1>
        <p className="text-xs sm:text-sm text-[#737B74] mt-2">
          Share your pedagogical expertise, set your own hourly rates, and mentor students worldwide.
        </p>
      </div>

      <div className="bg-white rounded-feature border border-[#E7E6DE] shadow-card overflow-hidden">
        {/* Step Tabs */}
        {!submitted && (
          <div className="bg-[#F8F7F2] px-6 py-3 border-b border-[#E7E6DE] flex items-center justify-between text-xs font-semibold text-[#737B74] overflow-x-auto">
            <span className={step >= 1 ? 'text-[#284C3D] font-bold' : ''}>1. Basic Info</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-[#284C3D] font-bold' : ''}>2. Profile & Bio</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-[#284C3D] font-bold' : ''}>3. Qualifications</span>
            <span>→</span>
            <span className={step >= 4 ? 'text-[#284C3D] font-bold' : ''}>4. Preferences</span>
            <span>→</span>
            <span className={step >= 5 ? 'text-[#284C3D] font-bold' : ''}>5. Review</span>
          </div>
        )}

        <div className="p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-8 space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#DDE8DF] text-[#284C3D] flex items-center justify-center mx-auto shadow-card">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#1C382D] font-heading">
                Application Submitted for Review!
              </h2>
              <p className="text-xs sm:text-sm text-[#737B74] max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-[#1C382D]">{formData.fullName || 'Educator'}</span>. Your teaching profile has been forwarded to the NOOR Verification Committee.
              </p>
              <div className="p-4 rounded-xl bg-[#F8F7F2] border border-[#E7E6DE] text-left text-xs max-w-md mx-auto space-y-1.5">
                <p className="font-bold text-[#1C382D]">Connected Verification Scenario:</p>
                <p className="text-[#737B74]">
                  You can now switch to the <span className="font-bold text-[#284C3D]">Platform Admin</span> role using the switcher pill at bottom left to approve this exact application and see your profile appear live in the Marketplace!
                </p>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => navigate('/admin/teachers')}
                  className="px-5 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white font-bold text-xs shadow-card"
                >
                  View in Admin Portal →
                </button>
                <button
                  onClick={() => navigate('/teachers')}
                  className="px-5 py-2.5 rounded-control border border-[#E7E6DE] bg-white text-[#252C28] font-semibold text-xs"
                >
                  Return to Marketplace
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1C382D]">Step 1: Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1C382D] mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Ustadhah Maryam Al-Sabah"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1C382D] mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. maryam@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1C382D] mb-1">Country of Residence</label>
                      <input
                        type="text"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#1C382D] mb-1">Gender</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['Female', 'Male'] as const).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, gender: g })}
                            className={`py-2 text-xs font-semibold rounded-control border ${
                              formData.gender === g
                                ? 'bg-[#284C3D] text-white border-[#284C3D]'
                                : 'bg-[#F8F7F2] text-[#737B74] border-[#E7E6DE]'
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1C382D]">Step 2: Teaching Profile & Biography</h3>
                  <div>
                    <label className="block text-xs font-bold text-[#1C382D] mb-1">Professional Bio</label>
                    <textarea
                      rows={3}
                      placeholder="Share your teaching passion, student age focus, and years of experience..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C382D] mb-1">
                      Teaching Experience Overview
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 7 years tutoring youth and adults across UK & North America"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C382D] mb-2">
                      Subjects You Teach (Select all that apply)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Tajweed',
                        'Quran Reading',
                        'Quran Memorisation',
                        'Arabic Language',
                        'Fiqh',
                        'Islamic History',
                        'Hadith Studies',
                        'Seerah',
                      ].map((spec) => {
                        const isSelected = formData.specialities.includes(spec);
                        return (
                          <button
                            key={spec}
                            type="button"
                            onClick={() => toggleSpeciality(spec)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                              isSelected
                                ? 'bg-[#284C3D] text-white border-[#284C3D]'
                                : 'bg-[#F8F7F2] text-[#737B74] border-[#E7E6DE]'
                            }`}
                          >
                            {spec}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1C382D]">Step 3: Qualifications & Ijazah</h3>
                  <div>
                    <label className="block text-xs font-bold text-[#1C382D] mb-1">
                      Certifications & Degree Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Ijazah in Hafs ‘an ‘Asim with Sanad; BA in Islamic Studies SOAS..."
                      value={formData.certifications}
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.value })}
                      className="w-full p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
                    />
                  </div>

                  {/* Document upload placeholder */}
                  <div>
                    <label className="block text-xs font-bold text-[#1C382D] mb-1">
                      Supporting Documents (Ijazah / Certificate PDF)
                    </label>
                    <div className="p-8 border-2 border-dashed border-[#A7B9A8] rounded-xl text-center bg-[#F8F7F2]/50">
                      <UploadCloud className="w-8 h-8 text-[#284C3D] mx-auto mb-2" />
                      <p className="text-xs font-semibold text-[#1C382D]">Drag & drop certificate files here</p>
                      <p className="text-[10px] text-[#737B74] mt-1">PDF, JPG, PNG up to 10MB (Simulated Demo Uploader)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1C382D]">Step 4: Rates & Schedule Preferences</h3>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-[#1C382D]">
                        Desired Hourly Rate (£ GBP)
                      </label>
                      <span className="text-sm font-bold text-[#284C3D]">£{formData.hourlyRate}/hour</span>
                    </div>
                    <input
                      type="range"
                      min="12"
                      max="40"
                      step="1"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                      className="w-full accent-[#284C3D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1C382D] mb-2">Available Days</label>
                    <div className="flex flex-wrap gap-2">
                      {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => {
                        const isSelected = formData.availableDays.includes(day);
                        return (
                          <button
                            key={day}
                            type="button"
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-control border ${
                              isSelected
                                ? 'bg-[#284C3D] text-white border-[#284C3D]'
                                : 'bg-[#F8F7F2] text-[#737B74] border-[#E7E6DE]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5 */}
              {step === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <h3 className="text-base font-bold text-[#1C382D]">Step 5: Review Application</h3>
                  <div className="p-4 rounded-card bg-[#F8F7F2] border border-[#E7E6DE] space-y-2 text-xs">
                    <p><span className="text-[#737B74]">Name:</span> <strong className="text-[#1C382D]">{formData.fullName || 'Ustadhah Maryam'}</strong></p>
                    <p><span className="text-[#737B74]">Gender / Country:</span> {formData.gender} • {formData.country}</p>
                    <p><span className="text-[#737B74]">Rate:</span> £{formData.hourlyRate}/hr</p>
                    <p><span className="text-[#737B74]">Subjects:</span> {formData.specialities.join(', ')}</p>
                    <p><span className="text-[#737B74]">Available Days:</span> {formData.availableDays.join(', ')}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#DDE8DF]/50 border border-[#A7B9A8] text-xs text-[#1C382D] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#284C3D]" />
                    <span>Applications undergo verified vetting prior to public listing.</span>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-[#E7E6DE]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#737B74] hover:text-[#252C28]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Previous
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-elevated"
                  >
                    <span>Submit Application</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A66A]" />
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

