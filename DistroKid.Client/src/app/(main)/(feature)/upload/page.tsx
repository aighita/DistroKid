'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tracks?openAdd=1");
  }, [router]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-8 py-12">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight">Redirecting to Tracks</h1>
        <p className="text-muted-foreground mt-3">The upload page is deprecated. The add-track dialog will open automatically.</p>
      </div>
    </div>
  );
}
