/**
 * Global plan-based limits
 * Used across Metadata, AI tools, uploads, and UI gating
 */

export const PLAN_LIMITS = {
  free: {
    name: "Free",
    tokens: 50,
    metadataPerMonth: 50,

    sliders: {
      title: { min: 3, max: 7 },
      keywords: { min: 10, max: 25 },
      description: {
        enabled: false,
        min: 0,
        max: 0,
      },
    },

    uploads: {
      maxFiles: 10,
      maxFileSizeMB: 25,
    },

    tools: {
      backgroundRemover: false,
      upscaler: false,
      duplicateDetector: false,
      voiceGenerator: false,
    },

    priority: false,
  },

  bronze: {
    name: "Bronze",
    tokens: 5000,
    metadataPerMonth: 5000,

    sliders: {
      title: { min: 3, max: 20 },
      keywords: { min: 10, max: 45 },
      description: {
        enabled: true,
        min: 10,
        max: 120,
      },
    },

    uploads: {
      maxFiles: 100,
      maxFileSizeMB: 50,
    },

    tools: {
      backgroundRemover: true,
      upscaler: false,
      duplicateDetector: true,
      voiceGenerator: false,
    },

    priority: false,
  },

  silver: {
    name: "Silver",
    tokens: 9000,
    metadataPerMonth: 9000,

    sliders: {
      title: { min: 3, max: 25 },
      keywords: { min: 10, max: 55 },
      description: {
        enabled: true,
        min: 10,
        max: 160,
      },
    },

    uploads: {
      maxFiles: 200,
      maxFileSizeMB: 75,
    },

    tools: {
      backgroundRemover: true,
      upscaler: true,
      duplicateDetector: true,
      voiceGenerator: true,
    },

    priority: true,
  },

  gold: {
    name: "Gold",
    tokens: 15000,
    metadataPerMonth: 15000,

    sliders: {
      title: { min: 3, max: 30 },
      keywords: { min: 10, max: 60 },
      description: {
        enabled: true,
        min: 10,
        max: 200,
      },
    },

    uploads: {
      maxFiles: 500,
      maxFileSizeMB: 100,
    },

    tools: {
      backgroundRemover: true,
      upscaler: true,
      duplicateDetector: true,
      voiceGenerator: true,
    },

    priority: true,
  },
};

/**
 * Helper to safely get plan limits
 */
export function getPlanLimits(plan = "free") {
  return PLAN_LIMITS[plan] || PLAN_LIMITS.free;
}
