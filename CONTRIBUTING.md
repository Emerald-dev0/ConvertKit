# Contributing to ConvertKit

Thank you for your interest in contributing to ConvertKit! This document provides guidelines for contributing to the project.

## Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/convertkit/convertkit.git
   cd convertkit
   ```

2. **Install dependencies:**
   We use `pnpm` for package management.
   ```bash
   pnpm install
   ```

3. **Run tests:**
   ```bash
   pnpm test
   ```

## Repository Structure

- `packages/`: Monorepo packages (core, converters).
- `apps/`: Reference applications (playground).
- `docs/`: Technical documentation and ADRs.
- `tests/`: Integration and fixture tests.

## Coding Conventions

- **TypeScript:** Use strict typing.
- **Linting:** We use ESLint and Prettier. Run `pnpm lint` and `pnpm format` before committing.
- **Testing:** Every new feature or fix must include tests.
- **Commits:** Use [Conventional Commits](https://www.conventionalcommits.org/).

## Pull Request Process

1. Create a feature branch from `main`.
2. Ensure tests, linting, and type checking pass.
3. Update relevant documentation.
4. Open a PR with a clear description of the changes.

## Adding a Converter

For detailed instructions on adding new conversion capabilities, see [docs/converters.md](./docs/converters.md).

## Code of Conduct

Please adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md).
