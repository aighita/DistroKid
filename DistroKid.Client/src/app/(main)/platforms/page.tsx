const platforms = [
  { name: "Spotify", connected: true, streams: "1.2M", color: "#1DB954", icon: "🟢" },
  { name: "Apple Music", connected: true, streams: "680K", color: "#FA243C", icon: "🔴" },
  { name: "YouTube Music", connected: true, streams: "340K", color: "#FF0000", icon: "🔴" },
  { name: "Tidal", connected: true, streams: "180K", color: "#00FFFF", icon: "🔵" },
  { name: "Amazon Music", connected: false, streams: "—", color: "#FF9900", icon: "🟠" },
  { name: "Deezer", connected: false, streams: "—", color: "#A238FF", icon: "🟣" },
  { name: "SoundCloud", connected: false, streams: "—", color: "#FF5500", icon: "🟠" },
  { name: "Pandora", connected: false, streams: "—", color: "#224099", icon: "🔵" },
];

export default function Platforms() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Platforms</h1>
        <p className="text-gray-400 mt-2">Connect and manage your streaming platforms</p>
      </div>

      {/* Connected Platforms */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Connected
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.filter(p => p.connected).map((platform) => (
            <div key={platform.name} className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style={{ backgroundColor: platform.color + '20' }}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{platform.name}</h3>
                  <p className="text-sm text-gray-400">{platform.streams} streams</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-3 py-1 rounded-full bg-green-900/40 text-green-400">Connected</span>
                <button className="text-sm text-gray-500 hover:text-red-400 transition-colors">Disconnect</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Available Platforms */}
      <section>
        <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gray-500" />
          Available
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.filter(p => !p.connected).map((platform) => (
            <div key={platform.name} className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900 p-5 hover:border-gray-700 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl opacity-50" style={{ backgroundColor: platform.color + '20' }}>
                  {platform.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-300">{platform.name}</h3>
                  <p className="text-sm text-gray-500">Not connected</p>
                </div>
              </div>
              <button className="rounded-full border border-[#5227FF] text-[#5227FF] px-5 py-1.5 text-sm font-medium hover:bg-[#5227FF] hover:text-white transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}