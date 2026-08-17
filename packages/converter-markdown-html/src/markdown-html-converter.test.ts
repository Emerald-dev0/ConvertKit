import { describe, it, expect } from "vitest";
import { MarkdownHtmlConverter } from "./markdown-html-converter.js";
import { FORMATS } from "@convertkit/core";

describe("MarkdownHtmlConverter", () => {
  const converter = new MarkdownHtmlConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("markdown-html-converter");
  });

  it("should convert simple Markdown to HTML", async () => {
    const md = "# Hello\n\nThis is **bold** text.";
    const input = new TextEncoder().encode(md);

    const result = await converter.convert(input, { to: FORMATS.HTML });

    expect(result.format.id).toBe("html");
    const html = new TextDecoder().decode(result.data as Uint8Array);

    expect(html).toContain("<h1>Hello</h1>");
    expect(html).toContain("<strong>bold</strong>");
  });

  it("should handle Markdown tables", async () => {
    const md = "| Name | Age |\n| --- | --- |\n| Alice | 30 |";
    const input = new TextEncoder().encode(md);
    const result = await converter.convert(input, { to: FORMATS.HTML });
    const html = new TextDecoder().decode(result.data as Uint8Array);
    expect(html).toContain("<table>");
    expect(html).toContain("Alice");
  });
});
