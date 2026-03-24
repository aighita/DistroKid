const stats = [
  { label: "Total Streams", value: "2,400,000", change: "+12.4%", positive: true },
  { label: "Followers", value: "18,500", change: "+3.2%", positive: true },
  { label: "Monthly Listeners", value: "94,200", change: "+8.1%", positive: true },
  { label: "Revenue", value: "$3,200", change: "+5.7%", positive: true },
];

const topTracks = [
  { title: "Midnight Dreams", streams: "142K", trend: "+18%", positive: true },
  { title: "Electric Pulse", streams: "890K", trend: "+4%", positive: true },
  { title: "Neon Lights", streams: "320K", trend: "-2%", positive: false },
  { title: "Sunset Drive", streams: "215K", trend: "+11%", positive: true },
  { title: "Crystal Waves", streams: "178K", trend: "+6%", positive: true },
];

const platformShare = [
  { name: "Spotify", percent: 52, color: "#1DB954" },
  { name: "Apple Music", percent: 28, color: "#FA243C" },
  { name: "YouTube Music", percent: 14, color: "#FF0000" },
  { name: "Tidal", percent: 6, color: "#00FFFF" },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">Track streams, followers and growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-background p-6 hover:shadow-md transition-shadow">
            <p className="text-xs text-muted-foreground mb-2 font-medium">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className={`text-xs mt-2 font-medium ${stat.positive ? 'text-green-700' : 'text-red-700'}`}>{stat.change} vs last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Tracks */}
        <div className="rounded-xl border border-border bg-background p-8">
          <h2 className="text-lg font-semibold mb-6">Top Tracks</h2>
          <div className="flex flex-col gap-4">
            {topTracks.map((track, i) => (
              <div key={track.title} className="flex items-center justify-between pb-4 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-sm w-6 font-medium">{i + 1}</span>
                  <span className="text-sm font-medium">{track.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{track.streams}</span>
                  <span className={`text-xs font-medium ${track.positive ? 'text-green-700' : 'text-red-700'}`}>{track.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="rounded-xl border border-border bg-background p-8">
          <h2 className="text-lg font-semibold mb-6">Platform Breakdown</h2>
          <div className="flex flex-col gap-6">
            {platformShare.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground font-medium">{p.percent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-3 rounded-full transition-all"
                    style={{ width: `${p.percent}%`, backgroundColor: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
