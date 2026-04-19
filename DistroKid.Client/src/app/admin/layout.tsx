"use client";

import { useRef, useState } from "react";
import ClickSpark from "@/components/ClickSpark";
import StaggeredMenu from "@/components/StaggeredMenu";
import { AdminRoute } from "@/components/layout/AdminRoute";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAvatar } from "@/hooks/useUserAvatar";

const adminMenuItems = [
    { label: 'USERS', ariaLabel: 'Manage system users', link: '/admin/users' },
    { label: 'FEEDBACK', ariaLabel: 'View user feedback', link: '/admin/feedback' },
    { label: 'DASHBOARD', ariaLabel: 'Return to main dashboard', link: '/tracks' }
];

const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'YouTube', link: 'https://youtube.com' },
    { label: 'Facebook', link: 'https://facebook.com' }
];

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [menuOpen, setMenuOpen] = useState(false);
    const mainRef = useRef<HTMLElement>(null);
    const { user } = useAuth();
    const avatarUrl = useUserAvatar();

    return (
        <ClickSpark
            sparkColor='#FF1744'
            sparkSize={10}
            sparkRadius={15}
            sparkCount={8}
            duration={400}
        >
            <StaggeredMenu
                position="left"
                items={adminMenuItems}
                socialItems={socialItems}
                displaySocials
                displayItemNumbering={false}
                menuButtonColor="#000000"
                openMenuButtonColor="#FF1744"
                changeMenuColorOnOpen={true}
                colors={['#FF1744', '#F50057']}
                accentColor="#FF1744"
                isFixed={true}
                onMenuOpen={() => setMenuOpen(true)}
                onMenuClose={() => setMenuOpen(false)}
                contentRef={mainRef}
                userName={user?.name}
                avatarUrl={avatarUrl}
                showHelpFeedbackButton={false}
            />
            <main ref={mainRef}>
                <AdminRoute>
                    {children}
                </AdminRoute>
            </main>
        </ClickSpark>
    );
}
