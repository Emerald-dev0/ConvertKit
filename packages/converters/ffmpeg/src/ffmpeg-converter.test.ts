import { describe, it, expect } from "vitest";
import { FfmpegConverter } from "./ffmpeg-converter.js";
import { FORMATS } from "@convertkit/core";

describe("FfmpegConverter", () => {
  const converter = new FfmpegConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("ffmpeg-converter");
  });

  it("should report capabilities", () => {
    const cap = converter.capabilities.find(
      (c) => c.from.id === "mp3" && c.to.id === "mp4"
    );
    expect(cap).toBeDefined();
  });
});
