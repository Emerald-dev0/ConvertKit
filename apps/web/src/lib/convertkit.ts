/**
 * ConvertKit web — conversion registry data layer.
 *
 * This module is the single source of truth for the web interface. It builds
 * the real converter registry (the same one used by the API route and the CLI)
 * and derives serializable capability data for every section of the site.
 *
 * SERVER-ONLY: imports native converter packages (sharp, ffmpeg, libreoffice…).
 * Never import this module from a client component.
 */
import {
  ConverterRegistry,
  FormatDetector,
  FORMATS,
  FileFormat,
} from "@convertkit/core";
import { ImageConverter } from "@convertkit/converter-image";
import { PdfTextConverter } from "@convertkit/converter-pdf-text";
import { CsvJsonConverter } from "@convertkit/converter-csv-json";
import { MarkdownHtmlConverter } from "@convertkit/converter-markdown-html";
import { LibreOfficeConverter } from "@convertkit/converter-libreoffice";
import { FfmpegConverter } from "@convertkit/converter-ffmpeg";
import { TesseractOCRConverter } from "@convertkit/converter-ocr";

export const registry = new ConverterRegistry();
export const detector = new FormatDetector();

// The complete set of converters exposed to the web app. Adding or removing a
// converter here changes the capabilities shown across the entire site.
registry.register(new ImageConverter());
registry.register(new PdfTextConverter());
registry.register(new CsvJsonConverter());
registry.register(new MarkdownHtmlConverter());
registry.register(new LibreOfficeConverter());
registry.register(new FfmpegConverter());
registry.register(new TesseractOCRConverter());

const MAX_CHAIN_DEPTH = 3;

/* ------------------------------------------------------------------ types */

export interface FormatEntry {
  id: string;
  name: string;
  category: string;
  extensions: string[];
  mimeTypes: string[];
}

export interface ReachableTarget {
  to: string;
  direct: boolean;
  /** Format id chain from the source to the target, inclusive. */
  path: string[];
  /** Converter metadata ids used, in order. */
  steps: string[];
}

export interface ConverterSummary {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilities: { from: string; to: string }[];
  inputs: string[];
  outputs: string[];
}

export interface GraphNode {
  id: string;
  name: string;
  category: string;
  x: number;
  y: number;
  in: number;
  out: number;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  chain: boolean;
  engines: string;
}

export interface PipelineExample {
  id: string;
  from: string;
  to: string;
  /** Format id chain including source and target. */
  path: string[];
  /** Converter metadata names, one per transition. */
  steps: string[];
}

/* ------------------------------------------------------------ derivation */

const allFormats = Object.values(FORMATS) as FileFormat[];

/** Formats that participate in at least one real converter capability. */
const active = new Set<string>();
const formatsById = new Map<string, FileFormat>();
for (const f of allFormats) formatsById.set(f.id, f);

/** Adjacency from converter capabilities: fromId -> edges. */
type CapEdge = { to: string; converterId: string; converterName: string };
const adjacency = new Map<string, CapEdge[]>();

for (const converter of registry.getConverters()) {
  for (const cap of converter.capabilities) {
    active.add(cap.from.id);
    active.add(cap.to.id);
    const list = adjacency.get(cap.from.id) ?? [];
    list.push({
      to: cap.to.id,
      converterId: converter.metadata.id,
      converterName: converter.metadata.name,
    });
    adjacency.set(cap.from.id, list);
  }
}

/**
 * BFS over the registry from a source format. Returns, for every reachable
 * target, the shortest path expressed as format ids and converter metadata ids.
 * `direct` is true when the path requires a single converter hop.
 */
function reachFrom(fromId: string): Map<string, ReachableTarget> {
  const best = new Map<string, ReachableTarget>();

  interface Q {
    formatId: string;
    converters: string[];
    path: string[];
  }

  const queue: Q[] = [{ formatId: fromId, converters: [], path: [fromId] }];
  const seen = new Set<string>();
  seen.add(fromId);

  while (queue.length > 0) {
    const { formatId, converters, path } = queue.shift()!;

    if (path.length > 1 && !best.has(formatId)) {
      best.set(formatId, {
        to: formatId,
        direct: converters.length === 1,
        path,
        steps: converters,
      });
    }

    if (path.length - 1 >= MAX_CHAIN_DEPTH) continue;

    for (const edge of adjacency.get(formatId) ?? []) {
      if (seen.has(edge.to)) continue;
      seen.add(edge.to);
      queue.push({
        formatId: edge.to,
        converters: [...converters, edge.converterId],
        path: [...path, edge.to],
      });
    }

    // Priority-queue behaviour would prefer the single hop when reachable both
    // directly and via a chain; BFS level-order gives us exactly that because
    // all single hops are enqueued before any two-hop path completes.
  }

  return best;
}

/** Precompute reachable targets for every active format. */
const reachCache = new Map<string, Map<string, ReachableTarget>>();
for (const id of active) reachCache.set(id, reachFrom(id));

/* ----------------------------------------------------------------- export */

