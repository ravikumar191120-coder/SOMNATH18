/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Music, Pause, Play, Volume2, VolumeX, Sparkles } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { PRESET_SONGS } from "../data";

interface MusicPlayerProps {
  musicUrl: string;
  musicTitle: string;
  onMusicChange: (url: string, title: string) => void;
}

export default function MusicPlayer({
  musicUrl,
  musicTitle,
  onMusicChange,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Custom URL inputs
  const [isOpenPreset, setIsOpenPreset] = useState(false);

  // Sound generator effect nodes (drifting music notes)
  const [notes, setNotes] = useState<{ id: number; char: string; left: number; delay: number }[]>([]);

  // Synced volume changes dynamically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle music track changes securely and trigger reload
  useEffect(() => {
    if (!audioRef.current) return;
    setErrorMsg(null);
    
    // Changing standard element source triggers dynamic reload
    audioRef.current.load();
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.error("Audio playback error:", err);
          setIsPlaying(false);
          setErrorMsg("Click Play to start! (Browsers block autoplay initially)");
        });
      }
    }
  }, [musicUrl]);

  // Clean-up play state on dismantle
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle Play / Pause
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    setErrorMsg(null);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error("Audio play failed:", err);
          setErrorMsg("Unable to stream audio. Try another link below! 🎧");
        });
    }
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : vol;
    }
    if (vol > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
  };

  // Generate music drifting notes when playing
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }

    const interval = setInterval(() => {
      const noteChars = ["🎵", "🎶", "🎈", "✨", "🤍"];
      const randomNote = noteChars[Math.floor(Math.random() * noteChars.length)];
      setNotes((prev) => [
        ...prev.slice(-10), // keep last 10 notes to save performance
        {
          id: Date.now() + Math.random(),
          char: randomNote,
          left: Math.random() * 80 + 10, // random percentage left
          delay: Math.random() * 2,
        },
      ]);
    }, 1800);

    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative">
      {/* Drifting floating background notes */}
      {isPlaying && (
        <div className="absolute -top-32 left-0 right-0 h-32 overflow-hidden pointer-events-none z-10">
          {notes.map((n) => (
            <span
              key={n.id}
              className="absolute bottom-0 text-lg opacity-70 float-note animate-float-slow"
              style={{
                left: `${n.left}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                fontSize: `${12 + Math.random() * 12}px`,
              }}
            >
              {n.char}
            </span>
          ))}
        </div>
      )}

      {/* Main player box stylized like a warm handmade retro tape or ticket */}
      <div 
        id="retro-music-player"
        className="hand-drawn-border bg-amber-50 relative p-4 max-w-sm w-full mx-auto shadow-md transform rotate-1 transition-all hover:rotate-0"
      >
        {/* Tape holes aesthetic decoration */}
        <div className="absolute top-2 left-1/4 right-1/4 h-2 flex justify-between px-4 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-neutral-800 opacity-20" />
          <div className="w-2 h-2 rounded-full bg-neutral-800 opacity-20" />
        </div>

        {/* Outer label tape bar */}
        <div className="bg-neutral-800 text-amber-100 rounded p-2 text-center select-none mt-1">
          <div className="font-mono text-[10px] tracking-wider text-rose-300 flex items-center justify-center gap-1.5 uppercase">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            Sugi's Sweet Playlist
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
          </div>
          <p className="font-handwritten text-lg mt-1 text-white truncate max-w-[240px] px-2 mx-auto">
            {musicTitle}
          </p>
        </div>

        {/* Playback Controls Row */}
        <div className="flex items-center justify-between mt-4 px-2">
          {/* Preset trigger button */}
          <button
            onClick={() => setIsOpenPreset(!isOpenPreset)}
            className="font-cute text-xs bg-rose-100 hover:bg-rose-200 text-rose-700 font-medium px-2.5 py-1.5 rounded-full border border-rose-300 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            Change Song
          </button>

          {/* Central Play/Pause button styled like big retro dial */}
          <button
            onClick={togglePlay}
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-neutral-800 transition-all select-none shadow cursor-pointer active:scale-90 ${
              isPlaying
                ? "bg-rose-400 text-white hover:bg-rose-500 scale-105"
                : "bg-white text-neutral-800 hover:bg-neutral-50"
            }`}
            title={isPlaying ? "Pause background track" : "Play cute music to set the mood"}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          {/* Mute toggle */}
          <button
            onClick={toggleMute}
            className="p-2 text-neutral-600 hover:text-rose-500 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
        </div>

        {/* Volume slider */}
        <div className="flex items-center gap-2 mt-3 px-2">
          <span className="text-[10px] font-mono text-neutral-500 uppercase">Vol</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
        </div>

        {/* Audio helper messages */}
        {errorMsg && (
          <p className="text-[11px] font-mono text-rose-500 text-center mt-2.5 bg-white p-1.5 rounded border border-rose-200 animate-pulse">
            {errorMsg}
          </p>
        )}

        {/* Dropdown Preset lists */}
        {isOpenPreset && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white card-shadow border-2 border-dashed border-rose-200 rounded-xl p-3 z-30 animate-fade-in">
            <h4 className="font-cute text-xs text-rose-700 font-bold mb-2 uppercase tracking-wide">
              Select Cute Track:
            </h4>
            <div className="flex flex-col gap-1">
              {PRESET_SONGS.map((song) => (
                <button
                  key={song.id}
                  onClick={() => {
                    onMusicChange(song.url, song.name);
                    setIsOpenPreset(false);
                    setIsPlaying(true);
                  }}
                  className={`text-left text-xs px-2.5 py-1.5 rounded transition-all cursor-pointer font-cute ${
                    musicUrl === song.url
                      ? "bg-rose-100 text-rose-800 font-semibold"
                      : "text-neutral-600 hover:bg-neutral-50"
                  }`}
                >
                  🎧 {song.name}
                </button>
              ))}
            </div>

            <p className="text-[10px] text-neutral-400 text-center mt-2 font-mono">
              💡 Hint: Tap on the 🎨 sticker menu on top left of the screen to paste your own custom MP3 files!
            </p>
          </div>
        )}
      </div>

      {/* Robust DOM Audio element with ref mapping */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
      />
    </div>
  );
}
