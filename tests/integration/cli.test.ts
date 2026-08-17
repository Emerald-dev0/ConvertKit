import { describe, it, expect, beforeAll } from "vitest";
import { execa } from "execa";
import { readFile, rm } from "node:fs/promises";
import path from "node:path";
import { ensureFixtures, FIXTURES_DIR } from "../fixtures/utils.js";

describe("CLI Integration", () => {
  const cliPath = path.resolve("./packages/cli/dist/index.js");

  beforeAll(async () => {
    await ensureFixtures();
  });

  it("should convert a file via CLI command", async () => {
    const inputPath = path.join(FIXTURES_DIR, "sample.png");
    const outputPath = path.join(FIXTURES_DIR, "cli-test-output.jpg");

    // Run CLI via node
    const { stdout } = await execa("node", [cliPath, "convert", inputPath, "--output", outputPath, "--format", "jpg"]);

    expect(stdout).toContain("All operations completed");

    // The CLI should have created a FILE named cli-test-output.jpg
    const outputBuffer = await readFile(outputPath);
    expect(outputBuffer[0]).toBe(0xff);
    expect(outputBuffer[1]).toBe(0xd8); // JPG magic

    // Cleanup
    await rm(outputPath, { force: true });
  }, 30000);
});
