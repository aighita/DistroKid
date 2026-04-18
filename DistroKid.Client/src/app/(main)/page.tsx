"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TargetCursor from "@/components/TargetCursor";
import PixelBlast from "@/components/PixelBlast";
import CountUp from "@/components/CountUp";
import MagicBento from "@/components/MagicBento";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Upload as UploadIcon } from "lucide-react";
import { updateUser } from "@/services/user";
import { useAuthStore } from "@/stores/authStore";
import { UserFileApi } from "@/infrastructure/apis/client";
import { getApiConfig } from "@/lib/api";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { setStoredUserAvatarFileId, useUserAvatar } from "@/hooks/useUserAvatar";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const avatarUrl = useUserAvatar();
  const { tracks, releases, merch, events, platforms } = useDashboardStats();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    logout();
    setOpen(false);
    router.push("/login");
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    
    const file = fileInputRef.current.files[0];
    setIsUploadingPhoto(true);
    setSaveError("");
    
    try {
      const api = new UserFileApi(getApiConfig());
      const response = await api.apiUserFileAddPost({
        file: file,
        description: "Profile Photo"
      });

      if (response.errorMessage) {
        throw new Error(response.errorMessage.message || "Failed to upload photo");
      }

      
      const filesResponse = await api.apiUserFileGetPageGet({
        page: 1,
        pageSize: 100
      });

      if (filesResponse.errorMessage) {
        throw new Error(filesResponse.errorMessage.message || "Failed to fetch files");
      }

      
      const profilePhotoFile = (filesResponse.response?.data ?? [])
        .filter((uploadedFile) => uploadedFile.description === "Profile Photo")
        .sort((left, right) => right.updatedAt.getTime() - left.updatedAt.getTime())[0];

      if (profilePhotoFile) {
        setStoredUserAvatarFileId(profilePhotoFile.id);
      }

      
      setAvatarPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to upload photo");
    } finally {
      setIsUploadingPhoto(false);
    }
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
      
      <section className="px-8 py-4 shrink-0">
        <div className="flex flex-row items-center justify-between gap-6 bg-black px-4 py-3 rounded-3xl">
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button 
                className="flex flex-row items-center gap-4 cursor-target hover:opacity-80 transition-opacity cursor-none"
              >
                <Avatar className="sm-panel-avatar grayscale hover:grayscale-0 transition-[filter] duration-300 h-14 w-14">
                  <AvatarImage src={avatarUrl || undefined} alt={user?.name} />
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

                
                <div className="grid gap-2">
                  <label htmlFor="avatar" className="text-sm font-medium cursor-none">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={avatarPreview || avatarUrl || undefined} alt={user?.name} />
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        id="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="cursor-none block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#5227FF] file:text-white hover:file:bg-[#6d3fee] transition-colors"
                      />
                      {avatarPreview && (
                        <button
                          onClick={handleUploadPhoto}
                          disabled={isUploadingPhoto}
                          className="cursor-none mt-2 px-4 py-2 rounded-lg bg-[#5227FF] text-white text-sm hover:bg-[#6d3fee] transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                        >
                          <UploadIcon className="w-4 h-4" />
                          {isUploadingPhoto ? "Uploading..." : "Upload Photo"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
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

          
          <div className="flex flex-col gap-1 shrink-0 text-white">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Quick Stats</p>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col items-center">
                <CountUp from={0} to={releases} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Releases</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={platforms} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Connected Platforms</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={tracks} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Tracks</p>
              </div>
              <div className="flex flex-col items-center">
                <CountUp from={0} to={merch + events} separator="," direction="up" duration={1} className="font-bold text-base" />
                <p className="text-[10px] text-muted-foreground">Merch & Events</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />
      
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
