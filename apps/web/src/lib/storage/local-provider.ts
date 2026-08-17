import { StorageProvider } from "./types";
import { writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Stores files in the local filesystem (apps/web/public/temp).
 * Ideal for local development and self-hosted open-source use.
 */
export class LocalFileProvider implements StorageProvider {
  private tempDir = path.resolve(process.cwd(), "public/temp");

  async save(data: Uint8Array | ReadableStream, filename: string): Promise<string> {
    const id = randomUUID();
    const key = `${id}-${filename}`;
    const filePath = path.join(this.tempDir, key);

    if (data instanceof Uint8Array) {
      await writeFile(filePath, data);
    } else {
      // Stream handling for large files
      const writer = await import("node:fs").then(fs => fs.createWriteStream(filePath));
      const reader = (data as ReadableStream).getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        writer.write(value);
      }
      writer.end();
    }

    return key;
  }

  async getDownloadUrl(key: string): Promise<string> {
    // Standard Next.js public access
    return `/temp/${key}`;
  }

  async delete(key: string): Promise<void> {
    const filePath = path.join(this.tempDir, key);
    await rm(filePath, { force: true });
  }
}
