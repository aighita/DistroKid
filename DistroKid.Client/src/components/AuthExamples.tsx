"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

/**
 * Example 1: UserProfile Component
 * Shows user information and logout button
 */
export function UserProfile() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <p className="text-sm text-neutral-500">Not logged in</p>;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <div>
        <p className="font-semibold">{user?.name}</p>
        <p className="text-xs text-neutral-500">{user?.email}</p>
      </div>
      <Button onClick={handleLogout} variant="outline" size="sm">
        Logout
      </Button>
    </div>
  );
}

/**
 * Example 2: useAuth Hook in any component
 */
export function AuthStatus() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="bg-green-100 p-4 rounded text-green-800">
        Welcome back, <strong>{user?.name}</strong>!
      </div>
    );
  }

  return (
    <div className="bg-blue-100 p-4 rounded text-blue-800">
      Please log in to continue
    </div>
  );
}

/**
 * Example 3: Conditional rendering based on auth state
 */
export function DashboardPreview() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="text-center p-8">
        <h2 className="text-2xl font-bold mb-4">Sign in to view your dashboard</h2>
        <Button asChild>
          <a href="/login">Go to Login</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <p>Hello, {user?.name}! 👋</p>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-neutral-100 p-4 rounded">
          <p className="text-neutral-600">User Role</p>
          <p className="text-xl font-bold">{user?.role || "N/A"}</p>
        </div>
        <div className="bg-neutral-100 p-4 rounded">
          <p className="text-neutral-600">Email</p>
          <p className="text-xl font-bold">{user?.email}</p>
        </div>
        <div className="bg-neutral-100 p-4 rounded">
          <p className="text-neutral-600">Member Since</p>
          <p className="text-xl font-bold">2026</p>
        </div>
      </div>
    </div>
  );
}
