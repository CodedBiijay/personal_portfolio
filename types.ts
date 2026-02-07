/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: string;
  gradient: string;
  challenge: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

// Added missing Artist interface to resolve import error in ArtistCard.tsx
export interface Artist {
  name: string;
  image: string;
  day: string;
  genre: string;
}

export enum Section {
  HERO = 'hero',
  WORKS = 'works',
  ABOUT = 'about',
  CONTACT = 'contact',
}