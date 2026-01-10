/**
 * metadata.api.js
 * Centralized API layer for Metadata generation
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * ================================
 * PLATFORM DEFAULT CONFIGS
 * ================================
 * Optimized to reduce cost by default
 */

export const PLATFORM_PRESETS = {
  shutterstock: {
    title: { min: 5, max: 12 },
    keywords: { min: 35, max: 45 },
    description: { enabled: false, min: 20, max: 40 },
    csvFormat: "shutterstock"
  },
  adobe_stock: {
    title: { min: 5, max: 15 },
    keywords: { min: 30, max: 49 },
    description: { enabled: false, min: 25, max: 50 },
    csvFormat: "adobe"
  },
  vecteezy: {
    title: { min: 6, max: 16 },
    keywords: { min: 30, max: 45 },
    description: { enabled: false, min: 25, max: 60 },
    csvFormat: "vecteezy"
  },
  depositphoto: {
    title: { min: 6, max: 14 },
    keywords: { min: 30, max: 45 },
    description: { enabled: false, min: 25, max: 60 },
    csvFormat: "depositphoto"
  },
  rf123: {
    title: { min: 6, max: 15 },
    keywords: { min: 30, max: 45 },
    description: { enabled: false, min: 25, max: 60 },
    csvFormat: "123rf"
  },
  youtube: {
    title: { min: 5, max: 12 },
    keywords: { min: 10, max: 20 },
    description: { enabled: true, min: 80, max: 150 },
    csvFormat: "youtube"
  },
  tiktok: {
    title: { min: 3, max: 8 },
    keywords: { min: 5, max: 12 },
    description: { enabled: true, min: 40, max: 80 },
    csvFormat: "tiktok"
  },
  vectorstock: {
    title: { min: 5, max: 14 },
    keywords: { min: 30, max: 45 },
    description: { enabled: false },
    csvFormat: "vectorstock"
  },
  freepik: {
    title: { min: 6, max: 16 },
    keywords: { min: 30, max: 49 },
    description: { enabled: false },
    csvFormat: "freepik"
  }
};

/**
 * ================================
 * TOKEN ESTIMATION (Frontend)
 * ================================
 */

export function estimateTokens({
  filesCount,
  title,
  keywords,
  description
}) {
  let tokens = filesCount * 5;

  tokens += title.max * filesCount;
  tokens += keywords.max * filesCount;

  if (description.enabled) {
    tokens += description.max * filesCount;
  }

  return Math.ceil(tokens);
}

/**
 * ================================
 * GENERATE METADATA API
 * ================================
 */

export async function generateMetadata({
  files,
  platform,
  sliders,
  epsToJpg = false,
  apiKey
}) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  formData.append("platform", platform);
  formData.append("sliders", JSON.stringify(sliders));
  formData.append("epsToJpg", epsToJpg);

  const response = await fetch(`${API_BASE_URL}/metadata/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: formData
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.message || "Metadata generation failed");
  }

  return response.json();
}

/**
 * ================================
 * CSV DOWNLOAD API
 * ================================
 */

export async function downloadCSV({
  jobId,
  platform,
  format = "default"
}) {
  const response = await fetch(
    `${API_BASE_URL}/metadata/download?jobId=${jobId}&platform=${platform}&format=${format}`
  );

  if (!response.ok) {
    throw new Error("CSV download failed");
  }

  const blob = await response.blob();
  return blob;
}

/**
 * ================================
 * MOCK MODE (DEV / FALLBACK)
 * ================================
 */

export function mockGenerateMetadata(files) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        jobId: "mock_job_123",
        results: files.map((file, idx) => ({
          filename: file.name,
          title: `Modern Business Scene ${idx + 1}`,
          keywords: ["business", "office", "teamwork", "corporate"],
          description:
            "Professional team working together in a modern office environment."
        }))
      });
    }, 1500);
  });
}
