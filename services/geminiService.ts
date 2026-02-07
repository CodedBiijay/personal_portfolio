/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

// Fixed: Correctly initialize Gemini Chat following API guidelines
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Always use a named parameter for the API key from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    // Using recommended gemini-3-flash-preview for text tasks
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are 'LUMI', the AI Portfolio Assistant for a world-class Senior Frontend Engineer. 
      
      Owner Profile:
      - Role: Creative Developer & Designer.
      - Expertise: React, TypeScript, Framer Motion, Tailwind, and WebGL.
      - Location: Digital Nomad (currently Tokyo based).
      
      Tone: Professional, high-tech, slightly creative, and helpful. Use emojis like 💻, 🚀, 🎨, 🌌, ⚡️.
      
      Projects you can talk about:
      - Neon Finance: Fintech dashboard with real-time D3.js charts.
      - Aero Commerce: Headless e-commerce built for speed.
      - Zenith AI: Generative AI interface for creative pros.
      - Orbital Social: Decentralized social platform using Web3.
      
      Keep responses short (under 50 words) and focused on technical excellence and design innovation.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    // Use .text property directly (not a method) as per SDK specifications
    return response.text || "Transmission interrupted.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Signal lost. Let's try that again.";
  }
};