/**
 * CSV format definitions used for metadata export
 * Each format can be mapped directly to backend exporters
 */

export const CSV_FORMATS = {
  jpg: {
    id: "jpg",
    label: "JPG CSV",
    extension: ".csv",
    description: "Standard CSV format for JPG image uploads",
    supportedPlatforms: [
      "shutterstock",
      "adobe_stock",
      "vecteezy",
      "depositphoto",
      "rf123",
      "vectorstock",
      "freepik",
    ],
  },

  eps: {
    id: "eps",
    label: "EPS CSV",
    extension: ".csv",
    description: "Extended CSV format for EPS / vector submissions",
    supportedPlatforms: [
      "shutterstock",
      "adobe_stock",
      "vecteezy",
      "depositphoto",
      "vectorstock",
      "freepik",
    ],
  },

  video: {
    id: "video",
    label: "Video CSV",
    extension: ".csv",
    description: "CSV format optimized for video platforms",
    supportedPlatforms: [
      "youtube",
      "tiktok",
    ],
  },
};

/**
 * Helpers
 */

export const CSV_FORMAT_LIST = Object.values(CSV_FORMATS);

export const getCsvFormat = (id) => CSV_FORMATS[id] || null;

export const isCsvSupportedForPlatform = (csvId, platform) => {
  const format = CSV_FORMATS[csvId];
  if (!format) return false;
  return format.supportedPlatforms.includes(platform);
};
