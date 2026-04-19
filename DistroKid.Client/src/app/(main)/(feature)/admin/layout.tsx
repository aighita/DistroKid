"use client";

import { AdminRoute } from "@/components/layout/AdminRoute";

export default function FeatureAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminRoute>{children}</AdminRoute>;
}