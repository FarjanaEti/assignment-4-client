"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

type Props = {
  user: {
    name?: string;
    role?: string;
    image?: string;
  } | null;
};

export default function NavbarAuth({ user }: Props) {
   const handleLogout = async () => {
    console.log(" logout")                          
  await fetch("/api/auth/sign-out", { method: "POST" });
  window.location.href = "/login";
};

  if (!user) {
    return (
      <>
        <Button variant="outline" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/register">Register</Link>
        </Button>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        {user.image ? (
          <img
            src={user.image}
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <User className="h-5 w-5" />
        )}

        <div className="leading-tight">
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.role}</p>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        className="flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </Button>
    </div>
  );
}
