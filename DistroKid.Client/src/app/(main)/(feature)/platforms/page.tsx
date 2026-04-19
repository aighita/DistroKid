"use client";

import * as React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { PlatformRecord } from "@/infrastructure/apis/client/models";
import { useAuthStore } from "@/stores/authStore";
import { addPlatform, deletePlatform, getAllPlatforms } from "@/services/platform";
import {
  connectCurrentUserPlatform,
  disconnectCurrentUserPlatform,
  getCurrentUserPlatforms,
} from "@/services/user";
import { Plus, Trash2 } from "lucide-react";

function PlatformForm({
  onSubmit,
  onClose,
  isLoading,
}: {
  onSubmit: (data: { name: string; url: string }) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [err, setErr] = React.useState("");

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF] text-sm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");

    if (!name.trim()) {
      setErr("Name is required");
      return;
    }

    if (!url.trim()) {
      setErr("URL is required");
      return;
    }

    try {
      new URL(url.trim());
    } catch {
      setErr("URL must be valid");
      return;
    }

    try {
      await onSubmit({ name: name.trim(), url: url.trim() });
      onClose();
    } catch (submitError) {
      setErr(submitError instanceof Error ? submitError.message : "Failed to add platform");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      {err && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {err}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Name</label>
        <input
          className={inputCls}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Platform name"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">URL</label>
        <input
          className={inputCls}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://platform.example.com"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default function Platforms() {
  const user = useAuthStore((state) => state.user);
  const isArtist = user?.role === "Artist";
  const isAdmin = user?.role === "Admin";
  const [platforms, setPlatforms] = React.useState<PlatformRecord[]>([]);
  const [connectedPlatformIds, setConnectedPlatformIds] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [actionPlatformId, setActionPlatformId] = React.useState<string | null>(null);
  const [error, setError] = React.useState("");
  const [addOpen, setAddOpen] = React.useState(false);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [deleteItem, setDeleteItem] = React.useState<PlatformRecord | null>(null);

  const loadPlatforms = React.useCallback(async () => {
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
  }, [isArtist]);

  React.useEffect(() => {
    loadPlatforms();
  }, [loadPlatforms]);

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
      
      <div className="mb-12 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Platforms</h1>
          <p className="text-muted-foreground mt-2">Manage your music distribution across streaming platforms</p>
        </div>
        {isAdmin && (
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 rounded-full">
                <Plus className="w-4 h-4" /> Add Platform
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Platform</DialogTitle>
              </DialogHeader>
              <PlatformForm
                onSubmit={async (data) => {
                  setActionLoading(true);
                  try {
                    await addPlatform(data);
                    await loadPlatforms();
                  } finally {
                    setActionLoading(false);
                  }
                }}
                onClose={() => setAddOpen(false)}
                isLoading={actionLoading}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      
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
                  {isAdmin && platform.id && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDeleteItem(platform)}
                      className="rounded-full text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
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

      <AlertDialog open={!!deleteItem} onOpenChange={(open) => !open && setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete platform?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the platform "{deleteItem?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              disabled={actionLoading}
              onClick={async (e) => {
                e.preventDefault();
                if (!deleteItem?.id) {
                  return;
                }

                setActionLoading(true);
                setError("");

                try {
                  await deletePlatform(deleteItem.id);
                  setDeleteItem(null);
                  await loadPlatforms();
                } catch (deleteError) {
                  setError(deleteError instanceof Error ? deleteError.message : "Failed to delete platform");
                } finally {
                  setActionLoading(false);
                }
              }}
            >
              {actionLoading ? "Deleting..." : "Delete Platform"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

