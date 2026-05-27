/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BirthdayNote, PhotoPolaroid, PrintableSticker } from "./types";

export const DEFAULT_MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; 
export const CUTE_INSTRUMENTAL_URL = "https://assets.mixkit.co/music/preview/mixkit-dreaming-big-31.mp3"; // beautiful soft peaceful melody
export const HAPPY_LOFI_URL = "https://assets.mixkit.co/music/preview/mixkit-playful-kitty-33.mp3"; // very cute playful cat lofi song
export const ROMANTIC_LOFI_URL = "https://assets.mixkit.co/music/preview/mixkit-warm-light-34.mp3"; // very cozy loving lofi

export const PRESET_SONGS = [
  { id: "cozy", name: "Cozy Warm Light Lofi (Aesthetic)", url: ROMANTIC_LOFI_URL },
  { id: "lofi", name: "Dreamy Playful Kitty (Cute Beats)", url: HAPPY_LOFI_URL },
  { id: "dreamy", name: "Boki's Sweet Soft Piano Instrumental", url: CUTE_INSTRUMENTAL_URL },
];

// Spotlight Photos definition (Childhood vs Now)
export interface SpotlightPhoto {
  id: string;
  defaultUrl: string;
  caption: string;
  subtitle: string;
}

export const BIRTHDAY_SPOTLIGHTS: SpotlightPhoto[] = [
  {
    id: "spotlight_childhood",
    defaultUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHIzbzUzdThsd3B2bnFlbmxtcHptYXh2eDkxeDRwdzhsczBpZzM3dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/qas0w6FvOfpCg/giphy.gif",
    caption: "How It Started... 👶🏼✨",
    subtitle: "Chhoti Pragti: Full of cute dreams & sweet habits!"
  },
  {
    id: "spotlight_now",
    defaultUrl: "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDNscndmOHZ1YXJtMXRjMXR2ZDN0YXIwaTR5ZGx6Yzh5cWZ4ZHQxOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MDJ9IbhswvE8Y8jmOk/giphy.gif",
    caption: "How It's Going! 👑🎂",
    subtitle: "Super Aesthetic Queen Pragti ruling with style!"
  }
];

// Continuous looping snaps (which play endlessly in background)
export interface LoopingSnap {
  id: string;
  defaultUrl: string;
  caption: string;
  tease: string;
}

export const LOOPING_SNAPS: LoopingSnap[] = [
  {
    id: "snap_1",
    defaultUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDBzOGN2NXhpdThwbTdtYWlnaTFubmNid2w1dHkyMHltdjIxeGJjdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/Ym64m8mId0XQO3NBSM/giphy.gif",
    caption: "The Ultimate Drama Mode 💅",
    tease: "Pehle 45 minutes spending on deciding the perfect angle, and then 'Yaar mood kharab ho gya main nahi le rahi photu!'"
  },
  {
    id: "snap_2",
    defaultUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbDNscndmOHZ1YXJtMXRjMXR2ZDN0YXIwaTR5ZGx6Yzh5cWZ4ZHQxOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MDJ9IbhswvE8Y8jmOk/giphy.gif",
    caption: "Perpetually Exhausted cutie 🥱",
    tease: "Sleeping for a solid 11 hours only to complain: 'God why am I so tired... lagta hai backache ho rha h!' 😭"
  },
  {
    id: "snap_3",
    defaultUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzgxNHI0cWdtY3E0bXZvNXZic24zdTh2YzVpdXAwajN0ZXB0ZDF3MCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5K4vXfDyw0g4uQp6dB/giphy.gif",
    caption: "Navigation Levels: 0.1% 🧭",
    tease: "Sugi inside her own kitchen: *needs Google maps* to locate the spice rack, or enters the neighbor's room with full confidence!"
  },
  {
    id: "snap_4",
    defaultUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGx0dnAzejRrdmlkbHRzZmZidXh5ajFwbnV1bnR2OGQ4cDUyaDBmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/JYsY6db5mHov7Fj2L5/giphy.gif",
    caption: "2 AM Instagram Spammer 📱",
    tease: "Continuous pinging sounds at midnight. Yes, she found 47 brainrot kitten videos that she *MUST* share immediately."
  }
];

