"use client";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

type InfoRowProps = {
  label: string;
  value: ReactNode;
  muted?: boolean;
};

function InfoRow({ label, value, muted = false }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-medium text-right ${muted ? "text-gray-400" : "text-gray-800"}`}>
        {value}
      </p>
    </div>
  );
}

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
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
  });

  if (!user) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // call your update profile API here
      // await userService.updateProfile(form);
      setSaveMsg("Profile updated!");
      setIsEditing(false);
      router.refresh();
    } catch {
      setSaveMsg("Failed to update profile");
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMsg(""), 3000);
    }
  };

  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const memberDays = Math.floor(
    (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex items-start justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-4xl w-full space-y-6"
      >

        {/* Top Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary rounded-3xl p-8 text-primary-foreground flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white text-3xl font-bold shrink-0">
            {user.image ? (
              <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              initials
            )}
          </div>

          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-primary-foreground/80 text-sm mt-1">{user.email}</p>
            <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start">
              {user.emailVerified && (
                <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                  ✓ Email Verified
                </span>
              )}
              <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                Customer
              </span>
              <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                Member for {memberDays} days
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-6 bg-white/10 rounded-2xl px-6 py-4 shrink-0">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {new Date(user.createdAt).getFullYear()}
              </p>
              <p className="text-xs text-primary-foreground/80 mt-1">Joined</p>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT: Quick Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Account Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-5">
              <h3 className="text-sm font-semibold text-secondary mb-4">Account status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${user.emailVerified ? "bg-accent/10 text-accent" : "bg-red-100 text-red-500"}`}>
                    {user.emailVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${user.phone ? "bg-accent/10 text-accent" : "bg-neutral-100 text-secondary"}`}>
                    {user.phone ? "Added" : "Not added"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Role</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-secondary">
                    {user.role ?? "Customer"}
                  </span>
                </div>
              </div>
            </div>

            {/* Member Since */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Member since</h3>
              <p className="text-2xl font-bold text-secondary">
                {new Date(user.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(user.createdAt).toDateString()}
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Profile Details + Edit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Profile information</h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
                >
                  Edit
                </button>
              )}
            </div>

            {!isEditing ? (
              <div>
                <InfoRow label="Full name" value={user.name} />
                <InfoRow label="Email address" value={user.email} />
                <InfoRow
                  label="Phone number"
                  value={user.phone || "Not added yet"}
                  muted={!user.phone}
                />
                <InfoRow
                  label="Member since"
                  value={new Date(user.createdAt).toDateString()}
                />
                <InfoRow
                  label="Account role"
                  value={user.role ?? "Customer"}
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-600 block mb-1">Full name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm text-neutral-600 block mb-1">Phone number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+8801XXXXXXXXX"
                    className="w-full border border-neutral-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-500 block mb-1">Email address</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full border border-gray-100 rounded-lg px-4 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
                </div>

                <div className="flex gap-3 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-60 transition"
                  >
                    {isSaving ? "Saving..." : "Save changes"}
                  </motion.button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setForm({ name: user.name, phone: user.phone ?? "" });
                    }}
                    className="px-6 py-2 rounded-lg border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>

                {saveMsg && (
                  <p className={`text-sm mt-2 ${saveMsg.includes("Failed") ? "text-red-500" : "text-accent"}`}>
                    {saveMsg}
                  </p>
                )}
              </div>
            )}

            {/* Change Password */}
            {!isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Security</h4>
                <button className="px-5 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
                  Change password
                </button>
              </div>
            )}
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}