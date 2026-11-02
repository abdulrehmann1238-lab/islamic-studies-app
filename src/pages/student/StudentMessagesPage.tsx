import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Send, User, Check, CheckCheck, MessageSquare } from 'lucide-react';

export const StudentMessagesPage: React.FC = () => {
  const { messages, sendMessage, teachers, studentProfile } = useDemo();
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || 'teacher-1');
  const [inputText, setInputText] = useState('');

  const activeTeacher = teachers.find((t) => t.id === selectedTeacherId) || teachers[0];
  const conversation = messages.filter(
    (m) => m.senderId === activeTeacher.id || m.recipientId === activeTeacher.id
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeTeacher.id, activeTeacher.name, inputText);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col space-y-4">
      <div>
        <h1 className="text-2xl font-extrabold text-[#1C382D] font-heading">
          Messages & Teacher Chat
        </h1>
        <p className="text-xs text-[#737B74] mt-0.5">
          Ask questions between live lessons, clarify homework, and receive tailored advice.
        </p>
      </div>

      <div className="flex-1 bg-white rounded-card border border-[#E7E6DE] shadow-card overflow-hidden flex flex-col md:flex-row">
        {/* Left Contacts List */}
        <div className="w-full md:w-72 border-r border-[#E7E6DE] flex flex-col bg-[#F8F7F2]/60">
          <div className="p-4 border-b border-[#E7E6DE]">
            <span className="text-xs font-bold text-[#1C382D] uppercase tracking-wider">
              Connected Instructors
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[#E7E6DE]/60">
            {teachers.slice(0, 4).map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTeacherId(t.id)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                  selectedTeacherId === t.id
                    ? 'bg-white border-l-4 border-[#284C3D] shadow-xs'
                    : 'hover:bg-white/60'
                }`}
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#1C382D] truncate">{t.name}</h4>
                  <p className="text-[11px] text-[#737B74] truncate">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Chat Stream */}
        <div className="flex-1 flex flex-col h-full bg-white">
          {/* Header */}
          <div className="p-4 border-b border-[#E7E6DE] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img
                src={activeTeacher.avatar}
                alt={activeTeacher.name}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xs font-bold text-[#1C382D]">{activeTeacher.name}</h3>
                <span className="text-[10px] text-[#648B70] flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#648B70]" />
                  Active now
                </span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {conversation.length === 0 ? (
              <div className="text-center py-12 text-[#737B74] text-xs">
                No message history yet. Send a greeting to {activeTeacher.name}!
              </div>
            ) : (
              conversation.map((m) => {
                const isMe = m.senderId === studentProfile.id;
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[10px] text-[#737B74] mb-1">
                      {isMe ? 'You (Adam)' : activeTeacher.name} • {m.timestamp}
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
              })
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 border-t border-[#E7E6DE] flex gap-3 bg-[#F8F7F2]">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeTeacher.name}...`}
              className="flex-1 bg-white text-xs px-4 py-2.5 rounded-control border border-[#E7E6DE] focus:border-[#284C3D] focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-control bg-[#284C3D] hover:bg-[#1C382D] text-white text-xs font-bold shadow-card flex items-center gap-1.5 transition-all"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5 text-[#C5A66A]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

