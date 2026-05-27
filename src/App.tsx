/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  Sparkles, 
  Camera, 
  Trash2,
  Gift,
  Share2,
  Check
} from "lucide-react";

import { BirthdayNote, AppConfig } from "./types";
import { 
  BIRTHDAY_NOTES, 
  BIRTHDAY_SPOTLIGHTS,
  LOOPING_SNAPS,
  PRINTABLE_STICKERS,
  ROMANTIC_LOFI_URL
} from "./data";

import MusicPlayer from "./components/MusicPlayer";
import CustomizerPanel from "./components/CustomizerPanel";
import PolaroidScrap from "./components/PolaroidScrap";
import SpotlightShowcase from "./components/SpotlightShowcase";
import BulbGame from "./components/BulbGame";
import LetterEnvelope from "./components/LetterEnvelope";

export default function App() {
  // Config state backed by LocalStorage with automatic stale config legacy migration
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem("boki_web_config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Automatically upgrade/migrate old default soundhelix soundtracks to the new lovely Catbox track
        if (parsed && (!parsed.musicUrl || parsed.musicUrl.includes("soundhelix"))) {
          parsed.musicUrl = ROMANTIC_LOFI_URL;
          parsed.musicTitle = "Pragti's Special Track (Catbox Tune) 🎵";
        }
        return parsed;
      } catch (e) {
        console.error("Error loading config", e);
      }
    }
    return {
      musicUrl: ROMANTIC_LOFI_URL,
      musicTitle: "Pragti's Special Track (Catbox Tune) 🎵",
      customPhotos: {},
    };
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [activeNoteFilter, setActiveNoteFilter] = useState<string>("all");

  // Save config helper
  const handleSaveConfig = (newConfig: AppConfig) => {
    setConfig(newConfig);
    localStorage.setItem("boki_web_config", JSON.stringify(newConfig));
  };

  // Reset custom assets to defaults helper
  const handleResetToDefaults = () => {
    if (window.confirm("Are you sure you want to reset all custom photos and custom music back to defaults?")) {
      const resetConfig: AppConfig = {
        musicUrl: ROMANTIC_LOFI_URL,
        musicTitle: "Cozy Warm Light Lofi (Aesthetic)",
        customPhotos: {},
      };
      handleSaveConfig(resetConfig);
      window.location.reload();
    }
  };

  // Trigger floating elements for dreamy, warm vibes
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number; emoji: string; size: number; duration: number }[]>([]);

  useEffect(() => {
    const emojis = ["❤️", "🌸", "✨", "🧸", "🍩", "🥤", "💖", "🎈", "🎉", "🧁", "🍿", "⭐"];
    const interval = setInterval(() => {
      setFloatingHearts((prev) => [
        ...prev.slice(-25), // Keep a healthy pool of active floating decals
        {
          id: Date.now() + Math.random(),
          left: Math.random() * 94 + 3,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          size: 16 + Math.random() * 26,
          duration: 8 + Math.random() * 8,
        },
      ]);
    }, 1800); // More frequent popups for a living atmosphere
    return () => clearInterval(interval);
  }, []);

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2050);
  };

  // Filters notes based on user categorization
  const filteredNotes = activeNoteFilter === "all" 
    ? BIRTHDAY_NOTES 
    : BIRTHDAY_NOTES.filter(n => n.category === activeNoteFilter);

  // Profile img fallback (using spotlight_now photo so it is fully customizable in sync!)
  const profileImageUrl = config.customPhotos.spotlight_now || BIRTHDAY_SPOTLIGHTS[1].defaultUrl;

  return (
    <div className="min-h-screen bg-[#fdfaf2] scrapbook-paper text-neutral-850 custom-scrollbar overflow-x-hidden selection:bg-rose-100">
      
      {/* Background Floating Scrap Elements */}
      <div className="absolute top-[8%] left-[4%] text-4xl opacity-20 pointer-events-none float-slow select-none">🎂</div>
      <div className="absolute top-[18%] right-[6%] text-3xl opacity-20 pointer-events-none float-medium select-none">🦖</div>
      <div className="absolute top-[42%] left-[2%] text-4xl opacity-15 pointer-events-none float-fast select-none">🎈</div>
      <div className="absolute top-[65%] right-[4%] text-4xl opacity-25 pointer-events-none float-slow select-none">🍱</div>
      <div className="absolute top-[85%] left-[5%] text-4xl opacity-15 pointer-events-none float-medium select-none">🥤</div>

      {/* Floating Animated Hearts */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10 w-full h-full">
        {floatingHearts.map((h) => (
          <span
            key={h.id}
            className="absolute bottom-[-50px] opacity-45 float-note select-none transition-all duration-1000"
            style={{
              left: `${h.left}%`,
              animationDuration: `${h.duration}s`,
              fontSize: `${h.size}px`,
            }}
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* DETACHABLE STICKER BANNER CONTROL BAR (TOP LEFT) */}
      <div className="fixed top-4 left-4 z-40 flex flex-col sm:flex-row gap-2.5 items-start sm:items-center">
        <button
          onClick={() => setIsCustomizerOpen(true)}
          className="tape-effect text-xs font-bold px-4 py-2 hover:opacity-95 shadow-md font-cute cursor-pointer transition-transform duration-100 active:scale-95 flex items-center gap-1.5 uppercase select-none rotate-2 hover:rotate-0"
          title="Upload loops & song from Catbox!"
        >
          <span className="text-sm">🎨</span> Personalize Scrapbook
        </button>

        {Object.keys(config.customPhotos).length > 0 && (
          <button
            onClick={handleResetToDefaults}
            className="bg-[#2b2b2b] text-white border border-[#2b2b2b] rounded-full px-3 py-1 text-[10px] uppercase font-mono tracking-wider hover:bg-neutral-800 cursor-pointer flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
            title="Reset background photos to defaults"
          >
            <Trash2 className="w-3 h-3 text-rose-300" /> Reset to Presets
          </button>
        )}
      </div>

      {/* SHARE BAR (TOP RIGHT) */}
      <div className="fixed top-4 right-4 z-45">
        <button
          onClick={handleShareLink}
          className="bg-white/95 border-2 border-[#2b2b2b] p-2.5 rounded-full hover:bg-neutral-50 shadow-md cursor-pointer transition-transform duration-100 active:scale-95 flex items-center justify-center"
          title="Copy the scrapbook copy directory address with your config state!"
        >
          {isCopied ? (
            <span className="text-xs font-bold text-emerald-600 px-1.5 font-cute flex items-center gap-1">
              <Check className="w-3.5 h-3.5 stroke-[3]" /> Copied Link!
            </span>
          ) : (
            <Share2 className="w-4 h-4 text-neutral-800" />
          )}
        </button>
      </div>

      {/* MAIN HEADINGS AREA */}
      <header className="relative max-w-4xl mx-auto pt-24 pb-8 px-5 text-center flex flex-col items-center">
        {/* Adhesives tape overlay on top profile photo */}
        <div className="w-24 h-6 tape-effect transform -rotate-12 transform -translate-y-4 shadow-xs select-none pointer-events-none" />

        {/* Polaroid frame around rounded avatar */}
        <div className="relative inline-block p-2 bg-white card-shadow border border-neutral-200 transform -rotate-1.5 hover:rotate-0 transition-all duration-300 select-none">
          <div className="w-32 h-32 md:w-36 md:h-36 overflow-hidden rounded-full border-2 border-[#2b2b2b] bg-[#edebe4]">
            <img
              src={profileImageUrl}
              alt="Birthday Queen Pragti Profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative crown / heart sticker placements */}
          <div className="absolute -top-3 -right-2 text-3xl transform rotate-12 drop-shadow-sm">👑</div>
          <div className="absolute -bottom-1 -left-2 text-2xl transform -rotate-12 drop-shadow-sm">🌸</div>
        </div>

        {/* Small sticker badges group */}
        <div className="mt-6 flex flex-wrap justify-center gap-1.5 items-center text-xs font-mono uppercase bg-neutral-150 border border-neutral-350/50 rounded-full px-4.5 py-1.5 select-none animate-fade-in text-neutral-600 font-bold">
          <span>🍰 PRAGTI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-450" />
          <span>SUGI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>POOCHKI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>✨ SHINING STAR</span>
        </div>

        {/* Display Title in elegant high contrast typography */}
        <h1 className="font-cute font-bold text-4xl md:text-6xl tracking-tight text-neutral-900 mt-5 leading-none max-w-2xl px-2">
          Happy Birthday <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 drop-shadow-xs font-scribble text-4.5xl md:text-6.5xl">
            Pragti!
          </span>
        </h1>

        <p className="font-handwritten text-xl font-bold text-neutral-700 leading-relaxed max-w-lg mt-4 px-3">
          "A beautiful digital scrapbook made of cozy inside stories, endlessly looped real shots, and total friendly appreciation for our favorite dramatic queen."
        </p>

        {/* Date Stamp block badge */}
        <div className="mt-8 flex items-center gap-1.5 text-[11px] font-mono text-rose-700 uppercase bg-rose-50 border border-rose-250/60 px-4 py-2 rounded-full select-none shadow-xs font-bold">
          <span>✨ 27th May • Birthday Special Archive ✨</span>
        </div>
      </header>

      {/* AUDIO LOFI PLAYER TAPE */}
      <section className="max-w-xl mx-auto px-5 pb-10">
        <MusicPlayer
          musicUrl={config.musicUrl}
          musicTitle={config.musicTitle}
          onMusicChange={(url, title) => handleSaveConfig({ ...config, musicUrl: url, musicTitle: title })}
        />
      </section>

      {/* REDESIGNED SPOTLIGHT COMPONENT ROW (CHILDHOOD VS NOW) */}
      <section className="py-10 border-t-2 border-dashed border-[#e3dacf] bg-[#faf8f3]/20">
        <SpotlightShowcase photos={BIRTHDAY_SPOTLIGHTS} customPhotos={config.customPhotos} />
      </section>

      {/* SECTION: 4 ENDLESSLY LOOPING SNAPSHOTS */}
      <section className="relative py-14 border-t-2 border-dashed border-[#e3dacf]">
        {/* Decorative Top Line of Scrap Table */}
        <div className="absolute top-0 inset-x-0 h-1 bg-stone-300/40 select-none pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 text-center">
          <div className="inline-block relative px-6 py-2 pb-3 mb-6">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-8 bg-pink-100 bg-opacity-40 rotate-1 select-none pointer-events-none" />
            
            <h2 className="font-cute text-neutral-950 font-bold text-xl md:text-2xl uppercase relative z-10 flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-rose-500 animate-pulse" /> Endless Looping Snaps Row
            </h2>
          </div>
          
          <p className="font-handwritten text-lg text-neutral-600 max-w-md mx-auto mb-10 leading-snug font-bold">
            ❤️ Look at these continuous memories rotating with funny teasing roasts styled on each card! Drag them around!
          </p>

          <div className="relative min-h-[480px] flex flex-wrap gap-8 items-center justify-center px-4">
            {LOOPING_SNAPS.map((snap) => (
              <PolaroidScrap
                key={snap.id}
                photo={snap}
                customUrl={config.customPhotos[snap.id]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE COMPLIMENT ROUND POPPER GAME */}
      <section className="py-16 bg-[#faf9f3]/40 border-t-2 border-[#e3dacf] border-dashed relative">
        <div className="max-w-4xl mx-auto px-5">
          <BulbGame />
        </div>
      </section>

      {/* SECTION: NOTES & TRIVIA BOARD */}
      <section id="notes-notebook" className="py-20 max-w-5xl mx-auto px-5 relative border-t-2 border-[#e3dacf] border-dashed">
        <div className="text-center mb-10">
          <h2 className="font-cute text-neutral-950 font-bold text-2xl uppercase flex items-center justify-center gap-1.5">
            📝 Sticky Birthday Wishes
          </h2>
          <p className="font-handwritten text-lg text-neutral-500 mt-1 max-w-sm mx-auto font-semibold">
            Chalkboards of friendly tea & heartfelt compliments. Filter stories below:
          </p>

          {/* Filtration button tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {["all", "tease", "compliment", "inside-joke"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveNoteFilter(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-cute capitalize transition-transform duration-100 cursor-pointer ${
                  activeNoteFilter === cat
                    ? "bg-rose-450 text-white font-bold shadow scale-105"
                    : "bg-white border border-[#2b2b2b]/15 text-neutral-600 hover:bg-neutral-50 shadow-xs"
                }`}
              >
                {cat === "all" ? "📂 Show All Comments" : cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Notebook Cards layout grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, scale: 0.9, rotate: note.rotation }}
                animate={{ opacity: 1, scale: 1, rotate: note.rotation }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className={`relative p-5 pb-7 rounded-xl border-2 border-[#2b2b2b]/15 card-shadow hover:-translate-y-1 hover:rotate-0 hover:z-20 transition-all duration-200 select-none ${note.bgClass}`}
                style={{ originY: 0 }}
              >
                {/* Visual binder tabs sticky strip */}
                <div className="absolute -top-3 left-1/4 right-1/4 h-5 bg-yellow-100 bg-opacity-60 tape-effect rotate-1 z-10" />

                {/* Decorative Elements */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base bg-white/70 w-6 h-6 rounded-full flex items-center justify-center shadow-xs">
                    {note.sticker}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider bg-white/60 px-1.5 py-0.5 rounded border border-neutral-900/10 font-bold">
                    {note.category}
                  </span>
                </div>

                <h3 className="font-cute font-extrabold text-[15px] text-neutral-950 uppercase mb-2">
                  {note.title}
                </h3>

                <p className="font-handwritten text-[17px] leading-relaxed text-neutral-800 font-bold mb-3">
                  {note.content}
                </p>

                <div className="text-right border-t border-neutral-900/5 pt-2 mt-2">
                  <span className="font-handwritten text-sm italic opacity-75 font-bold">
                    {note.authorSig}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* THE SEALED SCROLL LETTER */}
      <section className="py-16 bg-[#fefff4] border-t-2 border-dashed border-[#e3dacf]">
        <div className="max-w-4xl mx-auto px-5 text-center">
          <div className="mb-4">
            <span className="text-4xl animate-pulse inline-block">💌</span>
          </div>
          <h2 className="font-cute text-neutral-950 font-bold text-2xl uppercase">
            The Sealed Scroll Folder
          </h2>
          <p className="font-handwritten text-lg text-neutral-500 mt-1 max-w-sm mx-auto font-bold animate-pulse">
            Tap the parcel below to reveal the handwriting-styled custom birthday letter!
          </p>

          <LetterEnvelope />
        </div>
      </section>

      {/* BOTTOM DECORATIVE STICKERS RAIL */}
      <section className="py-12 border-t-2 border-dashed border-[#e3dacf] max-w-4xl mx-auto px-5 text-center">
        <h3 className="font-cute text-neutral-900 font-bold text-xs uppercase tracking-widest mb-6">
          ✨ Cute Sticker Collection Pinned:
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-4 select-none">
          {PRINTABLE_STICKERS.map((st) => (
            <motion.div
              key={st.id}
              whileHover={{ scale: 1.15, rotate: st.rotation - 5 }}
              animate={{ rotate: st.rotation }}
              className={`px-3.5 py-2 rounded-full border border-neutral-300 flex items-center gap-1 shadow-sm text-xs font-cute font-bold relative ${st.bg}`}
            >
              <span className="text-sm">{st.emoji}</span>
              <span>{st.label}</span>
              <div className="absolute inset-0.5 rounded-full border border-dashed border-black/10 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* DECK FOOTER */}
      <footer className="bg-neutral-900 text-zinc-100 border-t-4 border-[#2b2b2b] py-12 relative z-30 font-cute">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <Gift className="w-10 h-10 text-rose-500 animate-bounce" />
          </div>

          <h3 className="font-cute text-white text-lg font-bold mb-1 uppercase tracking-wider">
            Sugi & Pragti's Sweet Scrapbook Web App
          </h3>
          <p className="text-xs text-zinc-405 font-mono mb-6">Designed as a genuine handmade-style digital diary</p>

          <div className="text-[11px] text-zinc-500 font-mono flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>Copyright © 2026</span>
            <span className="hidden sm:inline">•</span>
            <span>Your Birthday Digital Scrapbook • Made with premium friendly vibes 💖</span>
          </div>
        </div>
      </footer>

      {/* CONFIG DRAWER OVERLAYS */}
      <CustomizerPanel
        config={config}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
