"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TargetCursor from "@/components/TargetCursor";
import PixelBlast from "@/components/PixelBlast";
import CountUp from "@/components/CountUp";
import MagicBento from "@/components/MagicBento";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut } from "lucide-react";
import { updateUser } from "@/services/user";
import { useAuthStore } from "@/stores/authStore";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
    setOpen(false);
    router.push("/login");
  };

  const handleSaveProfile = async () => {
    setSaveError("");
    if (newPassword && newPassword !== confirmPassword) {
      setSaveError("Passwords do not match");
      return;
    }
    if (!user?.id) return;
    setIsSaving(true);
    try {
      await updateUser({
        id: user.id,
        name: name.trim() || undefined,
        password: newPassword || undefined,
      });
      useAuthStore.getState().setUser({ ...user, name: name.trim() || user.name });
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
      />
      {/* Hero */}
      <section className="px-8 py-4 shrink-0">
        <div className="flex flex-row items-center justify-between gap-6 bg-black px-4 py-3 rounded-3xl">
          {/* Avatar + Name */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button 
                className="flex flex-row items-center gap-4 cursor-target hover:opacity-80 transition-opacity cursor-none"
              >
                <Avatar className="sm-panel-avatar grayscale hover:grayscale-0 transition-[filter] duration-300 h-14 w-14">
                  <AvatarImage src="https://github.com/shadcn.png" alt={user?.name} />
                  <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <span className="block font-semibold text-4xl text-white">{user?.name}</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] cursor-none">
              <DialogHeader>
                <DialogTitle>Profile Settings</DialogTitle>
                <DialogDescription>
                  Update your profile information and security settings.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 cursor-none">
                {saveError && (
                  <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                    {saveError}
                  </p>
                )}
                {/* Name Change */}
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium cursor-none">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="cursor-none w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF]"
                    placeholder="Your name"
                  />
                </div>

                {/* New Password */}
                <div className="grid gap-2">
                  <label htmlFor="password" className="text-sm font-medium cursor-none">
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="cursor-none w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF]"
                    placeholder="Leave empty to keep current password"
                  />
                </div>

                {/* Confirm Password */}
                {newPassword && (
                  <div className="grid gap-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium cursor-none">
                      Confirm Password
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="cursor-none w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#5227FF]"
                      placeholder="Confirm your new password"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="cursor-none flex-1 px-4 py-2 rounded-lg bg-[#5227FF] text-white hover:bg-[#6d3fee] transition-colors font-medium disabled:opacity-50"
                >
                  {isSaving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="cursor-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* PixelBlast */}
          <div className="flex flex-row h-14 flex-1 mx-6">
            <PixelBlast
              variant="square"
              pixelSize={4}
              color="#ffffff"
              patternScale={2.5}
              patternDensity={0.5}
              pixelSizeJitter={0}
              enableRipples={false}
              rippleSpeed={0.35}
              rippleThickness={0.15}
              rippleIntensityScale={1.2}
              liquid={false}
              liquidStrength={0.08}
              liquidRadius={1.5}
              liquidWobbleSpeed={4}
              speed={0.4}
              edgeFade={0}
              className="cursor-target"
            />
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col gap-1 shrink-0 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Quick Stats</p>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col items-center">
                <CountUp from={0} to={2400000} separator="," direction="up" duration={2} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Streams</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={18500} separator="," direction="up" duration={2} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={12} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Releases</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={4} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Platforms</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={87} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Tracks</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={3200} separator="," direction="up" duration={2} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Revenue $</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />
      {/* Routes Grid */}
      <section className="flex-1 w-full px-4 pb-4 min-h-0">
        <MagicBento
          textAutoHide={true}
          enableStars
          enableSpotlight
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={400}
          particleCount={12}
          glowColor="0, 0, 0"
          disableAnimations={false}
        />
      </section>
    </div>
  );
}
