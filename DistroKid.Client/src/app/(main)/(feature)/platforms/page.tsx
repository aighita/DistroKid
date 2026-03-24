"use client";

import { usePlatform } from "@/hooks/usePlatform";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

export default function Platforms() {
  const { platforms, fetchAllPlatforms } = usePlatform();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPlatforms = async () => {
      setIsLoading(true);
      await fetchAllPlatforms();
      setIsLoading(false);
    };
    loadPlatforms();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Platforms</h1>
        <p className="text-muted-foreground mt-2">Manage your music distribution across streaming platforms</p>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <p className="text-muted-foreground">Loading platforms...</p>
          </div>
        ) : platforms.length > 0 ? (
          platforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-border bg-background hover:border-[#5227FF] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-[#5227FF] transition-colors">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 break-all">
                    {platform.url}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-2 text-[#5227FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">Visit</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center py-20">
            <p className="text-muted-foreground">No platforms available</p>
          </div>
        )}
      </div>
    </div>
  );
}

