/**
 * Subscription & usage limits
 * Central source of truth
 */

const limits = Object.freeze({
  free: {
    label: "Free",
    monthlyTokens: 50,
    maxFilesPerUpload: 5,
    sliders: {
      titleMax: 12,
      keywordsMax: 20,
      descriptionMax: 15,
    },
    features: {
      description: false,
      csvExport: true,
      aiTools: false,
      bulkUpload: false,
    },
  },

  bronze: {
    label: "Bronze",
    monthlyTokens: 5000,
    maxFilesPerUpload: 50,
    sliders: {
      titleMax: 25,
      keywordsMax: 50,
      descriptionMax: 30,
    },
    features: {
      description: true,
      csvExport: true,
      aiTools: true,
      bulkUpload: true,
    },
  },

  silver: {
    label: "Silver",
    monthlyTokens: 9000,
    maxFilesPerUpload: 100,
    sliders: {
      titleMax: 25,
      keywordsMax: 50,
      descriptionMax: 30,
    },
    features: {
      description: true,
      csvExport: true,
      aiTools: true,
      bulkUpload: true,
      priorityQueue: true,
    },
  },

  gold: {
    label: "Gold",
    monthlyTokens: 15000,
    maxFilesPerUpload: 200,
    sliders: {
      titleMax: 25,
      keywordsMax: 50,
      descriptionMax: 30,
    },
    features: {
      description: true,
      csvExport: true,
      aiTools: true,
      bulkUpload: true,
      priorityQueue: true,
      commercialLicense: true,
    },
  },
});

export default limits;

