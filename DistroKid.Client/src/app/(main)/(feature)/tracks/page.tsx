"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
  useDataTable,
  DataTableColumnHeader,
} from "@/components/data-table1";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { getPaginationRowModel } from "@tanstack/react-table";
import * as React from "react";

type Track = {
  id: number;
  title: string;
  artist: string;
  duration: string;
  isrc: string;
  uploadedAt: string;
};

const tracks: Track[] = [
  { id: 1, title: "Midnight Dreams", artist: "Youlee", duration: "3:42", isrc: "USRC11234567", uploadedAt: "2026-03-10" },
  { id: 2, title: "Pulse Beat", artist: "Youlee", duration: "4:15", isrc: "USRC11234568", uploadedAt: "2026-03-09" },
  { id: 3, title: "Electric Rise", artist: "Youlee", duration: "3:58", isrc: "USRC11234569", uploadedAt: "2026-03-08" },
  { id: 4, title: "High Voltage", artist: "Youlee", duration: "5:01", isrc: "USRC11234570", uploadedAt: "2026-03-07" },
  { id: 5, title: "Neon Lights", artist: "Youlee", duration: "3:22", isrc: "USRC11234571", uploadedAt: "2026-03-06" },
  { id: 6, title: "After Hours", artist: "Youlee", duration: "4:44", isrc: "USRC11234572", uploadedAt: "2026-03-05" },
  { id: 7, title: "Sunset Drive", artist: "Youlee", duration: "3:11", isrc: "USRC11234573", uploadedAt: "2026-03-04" },
  { id: 8, title: "Crystal Waves", artist: "Youlee", duration: "4:02", isrc: "USRC11234574", uploadedAt: "2026-03-03" },
  { id: 9, title: "City Noise", artist: "Youlee", duration: "3:55", isrc: "USRC11234575", uploadedAt: "2026-03-02" },
  { id: 10, title: "Underground", artist: "Youlee", duration: "4:23", isrc: "USRC11234576", uploadedAt: "2026-03-01" },
];

const columns: ColumnDef<Track, unknown>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="#" />
    ),
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("id")}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "artist",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artist" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "isrc",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ISRC" />
    ),
    cell: ({ row }) => (
      <span className="font-mono text-xs text-muted-foreground">{row.getValue("isrc")}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "uploadedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Uploaded" />
    ),
    enableSorting: true,
  },
];

const PAGE_SIZE = 5;

export default function Tracks() {
  const { table } = useDataTable({
    data: tracks,
    columns,
    getRowId: (row) => row.id.toString(),
  });

  React.useEffect(() => {
    table.setPageSize(PAGE_SIZE);
  }, [table]);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Tracks</h1>
          <p className="text-muted-foreground mt-2">Browse and manage all your individual tracks</p>
        </div>
        <div className="flex gap-3">
          <input
            className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground"
            placeholder="Search tracks..."
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
