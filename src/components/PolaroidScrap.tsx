/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Camera, Heart, Film } from "lucide-react";
import React from "react";
import { LoopingSnap } from "../data";

interface PolaroidScrapProps {
  photo: LoopingSnap;
  customUrl?: string;
  key?: string | number;
}

export default function PolaroidScrap({ photo, customUrl }: PolaroidScrapProps) {
  const displayUrl = customUrl || photo.defaultUrl;

  const isVideoUrl = (url: string): boolean => {
    const lowercase = url.toLowerCase();
    return (
      lowercase.endsWith(".mp4") ||
      lowercase.endsWith(".webm") ||
      lowercase.endsWith(".mov") ||
      lowercase.includes("/video") ||
      lowercase.includes("stream") ||
      lowercase.includes("mp4")
    );
  };

  const isVideo = isVideoUrl(displayUrl);

  // Generate random tilt rotation for that messy organic scrapbook table look
  const angles = [-3, -2, 2, 3, 1.5, -1.5];
  const randomRotation = angles[Math.abs(photo.id.charCodeAt(photo.id.length - 1)) % angles.length];

  return (
    <motion.div
      drag
      dragConstraints={{ left: -140, right: 140, top: -110, bottom: 110 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.08, zIndex: 50, cursor: "grabbing" }}
      initial={{ rotate: randomRotation }}
      whileHover={{ y: -8, rotate: randomRotation + (Math.random() > 0.5 ? 1 : -1) }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="inline-block relative p-4 pb-6 w-[285px] bg-[#fffdfa] border-2 border-[#2b2b2b] card-shadow cursor-grab z-15 select-none font-cute rounded-sm"
      title="Drag me around! 💖"
    >
      {/* Tape decoration with loving quotes or labels */}
      <div className="absolute -top-[18px] left-1/2 transform -translate-x-1/2 w-28 h-7 bg-red-100/40 border border-[#2b2b2b]/15 rounded flex items-center justify-center pointer-events-none select-none rotate-1 shadow-xs">
        <span className="font-mono text-[8px] text-zinc-650 font-bold uppercase tracking-widest flex items-center gap-1">
          <Heart className="w-2 h-2 text-rose-500 fill-rose-500 animate-pulse" />
          {photo.id.replace("_", " ")}
        </span>
      </div>

      {/* Tiny colorful pin overlays */}
      <div className="absolute top-2 right-2 flex gap-1 z-10">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-[#2b2b2b]/40 shadow-xs" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 border border-[#2b2b2b]/40 shadow-xs" />
      </div>

      {/* Main looping media frame */}
      <div className="relative w-full aspect-square bg-[#eae8df] rounded-md overflow-hidden border border-[#2b2b2b] shadow-inner">
        {isVideo ? (
          <video
            src={displayUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        ) : (
          <img
            src={displayUrl}
            alt={photo.caption}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        )}
        
        {/* Always visible media type badge */}
        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-neutral-900/60 backdrop-blur-xs rounded text-[8px] text-white flex items-center gap-1 font-mono uppercase">
          {isVideo ? (
            <>
              <Film className="w-2.5 h-2.5 text-emerald-300 fill-emerald-300 animate-pulse" />
              Continuous Loop
            </>
          ) : (
            <>
              <Camera className="w-2.5 h-2.5 text-amber-300" />
              Looping GIF
            </>
          )}
        </div>
      </div>

      {/* Heart rate indicator / bottom aesthetic bar inside picture area */}
      <div className="mt-4 border-b border-[#e9e4d5]/80 pb-3 flex items-center justify-between px-1">
        <h4 className="font-handwritten text-xl font-bold text-neutral-900">
          {photo.caption}
        </h4>
        <span className="text-[10px] font-mono text-neutral-400">
          🔴 LIVE
        </span>
      </div>

      {/* Teasing/Roast text written in "Sharpie Marker" style on bottom margin */}
      <div className="mt-3.5 px-1.5 min-h-[58px] flex items-center justify-center bg-[#faf6ec] rounded-lg border-2 border-dashed border-[#eadeca] relative">
        <p className="font-handwritten text-[16px] leading-tight font-bold text-neutral-800 text-center">
          "{photo.tease}"
        </p>
        
        {/* Little decorative heart scribble */}
        <span className="absolute bottom-0.5 right-1.5 text-xs opacity-30 select-none">
          ♥
        </span>
      </div>
    </motion.div>
  );
}
