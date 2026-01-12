import { buildPrompt } from "../utils/promptBuilder.js";
import { generateMetadataFromAI } from "../services/ai.service.js";
import {
  validateTokens,
  consumeTokens,
} from "../services/token.service.js";

/**
 * POST /api/metadata/generate
 */
export const generateMetadataController = async (req, res) => {
  try {
    const {
      files,
      platform,
      options,
      userPlan = "free",
      availableTokens = 0,
    } = req.body;

    if (!Array.isArray(files) || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files provided",
      });
    }

    if (!platform) {
      return res.status(400).json({
        success: false,
        message: "Platform is required",
      });
    }

    if (!options || typeof options !== "object") {
      return res.status(400).json({
        success: false,
        message: "Metadata options missing",
      });
    }

    const estimatedTokens =
      files.length *
      (options.titleWords +
        options.keywordsCount +
        (options.descriptionWords || 0));

    const tokenCheck = validateTokens({
      plan: userPlan,
      availableTokens,
      estimatedTokens,
    });

    if (!tokenCheck.allowed) {
      return res.status(403).json({
        success: false,
        message: tokenCheck.message,
        required: estimatedTokens,
        available: availableTokens,
      });
    }

    const prompt = buildPrompt({ platform, options });

    const metadata = await generateMetadataFromAI({
      prompt,
      files,
      options,
    });

    const remainingTokens = consumeTokens({
      tokensUsed: estimatedTokens,
      currentBalance: availableTokens,
    });

    return res.json({
      success: true,
      platform,
      usedTokens: estimatedTokens,
      remainingTokens,
      metadata,
    });
  } catch (error) {
    console.error("Metadata generation failed:", error);
    return res.status(500).json({
      success: false,
      message: "Metadata generation failed",
    });
  }
};
