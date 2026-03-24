"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthGuard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    // If user is logged in, redirect to dashboard
    if (user) {
      router.replace("/");
    }
  }, [user, isLoading, mounted, router]);

  // Show nothing while checking authentication or redirecting
  if (!mounted || isLoading || user) {
    return null;
  }

  return <>{children}</>;
}
