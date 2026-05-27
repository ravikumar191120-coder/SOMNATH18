/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Sparkles, Calendar, Heart } from "lucide-react";
import { SpotlightPhoto } from "../data";

interface SpotlightShowcaseProps {
  photos: SpotlightPhoto[];
  customPhotos: Record<string, string>;
}

export default function SpotlightShowcase({ photos, customPhotos }: SpotlightShowcaseProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Visual Header */}
      <div className="text-center mb-8 relative">
        <span className="text-3xl animate-bounce inline-block mb-1">🎁</span>
        <h2 className="font-cute text-neutral-900 font-bold text-2xl uppercase tracking-wider flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          The Birthday Spotlight Duo
          <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
        </h2>
        <p className="font-handwritten text-lg text-neutral-600 mt-1">
          A loving look back: Chotu Pragti vs. Today’s Aesthetic Queen! 🍰✨
        </p>
      </div>

      {/* Grid Layout for Side-by-Side Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center justify-center">
        {photos.map((photo, index) => {
          const displayUrl = customPhotos[photo.id] || photo.defaultUrl;
          const isChildhood = photo.id.includes("childhood");

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30, rotate: isChildhood ? -2 : 2 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotate: 0 }}
              transition={{ type: "spring", stiffness: 110 }}
              className="relative bg-[#fffdf9] p-5 pb-8 rounded-2xl border-4 border-[#2b2b2b] shadow-2xl overflow-hidden font-cute"
            >
              {/* Top Washi Tape Adhesive */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-gradient-to-r from-amber-200/50 block rounded to-yellow-100/40 border border-[#2b2b2b]/10 rotate-1 flex items-center justify-center select-none pointer-events-none">
                <span className="font-mono text-[7px] text-amber-805 tracking-widest font-extrabold uppercase select-none">
                  {isChildhood ? "SUGI CHOTU DAYS" : "MAGICAL PRESENT"}
                </span>
              </div>

              {/* Decorative Stamp badge */}
              <div className="absolute top-3 right-3 bg-red-50 border-2 border-dashed border-red-300 w-11 h-11 rounded rotate-12 flex flex-col items-center justify-center text-[10px] select-none pointer-events-none">
                <span className="text-sm">{isChildhood ? "👶" : "👑"}</span>
                <span className="font-mono text-[5px] uppercase text-zinc-500">27 MAY</span>
              </div>

              {/* Picture Frame Container */}
              <div className="w-full aspect-[4/3] bg-neutral-950 rounded-xl overflow-hidden border-2 border-[#2b2b2b] relative shadow-inner">
                <img
                  src={displayUrl}
                  alt={photo.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none"
                />
                
                {/* Always looping birthday overlay */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-white/75 backdrop-blur-xs rounded-full border border-neutral-900/10 text-[9px] font-mono text-neutral-800 font-bold flex items-center gap-1">
                  <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500 animate-pulse" />
                  {isChildhood ? "Chotu Pragti" : "Sweet Sugi"}
                </div>
              </div>

              {/* Captions and Handwritten texts */}
              <div className="mt-5 text-center px-2">
                <h3 className="font-handwritten text-2xl font-bold text-neutral-900 mb-1">
                  {photo.caption}
                </h3>
                <p className="font-cute text-xs text-neutral-600 leading-relaxed font-semibold">
                  {photo.subtitle}
                </p>
              </div>

              {/* Polaroids Hanging Strings design */}
              <div className="absolute bottom-1 right-3 text-[10px] font-mono text-neutral-400 select-none">
                📷 {isChildhood ? "2000s" : "2026"}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
