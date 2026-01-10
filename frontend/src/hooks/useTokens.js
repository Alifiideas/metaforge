import { useState, useEffect } from "react";
import { getTokenBalance } from "../api/token.api";

/**
 * useTokens
 * Centralized token + plan management
 */
export default function useTokens(initialTokens = 50) {
  const [apiKey, setApiKey] = useState("");
  const [tokens, setTokens] = useState(initialTokens);
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey) return;

    setLoading(true);
    setError(null);

    getTokenBalance(apiKey)
      .then((res) => {
        setTokens(res.tokensRemaining);
        setPlan(res.plan);
      })
      .catch(() => {
        setTokens(initialTokens);
        setPlan("free");
        setError("Invalid API key or network error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiKey, initialTokens]);

  return {
    apiKey,
    setApiKey,

    tokens,
    setTokens,

    plan,
    loading,
    error,

    isFree: plan === "free",
    isPaid: plan !== "free",
  };
}
