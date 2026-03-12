const tracks = [
  { id: 1, title: "Midnight Dreams", release: "Midnight Dreams", duration: "3:42", streams: "142K", status: "Live" },
  { id: 2, title: "Pulse Beat", release: "Electric Pulse", duration: "4:15", streams: "210K", status: "Live" },
  { id: 3, title: "Electric Rise", release: "Electric Pulse", duration: "3:58", streams: "180K", status: "Live" },
  { id: 4, title: "High Voltage", release: "Electric Pulse", duration: "5:01", streams: "160K", status: "Live" },
  { id: 5, title: "Neon Lights", release: "Neon Lights", duration: "3:22", streams: "320K", status: "Live" },
  { id: 6, title: "After Hours", release: "Neon Lights", duration: "4:44", streams: "95K", status: "Live" },
  { id: 7, title: "Sunset Drive", release: "Sunset Drive", duration: "3:11", streams: "215K", status: "Live" },
  { id: 8, title: "Crystal Waves", release: "Crystal Waves", duration: "4:02", streams: "178K", status: "Live" },
  { id: 9, title: "City Noise", release: "Urban Echoes", duration: "3:55", streams: "134K", status: "Live" },
  { id: 10, title: "Underground", release: "Urban Echoes", duration: "4:23", streams: "98K", status: "Live" },
];

export default function Tracks() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Tracks</h1>
          <p className="text-gray-400 mt-2">Browse and manage all your individual tracks</p>
        </div>
        <div className="flex gap-3">
          <input
            className="rounded-full bg-gray-800 border border-gray-700 px-4 py-2 text-sm outline-none focus:border-[#5227FF] placeholder-gray-500"
            placeholder="Search tracks..."
          />
        </div>
      </div>

      {/* Tracks Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[2rem_1fr_1fr_6rem_6rem_5rem] gap-4 px-5 py-3 border-b border-gray-800 text-xs text-gray-400 uppercase tracking-wider">
          <span>#</span>
          <span>Title</span>
          <span>Release</span>
          <span>Duration</span>
          <span>Streams</span>
          <span>Status</span>
        </div>

        {/* Rows */}
        {tracks.map((track, i) => (
          <div
            key={track.id}
            className="grid grid-cols-[2rem_1fr_1fr_6rem_6rem_5rem] gap-4 px-5 py-4 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors group"
          >
            <span className="text-sm text-gray-500">{i + 1}</span>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#5227FF]/30 flex items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-[#5227FF] opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm font-medium truncate">{track.title}</span>
            </div>
            <span className="text-sm text-gray-400 truncate self-center">{track.release}</span>
            <span className="text-sm text-gray-400 self-center">{track.duration}</span>
            <span className="text-sm text-gray-400 self-center">{track.streams}</span>
            <span className="self-center">
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-900/40 text-green-400">{track.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