export function getFormatEntries(): FormatEntry[] {
  return allFormats.map((f) => ({
    id: f.id,
    name: f.name,
    category: f.category ?? "other",
    extensions: [...f.extensions],
    mimeTypes: [...f.mimeTypes],
  }));
}

export function getFormatById(id: string): FormatEntry | undefined {
  return getFormatEntries().find((f) => f.id === id);
}

/**
 * `fromId -> reachable targets` map used by the interactive converter surface.
 * Includes only formats that the engine can actually consume.
 */
export function getConversionLookup(): Record<string, ReachableTarget[]> {
  const out: Record<string, ReachableTarget[]> = {};
  for (const id of active) {
    const targets = reachCache.get(id) ?? new Map();
    const list = Array.from(targets.values());
    list.sort((a, b) => {
      if (a.direct !== b.direct) return a.direct ? -1 : 1;
      return a.path.length - b.path.length;
    });
    out[id] = list;
  }
  return out;
}

export function getConverterSummaries(): ConverterSummary[] {
  return registry.getConverters().map((c) => ({
    id: c.metadata.id,
    name: c.metadata.name,
    description: c.metadata.description,
    version: c.metadata.version,
    capabilities: c.capabilities.map((cap) => ({
      from: cap.from.id,
      to: cap.to.id,
    })),
    inputs: Array.from(
      new Set(c.capabilities.map((cap) => cap.from.id))
    ).sort(),
    outputs: Array.from(new Set(c.capabilities.map((cap) => cap.to.id))).sort(),
  }));
}

/* --------------------------------------------------------------- graph data */

const CATEGORY_COLUMNS: Record<string, { x: number; y0: number }> = {
  document: { x: 100, y0: 80 },
  data: { x: 280, y0: 80 },
  presentation: { x: 280, y0: 400 },
  image: { x: 460, y0: 80 },
  raw: { x: 460, y0: 400 },
  audio: { x: 640, y0: 80 },
  video: { x: 820, y0: 80 },
  ebook: { x: 100, y0: 350 },
  archive: { x: 100, y0: 550 },
  font: { x: 280, y0: 550 },
  vector: { x: 460, y0: 550 },
  cad: { x: 640, y0: 400 },
  "3d": { x: 640, y0: 550 },
  subtitle: { x: 820, y0: 400 },
  scientific: { x: 820, y0: 550 },
};

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function getGraphData(): {
  nodes: GraphNode[];
  edges: GraphEdge[];
} {
  const byId = formatsById;

  // Gather active nodes grouped by category, computing io degrees.
  const byCategory = new Map<string, string[]>();
  const inDegree = new Map<string, number>();
  const outDegree = new Map<string, number>();

  for (const id of active) {
    const cat = byId.get(id)?.category ?? "other";
    (byCategory.get(cat) ?? byCategory.set(cat, []).get(cat)!).push(id);
  }

  for (const [from, edges] of adjacency) {
    outDegree.set(from, (outDegree.get(from) ?? 0) + edges.length);
    inDegree.set(from, inDegree.get(from) ?? 0);
    for (const e of edges) {
      inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1);
      outDegree.set(e.to, outDegree.get(e.to) ?? 0);
    }
  }

  const nodes: GraphNode[] = [];
  // Canonical column order keeps the graph stable between renders.
  const order = ["document", "data", "presentation", "image", "raw", "audio", "video", "ebook", "archive", "font", "vector", "cad", "3d", "subtitle", "scientific", "other"];

  for (const cat of order) {
    const ids = (byCategory.get(cat) ?? []).sort();
    const col = CATEGORY_COLUMNS[cat] ?? { x: 130, y0: 120 };
    const spacing = Math.max(72, 560 / Math.max(ids.length, 1));
    ids.forEach((id, i) => {
      const jitter = (hashString(id) % 40) - 20;
      nodes.push({
        id,
        name: byId.get(id)?.name ?? id,
        category: cat === "other" ? (byId.get(id)?.category ?? "other") : cat,
        x: col.x + jitter * 0.3,
        y: col.y0 + i * spacing + (hashString(id + "y") % 20),
        in: inDegree.get(id) ?? 0,
        out: outDegree.get(id) ?? 0,
      });
    });
  }

  // Direct (single converter) edges, de-duplicated per format pair.
  const pairToEngines = new Map<string, string[]>();
  for (const converter of registry.getConverters()) {
    for (const cap of converter.capabilities) {
      const key = `${cap.from.id}:${cap.to.id}`;
      const list = pairToEngines.get(key) ?? [];
      list.push(converter.metadata.name);
      pairToEngines.set(key, list);
    }
  }

  // Chained (multi-hop) edges worth surfacing in the graph. Computed from the
  // real pathfinder, capped so the canvas does not become noise.
  const chainCandidates: { from: string; to: string; steps: number }[] = [];
  for (const [fromId, targets] of reachCache) {
    for (const target of targets.values()) {
      if (target.direct) continue;
      chainCandidates.push({ from: fromId, to: target.to, steps: target.path.length - 1 });
    }
  }
  chainCandidates.sort((a, b) => a.steps - b.steps || a.from.localeCompare(b.from));

  const chosenChains = new Set<string>();
  const byFromCount = new Map<string, number>();
  for (const c of chainCandidates) {
    if (chosenChains.size >= 12) break;
    const key = `${c.from}:${c.to}`;
    if (chosenChains.has(key)) continue;
    if (!pairToEngines.has(key)) {
      chosenChains.add(key);
      byFromCount.set(c.from, (byFromCount.get(c.from) ?? 0) + 1);
    }
  }

  const edges: GraphEdge[] = [];

  for (const [key, engines] of pairToEngines) {
    const [from, to] = key.split(":");
    if (!nodes.some((n) => n.id === from) || !nodes.some((n) => n.id === to)) {
      continue;
    }
    edges.push({
      id: `e-${from}-${to}`,
      from,
      to,
      chain: false,
      engines: Array.from(new Set(engines)).join(" · "),
    });
  }

  // Nodes must exist for chain edge endpoints too.
  const nodeIds = new Set(nodes.map((n) => n.id));
  for (const key of chosenChains) {
    const [from, to] = key.split(":");
    if (!nodeIds.has(from) || !nodeIds.has(to)) continue;
    if (edges.some((e) => `${e.from}:${e.to}` === key)) continue;
    const path = reachCache.get(from)?.get(to);
    const engines =
      path?.steps.map((s) => converterNamesById.get(s) ?? s).join(" → ") ?? "pipeline";
    edges.push({ id: `c-${from}-${to}`, from, to, chain: true, engines });
  }

  return { nodes, edges };
}

