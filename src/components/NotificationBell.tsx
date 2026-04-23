"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Order = { id: string; status: string; updatedAt: string };

type Notification = {
  id: string;
  message: string;
  status: string;
  time: Date;
  read: boolean;
};

const STATUS_LABELS: Record<string, string> = {
  PLACED: "Order confirmed!",
  PREPARING: "Your order is being prepared",
  READY: "Your order is ready for delivery!",
  DELIVERED: "Your order has been delivered!",
  CANCELLED: "Your order has been cancelled",
};

const STATUS_COLORS: Record<string, string> = {
  PLACED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-orange-100 text-orange-700",
  READY: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const STATUS_BAR: Record<string, string> = {
  PLACED: "bg-blue-500",
  PREPARING: "bg-orange-500",
  READY: "bg-purple-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

async function fetchLatestStatus(): Promise<Order[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/latest-status`,
      { credentials: "include", cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.data ?? [];
  } catch {
    return [];
  }
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [toasts, setToasts] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const prevStatuses = useRef<Record<string, string>>({});
  const initialized = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
    setOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const poll = async () => {
    const orders = await fetchLatestStatus();

    if (!initialized.current) {
      orders.forEach((o) => {
        prevStatuses.current[o.id] = o.status;
      });
      initialized.current = true;
      return;
    }

    const newNotifs: Notification[] = [];
    orders.forEach((o) => {
      const prev = prevStatuses.current[o.id];
      if (prev && prev !== o.status) {
        newNotifs.push({
          id: `${o.id}-${Date.now()}`,
          message: STATUS_LABELS[o.status] ?? `Order status: ${o.status}`,
          status: o.status,
          time: new Date(),
          read: false,
        });
      }
      prevStatuses.current[o.id] = o.status;
    });

    if (newNotifs.length > 0) {
      // Add to bell history
      setNotifications((prev) => [...newNotifs, ...prev]);
      // Show toasts
      setToasts((prev) => [...prev, ...newNotifs]);
      // Auto remove toasts after 5s
      newNotifs.forEach((n) => {
        setTimeout(() => removeToast(n.id), 5000);
      });
    }
  };

  useEffect(() => {
    poll();
    const interval = setInterval(poll, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Bell Icon + Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => {
            setOpen((prev) => !prev);
            if (!open) markAllRead();
          }}
          className="relative p-2 rounded-full hover:bg-gray-100 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>

          {/* ← RED BADGE WITH COUNT */}
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium px-1"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm text-gray-800">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {notifications.length > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-xs text-gray-400 hover:text-red-500 transition"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-3xl mb-2">🔔</p>
                    <p className="text-sm text-gray-400">No notifications yet</p>
                    <p className="text-xs text-gray-300 mt-1">
                      Order updates will appear here
                    </p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-3 border-b border-gray-50 last:border-0 transition ${
                        !n.read ? "bg-blue-50/50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {!n.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[n.status] ?? "bg-gray-100 text-gray-600"}`}>
                            {n.status}
                          </span>
                          <p className="text-sm text-gray-700 mt-1">{n.message}</p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {n.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toasts — bottom right */}
      <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden pointer-events-auto"
            >
              <div className={`h-1 w-full ${STATUS_BAR[toast.status] ?? "bg-gray-400"}`} />
              <div className="flex items-start gap-3 p-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${STATUS_COLORS[toast.status] ?? "bg-gray-100"}`}>
                  {toast.status === "PLACED" && "✓"}
                  {toast.status === "PREPARING" && "🍳"}
                  {toast.status === "READY" && "📦"}
                  {toast.status === "DELIVERED" && "🎉"}
                  {toast.status === "CANCELLED" && "✕"}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">Order update</p>
                  <p className="text-sm text-gray-500 mt-0.5">{toast.message}</p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-300 hover:text-gray-500 text-lg leading-none"
                >
                  ×
                </button>
              </div>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className={`h-0.5 ${STATUS_BAR[toast.status] ?? "bg-gray-400"} opacity-40`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}