export const BIRTHDAY_NOTES: BirthdayNote[] = [
  {
    id: "note_1",
    title: "🥤 The Pink Water Bottle Lifeline",
    content: "Oye Pragti! Daily survival guide me top point focus: tum jo apna aesthetic neon pink water bottle mujhe pani peene ke liye deti ho na — absolute helper! Free sponsorship of daily hydration is powered by Pragti's sweet care. Sachi me, thanks, warna main dehydrated hi firta rehta! 🌸",
    category: "inside-joke",
    sticker: "🧪",
    rotation: -3,
    bgClass: "bg-pink-50 border-pink-200 text-pink-905",
    authorSig: "- Your Thankful Hydration Partner"
  },
  {
    id: "note_2",
    title: "🍱 International Lunch Box Sponsor",
    content: "Aur wo jo tum dosti me sweet lunch box pass karti ho na... sach me direct swarg feel hota hai! Sugi, you are genuinely the sweetest soul around. Thanks for keeping my nutritional levels high and making every day exciting with delicious food! 🍱✨",
    category: "compliment",
    sticker: "🍿",
    rotation: 4,
    bgClass: "bg-amber-50 border-amber-200 text-amber-905",
    authorSig: "- Official Food Appreciation Department"
  },
  {
    id: "note_3",
    title: "📱 Pragti's 2 AM Cute Spamming",
    content: "Humne research team lagayi to study Sugi's meme-sharing speed. Unka kehna hai ki this speed violates laws of physics! Non-stop dramatic cat and baby reels which absolutely make our boring days a 100 times better. Keep sending them! 😂",
    category: "inside-joke",
    sticker: "🧁",
    rotation: -2,
    bgClass: "bg-blue-50 border-blue-200 text-blue-905",
    authorSig: "- Dedicated Meme Department"
  },
  {
    id: "note_4",
    title: "🤫 The Epic Whining Record",
    content: "The legendary phrase: 'Arey yaar main to sone jaa rhi hu!' is a cultural milestone. Pragti can go from 'Full of crazy plans' to 'I am so tired let me bury myself under 5 blankets' in exactly 3.2 seconds. Cute dramatic habits are the absolute best! 💤😴",
    category: "tease",
    sticker: "🔒",
    rotation: 5,
    bgClass: "bg-emerald-50 border-emerald-200 text-emerald-905",
    authorSig: "- Best Friend Committee"
  },
  {
    id: "note_5",
    title: "👑 You’re Genuinely the Best, Cutie",
    content: "All teasing aside, Pragti you are literally the warmest, most lovable friend one could ask for. Pure heart, zero attitude, and always ready to stand by and help. Thank you for making everyday instances extremely memorable. Wishing you the happiest and most magical year ever, Sugi! 💖",
    category: "compliment",
    sticker: "💖",
    rotation: -4,
    bgClass: "bg-indigo-50 border-indigo-200 text-indigo-905",
    authorSig: "- Your Bestie Forever"
  }
];

export const FUNNY_COMPLIMENTS = [
  "You're like a premium warm coffee: sweet, premium, and highly energized to take a 4-hour nap.",
  "Your aesthetic standards are pure 10/10, but map skills are firmly 0.1%.",
  "The iconic neon pink water bottle is officially a legendary relic of our friendship.",
  "Sugi is the only person who can look adorable, dramatic, and sleepy all within a microsecond.",
  "Your beautiful attitude says 'Boss Queen', but your height says 'Needs mild boost to see over the dashboard.'",
  "You are a total sunshine bundle whose dramatic sighs bring joy to everyone around!"
];

export const PRINTABLE_STICKERS: PrintableSticker[] = [
  { id: "st_1", emoji: "✨", label: "Poochki", bg: "bg-yellow-100 text-yellow-800", rotation: -12 },
  { id: "st_2", emoji: "🧸", label: "Drama Queen", bg: "bg-green-100 text-green-800", rotation: 15 },
  { id: "st_3", emoji: "🍩", label: "Sweet Sugi", bg: "bg-pink-100 text-pink-800", rotation: 8 },
  { id: "st_4", emoji: "🧋", label: "Best Friends", bg: "bg-orange-100 text-orange-850", rotation: -5 },
  { id: "st_5", emoji: "💖", label: "Cutie Sugi", bg: "bg-purple-100 text-purple-800", rotation: 22 },
];
