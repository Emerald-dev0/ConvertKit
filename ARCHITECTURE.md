# System Architecture

This document describes the high-level architecture of ConvertKit.

## Conceptual Model

ConvertKit operates as a pipeline: **Input → Detect → Resolve → Convert → Validate → Output**.

### Components

1.  **Core API:** The primary interface for developers. It handles the orchestration of the conversion process.
2.  **Converter Registry:** A central store that tracks all available converters and the formats they support.
3.  **Format Detection Engine:** Identifies input file types using MIME types, file signatures (magic bytes), and extensions.
4.  **Converter Layer:** A set of specialized adapters that wrap specific conversion engines (e.g., Pandoc, LibreOffice, custom JS logic).
5.  **Pipeline Engine:** (Future) Allows chaining multiple conversions together.

## Monorepo Structure

We use a monorepo approach managed by `pnpm workspaces`:

- `packages/core`: Contains the registry, detection logic, and base classes.
- `packages/converters`: Contains individual converter packages.
- `apps/`: Reference implementations and tools (CLI, Playground).

## Data Flow

1.  **Input:** Developer provides a file path, buffer, or stream.
2.  **Detection:** The engine determines the input format.
3.  **Resolution:** The registry finds the best converter for the (Input Format, Target Format) pair.
4.  **Conversion:** The selected converter executes the transformation.
5.  **Validation:** (Optional) The output is checked for fidelity or schema compliance.
6.  **Output:** The result is returned to the developer.

## Security Controls

- **Sandboxing:** Converters requiring subprocesses should ideally run in isolated environments.
- **Resource Management:** Temporary files are cleaned up automatically using a standard lifecycle.
- **Strict Validation:** Format detection is preferred over trusting file extensions.
