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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { flexRender } from "@tanstack/react-table";
import * as React from "react";
import { useMerch } from "@/hooks/useMerch";
import { useEvent } from "@/hooks/useEvent";
import { useAuthStore } from "@/stores/authStore";
import type { MerchRecord, EventRecord } from "@/infrastructure/apis/client/models";
import { Pencil, Trash2, Plus } from "lucide-react";

// â”€â”€ Merch form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function MerchForm({
  initial,
  onSubmit,
  onClose,
  isLoading,
}: {
  initial?: Partial<MerchRecord>;
  onSubmit: (d: { name: string; description: string; price: number; stock: number }) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [description, setDescription] = React.useState(initial?.description ?? "");
  const [price, setPrice] = React.useState(String(initial?.price ?? ""));
  const [stock, setStock] = React.useState(String(initial?.stock ?? ""));
  const [err, setErr] = React.useState("");

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF] text-sm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const p = parseFloat(price);
    const s = parseInt(stock, 10);
    if (!name.trim()) return setErr("Name is required");
    if (isNaN(p) || p < 0) return setErr("Price must be a valid non-negative number");
    if (isNaN(s) || s < 0) return setErr("Stock must be a valid non-negative number");
    try {
      await onSubmit({ name: name.trim(), description: description.trim(), price: p, stock: s });
      onClose();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Failed to save");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      {err && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Name</label>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Item name" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          className={inputCls + " resize-none"}
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Price ($)</label>
          <input className={inputCls} type="number" min={0} step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 29.99" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Stock</label>
          <input className={inputCls} type="number" min={0} value={stock} onChange={(e) => setStock(e.target.value)} placeholder="e.g. 100" />
        </div>
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

// â”€â”€ Event form â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function EventForm({
  initial,
  onSubmit,
  onClose,
  isLoading,
}: {
  initial?: Partial<EventRecord>;
  onSubmit: (d: { name: string; description: string; location: string; date: Date }) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}) {
  const [name, setName] = React.useState(initial?.name ?? "");
  const [description, setDescription] = React.useState(initial?.description ?? "");
  const [location, setLocation] = React.useState(initial?.location ?? "");
  const [date, setDate] = React.useState(
    initial?.date ? new Date(initial.date).toISOString().split("T")[0] : "",
  );
  const [err, setErr] = React.useState("");

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF] text-sm";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!name.trim()) return setErr("Name is required");
    if (!location.trim()) return setErr("Location is required");
    if (!date) return setErr("Date is required");
    try {
      await onSubmit({ name: name.trim(), description: description.trim(), location: location.trim(), date: new Date(date) });
      onClose();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Failed to save");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      {err && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>
      )}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Name</label>
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Event name" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Description</label>
        <textarea
          className={inputCls + " resize-none"}
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Location</label>
          <input className={inputCls} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Venue / City" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Date</label>
          <input className={inputCls} type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
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

