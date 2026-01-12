import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildPrompt } from "../utils/promptBuilder.js";

/* ======================================================
   ENV VALIDATION
====================================================== */

const {
  GOOGLE_AI_API_KEY,
  GOOGLE_AI_MODEL = "gemini-1.5-flash",
  GOOGLE_AI_TIMEOUT = 30000,
} = process.env;

if (!GOOGLE_AI_API_KEY) {
  throw new Error("❌ GOOGLE_AI_API_KEY is missing in environment variables");
}

/* ======================================================
   CLIENT SETUP
====================================================== */

const genAI = new GoogleGenerativeAI(GOOGLE_AI_API_KEY);

const model = genAI.getGenerativeModel({
  model: GOOGLE_AI_MODEL,
});

/* ======================================================
   MAIN SERVICE
====================================================== */

/**
 * Generate metadata using Google Gemini
 * MUST match controller import name
 */
export const generateMetadataFromAI = async ({
  files,
  platform,
  options,
}) => {
  const prompt = buildPrompt({
    files,
    platform,
    options,
  });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      Number(GOOGLE_AI_TIMEOUT)
    );

    const result = await model.generateContent(
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
You are a professional stock media metadata generator.

RULES:
- Respond with VALID JSON ONLY
- Output MUST be an ARRAY
- No markdown
- No explanations
- No comments

${prompt}
                `,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      },
      { signal: controller.signal }
    );

    clearTimeout(timeout);

    const raw = result.response.text();
    return parseAIResponse(raw);
  } catch (error) {
    console.error("🔥 AI generation failed:", error);
    throw new Error("AI metadata generation failed");
  }
};

/* ======================================================
   PARSER
====================================================== */

const parseAIResponse = (text) => {
  try {
    // Gemini sometimes wraps output
    const cleaned = text
      .trim()
      .replace(/^```json/i, "")
      .replace(/```$/, "");

    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
      throw new Error("AI response must be an array");
    }

    return parsed.map((item) => ({
      filename: item.filename ?? "",
      title: item.title ?? "",
      keywords: Array.isArray(item.keywords)
        ? item.keywords.join(", ")
        : "",
      description: item.description ?? "",
    }));
  } catch (error) {
    console.error("❌ AI response parse error:", text);
    throw new Error("Invalid AI response format");
  }
};
