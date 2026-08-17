import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    alias: {
      "@convertkit/core": path.resolve(__dirname, "./packages/core/src"),
      "@convertkit/converter-image": path.resolve(__dirname, "./packages/converter-image/src"),
      "@convertkit/converter-pdf-text": path.resolve(__dirname, "./packages/converter-pdf-text/src"),
      "@convertkit/converter-csv-json": path.resolve(__dirname, "./packages/converter-csv-json/src"),
      "@convertkit/converter-markdown-html": path.resolve(__dirname, "./packages/converter-markdown-html/src"),
      "@convertkit/converter-office-pdf": path.resolve(__dirname, "./packages/converter-office-pdf/src"),
      "@convertkit/converter-ffmpeg": path.resolve(__dirname, "./packages/converter-ffmpeg/src"),
      "@convertkit/converter-ocr": path.resolve(__dirname, "./packages/converter-ocr/src"),
      "@convertkit/cli": path.resolve(__dirname, "./packages/cli/src"),
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
