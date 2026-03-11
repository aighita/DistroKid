import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { Button } from "@/components/ui/button";

const quickActions = [
  {
    href: "/releases",
    title: "Releases",
    description: "Manage your tracks, albums, and singles.",
    count: "12 releases",
    preview: [
      { w: "w-10", h: "h-10", color: "bg-violet-200" },
      { w: "w-8",  h: "h-8",  color: "bg-violet-100" },
      { w: "w-12", h: "h-12", color: "bg-violet-300" },
      { w: "w-7",  h: "h-7",  color: "bg-violet-100" },
    ],
  },
  {
    href: "/platforms",
    title: "Platforms",
    description: "Connect and manage streaming platforms.",
    count: "4 connected",
    preview: [
      { w: "w-24", h: "h-3", color: "bg-emerald-200" },
      { w: "w-16", h: "h-3", color: "bg-emerald-300" },
      { w: "w-20", h: "h-3", color: "bg-emerald-100" },
    ],
  },
  {
    href: "/merch-and-events",
    title: "Merch & Events",
    description: "Sell merchandise and promote upcoming events.",
    count: "3 upcoming",
    preview: [
      { w: "w-14", h: "h-14", color: "bg-rose-100" },
      { w: "w-10", h: "h-10", color: "bg-rose-200" },
    ],
  },
  {
    href: "/register",
    title: "Register",
    description: "Create an account and get started distributing.",
    count: "Get started",
    preview: [
      { w: "w-20", h: "h-4", color: "bg-sky-100" },
      { w: "w-28", h: "h-4", color: "bg-sky-200" },
      { w: "w-16", h: "h-4", color: "bg-sky-100" },
    ],
  },
];

const recentReleases = [
  { title: "Midnight Dreams",  type: "Single", date: "Feb 2026", streams: "642K" },
  { title: "Electric Pulse",   type: "Album",  date: "Jan 2026", streams: "480K" },
  { title: "Neon Lights",      type: "EP",     date: "Dec 2025", streams: "317K" },
  { title: "Sunset Drive",     type: "Single", date: "Nov 2025", streams: "195K" },
  { title: "Aurora",           type: "Single", date: "Oct 2025", streams: "128K" },
  { title: "Gravity",          type: "Album",  date: "Sep 2025", streams: "214K" },
];

