"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  LogOut, 
  User, 
  ChevronDown,
} from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { ROLE_NAVIGATION, NavItem } from "@/constant/navigation";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    image?: string;
  } | null;
};

export default function NavbarAuth({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP Animation
  useGSAP(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current, 
        { opacity: 0, y: -10, scale: 0.95, display: "none" },
        { opacity: 1, y: 0, scale: 1, display: "block", duration: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        opacity: 0, y: -10, scale: 0.95, duration: 0.2, ease: "power2.in",
        onComplete: () => {
          if (menuRef.current) menuRef.current.style.display = "none";
        }
      });
    }
  }, [isOpen]);

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link 
          href="/login" 
          className="text-sm font-medium hover:text-primary transition-colors px-2"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  // Get navigation items based on role
  const roleItems = ROLE_NAVIGATION[user.role.toUpperCase()] || [];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-muted transition-all duration-300 group"
      >
        <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary/30 transition-all">
          {user.image ? (
            <img src={user.image} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
          )}
        </div>
        <div className="hidden md:block text-left mr-1">
          <p className="text-xs font-bold leading-none mb-1 line-clamp-1">{user.name}</p>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{user.role}</p>
        </div>
        <ChevronDown 
          size={14} 
          className={cn("text-muted-foreground transition-transform duration-300 mr-1", isOpen && "rotate-180")} 
        />
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-card shadow-2xl backdrop-blur-xl z-[100] overflow-hidden hidden"
      >
        {/* User Info Header */}
        <div className="p-5 bg-muted/30 border-b border-border/50">
          <p className="font-bold text-base truncate mb-0.5">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>

        <div className="p-2">
          {/* Role-Based Navigation */}
          <div className="space-y-1 py-1">
            {roleItems.map((item) => (
              <DropdownLink 
                key={item.href} 
                href={item.href} 
                icon={<item.icon size={18} />} 
                label={item.label} 
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>

          <div className="h-px bg-border/50 mx-2 my-1" />

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function DropdownLink({ 
  href, 
  icon, 
  label, 
  onClick 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-all duration-200"
    >
      <span className="text-muted-foreground group-hover:text-primary transition-colors">{icon}</span>
      {label}
    </Link>
  );
}
