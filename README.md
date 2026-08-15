# ConvertKit

ConvertKit is an open-source, developer-first file conversion infrastructure and toolkit.

## Overview

ConvertKit provides developers with a unified, reliable, and secure engine for converting files between various formats. It is designed to be integrated directly into applications, providing a consistent abstraction over diverse conversion mechanisms.

Unlike standalone conversion websites, ConvertKit is a developer-centric platform that prioritizes:
- **Local-First Execution:** Prioritizes processing on your own infrastructure.
- **Deterministic Conversion:** Uses reliable engines for predictable results.
- **Security:** Built from the ground up to handle untrusted files safely.
- **Extensibility:** Easily add new converters through a plugin-like architecture.

## Core Features

- **Unified API:** A simple, predictable interface for all conversions.
- **Format Detection:** Automatic identification of file types using MIME, signatures, and extensions.
- **Monorepo Architecture:** Clean separation of core logic, converters, and applications.
- **CLI:** A powerful command-line tool for quick conversions.
- **TypeScript First:** Fully typed for the best developer experience.

## Installation

```bash
pnpm add convertkit
```

## Quick Start

```typescript
import { convert } from "convertkit";

const result = await convert("input.pdf", { to: "docx" });
```

*(Note: API is currently under development and subject to change.)*

## Architecture

ConvertKit follows a **Detect → Resolve → Convert → Validate** pipeline.

For a detailed look at the system design, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Project Structure

- `packages/core`: The central conversion engine.
- `packages/converters`: Individual converter implementations.
- `apps/playground`: A reference web application.
- `docs/`: Comprehensive technical documentation.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## Security

Security is a core requirement. Please see [SECURITY.md](./SECURITY.md) for our security policies and reporting vulnerabilities.

## License

ConvertKit is released under the [MIT License](./LICENSE).

---

Built with care for developers who need conversion infrastructure they can trust.
