"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useDataTable, DataTableColumnHeader } from "@/components/data-table1";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { flexRender } from "@tanstack/react-table";
import * as React from "react";
import { useRelease } from "@/hooks/useRelease";
import { getTracksPage } from "@/services/track";
import { getCurrentUserPlatforms, getUserPlatformsById } from "@/services/user";
import { useAuthStore } from "@/stores/authStore";
import type { ReleaseRecord, PlatformRecord, TrackRecord } from "@/infrastructure/apis/client/models";
import { ReleaseTypeEnum } from "@/infrastructure/apis/client/models";
import { Pencil, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────────

const TYPE_BADGE: Record<string, string> = {
  Single: "bg-blue-100 text-blue-700 border-blue-200",
  EP: "bg-purple-100 text-purple-700 border-purple-200",
  Album: "bg-green-100 text-green-700 border-green-200",
};

// ── Release Form ───────────────────────────────────────────────────────────

function ReleaseForm({
  initial,
  onSubmit,
  onClose,
  isLoading,
}: {
  initial?: Partial<ReleaseRecord>;
  onSubmit: (data: {
    title: string;
    label: string;
    releaseType: ReleaseTypeEnum;
    releaseDate: Date;
    trackIds: string[];
    platformIds: string[];
    artistId?: string;
  }) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}) {
  const user = useAuthStore((s) => s.user);
  const isManager = user?.role === "Manager";
  const canAssignPlatforms = user?.role !== "Admin";

  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [label, setLabel] = React.useState(initial?.label ?? "");
  const [releaseType, setReleaseType] = React.useState<ReleaseTypeEnum>(
    (initial?.releaseType as ReleaseTypeEnum) ?? ReleaseTypeEnum.Single,
  );
  const [releaseDate, setReleaseDate] = React.useState(
    initial?.releaseDate
      ? new Date(initial.releaseDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [artistId, setArtistId] = React.useState(initial?.artist?.id ?? "");
  const [selectedTracks, setSelectedTracks] = React.useState<string[]>(
    initial?.tracks?.map((t) => t.id!) ?? [],
  );
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>(
    initial?.platforms?.map((p) => p.id!) ?? [],
  );
  const [availableTracks, setAvailableTracks] = React.useState<TrackRecord[]>([]);
  const [availablePlatforms, setAvailablePlatforms] = React.useState<PlatformRecord[]>([]);
  const [err, setErr] = React.useState("");
  const visibleTracks = React.useMemo(() => {
    if (!isManager) {
      return availableTracks;
    }

    if (!artistId) {
      return [];
    }

    return availableTracks.filter((track) => track.artistId === artistId);
  }, [artistId, availableTracks, isManager]);

  React.useEffect(() => {
    (async () => {
      try {
        const t = await getTracksPage(1, 100);
        setAvailableTracks(t.data ?? []);
      } catch {}
    })();
  }, []);

  React.useEffect(() => {
    if (!canAssignPlatforms) {
      setAvailablePlatforms([]);
      setSelectedPlatforms([]);
      return;
    }

    if (isManager && !artistId) {
      setAvailablePlatforms([]);
      setSelectedPlatforms([]);
      return;
    }

    (async () => {
      try {
        const platforms = isManager
          ? await getUserPlatformsById(artistId)
          : await getCurrentUserPlatforms();

        setAvailablePlatforms(platforms);
        setSelectedPlatforms((current) =>
          current.filter((platformId) => platforms.some((platform) => platform.id === platformId)),
        );
      } catch {
        setAvailablePlatforms([]);
      }
    })();
  }, [artistId, canAssignPlatforms, isManager]);

  React.useEffect(() => {
    if (!isManager) {
      return;
    }

    setSelectedTracks((current) => current.filter((trackId) => visibleTracks.some((track) => track.id === trackId)));
  }, [isManager, visibleTracks]);

  const toggleTrack = (id: string) =>
    setSelectedTracks((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const togglePlatform = (id: string) =>
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!title.trim()) return setErr("Title is required");
    if (!label.trim()) return setErr("Label is required");
    try {
      await onSubmit({
        title: title.trim(),
        label: label.trim(),
        releaseType,
        releaseDate: new Date(releaseDate),
        trackIds: selectedTracks,
        platformIds: canAssignPlatforms ? selectedPlatforms : [],
        artistId: isManager ? artistId || undefined : undefined,
      });
      onClose();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Failed to save release");
    }
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF] text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 pt-2 max-h-[70vh] overflow-y-auto pr-1"
    >
      {err && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {err}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            className={inputCls}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Release title"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Label</label>
          <input
            className={inputCls}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Type</label>
          <select
            className={inputCls}
            value={releaseType}
            onChange={(e) => setReleaseType(e.target.value as ReleaseTypeEnum)}
          >
            <option value={ReleaseTypeEnum.Single}>Single</option>
            <option value={ReleaseTypeEnum.Ep}>EP</option>
            <option value={ReleaseTypeEnum.Album}>Album</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Release Date</label>
          <input
            className={inputCls}
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>
        {isManager && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Artist ID</label>
            <input
              className={inputCls}
              value={artistId}
              onChange={(e) => setArtistId(e.target.value)}
              placeholder="Artist GUID"
            />
          </div>
        )}
      </div>

      {visibleTracks.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tracks</label>
          <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto border border-border rounded-lg p-2">
            {visibleTracks.map((t) => (
              <label
                key={t.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
              >
                <input
                  type="checkbox"
                  checked={selectedTracks.includes(t.id!)}
                  onChange={() => toggleTrack(t.id!)}
                  className="accent-[#5227FF]"
                />
                <span>{t.title}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {isManager && !artistId && (
        <p className="text-sm text-muted-foreground">Enter an artist ID to load that artist's tracks and connected platforms.</p>
      )}

      {canAssignPlatforms && availablePlatforms.length > 0 && (
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Platforms</label>
          <div className="grid grid-cols-2 gap-1 max-h-28 overflow-y-auto border border-border rounded-lg p-2">
            {availablePlatforms.map((p) => (
              <label
                key={p.id}
                className="flex items-center gap-2 text-sm cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
              >
                <input
                  type="checkbox"
                  checked={selectedPlatforms.includes(p.id!)}
                  onChange={() => togglePlatform(p.id!)}
                  className="accent-[#5227FF]"
                />
                <span className="truncate">{p.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {canAssignPlatforms && isManager && !artistId && (
        <p className="text-sm text-muted-foreground">Enter an artist ID to load that artist's connected platforms.</p>
      )}

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Saving…" : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function Releases() {
  const user = useAuthStore((s) => s.user);
  const canEdit = user?.role === "Artist" || user?.role === "Manager";
  const isAdmin = user?.role === "Admin";

  const {
    items,
    page,
    pageCount,
    isLoading,
    error,
    fetchPage,
    handleAdd,
    handleUpdate,
    handleDelete,
  } = useRelease();

  const [addOpen, setAddOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState<ReleaseRecord | null>(null);
  const [deleteItem, setDeleteItem] = React.useState<ReleaseRecord | null>(null);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    fetchPage(1, "");
  }, [fetchPage]);

  const columns: ColumnDef<ReleaseRecord, unknown>[] = [
    {
      id: "expand",
      header: () => null,
      cell: ({ row }: { row: { original: ReleaseRecord } }) => (
        <button
          onClick={() =>
            setExpandedId((prev) => (prev === row.original.id ? null : row.original.id!))
          }
          className="p-1 text-muted-foreground hover:text-foreground"
        >
          {expandedId === row.original.id ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    ...(isAdmin
      ? [
          {
            id: "artist",
            header: ({ column }: { column: any }) => <DataTableColumnHeader column={column} title="Artist" />,
            cell: ({ row }: { row: { original: ReleaseRecord } }) => (
              <span className="text-muted-foreground text-sm">
                {row.original.artist?.name || "-"}
              </span>
            ),
          } as ColumnDef<ReleaseRecord, unknown>,
        ]
      : []),
    {
      accessorKey: "label",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Label" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{row.getValue("label")}</span>
      ),
    },
    {
      accessorKey: "releaseType",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
        const t: string = row.getValue("releaseType");
        return (
          <Badge variant="secondary" className={TYPE_BADGE[t] ?? ""}>
            {t}
          </Badge>
        );
      },
    },
    {
      accessorKey: "releaseDate",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {new Date(row.getValue("releaseDate")).toLocaleDateString()}
        </span>
      ),
    },
    ...(canEdit
      ? [
          {
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({ row }: { row: { original: ReleaseRecord } }) => (
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setEditItem(row.original)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteItem(row.original)}
                  className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ),
          } as ColumnDef<ReleaseRecord, unknown>,
        ]
      : []),
  ];

  const { table } = useDataTable({
    data: items,
    columns,
    getRowId: (row) => row.id ?? Math.random().toString(),
  });

  React.useEffect(() => {
    table.setPageSize(items.length || 1);
  }, [items]);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Releases</h1>
          <p className="text-muted-foreground mt-2">Manage your singles, EPs and albums</p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground"
            placeholder="Search releases…"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              fetchPage(1, e.target.value);
            }}
          />
          {canEdit && (
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 rounded-full">
                  <Plus className="w-4 h-4" /> Add Release
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add Release</DialogTitle>
                </DialogHeader>
                <ReleaseForm
                  onSubmit={async (data) => {
                    setActionLoading(true);
                    try {
                      await handleAdd(data);
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
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="px-4">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Loading…
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedId === row.original.id && (
                    <TableRow className="bg-muted/30">
                      <TableCell colSpan={columns.length} className="px-8 py-4">
                        <div className="flex gap-12 text-sm">
                          <div>
                            <p className="font-semibold mb-2 text-muted-foreground uppercase text-xs tracking-wide">
                              Tracks ({row.original.tracks?.length ?? 0})
                            </p>
                            {row.original.tracks?.length ? (
                              <ul className="space-y-1">
                                {row.original.tracks.map((t) => (
                                  <li key={t.id} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5227FF]" />
                                    {t.title}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground italic">No tracks</p>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold mb-2 text-muted-foreground uppercase text-xs tracking-wide">
                              Platforms ({row.original.platforms?.length ?? 0})
                            </p>
                            {row.original.platforms?.length ? (
                              <ul className="space-y-1">
                                {row.original.platforms.map((p) => (
                                  <li key={p.id} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#5227FF]" />
                                    {p.name}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-muted-foreground italic">No platforms</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No releases found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Page {page} of {pageCount}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPage(page - 1, searchInput)}
            disabled={page <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchPage(page + 1, searchInput)}
            disabled={page >= pageCount || isLoading}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit dialog */}
      {editItem && (
        <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Release</DialogTitle>
            </DialogHeader>
            <ReleaseForm
              initial={editItem}
              onSubmit={async (data) => {
                setActionLoading(true);
                try {
                  await handleUpdate(editItem.id!, data);
                } finally {
                  setActionLoading(false);
                }
              }}
              onClose={() => setEditItem(null)}
              isLoading={actionLoading}
            />
          </DialogContent>
        </Dialog>
      )}
      {/* Delete dialog */}
      <AlertDialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the release
              "{deleteItem?.title}" and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              disabled={actionLoading}
              onClick={async (e) => {
                e.preventDefault();
                if (!deleteItem) return;
                setActionLoading(true);
                try {
                  await handleDelete(deleteItem.id!);
                  setDeleteItem(null);
                } finally {
                  setActionLoading(false);
                }
              }}
            >
              {actionLoading ? "Deleting..." : "Delete Release"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}