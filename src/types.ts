/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BirthdayNote {
  id: string;
  title: string;
  content: string;
  category: "tease" | "compliment" | "epic-fail" | "inside-joke";
  sticker: string;
  rotation: number; // degrees for scrapbook feel
  bgClass: string;
  authorSig: string;
}

export interface PrintableSticker {
  id: string;
  emoji: string;
  label: string;
  bg: string;
  rotation: number;
}

export interface PhotoPolaroid {
  id: string;
  defaultUrl: string;
  caption: string;
  tease: string;
  defaultRotation: number;
}

export interface AppConfig {
  musicUrl: string;
  musicTitle: string;
  customPhotos: Record<string, string>; // maps polaroid id to custom URL
}
