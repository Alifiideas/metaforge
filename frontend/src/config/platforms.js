/* ================= PLATFORM DEFINITIONS ================= */

export const PLATFORMS = {
  shutterstock: {
    id: "shutterstock",
    name: "Shutterstock",
    type: "stock",
    formats: ["jpg", "png", "eps"],
    limits: {
      title: { min: 5, max: 70 },
      keywords: { min: 30, max: 50 },
      description: { enabled: true, min: 20, max: 200 },
    },
  },

  adobe_stock: {
    id: "adobe_stock",
    name: "Adobe Stock",
    type: "stock",
    formats: ["jpg", "png", "eps"],
    limits: {
      title: { min: 5, max: 70 },
      keywords: { min: 25, max: 49 },
      description: { enabled: true, min: 20, max: 200 },
    },
  },

  freepik: {
    id: "freepik",
    name: "Freepik",
    type: "stock",
    formats: ["jpg", "png", "svg", "eps"],
    limits: {
      title: { min: 5, max: 70 },
      keywords: { min: 20, max: 50 },
      description: { enabled: true, min: 15, max: 200 },
    },
  },

  vecteezy: {
    id: "vecteezy",
    name: "Vecteezy",
    type: "stock",
    formats: ["jpg", "png", "svg", "eps"],
    limits: {
      title: { min: 5, max: 80 },
      keywords: { min: 25, max: 60 },
      description: { enabled: true, min: 20, max: 200 },
    },
  },

  depositphoto: {
    id: "depositphoto",
    name: "Depositphotos",
    type: "stock",
    formats: ["jpg", "png", "eps"],
    limits: {
      title: { min: 5, max: 70 },
      keywords: { min: 30, max: 50 },
      description: { enabled: true, min: 20, max: 200 },
    },
  },

  vectorstock: {
    id: "vectorstock",
    name: "VectorStock",
    type: "vector",
    formats: ["eps", "svg"],
    limits: {
      title: { min: 5, max: 80 },
      keywords: { min: 30, max: 60 },
      description: { enabled: false },
    },
  },

  youtube: {
    id: "youtube",
    name: "YouTube",
    type: "video",
    formats: ["mp4"],
    limits: {
      title: { min: 5, max: 100 },
      keywords: { min: 10, max: 30 },
      description: { enabled: true, min: 50, max: 500 },
    },
  },

  tiktok: {
    id: "tiktok",
    name: "TikTok",
    type: "video",
    formats: ["mp4"],
    limits: {
      title: { min: 3, max: 80 },
      keywords: { min: 5, max: 20 },
      description: { enabled: true, min: 20, max: 150 },
    },
  },
};

/* ================= HELPERS ================= */

export const PLATFORM_LIST = Object.values(PLATFORMS).map(
  (p) => p.id
);

export const getPlatformById = (id) => PLATFORMS[id] || null;
