"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type SessionData = {
  user: any;
  session: any;
} | null;

export function useSession() {
  const [data, setData] = useState<SessionData>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.getSession().then((res) => {
      setData(res?.data ?? null);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}