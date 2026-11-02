import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Send, User } from 'lucide-react';

export const TeacherMessagesPage: React.FC = () => {
  const { messages, sendMessage, studentProfile } = useDemo();
  const [inputText, setInputText] = useState('');

  const conversation = messages; // Teacher view

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(studentProfile.id, studentProfile.name, inputText);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Student Communication
        </h1>
        <p className="text-xs text-[#737B74] mt-0.5">
          Communicate directly with students and parents.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-card border border-[#E7E6DE] shadow-card overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[#E7E6DE] flex items-center gap-3 bg-[#F8F7F2]/50">
          <img
            src={studentProfile.avatar}
            alt={studentProfile.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xs font-bold text-[#1C382D]">{studentProfile.name} (Parent: {studentProfile.parentName})</h3>
            <span className="text-[10px] text-[#284C3D] font-semibold">Active Student • Age {studentProfile.age}</span>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {conversation.map((m) => {
            const isMe = m.senderRole === 'teacher';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-[#737B74] mb-1">
                  {isMe ? 'You (Ustadhah Aisha)' : m.senderName} • {m.timestamp}
                </span>
                <div
                  className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed shadow-xs ${
                    isMe
                      ? 'bg-[#284C3D] text-white rounded-br-none'
                      : 'bg-[#F4EDDC]/70 text-[#1C382D] rounded-bl-none border border-[#C5A66A]/30'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-4 border-t border-[#E7E6DE] flex gap-3 bg-[#F8F7F2]">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Reply to parent..."
            className="flex-1 bg-white text-xs px-4 py-2.5 rounded-control border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
          >
            <span>Reply</span>
            <Send className="w-3.5 h-3.5 text-[#C5A66A]" />
          </button>
        </form>
      </div>
    </div>
  );
};

