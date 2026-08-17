/**
 * Abstract interface for storing converted files.
 * This allows us to swap between Local Storage (for dev/oss)
 * and Cloudflare R2 (for the hosted platform).
 */
export interface StorageProvider {
  /**
   * Saves a converted file and returns a unique key/ID.
   */
  save(data: Uint8Array | ReadableStream, filename: string): Promise<string>;

  /**
   * Generates a public (or signed) URL for downloading the file.
   */
  getDownloadUrl(key: string): Promise<string>;

  /**
   * Deletes a file after a certain period or manually.
   */
  delete(key: string): Promise<void>;
}
