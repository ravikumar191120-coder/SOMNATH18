/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { Heart, Lock, Mail, Star, Smile } from "lucide-react";
import React, { useState, useRef } from "react";

export default function LetterEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [clickYesCount, setClickYesCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dodging strategy for the NO button
  const handleNoHover = () => {
    if (!containerRef.current) return;
    
    // Get container dimensions to keep the button inside it
    const rect = containerRef.current.getBoundingClientRect();
    const rangeX = rect.width - 110; 
    const rangeY = rect.height - 70;
    
    const randomX = Math.floor(Math.random() * rangeX) - (rect.width / 2 - 50);
    const randomY = Math.floor(Math.random() * rangeY) - (rect.height / 2 - 30);
    
    setNoBtnPos({ x: randomX, y: randomY });
  };

  const handleYesClick = () => {
    setShowConfetti(true);
    setClickYesCount((prev) => prev + 1);
    setTimeout(() => {
      setShowConfetti(false);
    }, 4500);
  };

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[500px] w-full max-w-xl mx-auto flex items-center justify-center p-4 overflow-hidden"
    >
      {/* Interactive Heart Exploder Particles */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 360) / 24;
              const r = 100 + Math.random() * 120;
              const x = Math.cos((angle * Math.PI) / 180) * r;
              const y = Math.sin((angle * Math.PI) / 180) * r;
              const emoji = ["💖", "🧁", "🎂", "🌸", "⭐", "🎉", "🥤", "🍱"][i % 8];
              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, scale: 0.2, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1.5, x, y, rotate: angle * 2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute text-xl"
                >
                  {emoji}
                </motion.span>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="relative w-full flex flex-col items-center">
        {/* ENVELOPE BASE (CLOSED PHASE) */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring" }}
            onClick={() => setIsOpen(true)}
            className="w-full aspect-[5/3] bg-gradient-to-br from-rose-100 to-amber-50 rounded-2xl border-4 border-[#2b2b2b] p-6 shadow-xl flex flex-col items-center justify-center cursor-pointer select-none group relative overflow-hidden"
            title="Click to open Pragti's letter 💌"
          >
            {/* Hand-drawn postage stamp */}
            <div className="absolute top-4 right-4 w-12 h-14 bg-amber-100 border-2 border-dashed border-[#2b2b2b] rotate-6 flex flex-col items-center justify-center text-xs p-1 select-none">
              <span className="text-lg">👑</span>
              <span className="font-mono text-[6px] text-zinc-650 font-bold uppercase mt-1">Boki Stamp</span>
            </div>

            {/* Floating Doodles inside */}
            <div className="absolute -bottom-2 -left-2 text-4xl opacity-15 rotate-12">🥤</div>
            <div className="absolute top-4 left-6 text-3xl opacity-10 -rotate-12">🍱</div>

            {/* Seal Ring Indicator */}
            <div className="w-16 h-16 rounded-full bg-rose-450 border-4 border-[#2b2b2b] flex items-center justify-center shadow-md relative z-10 transition-transform duration-300 group-hover:scale-110">
              <Mail className="w-7 h-7 text-white animate-pulse" />
            </div>

            <h3 className="font-cute text-neutral-900 font-bold mt-4 tracking-wider text-sm md:text-md uppercase text-center relative z-10">
              Pragti's Birthday Envelope 
            </h3>
            <p className="font-handwritten text-xl font-bold text-rose-600 mt-1 select-none text-center relative z-10">
              💌 Tap to Break the Seal & Open! 💌
            </p>

            <span className="font-mono text-[9px] text-zinc-500 uppercase mt-4 block">
              * Dedicated to the Birthday Queen 👑
            </span>
          </motion.div>
        )}

        {/* OPEN ENVELOPE Scrapbook sheet showing Letter (OPEN PHASE) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ y: 250, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 200, opacity: 0 }}
              transition={{ duration: 0.7, type: "spring", stiffness: 85 }}
              className="w-full bg-[#fffff8] hand-drawn-border p-6 shadow-2xl relative custom-scrollbar select-none z-20"
            >
              {/* Top Red margin sticker of notepad */}
              <div className="absolute top-0 inset-x-0 h-4 bg-gradient-to-r from-red-200 via-pink-300 to-amber-200 rounded-t opacity-80" />
              
              {/* Left red ledger margin line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-red-300 bg-opacity-65" />

              {/* Binder rings overlay decoration */}
              <div className="absolute -top-3 left-10 right-10 flex justify-between px-6 pointer-events-none">
                <div className="w-3 h-5 bg-neutral-300 rounded-full border border-neutral-500" />
                <div className="w-3 h-5 bg-neutral-300 rounded-full border border-neutral-500" />
                <div className="w-3 h-5 bg-neutral-300 rounded-full border border-neutral-500" />
                <div className="w-3 h-5 bg-neutral-300 rounded-full border border-neutral-500" />
              </div>

              {/* Close Button clip */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 bg-zinc-100 hover:bg-rose-50 text-neutral-600 hover:text-rose-500 font-bold text-[10px] font-mono border border-neutral-300 px-2 py-1 rounded cursor-pointer transition-colors"
                title="Seal the letter back"
              >
                Close Folder
              </button>

              {/* Content body with notebooks lines */}
              <div className="pl-6 pt-4 pr-1.5 font-cute">
                {/* Header */}
                <div className="flex items-center gap-1.5 border-b border-[#e9e4ce] pb-2 mb-4">
                  <Star className="w-4 h-4 text-rose-500 fill-rose-300" />
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Dear Pragti / 27 May, 2026</span>
                </div>

                {/* Hand-written letter paragraph */}
                <div className="space-y-4 font-handwritten text-xl leading-relaxed text-neutral-800">
                  <p className="font-bold text-2xl text-rose-500">
                    Oye Pragti! 🎂🥤
                  </p>
                  
                  <p>
                    Happy Birthday! Wishing you a brilliant, happy day filled with lots of joy, coffee, and lazy sleep. Hum sab ki dosti me jitna mazaa hai, wo sab celebrate karte hain aaj!
                  </p>
                  
                  <p>
                    Sabse bada thanks toh is baat ka hai ki tum <strong>apna pink wala water bottle mujhe peene ke liye daily deti ho</strong>! Sachi me, agar tum 'arey-bhaiya' bolke pani nahi pilati, toh main dehydrated hi ghoomta rehta! You are literally the official supplier of my daily survival! 🌸🥤
                  </p>

                  <p>
                    Aur wo jo tum <strong>kabhi-kabhi khud se lunch box</strong> bhi mere taraf pass kar deti ho... boss, swarg sa swad milta hai! You are officially my premium nutritional sponsor.
                  </p>

                  <p className="border-l-4 border-amber-400 pl-2 bg-amber-50/40 py-1.5 rounded-r-lg">
                    Waise Sugi, ek baat yaad dila du — <strong>next year humara NEET exam hai!</strong> Uske liye abhi se <strong>BEST OF LUCK! 🩺📚</strong> Jee-jaan laga ke padhna hai. Kya pata next year hum sath me celebrate ya wish kar paye ya nahi, toh is wish ko solid memory aur motivation ki tarah rakhna! You can definitely crack it, doctor sahiba! 💖
                  </p>

                  <p>
                    Aur haan, direct point pe aate hain... <strong>PARTY KAB DE RAHI HO?! 🍕🎂</strong> Birthday treat bina celebrate kiye dosti incomplete hai! Jaldi se plans drop karo, cold drinks and treats are highly pending.
                  </p>

                  <p>
                    Tum sachi me hum logon ki sabse zyada humorous, high energy aur lovable dost ho (kabhi-kabhi absolute cutie too inside notes). Wo jo tum thak kar "Main kya karu?!" dukan kholti ho, use copy karke hum log sach me haste hain! Your meme spams are the real highlights of our boring days.
                  </p>
                  
                  <p className="font-bold text-neutral-900 border-l-4 border-rose-400 pl-2 py-1 bg-rose-50/50 rounded-r-lg">
                    Have the sweetest, dreamiest year ahead, Pragti! May you always smile exactly like the proud dramatic queen you are. Go conquer the world! 😂🥳
                  </p>
                </div>

                {/* Favorite Friend Checker Interactive */}
                <div className="mt-8 border-t-2 border-dashed border-[#e6ded0] pt-5 bg-pink-50/20 rounded-xl p-4 relative">
                  <div className="flex items-center gap-1 mb-2">
                    <Smile className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-bold text-neutral-950 uppercase tracking-wide">
                      ⚡ Friendship Quality-Check Guarantee:
                    </span>
                  </div>
                  <p className="font-handwritten text-lg font-bold text-emerald-850 mb-4 text-center">
                    "Pragti! Honestly respond: Am I your absolute favorite partner in crime?"
                  </p>

                  {/* Buttons Box */}
                  <div className="flex justify-center items-center gap-6 min-h-[50px] relative">
                    {/* YES button */}
                    <button
                      type="button"
                      onClick={handleYesClick}
                      className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-teal-500 text-white font-bold text-xs rounded-full hover:from-emerald-500 hover:to-teal-600 transition-transform active:scale-95 cursor-pointer shadow-sm relative z-30"
                    >
                      {clickYesCount > 0 ? `YES! For sure! (${clickYesCount}) ❤️` : "YES! BILKUL! 😻"}
                    </button>

                    {/* DODGING NO Button */}
                    <motion.button
                      type="button"
                      onMouseEnter={handleNoHover}
                      onClick={handleNoHover} // fallback click support for touch interfaces
                      animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className="px-5 py-2 bg-rose-100 hover:bg-neutral-200 text-rose-800 font-semibold text-xs border border-rose-300 rounded-full cursor-pointer shadow-sm relative z-10"
                    >
                      Nah, status is average... 🦖
                    </motion.button>
                  </div>

                  {/* YES Click Message */}
                  {clickYesCount > 0 && (
                    <p className="text-center font-handwritten text-xl font-bold text-emerald-700 mt-3 animate-bounce">
                      Yay! We knew it Sugi! Hugs and unlimited lunch box praises for you! 🍰🍱💖
                    </p>
                  )}
                </div>

                {/* Footer Signature */}
                <div className="mt-6 flex justify-between items-center text-xs font-mono text-zinc-405 border-t border-[#f0ebd2] pt-3">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <Lock className="w-3 h-3 text-emerald-555" /> Bestie Verified safe
                  </span>
                  <span className="font-handwritten text-md font-bold text-rose-500">
                    With lots of friendly roasts, Your Bestie 🤍
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
