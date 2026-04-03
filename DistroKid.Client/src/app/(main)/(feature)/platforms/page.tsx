"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { PlatformRecord } from "@/infrastructure/apis/client/models";
import { useAuthStore } from "@/stores/authStore";
import { getAllPlatforms } from "@/services/platform";
import {
  connectCurrentUserPlatform,
  disconnectCurrentUserPlatform,
  getCurrentUserPlatforms,
} from "@/services/user";

export default function Platforms() {
  const user = useAuthStore((state) => state.user);
  const isArtist = user?.role === "Artist";
  const [platforms, setPlatforms] = useState<PlatformRecord[]>([]);
  const [connectedPlatformIds, setConnectedPlatformIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionPlatformId, setActionPlatformId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPlatforms = async () => {
      setIsLoading(true);
      setError("");

      try {
        const [allPlatforms, connectedPlatforms] = await Promise.all([
          getAllPlatforms(),
          isArtist ? getCurrentUserPlatforms() : Promise.resolve([]),
        ]);

        setPlatforms(allPlatforms);
        setConnectedPlatformIds(connectedPlatforms.map((platform) => platform.id ?? ""));
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Failed to load platforms");
      } finally {
        setIsLoading(false);
      }
    };

    loadPlatforms();
  }, [isArtist]);

  const handleTogglePlatform = async (platformId: string) => {
    if (!isArtist) {
      return;
    }

    setActionPlatformId(platformId);
    setError("");

    try {
      const updatedPlatforms = connectedPlatformIds.includes(platformId)
        ? await disconnectCurrentUserPlatform(platformId)
        : await connectCurrentUserPlatform(platformId);

      setConnectedPlatformIds(updatedPlatforms.map((platform) => platform.id ?? ""));
    } catch (toggleError) {
      setError(toggleError instanceof Error ? toggleError.message : "Failed to update platform connection");
    } finally {
      setActionPlatformId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Platforms</h1>
        <p className="text-muted-foreground mt-2">Manage your music distribution across streaming platforms</p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <p className="text-muted-foreground">Loading platforms...</p>
          </div>
        ) : platforms.length > 0 ? (
          platforms.map((platform) => (
            <div
              key={platform.id}
              className="group rounded-xl border border-border bg-background hover:border-[#5227FF] hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-[#5227FF] transition-colors">
                      {platform.name}
                    </h3>
                    {isArtist && connectedPlatformIds.includes(platform.id ?? "") && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                        Connected
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 break-all">
                    {platform.url}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#5227FF] opacity-80 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="text-sm font-medium">Visit</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  {isArtist && platform.id && (
                    <Button
                      type="button"
                      variant={connectedPlatformIds.includes(platform.id) ? "outline" : "default"}
                      onClick={() => handleTogglePlatform(platform.id!)}
                      disabled={actionPlatformId === platform.id}
                      className="rounded-full"
                    >
                      {actionPlatformId === platform.id
                        ? "Updating..."
                        : connectedPlatformIds.includes(platform.id)
                          ? "Disconnect"
                          : "Connect"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
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

