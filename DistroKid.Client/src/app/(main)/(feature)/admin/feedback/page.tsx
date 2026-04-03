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
import { flexRender } from "@tanstack/react-table";
import * as React from "react";
import { useFeedback } from "@/hooks/useFeedback";
import type { FeedbackRecord } from "@/infrastructure/apis/client/models";
import { MessageSquare, Star, User as UserIcon, ShieldAlert, BadgeAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function FeedbackAdminPage() {
  const { items, page, pageCount, isLoading, error, fetchPage, handleSearch, search } = useFeedback();

  const [searchInput, setSearchInput] = React.useState("");

  const columns: ColumnDef<FeedbackRecord, unknown>[] = [
    {
      accessorKey: "type",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
      cell: ({ row }) => {
          const type = row.getValue("type") as string;
          let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
          if (type === "Bug") variant = "destructive";
          if (type === "Suggestion") variant = "default";
          
          return (
              <Badge variant={variant} className="rounded-full px-3">
                  {type}
              </Badge>
          );
      }
    },
    {
      accessorKey: "rating",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Rating" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 text-amber-500 font-bold">
            {row.getValue("rating")}
            <Star className="w-3.5 h-3.5 fill-current" />
        </div>
      ),
    },
    {
      accessorKey: "comment",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Comment" />,
      cell: ({ row }) => (
        <div className="max-w-[400px] truncate text-muted-foreground italic">
            "{row.getValue("comment")}"
        </div>
      ),
    },
    {
      accessorKey: "user",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Submitted By" />,
      cell: ({ row }) => {
          const user = row.getValue("user") as any;
          const isAnonymous = row.original.isAnonymous;
          
          if (isAnonymous || !user) {
              return (
                  <div className="flex items-center gap-2 text-muted-foreground opacity-60 italic">
                      <UserIcon className="w-4 h-4" />
                      <span>Anonymous</span>
                  </div>
              );
          }
          
          return (
              <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
          );
      },
    }
  ];

  const { table } = useDataTable({
    data: items,
    columns,
    getRowId: (row) => row.id,
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">System Feedback</h1>
          <p className="text-muted-foreground mt-2">View what users are saying about DistroKid</p>
        </div>
        <div className="flex gap-3 items-center">
            <div className="relative">
                <input
                    className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground w-full md:w-64"
                    placeholder="Search feedback..."
                    value={searchInput}
                    onChange={onSearchChange}
                />
            </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((h) => (
                  <TableHead key={h.id} className="px-4 py-4">
                    {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5227FF]"></div>
                        <p>Loading feedback...</p>
                    </div>
                </TableCell>
              </TableRow>
            ) : items.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-4 py-8">
                        <MessageSquare className="w-12 h-12 text-muted-foreground opacity-20" />
                        <p>No feedback entries found.</p>
                    </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-muted-foreground font-medium">
          Page {page} of {pageCount}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg px-4"
            onClick={() => fetchPage(page - 1, search)} 
            disabled={page <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg px-4"
            onClick={() => fetchPage(page + 1, search)} 
            disabled={page >= pageCount || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
