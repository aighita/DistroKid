"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
  useDataTable,
  DataTableColumnHeader,
} from "@/components/data-table1";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { flexRender } from "@tanstack/react-table";
import * as React from "react";

// ── Merch ──

type MerchItem = {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
};

const merchItems: MerchItem[] = [
  { id: 1, name: "Logo Tee - Black", price: "$35", stock: 142, category: "Clothing" },
  { id: 2, name: "Vinyl - Electric Pulse", price: "$28", stock: 56, category: "Music" },
  { id: 3, name: "Poster - Neon Lights Tour", price: "$15", stock: 230, category: "Prints" },
  { id: 4, name: "Hoodie - Midnight Edition", price: "$55", stock: 89, category: "Clothing" },
  { id: 5, name: "Sticker Pack", price: "$8", stock: 500, category: "Accessories" },
  { id: 6, name: "Cap - DistroKid Logo", price: "$22", stock: 178, category: "Accessories" },
];

const merchColumns: ColumnDef<MerchItem, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("id")}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Item" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Category" />,
    enableSorting: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Price" />,
    cell: ({ row }) => <span className="font-semibold text-[#5227FF]">{row.getValue("price")}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "stock",
    header: ({ column }) => <DataTableColumnHeader column={column} title="In Stock" />,
    enableSorting: true,
  },
];

// ── Events ──

type EventItem = {
  id: number;
  name: string;
  date: string;
  venue: string;
  ticketsSold: number;
  capacity: number;
  status: string;
};

const events: EventItem[] = [
  { id: 1, name: "Neon Lights Tour - NYC", date: "2026-03-15", venue: "Madison Square Garden", ticketsSold: 18500, capacity: 20000, status: "On Sale" },
  { id: 2, name: "Electric Pulse Release Party", date: "2026-04-02", venue: "The Roxy, LA", ticketsSold: 800, capacity: 800, status: "Sold Out" },
  { id: 3, name: "Summer Festival Set", date: "2026-06-20", venue: "Coachella Valley", ticketsSold: 0, capacity: 50000, status: "Upcoming" },
  { id: 4, name: "Acoustic Session - London", date: "2026-07-08", venue: "Royal Albert Hall", ticketsSold: 3200, capacity: 5000, status: "On Sale" },
];

const eventColumns: ColumnDef<EventItem, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
    cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("id")}</span>,
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Event" />,
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    enableSorting: true,
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    enableSorting: true,
  },
  {
    accessorKey: "venue",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Venue" />,
    enableSorting: true,
  },
  {
    accessorKey: "ticketsSold",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tickets Sold" />,
    cell: ({ row }) => {
      const item = row.original;
      return <span>{item.ticketsSold.toLocaleString()} / {item.capacity.toLocaleString()}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      const variant = status === "Sold Out"
        ? "bg-red-100 text-red-700 border-red-200"
        : status === "On Sale"
          ? "bg-green-100 text-green-700 border-green-200"
          : "bg-yellow-100 text-yellow-700 border-yellow-200";
      return <Badge variant="secondary" className={variant}>{status}</Badge>;
    },
    enableSorting: false,
  },
];

// ── Generic paginated table ──

function PaginatedTable<T>({ data, columns, pageSize = 5 }: { data: T[]; columns: ColumnDef<T, unknown>[]; pageSize?: number }) {
  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => String((row as { id: number }).id),
  });

  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [table, pageSize]);

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
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
                <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
}

// ── Page ──

export default function MerchAndEvents() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Merch & Events</h1>
        <p className="text-muted-foreground mt-2">Sell merchandise and manage your upcoming events</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="events" className="w-full">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="merch">Merchandise</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-6">
          <PaginatedTable data={events} columns={eventColumns} pageSize={5} />
        </TabsContent>

        <TabsContent value="merch" className="mt-6">
          <PaginatedTable data={merchItems} columns={merchColumns} pageSize={5} />
        </TabsContent>
      </Tabs>
    </div>
  );
}