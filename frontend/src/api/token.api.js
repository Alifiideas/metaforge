/**
 * token.api.js
 * Handles token balance, estimation & consumption
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

/**
 * ================================
 * TOKEN PLANS
 * ================================
 */

export const TOKEN_PLANS = {
  free: {
    name: "Free",
    tokens: 50,
    locked: true
  },
  starter: {
    name: "Starter",
    tokens: 500,
    locked: false
  },
  pro: {
    name: "Pro",
    tokens: 5000,
    locked: false
  }
};

/**
 * ================================
 * GET USER TOKENS
 * ================================
 */

export async function getTokenBalance(apiKey) {
  const res = await fetch(`${API_BASE_URL}/tokens/balance`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  if (!res.ok) {
    throw new Error("Unable to fetch token balance");
  }

  return res.json(); // { plan, tokensRemaining }
}

/**
 * ================================
 * ESTIMATE TOKEN USAGE
 * ================================
 */

export function estimateTokenUsage({
  filesCount,
  title,
  keywords,
  description
}) {
  let total = filesCount * 5;

  total += title.max * filesCount;
  total += keywords.max * filesCount;

  if (description.enabled) {
    total += description.max * filesCount;
  }

  return Math.ceil(total);
}

/**
 * ================================
 * VALIDATE TOKEN AVAILABILITY
 * ================================
 */

export function canProceed({
  tokensRemaining,
  estimatedTokens
}) {
  return tokensRemaining >= estimatedTokens;
}

/**
 * ================================
 * DEDUCT TOKENS (SERVER-SIDE)
 * ================================
 */

export async function consumeTokens({
  apiKey,
  tokens,
  jobId
}) {
  const res = await fetch(`${API_BASE_URL}/tokens/consume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      tokens,
      jobId
    })
  });

  if (!res.ok) {
    throw new Error("Token deduction failed");
  }

  return res.json();
}

/**
 * ================================
 * MOCK MODE (DEV)
 * ================================
 */

export function mockGetTokenBalance() {
  return Promise.resolve({
    plan: "free",
    tokensRemaining: 50
  });
}

export function mockConsumeTokens(tokens) {
  return Promise.resolve({
    success: true,
    tokensUsed: tokens,
    tokensRemaining: Math.max(0, 50 - tokens)
  });
}
