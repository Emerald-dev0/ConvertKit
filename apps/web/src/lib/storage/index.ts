import { LocalFileProvider } from "./local-provider";
import { R2StorageProvider } from "./r2-provider";
import { StorageProvider } from "./types";

let provider: StorageProvider;

export function getStorageProvider(): StorageProvider {
  if (!provider) {
    if (process.env.R2_ACCESS_KEY_ID && process.env.R2_ACCOUNT_ID) {
      provider = new R2StorageProvider();
    } else {
      provider = new LocalFileProvider();
    }
  }
  return provider;
}

export * from "./types";
