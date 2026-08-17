import { StorageProvider } from "./types";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Stores files in Cloudflare R2 (S3-compatible).
 * This is the production-tier storage provider.
 */
export class R2StorageProvider implements StorageProvider {
  private client: S3Client;
  private bucket = process.env.R2_BUCKET_NAME || "";

  constructor() {
    this.client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
      },
    });
  }

  async save(data: Uint8Array | ReadableStream, filename: string): Promise<string> {
    const key = `conversions/${Date.now()}-${filename}`;

    let body: any = data;
    // @aws-sdk/client-s3 handles ReadableStream in Node.js environments

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: body,
    });

    await this.client.send(command);
    return key;
  }

  async getDownloadUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    // Generate a signed URL that expires in 1 hour
    return await getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async delete(_key: string): Promise<void> {
    // Implementation for manual deletion
  }
}
