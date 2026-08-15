# Security Policy

Security is a core requirement of ConvertKit. We treat all input files as potentially untrusted and design the system to handle them safely.

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v0.x    | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please do NOT open a public issue. Instead, send an email to security@nacos.oauife.edu.ng (Placeholder - update when official email is ready).

We will acknowledge your report and work to resolve the issue as quickly as possible.

## Security Design Principles

1. **Isolation:** Subprocess execution is sandboxed where possible.
2. **Validation:** All inputs are strictly validated before processing.
3. **Resource Limits:** We enforce limits on file size, memory usage, and execution time.
4. **Transparency:** Dependencies and their security implications are documented.
