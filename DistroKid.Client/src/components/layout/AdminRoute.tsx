"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserRoleEnum } from "@/infrastructure/apis/client/models";

interface AdminRouteProps {
    children: React.ReactNode;
}

/**
 * AdminRoute protects routes that are only accessible to Administrators.
 * It checks both authentication status and the user's role.
 */
export function AdminRoute({ children }: AdminRouteProps) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                // If not logged in, redirect to login page
                router.push("/login?redirect=/admin/users");
            } else if (user?.role !== UserRoleEnum.Admin) {
                // If logged in but not an admin, redirect to a safe page
                router.push("/releases");
            }
        }
    }, [isAuthenticated, isLoading, user, router]);

    // Prevent rendering children while checking or if unauthorized
    if (isLoading || !isAuthenticated || user?.role !== UserRoleEnum.Admin) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5227FF]"></div>
            </div>
        );
    }

    return <>{children}</>;
}
