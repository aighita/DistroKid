'use client';

import { useState } from "react";

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop here
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-8 py-12">
      {/* Header */}
      <div className="text-center mb-16 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-[#5227FF] via-[#7C4DFF] to-[#B19EEF] bg-clip-text text-transparent">
            Upload Your Music
          </span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Share your tracks with the world. Upload in MP3, WAV, FLAC, or AAC format.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`group relative w-full max-w-2xl rounded-3xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
          dragActive
            ? "border-[#5227FF] bg-[#5227FF]/5 shadow-lg shadow-[#5227FF]/20"
            : "border-gray-600 hover:border-[#5227FF]/60 bg-gradient-to-br from-background to-gray-900/50 hover:shadow-lg hover:shadow-[#5227FF]/10"
        }`}
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#5227FF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10 py-20 px-8 flex flex-col items-center justify-center text-center">
          {/* Icon - Centered */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5227FF]/20 to-[#7C4DFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-12 h-12 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </div>

          <h2 className="text-3xl font-bold mb-2">Drop your audio files here</h2>
          <p className="text-base text-muted-foreground mb-8">
            or click to browse · MP3, WAV, FLAC, AAC · Up to 500MB per file
          </p>

          <button className="relative px-8 py-3.5 bg-gradient-to-r from-[#5227FF] to-[#7C4DFF] rounded-full text-white font-medium text-sm hover:from-[#6B3FFF] hover:to-[#9060FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#5227FF]/30">
            Browse Files
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-16 text-center text-sm text-muted-foreground max-w-xl">
        <p>Multiple uploads supported · Drag & drop or click to select files</p>
      </div>
    </div>
  );
}
