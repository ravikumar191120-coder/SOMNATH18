/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HelpCircle, Image as ImageIcon, Music, Save, X, Check, Film, Calendar } from "lucide-react";
import React, { useState } from "react";
import { AppConfig } from "../types";
import { BIRTHDAY_SPOTLIGHTS, LOOPING_SNAPS } from "../data";

interface CustomizerPanelProps {
  config: AppConfig;
  onSaveConfig: (newConfig: AppConfig) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizerPanel({
  config,
  onSaveConfig,
  isOpen,
  onClose,
}: CustomizerPanelProps) {
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>(config.customPhotos || {});
  const [musicUrl, setMusicUrl] = useState(config.musicUrl);
  const [musicTitle, setMusicTitle] = useState(config.musicTitle);

  const [activeHelpTab, setActiveHelpTab] = useState<"general" | "images" | "audio">("general");
  const [isSaved, setIsSaved] = useState(false);

  const handleApplyChanges = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig({
      musicUrl,
      musicTitle,
      customPhotos: photoUrls,
    });
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  const updatePhotoUrlValue = (id: string, value: string) => {
    setPhotoUrls((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/45 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      <div 
        id="control-center-panel"
        className="h-full w-full max-w-lg bg-[#faf8f4] border-l-4 border-dashed border-[#d0c4b4] p-6 shadow-2xl relative overflow-y-auto custom-scrollbar font-cute text-neutral-800"
      >
        {/* Binder Clip Motif */}
        <div className="absolute top-0 right-12 w-16 h-8 bg-neutral-400 opacity-20 transform -translate-y-2 rounded-b" />

        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-[#e3dacf] pb-4 mb-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🎁</span>
            <div>
              <h2 className="text-xl font-bold font-cute text-neutral-900 flex items-center gap-1.5">
                Personalize Scrapbook
              </h2>
              <p className="text-xs font-mono text-neutral-500 uppercase mt-0.5">Two Spotlight + Loops customizer</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info */}
        <div className="bg-rose-50 border-2 border-dashed border-rose-300 rounded-xl p-4 mb-6">
          <p className="text-xs leading-relaxed text-rose-900 font-medium">
            <strong>👋 Hey!</strong> Yahan se tum GIFs, short looping videos (MP4s) ya normal photos copy karke live frames me badal sakte ho! Ye updates instantly update ho jayenge.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleApplyChanges} className="space-y-6">
          
          {/* A: Spotlight Sections Setup (Childhood vs Now) */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-neutral-950 flex items-center gap-2 border-b border-[#e6ded5] pb-1 uppercase tracking-wider">
              <Calendar className="w-4 h-4 text-rose-550" />
              1. Two Spotlight Photos (Bachpan vs Abhi):
            </h3>

            {BIRTHDAY_SPOTLIGHTS.map((sp) => {
              const currentVal = photoUrls[sp.id] || "";
              return (
                <div key={sp.id} className="space-y-1 bg-white p-3 rounded-xl border border-neutral-200 shadow-xs">
                  <label className="text-xs font-bold text-neutral-800 flex justify-between items-center">
                    <span>{sp.caption}</span>
                    <span className="text-[9px] text-neutral-400 font-mono">ID: {sp.id}</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Paste direct JPG/PNG/GIF URL from Catbox..."
                    value={currentVal}
                    onChange={(e) => updatePhotoUrlValue(sp.id, e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-neutral-300 focus:border-rose-450 focus:ring-1 focus:ring-rose-220 text-neutral-800"
                  />
                </div>
              );
            })}
          </div>

          {/* B: Snaps Config Loops */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-neutral-950 flex items-center gap-2 border-b border-[#e6ded5] pb-1 uppercase tracking-wider">
              <Film className="w-4 h-4 text-amber-550" />
              2. 4 Looping Snaps (Continuous gifs / videos):
            </h3>

            {LOOPING_SNAPS.map((snap) => {
              const currentVal = photoUrls[snap.id] || "";
              return (
                <div key={snap.id} className="space-y-1 bg-white p-3 rounded-xl border border-neutral-200 shadow-xs">
                  <label className="text-xs font-bold text-neutral-800 flex justify-between items-center">
                    <span>{snap.caption}</span>
                    <span className="text-[9px] text-neutral-400 font-mono">ID: {snap.id}</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Paste direct MP4 video link or GIF/Image URL..."
                    value={currentVal}
                    onChange={(e) => updatePhotoUrlValue(snap.id, e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-neutral-300 focus:border-rose-450 focus:ring-1 focus:ring-rose-220 text-neutral-800"
                  />
                  <p className="text-[9px] text-neutral-400 italic">
                    💡 Perfect for Catbox streamable links. Ends with .mp4 or .gif
                  </p>
                </div>
              );
            })}
          </div>

          {/* C: Music Configuration */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-neutral-950 flex items-center gap-2 border-b border-[#e6ded5] pb-1 uppercase tracking-wider">
              <Music className="w-4 h-4 text-indigo-550" />
              3. Customize Background Music Track:
            </h3>

            <div className="bg-white p-3 rounded-xl border border-neutral-200 space-y-3 shadow-xs">
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800">Song Title</label>
                <input
                  type="text"
                  placeholder="e.g., Cozy Lofi Beats..."
                  value={musicTitle}
                  onChange={(e) => setMusicTitle(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-neutral-300 focus:border-rose-450 text-neutral-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-800">Direct MP3 Link</label>
                <input
                  type="text"
                  placeholder="Paste direct .mp3 address link..."
                  value={musicUrl}
                  onChange={(e) => setMusicUrl(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-neutral-300 focus:border-rose-450 text-neutral-800"
                />
              </div>
            </div>
          </div>

          {/* Guide Section */}
          <div className="border-t-2 border-dashed border-[#e6ded5] pt-4 space-y-3">
            <div className="flex gap-2 text-rose-600">
              <HelpCircle className="w-4 h-4 mt-0.5" />
              <h4 className="text-xs font-bold text-neutral-950 uppercase tracking-widest font-cute">
                Direct Stream Link Guide
              </h4>
            </div>

            <div className="flex gap-1 border-b border-neutral-200">
              {["general", "images", "audio"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveHelpTab(t as any)}
                  className={`text-[11px] font-semibold px-2.5 py-1 capitalize transition-colors cursor-pointer ${
                    activeHelpTab === t
                      ? "border-b-2 border-rose-500 text-rose-850"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="bg-white p-4 rounded-xl border border-neutral-100 text-xs leading-relaxed space-y-2 text-neutral-600">
              {activeHelpTab === "general" && (
                <>
                  <p>
                    <strong>🤔 Catbox Se Upload Kaise Karein?</strong>
                  </p>
                  <p className="pl-1">
                    👉 Go to <strong>Catbox.moe</strong>. Apne phone ya computer se raw video loops (mp4), direct GIFs ya images drag & drop karke seedha upload karo.
                  </p>
                  <p className="pl-1">
                    Wahan se jo direct text response link (ends with <code>.mp4</code>, <code>.gif</code>, <code>.jpg</code>) milega, use copy karke upar simple box me paste kar do! Instantly update ho jayega!
                  </p>
                </>
              )}

              {activeHelpTab === "images" && (
                <>
                  <p>
                    <strong>📸 Direct Links Strategy:</strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Use <strong>Postimages.org</strong> for normal photos.</li>
                    <li>Always make sure you copy the "Direct Link" parameter ending in the format of the file. No HTML wrap pages!</li>
                  </ul>
                </>
              )}

              {activeHelpTab === "audio" && (
                <>
                  <p>
                    <strong>🎵 MP3 Audio Uploading:</strong>
                  </p>
                  <p className="pl-1 text-rose-905 bg-rose-50/70 p-2 rounded-lg border border-dashed border-rose-220">
                    YouTube aur Spotify key direct streams are not supported because of security protocols in browsers. Please convert your track to <code>.mp3</code>, upload it to <strong>Catbox.moe</strong> and paste the link!
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex gap-3 justify-end pt-4 border-t border-[#e3dacf]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-neutral-300 text-neutral-600 rounded-xl hover:bg-neutral-100 transition-colors text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-550 hover:to-pink-550 text-white font-bold rounded-xl shadow-md cursor-pointer transition-transform duration-100 active:scale-95 flex items-center gap-1.5 text-xs"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4" /> Updated!
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Live Setup
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
