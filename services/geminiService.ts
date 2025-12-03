import { GoogleGenAI } from "@google/genai";
import { Listing } from "../types";
import { SAMPLE_LISTINGS } from "../constants";

// Initialize Gemini
// Note: In a real app, ensure process.env.API_KEY is defined in build settings
const apiKey = process.env.API_KEY || "YOUR_MOCK_KEY_FOR_DEV"; 
// We are handling the case where env might not be set in this demo environment safely
// by checking before call.

let ai: GoogleGenAI | null = null;
if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
}

export interface LibrarianResponse {
  message: string;
  recommendedBookIds: string[];
}

export const askLibrarian = async (
  query: string, 
  contextListings: Listing[]
): Promise<LibrarianResponse> => {
  
  // Fallback for demo if no API key
  if (!process.env.API_KEY) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                message: "I'm currently in offline demo mode. Based on your query, I'd suggest checking out HC Verma for physics or Laxmikanth for polity if you are preparing for exams!",
                recommendedBookIds: ['l1', 'l2']
            });
        }, 1500);
    });
  }

  if (!ai) return { message: "AI Service Unavailable", recommendedBookIds: [] };

  const listingContext = contextListings.map(l => 
    `ID: ${l.id}, Title: ${l.title}, Author: ${l.author}, Exam: ${l.tags.join(', ')}, Price: ${l.price}, Condition: ${l.condition}`
  ).join('\n');

  const systemInstruction = `
    You are 'BookBridge Librarian', a helpful, Indian-English speaking assistant for a used book marketplace.
    Your goal is to help students find books for exams (JEE, NEET, UPSC) or leisure.
    
    Current available listings:
    ${listingContext}
    
    User Query: "${query}"
    
    1. Answer the user in a friendly, concise manner.
    2. If any listings match, recommend them.
    3. Return your response in strictly VALID JSON format:
    {
      "message": "Your text response here...",
      "recommendedBookIds": ["id1", "id2"]
    }
    Do not use markdown code blocks for the JSON. Just return the JSON string.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    
    return JSON.parse(text) as LibrarianResponse;

  } catch (error) {
    console.error("Gemini Error:", error);
    return {
      message: "I'm having trouble connecting to the library network right now. Please try searching manually.",
      recommendedBookIds: []
    };
  }
};