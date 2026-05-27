/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Sparkles, Trophy, Award, RefreshCw, VolumeX, CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { FUNNY_COMPLIMENTS } from "../data";

interface Balloon {
  id: number;
  color: string;
  left: number;
  scale: number;
  compliment: string;
  isPopped: boolean;
  wiggleAngle: number;
}

const BALLOON_COLORS = [
  "bg-rose-450",
  "bg-pink-400",
  "bg-teal-400",
  "bg-amber-400",
  "bg-indigo-400",
  "bg-violet-400",
  "bg-emerald-400"
];

export default function BulbGame() {
  const generateBalloons = (): Balloon[] => {
    return Array.from({ length: 7 }).map((_, idx) => ({
      id: idx + Date.now(),
      color: BALLOON_COLORS[idx % BALLOON_COLORS.length],
      left: 10 + idx * 12, // stagger left positions
      scale: 0.9 + Math.random() * 0.3,
      compliment: FUNNY_COMPLIMENTS[idx % FUNNY_COMPLIMENTS.length],
      isPopped: false,
      wiggleAngle: -6 + Math.random() * 12,
    }));
  };

  const [balloons, setBalloons] = useState<Balloon[]>(generateBalloons());
  const [poppedCount, setPoppedCount] = useState(0);
  const [activeMessage, setActiveMessage] = useState<string>("Click or hover to pop Boki's floating balloons! 🎈");
  const [lastSticker, setLastSticker] = useState<string>("🎂");

  const popBalloon = (id: number) => {
    setBalloons((prev) =>
      prev.map((b) => {
        if (b.id === id && !b.isPopped) {
          setPoppedCount((c) => c + 1);
          setActiveMessage(`🎈 Boki Fun Fact: "${b.compliment}"`);
          
          const stickers = ["🧁", "✨", "🍩", "🤍", "🐰", "💅", "🍭"];
          setLastSticker(stickers[Math.floor(Math.random() * stickers.length)]);
          return { ...b, isPopped: true };
        }
        return b;
      })
    );
  };

  const resetGame = () => {
    setBalloons(generateBalloons());
    setPoppedCount(0);
    setActiveMessage("Awesome! New balloons filled with fresh attitude. Let's pop! 🎈");
  };

  const isAllPopped = balloons.every((b) => b.isPopped);

  return (
    <div className="hand-drawn-border bg-[#fefffa] p-5 max-w-xl w-full mx-auto relative card-shadow select-none">
      {/* Tape aesthetic decoration */}
      <div className="absolute -top-4 left-1/3 w-32 h-6 tape-effect z-10" />

      {/* Ribbon header */}
      <div className="text-center pb-4 border-b-2 border-dashed border-[#e3dacf] mb-5">
        <h3 className="font-cute text-amber-900 font-bold text-lg flex items-center justify-center gap-1.5 uppercase">
          🎈 Pop Sugi's Birthday Balloons!
        </h3>
        <p className="text-xs text-neutral-500 font-mono mt-0.5">Interactive Attitude Popper</p>
      </div>

      {/* Floating Canvas */}
      <div className="relative h-64 bg-slate-50 border border-neutral-250 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
        {/* Sky grid background */}
        <div className="grid-paper absolute inset-0 opacity-40" />

        {/* Sky background element */}
        <div className="absolute top-2 left-3 flex gap-1 items-center font-mono text-[9px] text-zinc-400 uppercase select-none">
          <Trophy className="w-3 h-3 text-amber-500" />
          <span>Popped: {poppedCount} / {balloons.length}</span>
        </div>

        {/* Floating Balloons */}
        <div className="absolute inset-x-0 top-0 bottom-4 flex items-end justify-around px-4">
          {balloons.map((b) => {
            if (b.isPopped) {
              return (
                <div key={b.id} className="relative w-12 h-20 -top-8 flex flex-col items-center justify-center">
                  {/* Explosion Sparkle */}
                  <motion.div
                    initial={{ scale: 0.1, opacity: 1 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute text-2xl"
                  >
                    💥
                  </motion.div>
                  <span className="text-xl relative animate-bounce -mt-4">{lastSticker}</span>
                  <span className="text-[9px] font-mono text-neutral-400 mt-2">popped!</span>
                </div>
              );
            }

            return (
              <motion.div
                key={b.id}
                onClick={() => popBalloon(b.id)}
                onMouseEnter={() => popBalloon(b.id)} // Support hover to pop for satisfying interaction!
                style={{
                  left: `${b.left}%`,
                  scale: b.scale,
                }}
                className="relative cursor-pointer transition-transform duration-100 hover:scale-105"
                animate={{
                  y: [-12, 12, -12],
                  rotate: [b.wiggleAngle - 3, b.wiggleAngle + 3, b.wiggleAngle - 3],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Visual Balloon structure */}
                <div className="flex flex-col items-center">
                  {/* Balloon bubble body */}
                  <div
                    className={`w-12 h-14 rounded-full ${b.color} relative shadow-sm border border-neutral-900/10 flex items-center justify-center`}
                  >
                    {/* Gloss reflection overlay */}
                    <div className="absolute top-1.5 left-2 w-3 h-4 bg-white opacity-40 rounded-full" />
                    <span className="text-sm select-none opacity-80">🎈</span>
                  </div>

                  {/* Knot */}
                  <div className="w-2 h-1 border-t-2 border-neutral-400 bg-neutral-600 rounded-b-xs" />

                  {/* Wavy thread string */}
                  <div className="w-0.5 h-12 bg-neutral-300 opacity-75 border-dashed" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* All popped victory view */}
        {isAllPopped && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-4 text-center z-10"
          >
            <Award className="w-12 h-12 text-rose-500 animate-bounce" />
            <h4 className="font-cute text-neutral-900 font-bold mt-2">✨ Challenge Completed!</h4>
            <p className="font-handwritten text-lg leading-snug max-w-sm mt-1 text-rose-800">
              Uff! Boki's attitude has been popped perfectly. You won a virtual chocolate cheesecake! 🍰✨ Enjoy the sugar rush!
            </p>
            <button
              onClick={resetGame}
              className="mt-4 flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs rounded-full transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Blow More Balloons
            </button>
          </motion.div>
        )}
      </div>

      {/* Live Fact Display Card */}
      <div className="mt-4 bg-neutral-50 px-4 py-3 rounded-xl border border-neutral-200 text-center min-h-[52px] flex items-center justify-center">
        <p className="font-handwritten font-semibold text-lg text-neutral-800 leading-snug">
          {activeMessage}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="mt-4 flex justify-between items-center text-[10px] font-mono text-neutral-400">
        <span>* No real bokies were harmed in making this game.</span>
        {!isAllPopped && (
          <button
            onClick={resetGame}
            className="hover:text-rose-500 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
