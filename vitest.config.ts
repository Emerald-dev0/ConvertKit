import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    alias: {
      "@convertkit/core": path.resolve(__dirname, "./packages/core/src"),
      "@convertkit/converter-image": path.resolve(__dirname, "./packages/converters/image/src"),
      "@convertkit/converter-pdf-text": path.resolve(__dirname, "./packages/converters/pdf-text/src"),
      "@convertkit/converter-csv-json": path.resolve(__dirname, "./packages/converters/csv-json/src"),
      "@convertkit/converter-markdown-html": path.resolve(__dirname, "./packages/converters/markdown-html/src"),
      "@convertkit/converter-office-pdf": path.resolve(__dirname, "./packages/converters/office-pdf/src"),
      "@convertkit/converter-ffmpeg": path.resolve(__dirname, "./packages/converters/ffmpeg/src"),
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
