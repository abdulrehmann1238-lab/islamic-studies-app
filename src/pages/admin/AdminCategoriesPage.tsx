import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Tag, Plus, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

export const AdminCategoriesPage: React.FC = () => {
  const { categories, toggleCategoryActive, addCategory } = useDemo();

  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    addCategory(newName, newDesc || 'Specialised Islamic Studies domain.');
    setNewName('');
    setNewDesc('');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Subject Categories & Marketplace Filters
        </h1>
        <p className="text-xs text-[#737B74] mt-1">
          Add or toggle active subjects. Toggling instantly updates the public marketplace filter dropdowns.
        </p>
      </div>

      {/* Add New Category Form */}
      <div className="bg-white rounded-card border border-[#E7E6DE] p-5 shadow-subtle">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-3">
          Create New Subject Category
        </h3>
        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Category name (e.g. Tafseer Studies)"
            className="p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
            required
          />
          <input
            type="text"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Short description..."
            className="p-2.5 text-xs rounded-control bg-[#F8F7F2] border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
          <button
            type="submit"
            className="py-2.5 px-4 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A66A]" />
            <span>Add Category</span>
          </button>
        </form>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`p-5 rounded-card border transition-all flex flex-col justify-between space-y-3 ${
              cat.active
                ? 'bg-white border-[#E7E6DE] shadow-subtle'
                : 'bg-[#F8F7F2] border-[#E7E6DE] opacity-60'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#1C382D]">{cat.name}</h4>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    cat.active ? 'bg-[#DDE8DF] text-[#1C382D]' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {cat.active ? 'Active' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-[#737B74]">{cat.description}</p>
            </div>

            <div className="pt-2 border-t border-[#E7E6DE] flex items-center justify-between">
              <span className="text-[11px] text-[#737B74] font-medium">
                {cat.teacherCount} Listed Tutors
              </span>
              <button
                type="button"
                onClick={() => toggleCategoryActive(cat.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-control border transition-colors ${
                  cat.active
                    ? 'border-[#B86D65] text-[#B86D65] hover:bg-red-50'
                    : 'border-[#284C3D] text-[#284C3D] hover:bg-[#DDE8DF]'
                }`}
              >
                {cat.active ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

