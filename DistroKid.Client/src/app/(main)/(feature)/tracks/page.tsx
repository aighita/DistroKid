"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { useDataTable, DataTableColumnHeader } from "@/components/data-table1";
import { Button } from "@/components/ui/button";
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
import { flexRender, getPaginationRowModel } from "@tanstack/react-table";
import * as React from "react";
import { useTrack } from "@/hooks/useTrack";
import { useAuthStore } from "@/stores/authStore";
import type { TrackRecord } from "@/infrastructure/apis/client/models";
import { Pencil, Trash2, Plus } from "lucide-react";

// â”€â”€ helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// â”€â”€ Track Form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function TrackForm({
  initial,
  onSubmit,
  onClose,
  isLoading,
}: {
  initial?: Partial<TrackRecord>;
  onSubmit: (data: { title: string; durationInSeconds: number; isrc: string }) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [duration, setDuration] = React.useState(String(initial?.durationInSeconds ?? ""));
  const [isrc, setIsrc] = React.useState(initial?.isrc ?? "");
  const [err, setErr] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const d = parseInt(duration, 10);
    if (!title.trim()) return setErr("Title is required");
    if (isNaN(d) || d <= 0) return setErr("Duration must be a positive number");
    if (!isrc.trim()) return setErr("ISRC is required");
    try {
      await onSubmit({ title: title.trim(), durationInSeconds: d, isrc: isrc.trim() });
      onClose();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Failed to save track");
    }
  };

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF] text-sm";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      {err && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {err}
        </p>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Title</label>
        <input className={inputCls} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Track title" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Duration (seconds)</label>
        <input className={inputCls} type="number" min={1} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="e.g. 213" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">ISRC</label>
        <input className={inputCls} value={isrc} onChange={(e) => setIsrc(e.target.value)} placeholder="e.g. USRC11234567" maxLength={15} />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? "Savingâ€¦" : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

// â”€â”€ Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function Tracks() {
  const user = useAuthStore((s) => s.user);
  const canEdit = user?.role === "Artist" || user?.role === "Admin";

  const { items, page, pageCount, isLoading, error, fetchPage, handleAdd, handleUpdate, handleDelete } =
    useTrack();

  const [addOpen, setAddOpen] = React.useState(false);
  const [editItem, setEditItem] = React.useState<TrackRecord | null>(null);
  const [actionLoading, setActionLoading] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  React.useEffect(() => {
    fetchPage(1, "");
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    fetchPage(1, e.target.value);
  };

  const columns: ColumnDef<TrackRecord, unknown>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Title" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "durationInSeconds",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
      cell: ({ row }) => (
        <span className="tabular-nums text-muted-foreground">
          {formatDuration(row.getValue("durationInSeconds"))}
        </span>
      ),
    },
    {
      accessorKey: "isrc",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ISRC" />,
      cell: ({ row }) => (
        <span className="font-mono text-xs text-muted-foreground">{row.getValue("isrc")}</span>
      ),
    },
    ...(canEdit
      ? [
          {
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({ row }: { row: { original: TrackRecord } }) => (
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setEditItem(row.original)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this track?")) return;
                    setActionLoading(true);
                    try { await handleDelete(row.original.id!); } finally { setActionLoading(false); }
                  }}
                  className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ),
          } as ColumnDef<TrackRecord, unknown>,
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
          <h1 className="text-4xl font-bold tracking-tight">Tracks</h1>
          <p className="text-muted-foreground mt-2">Browse and manage all your individual tracks</p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground"
            placeholder="Search tracksâ€¦"
            value={searchInput}
            onChange={handleSearch}
          />
          {canEdit && (
            <Dialog open={addOpen} onOpenChange={setAddOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 rounded-full">
                  <Plus className="w-4 h-4" /> Add Track
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Track</DialogTitle>
                </DialogHeader>
                <TrackForm
                  onSubmit={async (data) => { setActionLoading(true); try { await handleAdd(data); } finally { setActionLoading(false); } }}
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Loadingâ€¦
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No tracks found.
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
          <Button variant="outline" size="sm" onClick={() => fetchPage(page - 1, searchInput)} disabled={page <= 1 || isLoading}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => fetchPage(page + 1, searchInput)} disabled={page >= pageCount || isLoading}>
            Next
          </Button>
        </div>
      </div>

      {/* Edit dialog */}
      {editItem && (
        <Dialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Track</DialogTitle>
            </DialogHeader>
            <TrackForm
              initial={editItem}
              onSubmit={async (data) => {
                setActionLoading(true);
                try { await handleUpdate(editItem.id!, data); } finally { setActionLoading(false); }
              }}
              onClose={() => setEditItem(null)}
              isLoading={actionLoading}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

