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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { flexRender } from "@tanstack/react-table";
import * as React from "react";
import { useUser } from "@/hooks/useUser";
import type { UserRecord } from "@/infrastructure/apis/client/models";
import { Trash2, ShieldCheck, User as UserIcon, Edit2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UsersAdminPage() {
  const { items, page, pageCount, isLoading, error, fetchPage, handleSearch, handleDelete, handleUpdate, search } = useUser();

  const [deleteItem, setDeleteItem] = React.useState<UserRecord | null>(null);
  const [editItem, setEditItem] = React.useState<UserRecord | null>(null);
  const [newName, setNewName] = React.useState("");
  const [actionLoading, setActionLoading] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  const columns: ColumnDef<UserRecord, unknown>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
            <UserIcon className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">{row.getValue("name")}</span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("email")}</span>,
    },
    {
      accessorKey: "role",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Role" />,
      cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return (
              <Badge variant={role === "Admin" ? "default" : "secondary"} className="rounded-full">
                  {role === "Admin" && <ShieldCheck className="w-3 h-3 mr-1" />}
                  {role}
              </Badge>
          );
      },
    },
    {
      id: "actions",
      header: () => <span className="sr-only">Actions</span>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
                setEditItem(row.original);
                setNewName(row.original.name || "");
            }}
            className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-muted-foreground hover:text-[#5227FF]"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteItem(row.original)}
            className="p-1.5 rounded-md hover:bg-red-50 transition-colors text-muted-foreground hover:text-red-500"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
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
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">System Users</h1>
          <p className="text-muted-foreground mt-2">Manage and monitor all accounts registered on DistroKid</p>
        </div>
        <div className="flex gap-3 items-center">
          <input
            className="rounded-full bg-background border border-border px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-muted-foreground w-full md:w-64"
            placeholder="Search users..."
            value={searchInput}
            onChange={onSearchChange}
          />
        </div>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm">
          {error}
        </div>
      )}

      
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
                        <p>Loading users...</p>
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
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      
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

      
      <AlertDialog open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Edit User Profile</AlertDialogTitle>
            <AlertDialogDescription>
              Update the name for <strong>{editItem?.email}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
              <input
                className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-[#5227FF]"
                placeholder="User Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading} className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#5227FF] hover:bg-[#4119e0] text-white rounded-xl"
              disabled={actionLoading || !newName.trim()}
              onClick={async (e) => {
                e.preventDefault();
                if (!editItem) return;
                setActionLoading(true);
                try {
                  await handleUpdate(editItem.id, { name: newName });
                  setEditItem(null);
                } finally {
                  setActionLoading(false);
                }
              }}
            >
              {actionLoading ? "Saving..." : "Save Changes"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      
      <AlertDialog open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User Access?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{deleteItem?.name}</strong>? This will permanently revoke their access to DistroKid and delete all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading} className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 text-white rounded-xl"
              disabled={actionLoading}
              onClick={async (e) => {
                e.preventDefault();
                if (!deleteItem) return;
                setActionLoading(true);
                try {
                  await handleDelete(deleteItem.id);
                  setDeleteItem(null);
                } finally {
                  setActionLoading(false);
                }
              }}
            >
              {actionLoading ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
