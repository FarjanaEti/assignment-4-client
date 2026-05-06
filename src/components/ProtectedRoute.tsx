"use client";

import { useSession } from "@/hooks/userSession";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { data, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!data?.user) {
        // Not logged in
        router.push("/login");
      } else if (allowedRoles && !allowedRoles.includes(data.user.role)) {
        // Role not authorized
        router.push("/");
      }
    }
  }, [data, loading, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // If no user and not loading, the useEffect will handle redirection.
  // But we shouldn't render children if not authorized.
  if (!data?.user || (allowedRoles && !allowedRoles.includes(data.user.role))) {
    return null;
  }

  return <>{children}</>;
}
