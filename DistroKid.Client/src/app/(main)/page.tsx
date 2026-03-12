import TargetCursor from "@/components/TargetCursor";
import PixelBlast from "@/components/PixelBlast";
import CountUp from "@/components/CountUp";

import MagicBento from "@/components/MagicBento";

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

export default function Home() {
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
        <div className="flex flex-row items-center justify-between gap-6">
          {/* Avatar + Name */}
          <div className="flex flex-row items-center gap-4 cursor-target">
            <Avatar className="sm-panel-avatar grayscale hover:grayscale-0 transition-[filter] duration-300 h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="block font-semibold text-4xl">Youlee</span>
          </div>

          {/* PixelBlast */}
          <div className="flex flex-row h-14 flex-1 mx-6">
            <PixelBlast
              variant="square"
              pixelSize={4}
              color="#000000"
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
          <div className="flex flex-col gap-1 shrink-0">
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