const platforms = [
  { name: "Spotify",       streams: "1.2M", pct: 50, color: "bg-emerald-500" },
  { name: "Apple Music",   streams: "680K", pct: 28, color: "bg-rose-500"    },
  { name: "YouTube Music", streams: "340K", pct: 14, color: "bg-red-500"     },
  { name: "Tidal",         streams: "180K", pct:  8, color: "bg-cyan-500"    },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Persistent vertical side rails */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-y-0 left-4  w-px bg-gradient-to-b from-transparent via-border to-border md:left-8"  />
        <div className="absolute inset-y-0 right-4 w-px bg-gradient-to-b from-transparent via-border to-border md:right-8" />
        <div className="absolute inset-y-0 left-8  w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:left-12"  />
        <div className="absolute inset-y-0 right-8 w-px bg-gradient-to-b from-transparent via-border/50 to-border/50 md:right-12" />
        <div className={cn(
          "absolute -inset-x-20 top-0 h-[600px] rounded-full",
          "bg-[radial-gradient(ellipse_at_center,theme(colors.violet.100/60%),transparent,transparent)]",
          "blur-[60px]"
        )} />
      </div>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center gap-6 px-4 py-20 md:py-32">
        <a
          href="/releases"
          className={cn(
            "group mx-auto flex w-fit items-center gap-3 rounded-sm border bg-card p-1 shadow-sm",
            "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 delay-500 ease-out"
          )}
        >
          <div className="rounded-[2px] border bg-card px-1.5 py-0.5 shadow-sm">
            <p className="font-mono text-xs">NEW</p>
          </div>
          <span className="text-xs text-muted-foreground">Your artist dashboard is live</span>
          <span className="block h-5 border-l" />
          <div className="pr-1">
            <ArrowRightIcon className="size-3 -translate-x-0.5 duration-150 ease-out group-hover:translate-x-0.5" />
          </div>
        </a>

        <h1 className={cn(
          "max-w-3xl text-balance text-center text-4xl font-bold tracking-tight text-foreground md:text-6xl",
          "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 delay-100 ease-out"
        )}>
          Beautiful music,{" "}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            distributed
          </span>{" "}
          smartly.
        </h1>

        <p className={cn(
          "max-w-xl text-center text-sm tracking-wide text-muted-foreground sm:text-lg",
          "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 delay-200 ease-out"
        )}>
          Manage your releases, connect platforms, and grow your audience —<br />
          all in one place, designed for artists who move fast.
        </p>

        <div className={cn(
          "flex w-fit items-center gap-3 pt-2",
          "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 delay-300 ease-out"
        )}>
          <Button variant="outline">View releases</Button>
          <Button>
            Get started <ArrowRightIcon data-icon="inline-end" />
          </Button>
        </div>

        <div className={cn(
          "flex items-stretch divide-x divide-border rounded-sm border bg-card shadow-sm",
          "animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards duration-500 delay-500 ease-out"
        )}>
          {[
            { label: "Total Streams", value: "2.4M"  },
            { label: "Followers",     value: "18.5K" },
            { label: "Releases",      value: "12"    },
            { label: "Platforms",     value: "4"     },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center px-7 py-4 hover:bg-accent/50 transition-colors">
              <span className="text-xl font-bold">{s.value}</span>
              <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="relative">
        <DecorIcon position="top-left"  className="size-4 text-border" />
        <DecorIcon position="top-right" className="size-4 text-border" />
        <FullWidthDivider className="-top-px" />

        <div className="mx-auto max-w-6xl px-8 py-10 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Quick Actions</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-sm overflow-hidden">
            {quickActions.map((action, i) => (
              <Link
                key={action.href}
                href={action.href}
                className={cn(
                  "group relative flex flex-col justify-between p-6 bg-card hover:bg-accent/30 transition-colors",
                  i < quickActions.length - 1 && "border-r border-border"
                )}
              >
                <div className="flex items-end gap-2 h-14 mb-6">
                  {action.preview.map((blob, j) => (
                    <div
                      key={j}
                      className={cn("rounded-sm transition-transform group-hover:scale-105", blob.w, blob.h, blob.color)}
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">{action.count}</span>
                    <ArrowRightIcon className="size-3 text-muted-foreground/40 -translate-x-0.5 duration-150 group-hover:translate-x-0.5 group-hover:text-violet-500" />
                  </div>
                  <h3 className="text-sm font-semibold group-hover:text-violet-600 transition-colors">{action.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-snug">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
        <DecorIcon position="bottom-left"  className="size-4 text-border" />
        <DecorIcon position="bottom-right" className="size-4 text-border" />
      </section>

      {/* RECENT RELEASES */}
      <section className="relative">
        <DecorIcon position="top-left"  className="size-4 text-border" />
        <DecorIcon position="top-right" className="size-4 text-border" />

        <div className="mx-auto max-w-6xl px-8 py-10 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Recent Releases</span>
            <Link href="/releases" className="text-xs text-violet-600 hover:underline">View all →</Link>
          </div>

          <div className="border border-border rounded-sm overflow-hidden">
            {recentReleases.map((release, i) => (
              <div
                key={release.title}
                className={cn(
                  "flex items-center gap-4 px-6 py-4 bg-card hover:bg-accent/30 transition-colors",
                  i !== 0 && "border-t border-border"
                )}
              >
                <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-violet-100 to-fuchsia-100 flex items-center justify-center shrink-0 text-sm border border-border">
                  🎵
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{release.title}</p>
                  <p className="text-xs text-muted-foreground">{release.type} · {release.date}</p>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-24 h-1 rounded-full bg-border overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400"
                      style={{ width: `${Math.round((parseInt(release.streams) / 642) * 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground w-10 text-right">{release.streams}</span>
                </div>
                <ArrowRightIcon className="size-3 text-muted-foreground/30 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
        <DecorIcon position="bottom-left"  className="size-4 text-border" />
        <DecorIcon position="bottom-right" className="size-4 text-border" />
      </section>

      {/* STREAMING OVERVIEW */}
      <section className="relative">
        <DecorIcon position="top-left"  className="size-4 text-border" />
        <DecorIcon position="top-right" className="size-4 text-border" />

        <div className="mx-auto max-w-6xl px-8 py-10 md:px-12">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-medium text-muted-foreground tracking-widest uppercase">Streaming Overview</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-sm overflow-hidden">
            {platforms.map((p, i) => (
              <div
                key={p.name}
                className={cn(
                  "flex flex-col gap-4 p-6 bg-card hover:bg-accent/30 transition-colors",
                  i < platforms.length - 1 && "border-r border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{p.name}</span>
                  <span className={cn("w-2 h-2 rounded-full", p.color)} />
                </div>
                <div>
                  <span className="text-2xl font-bold">{p.streams}</span>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">total streams</p>
                </div>
                <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full opacity-70", p.color)} style={{ width: `${p.pct}%` }} />
                </div>
                <span className="font-mono text-xs text-muted-foreground">{p.pct}% of total</span>
              </div>
            ))}
          </div>
        </div>

        <FullWidthDivider className="-bottom-px" />
        <DecorIcon position="bottom-left"  className="size-4 text-border" />
        <DecorIcon position="bottom-right" className="size-4 text-border" />
      </section>

    </div>
  );
}