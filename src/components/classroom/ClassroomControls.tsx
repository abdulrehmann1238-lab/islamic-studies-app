import React from 'react';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  MessageSquare,
  Hand,
  PhoneOff,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { playSound } from '../../utils/soundEffects';

interface ClassroomControlsProps {
  micOn: boolean;
  setMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  cameraOn: boolean;
  setCameraOn: React.Dispatch<React.SetStateAction<boolean>>;
  screenSharing: boolean;
  setScreenSharing: React.Dispatch<React.SetStateAction<boolean>>;
  chatOpen: boolean;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handRaised: boolean;
  setHandRaised: React.Dispatch<React.SetStateAction<boolean>>;
  onLeave: () => void;
}

export const ClassroomControls: React.FC<ClassroomControlsProps> = ({
  micOn,
  setMicOn,
  cameraOn,
  setCameraOn,
  screenSharing,
  setScreenSharing,
  chatOpen,
  setChatOpen,
  handRaised,
  setHandRaised,
  onLeave,
}) => {
  const { showToast } = useToast();

  const toggleMic = () => {
    playSound('click');
    setMicOn((prev) => {
      showToast({ type: 'info', title: prev ? 'Microphone Muted' : 'Microphone Unmuted' });
      return !prev;
    });
  };

  const toggleCamera = () => {
    playSound('click');
    setCameraOn((prev) => {
      showToast({ type: 'info', title: prev ? 'Camera Turned Off' : 'Camera Turned On' });
      return !prev;
    });
  };

  const toggleScreen = () => {
    playSound('click');
    setScreenSharing((prev) => {
      showToast({ type: 'info', title: prev ? 'Shared Board Minimized' : 'Shared Reading Board Activated' });
      return !prev;
    });
  };

  const toggleChat = () => {
    playSound('click');
    setChatOpen((prev) => !prev);
  };

  const toggleHand = () => {
    playSound('pop');
    setHandRaised((prev) => {
      showToast({ type: 'info', title: prev ? 'Hand Lowered' : 'Hand Raised for Question' });
      return !prev;
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 px-4 bg-[#14241C]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
      {/* Mic */}
      <button
        onClick={toggleMic}
        className={`p-3 rounded-xl transition-all ${
          micOn
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'bg-[#B86D65] text-white hover:bg-red-700'
        }`}
        title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
      >
        {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>

      {/* Camera */}
      <button
        onClick={toggleCamera}
        className={`p-3 rounded-xl transition-all ${
          cameraOn
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'bg-[#B86D65] text-white hover:bg-red-700'
        }`}
        title={cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
      >
        {cameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
      </button>

      {/* Shared Board */}
      <button
        onClick={toggleScreen}
        className={`p-3 rounded-xl transition-all ${
          screenSharing
            ? 'bg-[#284C3D] text-[#C5A66A] ring-2 ring-[#C5A66A]'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
        title="Toggle Shared Teaching Board"
      >
        <Monitor className="w-5 h-5" />
      </button>

      {/* Hand Raise */}
      <button
        onClick={toggleHand}
        className={`p-3 rounded-xl transition-all ${
          handRaised
            ? 'bg-[#C5A66A] text-[#1C382D] ring-2 ring-white'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
        title="Raise Hand"
      >
        <Hand className="w-5 h-5" />
      </button>

      {/* Chat */}
      <button
        onClick={toggleChat}
        className={`p-3 rounded-xl transition-all ${
          chatOpen
            ? 'bg-[#284C3D] text-[#C5A66A] ring-2 ring-[#C5A66A]'
            : 'bg-white/10 hover:bg-white/20 text-white'
        }`}
        title="Toggle Chat"
      >
        <MessageSquare className="w-5 h-5" />
      </button>

      {/* Leave Classroom */}
      <button
        onClick={onLeave}
        className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-[#B86D65] hover:bg-red-700 text-white font-bold text-xs transition-all shadow-md ml-2"
        title="Leave Classroom"
      >
        <PhoneOff className="w-4 h-4" />
        <span className="hidden sm:inline">Leave</span>
      </button>
    </div>
  );
};

