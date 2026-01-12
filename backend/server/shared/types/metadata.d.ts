/* =========================================================
   METAFORGE – Shared Metadata Types
   Used by Frontend & Backend
========================================================= */

/* ---------- BASIC TYPES ---------- */

export type Platform =
  | "shutterstock"
  | "adobe_stock"
  | "freepik"
  | "vecteezy"
  | "depositphoto"
  | "youtube"
  | "tiktok";

export type Plan =
  | "free"
  | "bronze"
  | "silver"
  | "gold";

/* ---------- LIMITS ---------- */

export interface SliderLimits {
  titleMax: number;
  keywordsMax: number;
  descriptionMax: number;
}

export interface PlanFeatures {
  description: boolean;
  csvExport: boolean;
  aiTools: boolean;
  bulkUpload: boolean;
  priorityQueue?: boolean;
  commercialLicense?: boolean;
}

export interface PlanLimits {
  label: string;
  monthlyTokens: number;
  maxFilesPerUpload: number;
  sliders: SliderLimits;
  features: PlanFeatures;
}

/* ---------- PLATFORM RULES ---------- */

export interface TextRange {
  min: number;
  max: number;
}

export interface DescriptionRule extends TextRange {
  enabled: boolean;
}

export interface PlatformRules {
  label: string;
  title: TextRange;
  keywords: TextRange;
  description?: DescriptionRule;
  csv: Array<"jpg" | "video">;
}

/* ---------- METADATA OUTPUT ---------- */

export interface GeneratedMetadata {
  filename: string;
  title: string;
  keywords: string[];
  description?: string;
  platform: Platform;
}

/* ---------- API PAYLOADS ---------- */

export interface MetadataRequest {
  platform: Platform;
  files: string[];               // filenames or upload IDs
  plan: Plan;
  options: {
    titleWords: number;
    keywordCount: number;
    descriptionWords?: number;
    language?: string;
  };
}

export interface MetadataResponse {
  success: boolean;
  data: GeneratedMetadata[];
  tokensUsed: number;
  remainingTokens: number;
}

/* ---------- CSV ---------- */

export interface CsvRow {
  filename: string;
  title: string;
  keywords: string;
  description?: string;
}

/* ---------- JOB / QUEUE ---------- */

export interface MetadataJobPayload {
  jobId: string;
  platform: Platform;
  files: string[];
  options: MetadataRequest["options"];
  plan: Plan;
}

export interface MetadataJobResult {
  jobId: string;
  status: "pending" | "processing" | "completed" | "failed";
  result?: GeneratedMetadata[];
  error?: string;
}
