# ConvertKit

**Universal File Conversion Engine — Open Source Infrastructure.**

ConvertKit is a high-performance, developer-first conversion infrastructure designed to handle any file transformation. It provides a smart, pathfinding engine that automatically chains converters to solve complex conversion requests.

## The Vision

ConvertKit is built on a "Universal Engine" philosophy. It is not just a library of scripts; it is a smart orchestration layer that allows developers to:
1. **Detect** input formats with content-aware analysis.
2. **Pathfind** the optimal conversion route using graph-based logic.
3. **Execute** high-fidelity transformations locally or via cloud adapters.

## Architecture: Open Source & Hosted

ConvertKit is architected with a clear boundary between the **Open Source Platform** and the **Hosted Commercial Product**.

- **Open Source:** Clean, account-free, local-first SDKs, CLI, and core engines.
- **Hosted:** A commercial implementation featuring billing, usage tracking, Pro features, and high-scale API access.

## Core Packages

- `@convertkit/core`: The central brain with BFS-based pathfinding.
- `@convertkit/cli`: A production-ready terminal utility for batch processing.
- `@convertkit/converter-*`: A modular matrix of conversion engines (FFmpeg, Sharp, PDF.js, LibreOffice, Tesseract).

## Quick Start (SDK)

```typescript
import { convert } from "@convertkit/core";

// Intelligent pathfinding handles MD -> HTML -> PDF automatically
const result = await convert(markdownBuffer, { to: "pdf" });
```

## Quick Start (CLI)

```bash
# Convert all images to WebP with visual progress
convertkit "images/*.png" -f webp -o ./dist/
```

## Contributing

We are building a long-term, maintainable infrastructure. See [CONTRIBUTING.md](./CONTRIBUTING.md) to get involved.

---

Built for developers who need conversion infrastructure they can trust.
