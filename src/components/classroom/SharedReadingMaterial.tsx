import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Highlighter, Volume2, Sparkles } from 'lucide-react';
import { speakArabic, playSound } from '../../utils/soundEffects';

export const SharedReadingMaterial: React.FC = () => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [highlightMode, setHighlightMode] = useState(true);

  const pages = [
    {
      title: 'Surah Al-Fatiha (The Opening)',
      description: 'Verse 1–4: Articulation focus on Makhraj of Ayn (ع) and Haa (ح).',
      arabicLines: [
        [
          { text: 'بِسْمِ', tajweed: 'none' },
          { text: 'اللَّهِ', tajweed: 'bold-madd' },
          { text: 'الرَّحْمَٰنِ', tajweed: 'throat-ha' },
          { text: 'الرَّحِيمِ', tajweed: 'madd-arid' },
        ],
        [
          { text: 'الْحَمْدُ', tajweed: 'throat-ha' },
          { text: 'لِلَّهِ', tajweed: 'normal' },
          { text: 'رَبِّ', tajweed: 'normal' },
          { text: 'الْعَالَمِينَ', tajweed: 'throat-ayn' },
        ],
        [
          { text: 'الرَّحْمَٰنِ', tajweed: 'throat-ha' },
          { text: 'الرَّحِيمِ', tajweed: 'madd-arid' },
        ],
        [
          { text: 'مَالِكِ', tajweed: 'madd' },
          { text: 'يَوْمِ', tajweed: 'normal' },
          { text: 'الدِّينِ', tajweed: 'madd-arid' },
        ],
      ],
      annotation: 'Ustadhah Aisha: "Notice how the Haa in Ar-Rahman is soft and deep from the middle of the throat."',
    },
    {
      title: 'Surah Al-Ikhlas (The Sincerity)',
      description: 'Focus on Qalqalah bounce of Daal (د) on Sukoon.',
      arabicLines: [
        [
          { text: 'قُلْ', tajweed: 'throat-qaf' },
          { text: 'هُوَ', tajweed: 'normal' },
          { text: 'اللَّهُ', tajweed: 'bold-madd' },
          { text: 'أَحَدٌ', tajweed: 'qalqalah' },
        ],
        [
          { text: 'اللَّهُ', tajweed: 'bold-madd' },
          { text: 'الصَّمَدُ', tajweed: 'qalqalah' },
        ],
        [
          { text: 'لَمْ', tajweed: 'normal' },
          { text: 'يَلِدْ', tajweed: 'qalqalah' },
          { text: 'وَلَمْ', tajweed: 'normal' },
          { text: 'يُولَدْ', tajweed: 'qalqalah' },
        ],
        [
          { text: 'وَلَمْ', tajweed: 'normal' },
          { text: 'يَكُن', tajweed: 'ikhfa' },
          { text: 'لَّهُ', tajweed: 'idgham' },
          { text: 'كُفُوًا', tajweed: 'normal' },
          { text: 'أَحَدٌ', tajweed: 'qalqalah' },
        ],
      ],
      annotation: 'Ustadhah Aisha: "The echoing bounce on Ahaddd (أَحَدٌ) when pausing must be crisp without adding a vowel."',
    },
  ];

  const currentPage = pages[activePageIndex];

  const handleWordClick = (text: string) => {
    setSelectedWord(text);
    speakArabic(text);
  };

  return (
    <div className="bg-[#1C382D] rounded-2xl border border-[#284C3D] p-5 text-white flex flex-col h-full shadow-2xl">
      {/* Board Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#C5A66A] text-[#1C382D] flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Shared Teaching Board: {currentPage.title}
            </h4>
            <p className="text-[11px] text-[#A7B9A8]">{currentPage.description}</p>
          </div>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-1.5 bg-black/30 px-2 py-1 rounded-control text-xs">
          <button
            onClick={() => setActivePageIndex((p) => Math.max(0, p - 1))}
            disabled={activePageIndex === 0}
            className="p-1 disabled:opacity-30 hover:text-[#C5A66A]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-mono text-[11px]">
            {activePageIndex + 1} / {pages.length}
          </span>
          <button
            onClick={() => setActivePageIndex((p) => Math.min(pages.length - 1, p + 1))}
            disabled={activePageIndex === pages.length - 1}
            className="p-1 disabled:opacity-30 hover:text-[#C5A66A]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Recitation Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#14241C] rounded-xl border border-white/5 my-auto">
        <div className="space-y-6 text-center max-w-xl w-full dir-rtl font-arabic">
          {currentPage.arabicLines.map((line, lIdx) => (
            <div key={lIdx} className="flex flex-wrap items-center justify-center gap-4 text-3xl sm:text-4xl">
              {line.map((w, wIdx) => {
                const isSelected = selectedWord === w.text;
                let colorClass = 'text-white hover:text-[#C5A66A]';
                if (w.tajweed === 'throat-ha' || w.tajweed === 'throat-ayn') {
                  colorClass = 'text-[#C5A66A] font-bold';
                } else if (w.tajweed === 'qalqalah') {
                  colorClass = 'text-[#648B70] font-bold underline decoration-wavy decoration-[#C5A66A]';
                }

                return (
                  <span
                    key={wIdx}
                    onClick={() => handleWordClick(w.text)}
                    className={`cursor-pointer px-2 py-1 rounded-lg transition-all ${colorClass} ${
                      isSelected ? 'bg-white/20 ring-2 ring-[#C5A66A]' : 'hover:bg-white/10'
                    }`}
                    title="Click to hear pronunciation"
                  >
                    {w.text}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Live Teacher Annotation */}
      <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2.5 text-xs">
        <Highlighter className="w-4 h-4 text-[#C5A66A] flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-white/90 italic leading-relaxed">{currentPage.annotation}</p>
        </div>
      </div>
    </div>
  );
};