const converterNamesById = new Map(
  registry.getConverters().map((c) => [c.metadata.id, c.metadata.name])
);

/* ------------------------------------------------------- pipeline examples */

export function getPipelineExamples(): PipelineExample[] {
  const candidates: [string, string, string][] = [
    ["png", "docx", "PNG → DOCX"],
    ["xlsx", "json", "XLSX → JSON"],
    ["md", "pdf", "Markdown → PDF"],
    ["mkv", "mp3", "MKV → MP3"],
  ];

  const out: PipelineExample[] = [];
  for (const [from, to, id] of candidates) {
    const target = reachCache.get(from)?.get(to);
    if (!target || target.direct) continue;
    out.push({
      id,
      from,
      to,
      path: target.path,
      steps: target.steps.map((s) => converterNamesById.get(s) ?? s),
    });
  }
  return out;
}

export function getEngines(): { id: string; label: string; note: string }[] {
  return [
    { id: "sharp", label: "Sharp", note: "image rasterization" },
    { id: "pdfjs", label: "PDF.js", note: "text extraction" },
    { id: "ffmpeg", label: "FFmpeg", note: "media transcode" },
    { id: "libreoffice", label: "LibreOffice", note: "document reconstruction" },
    { id: "tesseract", label: "Tesseract", note: "local OCR" },
    { id: "registry", label: "Converter Registry", note: "pathfinding core" },
  ];
}

/** Formats that are usable as converter inputs (for the SEO tool grid). */
export function getToolLinks(): { from: string; to: string }[] {
  // Curated high-value pairs across all categories, validated against the real registry.
  // Organized by category to ensure coverage of the full format universe.
  const candidates: [string, string][] = [
    // Documents
    ["pdf", "docx"], ["docx", "pdf"], ["pdf", "txt"], ["html", "pdf"],
    ["md", "html"], ["rtf", "pdf"], ["epub", "pdf"],
    // Spreadsheets / Data
    ["xlsx", "csv"], ["csv", "json"], ["json", "csv"], ["xlsx", "pdf"],
    ["csv", "xml"], ["yaml", "json"],
    // Presentations
    ["pptx", "pdf"], ["ppt", "pdf"],
    // Images
    ["png", "jpg"], ["jpg", "webp"], ["webp", "png"], ["avif", "jpg"],
    ["heic", "jpg"], ["svg", "png"], ["psd", "png"], ["tiff", "jpg"],
    ["gif", "png"], ["bmp", "jpg"], ["ico", "png"],
    // Camera RAW
    ["cr2", "jpg"], ["nef", "jpg"], ["arw", "jpg"], ["dng", "jpg"],
    // Video
    ["mp4", "mp3"], ["mp4", "webm"], ["mkv", "mp4"], ["mov", "mp4"],
    ["avi", "mp4"], ["wmv", "mp4"], ["flv", "mp4"],
    // Audio
    ["mp3", "wav"], ["wav", "mp3"], ["flac", "mp3"], ["m4a", "mp3"],
    ["aac", "mp3"], ["ogg", "mp3"], ["wma", "mp3"],
    // Ebooks
    ["mobi", "epub"], ["azw3", "epub"], ["fb2", "epub"],
    // Subtitles
    ["srt", "vtt"], ["vtt", "srt"], ["ass", "srt"],
    // Fonts
    ["ttf", "woff2"], ["otf", "woff2"],
  ];

  const valid: { from: string; to: string }[] = [];
  for (const [from, to] of candidates) {
    if (reachCache.get(from)?.has(to)) valid.push({ from, to });
  }
  return valid;
}