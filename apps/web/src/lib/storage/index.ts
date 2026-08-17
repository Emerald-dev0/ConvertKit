import { LocalFileProvider } from "./local-provider";
import { StorageProvider } from "./types";

// For now, always use LocalFileProvider.
// Future: If process.env.R2_ENABLED, use R2Provider.
let provider: StorageProvider;

export function getStorageProvider(): StorageProvider {
  if (!provider) {
    provider = new LocalFileProvider();
  }
  return provider;
}

export * from "./types";
