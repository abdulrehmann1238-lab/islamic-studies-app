import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { useNavigate } from 'react-router-dom';
import { X, Bell, Check, ExternalLink, Calendar, Flame, Award, ShieldAlert } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useDemo();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleNotificationClick = (notifId: string, link?: string) => {
    markNotificationRead(notifId);
    if (link) {
      navigate(link);
      onClose();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Calendar className="w-4 h-4 text-[#284C3D]" />;
      case 'xp':
        return <Flame className="w-4 h-4 text-[#C5A66A]" />;
      case 'approval':
        return <ShieldAlert className="w-4 h-4 text-[#648B70]" />;
      default:
        return <Award className="w-4 h-4 text-[#284C3D]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white h-full shadow-2xl border-l border-[#E7E6DE] flex flex-col z-10">
        {/* Header */}
        <div className="p-4 bg-[#F8F7F2] border-b border-[#E7E6DE] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#284C3D]" />
            <h3 className="text-sm font-bold text-[#1C382D]">Notifications</h3>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#DDE8DF] text-[#1C382D] font-semibold">
              {notifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737B74] hover:text-[#252C28] hover:bg-[#E7E6DE] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-[#737B74] text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif.id, notif.link)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  notif.read
                    ? 'bg-white border-[#E7E6DE] opacity-80 hover:opacity-100 hover:border-[#A7B9A8]'
                    : 'bg-[#F4EDDC]/30 border-[#C5A66A]/40 shadow-xs hover:border-[#C5A66A]'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#DDE8DF]/70 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-[#1C382D] truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-[#737B74] flex-shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#737B74] mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                    {notif.link && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#284C3D] hover:underline mt-2">
                        View details <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F8F7F2] border-t border-[#E7E6DE] text-center">
          <button
            onClick={() => {
              notifications.forEach((n) => markNotificationRead(n.id));
            }}
            className="text-xs font-semibold text-[#284C3D] hover:text-[#1C382D] flex items-center justify-center gap-1.5 w-full py-1.5"
          >
            <Check className="w-3.5 h-3.5" /> Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

