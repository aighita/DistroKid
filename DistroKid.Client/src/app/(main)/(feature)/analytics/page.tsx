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
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Analytics</h1>
        <p className="text-gray-400 mt-2">Track streams, followers and growth</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-800 bg-gray-900 p-5">
            <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>{stat.change} vs last month</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Tracks */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold mb-5">Top Tracks</h2>
          <div className="flex flex-col gap-3">
            {topTracks.map((track, i) => (
              <div key={track.title} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm w-4">{i + 1}</span>
                  <span className="text-sm">{track.title}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">{track.streams}</span>
                  <span className={`text-xs ${track.positive ? 'text-green-400' : 'text-red-400'}`}>{track.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Breakdown */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-lg font-semibold mb-5">Platform Breakdown</h2>
          <div className="flex flex-col gap-4">
            {platformShare.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{p.name}</span>
                  <span className="text-gray-400">{p.percent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-800">
                  <div
                    className="h-2 rounded-full"
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
