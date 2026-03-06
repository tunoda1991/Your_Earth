import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, TrendingUp, Users, Calendar, Award, MessageCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "campaign" | "event" | "achievement" | "community" | "message" | "like";
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (page: string) => void;
}

export function NotificationsPanel({ isOpen, onClose, onNavigate }: NotificationsPanelProps) {
  // Mock notifications data
  const notifications: Notification[] = [
    {
      id: "1",
      type: "campaign",
      title: "Campaign Milestone Reached!",
      message: "Solar Schools Initiative has reached 67% completion",
      time: "2 hours ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SSI"
    },
    {
      id: "2",
      type: "event",
      title: "Event Reminder",
      message: "Climate Action Workshop starts in 1 day",
      time: "5 hours ago",
      read: false,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CAW"
    },
    {
      id: "3",
      type: "achievement",
      title: "New Achievement Unlocked!",
      message: "You've earned the 'Climate Champion' badge",
      time: "1 day ago",
      read: false
    },
    {
      id: "4",
      type: "community",
      title: "New Member in Energy Community",
      message: "Sarah Johnson joined Renewable Energy",
      time: "2 days ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    },
    {
      id: "5",
      type: "message",
      title: "New Comment on Your Post",
      message: "Michael Chen commented on your recent discussion",
      time: "2 days ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
    },
    {
      id: "6",
      type: "like",
      title: "Your Action Was Appreciated",
      message: "Emma Rodriguez liked your quick action completion",
      time: "3 days ago",
      read: true,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "campaign":
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case "event":
        return <Calendar className="h-5 w-5 text-blue-400" />;
      case "achievement":
        return <Award className="h-5 w-5 text-yellow-400" />;
      case "community":
        return <Users className="h-5 w-5 text-purple-400" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-cyan-400" />;
      case "like":
        return <Heart className="h-5 w-5 text-red-400" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-400" />;
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    // Navigate based on notification type
    switch (notification.type) {
      case "campaign":
        onNavigate?.("campaign-detail");
        break;
      case "event":
        onNavigate?.("events");
        break;
      case "achievement":
        onNavigate?.("achievements");
        break;
      case "community":
        onNavigate?.("community");
        break;
      default:
        onNavigate?.("dashboard");
    }
    onClose();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Notifications Panel */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-slate-900/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">Notifications</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-all"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {unreadCount > 0 && (
                <p className="text-sm text-slate-300">
                  You have <span className="font-semibold text-green-400">{unreadCount} unread</span> notifications
                </p>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto h-full pb-32">
              <div className="p-4 space-y-2">
                {notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-slate-800/50 mb-4">
                      <CheckCircle className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-400">No notifications yet</p>
                  </div>
                ) : (
                  notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleNotificationClick(notification)}
                      className={`
                        p-4 rounded-xl cursor-pointer transition-all
                        ${notification.read 
                          ? "bg-slate-800/30 hover:bg-slate-800/50" 
                          : "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40"
                        }
                      `}
                    >
                      <div className="flex gap-3">
                        {/* Icon or Avatar */}
                        {notification.avatar ? (
                          <img
                            src={notification.avatar}
                            alt=""
                            className="w-10 h-10 rounded-full"
                          />
                        ) : (
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center">
                            {getNotificationIcon(notification.type)}
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className={`text-sm font-semibold ${notification.read ? "text-slate-300" : "text-white"}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-slate-400 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">{notification.time}</span>
                            <Badge 
                              variant="outline" 
                              className="text-xs px-2 py-0 border-slate-700 text-slate-400"
                            >
                              {notification.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
              <Button
                variant="outline"
                className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10"
                onClick={() => {
                  // Mark all as read functionality
                  onClose();
                }}
              >
                Mark All as Read
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
