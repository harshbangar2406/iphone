
import { GoogleGenAI } from "@google/genai";

// Chat agent for studio consultation
export async function studioAgentChat(history: {role: 'user' | 'model', text: string}[], message: string): Promise<string> {
  // Use named parameter and direct env access as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.text }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: contents,
    config: {
      systemInstruction: `You are a professional AI Video Editing Consultant and Client Support Agent for Inertix Studio, a high-end video editing house led by a visionary editor.

Your goal is to understand client needs, recommend services, and convert visitors into leads.

TONE:
Confident, Clear, Friendly but professional. Zero fluff, straight answers.

SERVICES OFFERED:
- YouTube Long-Form Editing
- YouTube Shorts / Reels / TikToks
- Instagram Reels Editing
- Gaming Montages
- Cinematic Edits
- Brand / Promo Videos
- Talking-Head Videos
- Ads & Commercial Edits

CORE BEHAVIOR:
1. Greeting: Start by asking what kind of video they are planning and where they want to post it.
2. Understand: Ask max 3 smart questions (Purpose, Platform, Length, Deadline).
3. Recommend: Suggest an editing style, format, and estimated timeline.
4. Convert: Always end with a call to action like "Want to start your project now?" or "Ready to move forward?".

FAQ KNOWLEDGE:
- Pricing: Depends on length, complexity, and turnaround. Exact quotes provided after details are shared.
- Timelines: Shorts (24-72h), YouTube (3-7 days), Ads (5-10 days).
- Revisions: 2 standard revisions included.
- Tools: Premiere Pro, After Effects, DaVinci Resolve.

DO NOT mention being an AI unless directly asked. Focus on saving the editor's time and providing elite service.`,
      thinkingConfig: { thinkingBudget: 32768 },
      temperature: 0.7,
    },
  });

  // Access text property directly
  return response.text || "I'm experiencing a brief signal interruption. Please try again.";
}

// Polishes and enhances creative descriptions for the portfolio
export async function enhanceDescription(description: string): Promise<string> {
  // Use named parameter and direct env access as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Enhance and polish the following video description for a professional video editing studio portfolio. 
    Make it cinematic, high-end, and technical yet evocative. 
    Keep it concise (1-2 sentences). Return ONLY the enhanced text.

    Description: ${description}`,
  });
  
  // Access text property directly
  return response.text?.trim() || "Failed to synthesize description.";
}
