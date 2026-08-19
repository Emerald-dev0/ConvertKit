import { NextRequest, NextResponse } from "next/server";
import {
  FORMATS,
  PipelineConverter
} from "@convertkit/core";

import { registry, detector } from "@/lib/convertkit";
import { getStorageProvider } from "@/lib/storage";
import { db } from "@/lib/db";
import { conversions, users } from "@/lib/db/schema";
import { checkQuota } from "@/lib/entitlements";
import { auth0 } from "@/lib/auth/auth0";
import { randomUUID } from "node:crypto";

export async function POST(req: NextRequest) {
  const startTime = performance.now();
  const conversionId = randomUUID();

  // 1. Auth \u0026 Quota Check
  const session = await auth0.getSession();
  const userId = session?.user?.sub;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const targetId = formData.get("targetFormat") as string;

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const quota = await checkQuota(userId, file.size);
    if (!quota.allowed) {
      return NextResponse.json({ error: quota.reason }, { status: 403 });
    }

    const inputData = new Uint8Array(await file.arrayBuffer());

    // 2. Detect \u0026 Resolve
    const fromFormat = await detector.detect(inputData, { filename: file.name });
    if (!fromFormat) return NextResponse.json({ error: "Unknown input format" }, { status: 400 });

    const toFormat = Object.values(FORMATS).find(f => f.id === targetId);
    if (!toFormat) return NextResponse.json({ error: "Invalid target format" }, { status: 400 });

    const converter = registry.resolveConverter(fromFormat, toFormat);
    if (!converter) return NextResponse.json({ error: "No converter found" }, { status: 404 });

    // 3. Convert
    const result = await converter.convert(inputData, { to: toFormat });

    // 4. Storage
    const storage = getStorageProvider();
    const storageKey = await storage.save(result.data, `${conversionId}.${toFormat.extensions[0].replace(".","")}`);
    const downloadUrl = await storage.getDownloadUrl(storageKey);

    // 5. Logging
    // Ensure the anonymous "guest" user exists so the conversions FK never
    // fails a real conversion over a bookkeeping insert.
    if (!userId) {
      await db
        .insert(users)
        .values({
          id: "guest",
          email: "guest@convertkit.local",
          tier: "GUEST",
          createdAt: new Date(),
        })
        .onConflictDoNothing()
        .catch(() => {});
    }
    const endTime = performance.now();
    await db.insert(conversions).values({
      id: conversionId,
      userId: userId || "guest",
      fromFormat: fromFormat.id,
      toFormat: toFormat.id,
      inputSize: file.size,
      outputSize: result.data instanceof Uint8Array ? result.data.length : null,
      duration: endTime - startTime,
      status: "success",
      storageKey,
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      output: downloadUrl,
      format: toFormat.id,
      pipeline: converter instanceof PipelineConverter ? converter.getSteps().map(s => s.metadata.name) : [converter.metadata.name],
      warnings: result.warnings
    });

  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("API Conversion Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