export default function MerchAndEvents() {
  const user = useAuthStore((s) => s.user);
  const canEdit = user?.role === "Artist" || user?.role === "Admin";

  // â”€â”€ Merch state â”€â”€
  const {
    items: merch,
    page: mPage,
    pageCount: mPageCount,
    isLoading: mLoading,
    error: mError,
    fetchPage: mFetch,
    handleAdd: mAdd,
    handleUpdate: mUpdate,
    handleDelete: mDelete,
  } = useMerch();

  const [mAddOpen, setMAddOpen] = React.useState(false);
  const [mEditItem, setMEditItem] = React.useState<MerchRecord | null>(null);
  const [mActionLoading, setMActionLoading] = React.useState(false);
  const [mSearch, setMSearch] = React.useState("");

  // â”€â”€ Event state â”€â”€
  const {
    items: events,
    page: ePage,
    pageCount: ePageCount,
    isLoading: eLoading,
    error: eError,
    fetchPage: eFetch,
    handleAdd: eAdd,
    handleUpdate: eUpdate,
    handleDelete: eDelete,
  } = useEvent();

  const [eAddOpen, setEAddOpen] = React.useState(false);
  const [eEditItem, setEEditItem] = React.useState<EventRecord | null>(null);
  const [eActionLoading, setEActionLoading] = React.useState(false);
  const [eSearch, setESearch] = React.useState("");

  React.useEffect(() => {
    mFetch(1, "");
    eFetch(1, "");
  }, []);

  // â”€â”€ Merch columns â”€â”€
  const merchColumns: ColumnDef<MerchRecord, unknown>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Item" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm line-clamp-1">
          {row.getValue("description")}
        </span>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
      cell: ({ row }) => (
        <span className="font-semibold text-[#5227FF]">
          ${(row.getValue("price") as number).toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Stock" />,
      cell: ({ row }) => <span>{(row.getValue("stock") as number).toLocaleString()}</span>,
    },
    ...(canEdit
      ? [
          {
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({ row }: { row: { original: MerchRecord } }) => (
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setMEditItem(row.original)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this item?")) return;
                    setMActionLoading(true);
                    try {
                      await mDelete(row.original.id!);
                    } finally {
                      setMActionLoading(false);
                    }
                  }}
                  className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ),
          } as ColumnDef<MerchRecord, unknown>,
        ]
      : []),
  ];

  // â”€â”€ Event columns â”€â”€
  const eventColumns: ColumnDef<EventRecord, unknown>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Event" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "location",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Location" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">{row.getValue("location")}</span>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm">
          {new Date(row.getValue("date")).toLocaleDateString()}
        </span>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => (
        <span className="text-muted-foreground text-sm line-clamp-1">
          {row.getValue("description")}
        </span>
      ),
    },
    ...(canEdit
      ? [
          {
            id: "actions",
            header: () => <span className="sr-only">Actions</span>,
            cell: ({ row }: { row: { original: EventRecord } }) => (
              <div className="flex items-center gap-2 justify-end">
                <button
                  onClick={() => setEEditItem(row.original)}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={async () => {
                    if (!confirm("Delete this event?")) return;
                    setEActionLoading(true);
                    try {
                      await eDelete(row.original.id!);
                    } finally {
                      setEActionLoading(false);
                    }
                  }}
                  className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ),
          } as ColumnDef<EventRecord, unknown>,
        ]
      : []),
  ];

  const { table: mTable } = useDataTable({
    data: merch,
    columns: merchColumns,
    getRowId: (row) => row.id ?? Math.random().toString(),
  });
  React.useEffect(() => { mTable.setPageSize(merch.length || 1); }, [merch]);

  const { table: eTable } = useDataTable({
    data: events,
    columns: eventColumns,
    getRowId: (row) => row.id ?? Math.random().toString(),
  });
  React.useEffect(() => { eTable.setPageSize(events.length || 1); }, [events]);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Merch & Events</h1>
        <p className="text-muted-foreground mt-2">Sell merchandise and manage your upcoming events</p>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="merch">Merchandise</TabsTrigger>
        </TabsList>

        {/* â”€â”€ Events tab â”€â”€ */}
        <TabsContent value="events" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <input
              className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground"
              placeholder="Search eventsâ€¦"
              value={eSearch}
              onChange={(e) => { setESearch(e.target.value); eFetch(1, e.target.value); }}
            />
            {canEdit && (
              <Dialog open={eAddOpen} onOpenChange={setEAddOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 rounded-full">
                    <Plus className="w-4 h-4" /> Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Event</DialogTitle></DialogHeader>
                  <EventForm
                    onSubmit={async (d) => { setEActionLoading(true); try { await eAdd(d); } finally { setEActionLoading(false); } }}
                    onClose={() => setEAddOpen(false)}
                    isLoading={eActionLoading}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
          {eError && (
            <div className="mb-4 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">{eError}</div>
          )}
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                {eTable.getHeaderGroups().map((hg) => (
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
                {eLoading ? (
                  <TableRow><TableCell colSpan={eventColumns.length} className="h-24 text-center text-muted-foreground">Loadingâ€¦</TableCell></TableRow>
                ) : eTable.getRowModel().rows.length ? (
                  eTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={eventColumns.length} className="h-24 text-center text-muted-foreground">No events found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Page {ePage} of {ePageCount}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => eFetch(ePage - 1, eSearch)} disabled={ePage <= 1 || eLoading}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => eFetch(ePage + 1, eSearch)} disabled={ePage >= ePageCount || eLoading}>Next</Button>
            </div>
          </div>
          {eEditItem && (
            <Dialog open={!!eEditItem} onOpenChange={(o) => !o && setEEditItem(null)}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Event</DialogTitle></DialogHeader>
                <EventForm
                  initial={eEditItem}
                  onSubmit={async (d) => { setEActionLoading(true); try { await eUpdate(eEditItem.id!, d); } finally { setEActionLoading(false); } }}
                  onClose={() => setEEditItem(null)}
                  isLoading={eActionLoading}
                />
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>

        {/* â”€â”€ Merch tab â”€â”€ */}
        <TabsContent value="merch" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <input
              className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground"
              placeholder="Search merchâ€¦"
              value={mSearch}
              onChange={(e) => { setMSearch(e.target.value); mFetch(1, e.target.value); }}
            />
            {canEdit && (
              <Dialog open={mAddOpen} onOpenChange={setMAddOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 rounded-full">
                    <Plus className="w-4 h-4" /> Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Add Merch Item</DialogTitle></DialogHeader>
                  <MerchForm
                    onSubmit={async (d) => { setMActionLoading(true); try { await mAdd(d); } finally { setMActionLoading(false); } }}
                    onClose={() => setMAddOpen(false)}
                    isLoading={mActionLoading}
                  />
                </DialogContent>
              </Dialog>
            )}
          </div>
          {mError && (
            <div className="mb-4 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">{mError}</div>
          )}
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                {mTable.getHeaderGroups().map((hg) => (
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
                {mLoading ? (
                  <TableRow><TableCell colSpan={merchColumns.length} className="h-24 text-center text-muted-foreground">Loadingâ€¦</TableCell></TableRow>
                ) : mTable.getRowModel().rows.length ? (
                  mTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={merchColumns.length} className="h-24 text-center text-muted-foreground">No items found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">Page {mPage} of {mPageCount}</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => mFetch(mPage - 1, mSearch)} disabled={mPage <= 1 || mLoading}>Previous</Button>
              <Button variant="outline" size="sm" onClick={() => mFetch(mPage + 1, mSearch)} disabled={mPage >= mPageCount || mLoading}>Next</Button>
            </div>
          </div>
          {mEditItem && (
            <Dialog open={!!mEditItem} onOpenChange={(o) => !o && setMEditItem(null)}>
              <DialogContent>
                <DialogHeader><DialogTitle>Edit Merch Item</DialogTitle></DialogHeader>
                <MerchForm
                  initial={mEditItem}
                  onSubmit={async (d) => { setMActionLoading(true); try { await mUpdate(mEditItem.id!, d); } finally { setMActionLoading(false); } }}
                  onClose={() => setMEditItem(null)}
                  isLoading={mActionLoading}
                />
              </DialogContent>
            </Dialog>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
