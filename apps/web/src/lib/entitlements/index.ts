import { db } from "@/lib/db";
import { conversions, users } from "@/lib/db/schema";
import { eq, and, gte, count } from "drizzle-orm";

export type UserTier = "GUEST" | "FREE" | "PRO" | "ENTERPRISE";

export interface TierLimits {
  dailyLimit: number;
  monthlyLimit: number;
  maxFileSize: number; // Bytes
}

const TIER_LIMITS: Record<UserTier, TierLimits> = {
  GUEST: {
    dailyLimit: 2,
    monthlyLimit: 10,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  },
  FREE: {
    dailyLimit: 20,
    monthlyLimit: 100,
    maxFileSize: 100 * 1024 * 1024, // 100MB
  },
  PRO: {
    dailyLimit: Infinity,
    monthlyLimit: Infinity,
    maxFileSize: 2 * 1024 * 1024 * 1024, // 2GB
  },
  ENTERPRISE: {
    dailyLimit: Infinity,
    monthlyLimit: Infinity,
    maxFileSize: 10 * 1024 * 1024 * 1024, // 10GB
  }
};

export async function getUserTier(userId?: string): Promise<UserTier> {
  if (!userId) return "GUEST";

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId)
  });

  return (user?.tier as UserTier) || "FREE";
}

export async function checkQuota(userId: string | undefined, fileSize: number): Promise<{
  allowed: boolean;
  reason?: string
}> {
  const tier = await getUserTier(userId);
  const limits = TIER_LIMITS[tier];

  // 1. Check file size
  if (fileSize > limits.maxFileSize) {
    return {
      allowed: false,
      reason: `File size too large for ${tier} tier. Max: ${limits.maxFileSize / (1024 * 1024)}MB`
    };
  }

  // 2. Check daily limit
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [dailyUsage] = await db
    .select({ value: count() })
    .from(conversions)
    .where(
      and(
        userId ? eq(conversions.userId, userId) : eq(conversions.userId, "guest"), // Need proper guest tracking later
        gte(conversions.createdAt, today)
      )
    );

  if (dailyUsage.value >= limits.dailyLimit) {
    return {
      allowed: false,
      reason: `Daily conversion limit reached for ${tier} tier.`
    };
  }

  return { allowed: true };
}
