import { GoogleGenerativeAI } from '@google/generative-ai';
import Groq from 'groq-sdk';
import { Lead } from '../types';

const GEMINI_KEY = process.env.GEMINI_API_KEY || '';
const GROQ_KEY = process.env.GROQ_API_KEY || '';

const PROMPT = `
  You are an expert commercial real estate analyst for Lahore, Pakistan.
  Analyze the commercial landscape of DHA Phase 4 Lahore (Sectors AA, BB, CC, XX, DD).
  Identify 6 specific business names or brand examples that are successful and expanding in Gulberg, DHA Phase 5, or DHA Phase 6, but have a visible "market gap" in DHA Phase 4.
  
  The demographic in Phase 4 is high-income residential.
  
  Return the result as a raw JSON array of objects with the following structure:
  {
    "id": "string",
    "name": "string",
    "category": "Fitness" | "Cafe" | "Co-working" | "Tech" | "Retail" | "Lifestyle",
    "currentMainBranch": "string",
    "expansionScore": number (1-10),
    "gapReason": "string (one sentence explaining the gap)",
    "contact": "string (website or placeholder)",
    "priority": "High" | "Medium"
  }
`;

async function generateWithGemini(): Promise<Lead[]> {
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(PROMPT);
  const text = result.response.text();
  const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(jsonString);
}

async function generateWithGroq(): Promise<Lead[]> {
  const groq = new Groq({ apiKey: GROQ_KEY, dangerouslyAllowBrowser: true });
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: 'user', content: PROMPT }],
    model: 'llama-3.3-70b-versatile',
    response_format: { type: 'json_object' }
  });
  const content = chatCompletion.choices[0]?.message?.content || '[]';
  const parsed = JSON.parse(content);
  // Groq might return { "leads": [...] } depending on the model, so we extract the array
  return Array.isArray(parsed) ? parsed : (parsed.leads || Object.values(parsed)[0] || []);
}

export async function generateLeads(): Promise<Lead[]> {
  if (GROQ_KEY) {
    console.log('Generating with Groq...');
    return generateWithGroq();
  } else if (GEMINI_KEY) {
    console.log('Falling back to Gemini...');
    return generateWithGemini();
  } else {
    throw new Error('No AI API key found. Please add GROQ_API_KEY to secrets.');
  }
}
