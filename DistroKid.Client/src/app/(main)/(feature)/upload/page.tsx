export default function Upload() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12 md:px-16 lg:px-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Upload Music</h1>
          <p className="text-gray-400 mt-2">Distribute your music to the world</p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="rounded-2xl border-2 border-dashed border-gray-700 bg-gray-900 p-16 flex flex-col items-center justify-center text-center mb-10 hover:border-[#5227FF] transition-colors cursor-pointer">
        <div className="w-16 h-16 rounded-full bg-[#5227FF]/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold mb-2">Drop your files here</h2>
        <p className="text-gray-400 text-sm mb-6">Supports MP3, WAV, FLAC, AAC · Max 500MB per file</p>
        <button className="rounded-full bg-[#5227FF] px-6 py-2.5 text-sm font-medium hover:bg-[#6B3FFF] transition-colors">
          Browse Files
        </button>
      </div>

      {/* Release Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold mb-4">Release Info</h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Title</label>
              <input className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-sm outline-none focus:border-[#5227FF]" placeholder="Release title" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Artist</label>
              <input className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-sm outline-none focus:border-[#5227FF]" placeholder="Artist name" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Release Type</label>
              <select className="w-full rounded-lg bg-gray-800 border border-gray-700 px-4 py-2.5 text-sm outline-none focus:border-[#5227FF]">
                <option>Single</option>
                <option>EP</option>
                <option>Album</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h3 className="text-lg font-semibold mb-4">Distribution</h3>
          <div className="flex flex-col gap-3">
            {["Spotify", "Apple Music", "YouTube Music", "Tidal"].map((platform) => (
              <label key={platform} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm">{platform}</span>
                <div className="w-10 h-5 bg-[#5227FF] rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="rounded-full bg-[#5227FF] px-8 py-3 text-sm font-medium hover:bg-[#6B3FFF] transition-colors">
          Submit Release
        </button>
      </div>
    </div>
  );
}
