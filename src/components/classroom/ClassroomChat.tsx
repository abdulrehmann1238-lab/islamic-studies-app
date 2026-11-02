import React, { useState } from 'react';
import { Send, User, X } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

interface MessageItem {
  id: string;
  sender: 'Teacher' | 'Student';
  text: string;
  time: string;
}

interface ClassroomChatProps {
  isOpen: boolean;
  onClose: () => void;
  teacherName: string;
}

export const ClassroomChat: React.FC<ClassroomChatProps> = ({ isOpen, onClose, teacherName }) => {
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'm1',
      sender: 'Teacher',
      text: 'Assalamu Alaikum! Let’s review the pronunciation of Ayn and Haa together.',
      time: '16:30',
    },
    {
      id: 'm2',
      sender: 'Student',
      text: 'Wa Alaikum Assalam Ustadhah. Can we repeat the last example from Surah Al-Fatiha?',
      time: '16:32',
    },
    {
      id: 'm3',
      sender: 'Teacher',
      text: 'Of course! Take your time, focus on the air passage in the throat.',
      time: '16:33',
    },
  ]);

  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: MessageItem = {
      id: 'm-' + Date.now(),
      sender: 'Student',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    playSound('pop');

    // Simulate realistic teacher response
    setTimeout(() => {
      const teacherReply: MessageItem = {
        id: 'm-' + (Date.now() + 1),
        sender: 'Teacher',
        text: 'Mumtaz! That was much clearer. Notice how your tongue rested naturally.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, teacherReply]);
      playSound('correct');
    }, 1400);
  };

  return (
    <div className="w-80 bg-[#1C382D] border-l border-white/10 flex flex-col h-full z-20 text-white animate-fade-in">
      {/* Header */}
      <div className="p-4 bg-[#14241C] border-b border-white/10 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold">Classroom Live Chat</h4>
          <p className="text-[10px] text-[#A7B9A8]">Connected with {teacherName}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
        {messages.map((m) => {
          const isMe = m.sender === 'Student';
          return (
            <div
              key={m.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <span className="text-[10px] text-[#A7B9A8] mb-0.5">
                {isMe ? 'You' : teacherName} • {m.time}
              </span>
              <div
                className={`p-2.5 rounded-xl max-w-[85%] leading-relaxed ${
                  isMe
                    ? 'bg-[#C5A66A] text-[#1C382D] font-medium rounded-br-none'
                    : 'bg-white/10 text-white rounded-bl-none border border-white/5'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-3 bg-[#14241C] border-t border-white/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message to teacher..."
          className="flex-1 bg-white/10 text-xs text-white placeholder-white/40 px-3 py-2 rounded-control border border-white/10 focus:outline-none focus:border-[#C5A66A]"
        />
        <button
          type="submit"
          className="p-2 rounded-control bg-[#C5A66A] text-[#1C382D] hover:bg-white transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

