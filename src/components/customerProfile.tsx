"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type InfoRowProps = {
  label: string;
  value: ReactNode;
  muted?: boolean;
};
export default function CustomerProfile({
  user,
}: {
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    phone?: string | null;
    role?: string;
    createdAt: string;
  } | null;
}) {
  if (!user) return null;
  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-red-50 flex items-center justify-center px-4">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl w-full grid md:grid-cols-3 gap-6"
      >
        {/* Profile Card */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center"
        >
          {/* Avatar */}
          <div className="w-28 h-28 rounded-full bg-linear-to-br from-yellow-800 to-yellow-500 flex items-center justify-center text-white text-4xl font-bold mb-4">
            {user.name?.charAt(0)}
          </div>

          <h2 className="text-xl font-semibold text-gray-800">
            {user.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Customer
          </p>

          {user.emailVerified && (
            <span className="mt-4 px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
              Email Verified
            </span>
          )}
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8"
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Profile Information
          </h3>

          <div className="space-y-5">
            <InfoRow label="Full Name" value={user.name} />
            <InfoRow label="Email Address" value={user.email} />
            <InfoRow
              label="Phone Number"
              value={user.phone || "Not added yet"}
              muted={!user.phone}
            />
            <InfoRow
              label="Member Since"
              value={new Date(user.createdAt).toDateString()}
            />
          </div>

          <div className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg bg-yellow-800 text-white font-medium shadow hover:bg-orange-600"
            >
              Edit Profile
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Change Password
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
function InfoRow({ label, value, muted = false }: InfoRowProps) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p
        className={`font-medium ${
          muted ? "text-gray-400" : "text-gray-800"
        }`}
      >
        {value}
      </p>
    </div>
  );
}