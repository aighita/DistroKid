'use client';

import { useRef, useState } from "react";
import { UserFileApi } from "@/infrastructure/apis/client";
import { getApiConfig } from "@/lib/api";

type UploadState = "idle" | "uploading" | "success" | "error";

function getApi() {
  return new UserFileApi(getApiConfig());
}

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const uploadFile = async (file: File) => {
    setUploadState("uploading");
    setMessage("");
    try {
      await getApi().apiUserFileAddPost({ file, description: file.name });
      setUploadState("success");
      setMessage(`"${file.name}" uploaded successfully!`);
    } catch (err) {
      setUploadState("error");
      setMessage(err instanceof Error ? err.message : "Upload failed. Please try again.");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = "";
  };

  const reset = () => {
    setUploadState("idle");
    setMessage("");
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

      {/* Status banner */}
      {uploadState === "success" && (
        <div className="w-full max-w-2xl mb-6 px-4 py-3 rounded-xl border border-green-200 bg-green-50 text-green-700 text-sm flex items-center justify-between">
          <span>{message}</span>
          <button onClick={reset} className="text-green-500 hover:text-green-700 font-medium ml-4">
            Upload another
          </button>
        </div>
      )}
      {uploadState === "error" && (
        <div className="w-full max-w-2xl mb-6 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-600 text-sm flex items-center justify-between">
          <span>{message}</span>
          <button onClick={reset} className="text-red-500 hover:text-red-700 font-medium ml-4">
            Try again
          </button>
        </div>
      )}

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
          {uploadState === "uploading" ? (
            <>
              <div className="w-24 h-24 rounded-full bg-[#5227FF]/10 flex items-center justify-center mb-6 animate-pulse">
                <svg className="w-12 h-12 text-[#5227FF] animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Uploading…</h2>
              <p className="text-base text-muted-foreground">Please wait while your file is being uploaded.</p>
            </>
          ) : (
            <>
              {/* Icon */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5227FF]/20 to-[#7C4DFF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-12 h-12 text-[#5227FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>

              <h2 className="text-3xl font-bold mb-2">Drop your audio files here</h2>
              <p className="text-base text-muted-foreground mb-8">
                or click to browse · MP3, WAV, FLAC, AAC · Up to 500MB per file
              </p>

              <button
                onClick={() => inputRef.current?.click()}
                className="relative px-8 py-3.5 bg-gradient-to-r from-[#5227FF] to-[#7C4DFF] rounded-full text-white font-medium text-sm hover:from-[#6B3FFF] hover:to-[#9060FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#5227FF]/30"
              >
                Browse Files
              </button>
            </>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="audio/*,.mp3,.wav,.flac,.aac"
        onChange={handleFileChange}
      />

      {/* Footer Info */}
      <div className="mt-16 text-center text-sm text-muted-foreground max-w-xl">
        <p>Multiple uploads supported · Drag & drop or click to select files</p>
      </div>
    </div>
  );
}
