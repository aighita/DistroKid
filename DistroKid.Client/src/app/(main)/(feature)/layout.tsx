"use client";

import { useRef, useState } from "react";
import ClickSpark from "@/components/ClickSpark";
import StaggeredMenu from "@/components/StaggeredMenu";

import { useAuthStore } from "@/stores/authStore";
import { UserRoleEnum } from "@/infrastructure/apis/client/models";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useUserAvatar } from "@/hooks/useUserAvatar";

const baseMenuItems = [
  { label: 'RELEASEs', ariaLabel: 'View your releases', link: '/releases' },
  { label: 'PLATFORMs', ariaLabel: 'View your platforms', link: '/platforms' },
  { label: 'MERCH & EVENTs', ariaLabel: 'View your merch and events', link: '/merch-and-events' },
  { label: 'TRACKs', ariaLabel: 'View your tracks', link: '/tracks' }
];

const socialItems = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'YouTube', link: 'https://youtube.com' },
  { label: 'Facebook', link: 'https://facebook.com' }
];

export default function FeatureLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = useAuthStore((s) => s.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const avatarUrl = useUserAvatar();
  const { tracks, releases, merch, events } = useDashboardStats();

  const menuItems = [...baseMenuItems];
  if (user?.role === UserRoleEnum.Admin) {
      menuItems.push({ label: 'USERS', ariaLabel: 'Manage users', link: '/admin/users' });
      menuItems.push({ label: 'FEEDBACK', ariaLabel: 'View feedback', link: '/admin/feedback' });
  }

  return (
    <ClickSpark
      sparkColor='#5227FF'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <StaggeredMenu
        position="left"
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={false}
        menuButtonColor="#000000"
        openMenuButtonColor="#111111"
        changeMenuColorOnOpen={true}
        colors={['#5227FF', '#7C4DFF']}
        accentColor="#5227FF"
        isFixed={true}
        workingHours={[
          { day: 'Tracks', hours: String(tracks) },
          { day: 'Releases', hours: String(releases) },
          { day: 'Merch', hours: String(merch) },
          { day: 'Events', hours: String(events) }
        ]}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        contentRef={mainRef}
        userName={user?.name}
        avatarUrl={avatarUrl}
        showHelpFeedbackButton={user?.role !== UserRoleEnum.Admin}
      />
      <main ref={mainRef}>
        {children}
      </main>
    </ClickSpark>
  );
}
