import { useState, useEffect } from "react";
import { PLATFORM_PRESETS } from "../api/metadata.api";

/**
 * usePlatform
 * Handles platform selection & preset application
 */
export default function usePlatform() {
  const [platform, setPlatform] = useState("");

  const [titleWords, setTitleWords] = useState(7);
  const [keywordCount, setKeywordCount] = useState(45);
  const [descEnabled, setDescEnabled] = useState(false);
  const [descWords, setDescWords] = useState(20);

  /* ================= APPLY PRESETS ================= */

  useEffect(() => {
    if (!platform) return;

    const preset = PLATFORM_PRESETS[platform];
    if (!preset) return;

    setTitleWords(preset.title.min);
    setKeywordCount(preset.keywords.min);
    setDescEnabled(preset.description?.enabled || false);
    setDescWords(preset.description?.min || 0);
  }, [platform]);

  /* ================= RESET ================= */

  const reset = () => {
    setPlatform("");
    setTitleWords(7);
    setKeywordCount(45);
    setDescEnabled(false);
    setDescWords(20);
  };

  return {
    platform,
    setPlatform,

    titleWords,
    setTitleWords,

    keywordCount,
    setKeywordCount,

    descEnabled,
    setDescEnabled,

    descWords,
    setDescWords,

    reset,
  };
}
