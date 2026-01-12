import limits from "../../shared/constants/limits.js";

/* ======================================================
   TOKEN VALIDATION
====================================================== */

/**
 * Validate whether token usage is allowed
 */
export function validateTokens({
  plan = "free",
  availableTokens = 0,
  estimatedTokens = 0,
}) {
  const planLimits = limits[plan] ?? limits.free;

  if (estimatedTokens <= 0) {
    return {
      allowed: false,
      message: "Invalid token estimate",
    };
  }

  if (estimatedTokens > availableTokens) {
    return {
      allowed: false,
      message: "Not enough tokens available",
    };
  }

  if (estimatedTokens > planLimits.monthlyTokens) {
    return {
      allowed: false,
      message: "Token usage exceeds plan allowance",
    };
  }

  return {
    allowed: true,
  };
}

/* ======================================================
   TOKEN CONSUMPTION
====================================================== */

/**
 * Deduct tokens after successful processing
 */
export function consumeTokens({
  tokensUsed = 0,
  currentBalance = 0,
}) {
  if (tokensUsed <= 0) return currentBalance;

  return Math.max(currentBalance - tokensUsed, 0);
}
