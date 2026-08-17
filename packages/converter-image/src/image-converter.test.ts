import { describe, it, expect } from "vitest";
import { ImageConverter } from "./image-converter.js";
import { FORMATS } from "@convertkit/core";
import sharp from "sharp";

describe("ImageConverter", () => {
  const converter = new ImageConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("sharp-image-converter");
  });

  it("should report capabilities", () => {
    expect(converter.capabilities.length).toBeGreaterThan(0);
    const pngToJpg = converter.capabilities.find(
      (c) => c.from.id === "png" && c.to.id === "jpg"
    );
    expect(pngToJpg).toBeDefined();
  });

  it("should convert PNG to JPG", async () => {
    // Create a 10x10 red PNG image
    const pngBuffer = await sharp({
      create: {
        width: 10,
        height: 10,
        channels: 3,
        background: { r: 255, g: 0, b: 0 },
      },
    })
      .png()
      .toBuffer();

    const result = await converter.convert(new Uint8Array(pngBuffer), {
      to: FORMATS.JPG,
    });

    expect(result.format.id).toBe("jpg");
    expect(result.data).toBeInstanceOf(Uint8Array);

    // Verify it's actually a JPG by checking magic numbers
    const data = result.data as Uint8Array;
    expect(data[0]).toBe(0xff);
    expect(data[1]).toBe(0xd8);
    expect(data[2]).toBe(0xff);
  });

  it("should convert JPG to WEBP", async () => {
    const jpgBuffer = await sharp({
      create: {
        width: 10,
        height: 10,
        channels: 3,
        background: { r: 0, g: 255, b: 0 },
      },
    })
      .jpeg()
      .toBuffer();

    const result = await converter.convert(new Uint8Array(jpgBuffer), {
      to: FORMATS.WEBP,
    });

    expect(result.format.id).toBe("webp");

    // WebP magic number check (RIFF ... WEBP)
    const data = result.data as Uint8Array;
    expect(String.fromCharCode(data[0], data[1], data[2], data[3])).toBe("RIFF");
  });
});
