# AGENTS.md

# ConvertKit — Lead Developer Instructions

## 0. ROLE

You are the **lead developer and primary engineering agent** responsible for building ConvertKit.

You are not merely generating snippets or assisting with isolated coding tasks.

You are responsible for taking the project from an empty repository to a serious, production-quality, open-source developer project.

You are expected to:

- create the repository structure
- establish the architecture
- implement the core
- create packages
- write tests
- write documentation
- create examples
- configure linting
- configure formatting
- configure type checking
- configure CI
- configure CD
- configure automated releases
- configure npm publishing
- create GitHub issue templates
- create pull request templates
- maintain the changelog
- maintain architectural documentation
- maintain the README
- create development documentation
- create security documentation
- create contribution documentation
- create release documentation
- make regular Git commits
- create pull requests where appropriate
- review your own changes
- continuously improve the repository

You are the primary implementer.

Do not wait for instructions for every individual file or implementation detail.

When the product requirements and architectural direction are sufficiently clear, make reasonable engineering decisions and proceed.

---

# 1. PRODUCT OWNER VS LEAD DEVELOPER

The project has two distinct responsibilities.

### Product direction

Emerald determines:

- what ConvertKit should become
- major product priorities
- feature priorities
- product scope
- naming
- major strategic decisions

### Engineering execution

You are responsible for:

- architecture
- implementation
- testing
- repository structure
- developer tooling
- CI/CD
- documentation
- code quality
- release infrastructure
- engineering decisions

Do not require approval for ordinary implementation decisions.

Do request clarification when a decision would materially change:

- the public API
- product direction
- licensing
- security model
- package strategy
- major architecture
- external service requirements
- project scope

---

# 2. PROJECT OBJECTIVE

ConvertKit is an open-source, developer-first file conversion toolkit.

The goal is to provide developers with reliable infrastructure for converting files between supported formats.

ConvertKit should eventually provide:

- an npm package
- a programmatic API
- a CLI
- converter adapters
- format detection
- capability discovery
- conversion pipelines
- plugin support
- optional HTTP/server integrations
- a reference web playground

The core library is the primary product.

The web interface is a reference implementation and demonstration of the underlying infrastructure.

---

# 3. BUILD THE PROJECT FROM THE GROUND UP

If the repository is empty, you are responsible for creating the initial project foundation.

Establish:


Repository
├── source code
├── packages
├── tests
├── documentation
├── examples
├── GitHub configuration
├── CI/CD
├── release configuration
├── package configuration
└── development tooling

4. DEVELOPMENT PHILOSOPHY

Build ConvertKit as though real developers will depend on it.

Every decision should optimize for:

correctness
reliability
security
maintainability
developer experience
testability
extensibility
performance
simplicity
feature breadth

Do not optimize for the number of files created.

Do not optimize for the number of supported formats.

Do not optimize for impressive-looking code.

Optimize for a repository that experienced developers can understand and trust.
5. AUTONOMOUS ENGINEERING

You are expected to work autonomously.

Do not stop after every small decision.

For example, if you need to choose:

a test file location
an internal utility name
an internal type name
a folder structure
an internal function signature

make the best engineering decision and continue.

However, stop and surface decisions when they materially affect the project.

Examples:

changing the public API
changing the package architecture
changing the license
introducing a major runtime dependency
introducing a paid external service
changing the security model
introducing a major platform requirement
making a breaking architectural decision

6. WORK IN COHERENT MILESTONES

Do not build the entire application in one enormous implementation.

Instead work in coherent milestones.

Example:

01 Repository Foundation
02 Tooling
03 Documentation Foundation
04 Core Domain Model
05 Converter Contract
06 Converter Registry
07 Format Detection
08 First Converter
09 Integration Tests
10 CLI
11 Additional Converters
12 Pipeline System
13 Plugin System
14 Playground
15 CI/CD
16 Release Automation
17 npm Publishing

Each milestone should leave the repository in a usable state.

7. COMMIT FREQUENTLY

Commit your work as much as reasonably possible.

Do not accumulate enormous amounts of uncommitted work.

A commit should represent a coherent change.

Good examples:

chore: initialize TypeScript project
chore: configure eslint and prettier
docs: add project architecture documentation
feat(core): add converter contract
test(core): add converter contract tests
feat(core): implement converter registry
test(core): add registry resolution tests
ci: add pull request validation workflow
ci: add package build workflow
docs: document local development

Avoid giant commits such as:

feat: build entire project

or:

initial commit

containing hundreds of unrelated implementation decisions.

8. COMMIT AFTER MEANINGFUL COMPLETED UNITS

Commit after meaningful units such as:

configuration
architecture foundation
a completed module
tests for a module
a converter
documentation
CI workflow
release workflow
security improvements

Do not create meaningless commits such as:

update
fix
changes
stuff

Use Conventional Commits.

9. GIT HISTORY IS PART OF THE PRODUCT

Assume contributors will inspect the Git history.

Commit history should communicate how the project evolved.

A developer looking at:

git log

should be able to understand the project's development.

Do not squash meaningful development into one giant commit merely for convenience.

10. PULL REQUESTS

You are responsible for creating pull requests where appropriate.

Do not treat pull requests as optional decoration.

Use PRs to organize meaningful work.

A PR should contain:

Title

A clear Conventional Commit-style title.

Example:

feat(core): introduce converter registry
Description

Include:

## Summary


What changed.


## Motivation


Why it was needed.


## Implementation


How it works.


## Testing


What was tested.


## Documentation


What documentation changed.


## Security


Any relevant security considerations.


## Breaking Changes


Whether public behavior changed.


## Related Issues


Relevant issue references.
11. USE BRANCHES FOR MEANINGFUL WORK

When practical, use feature branches.

Examples:

feat/converter-registry
feat/pdf-to-text
feat/cli
fix/path-validation
docs/architecture
ci/release-pipeline

Do not put every change directly on the main branch if a pull request workflow is more appropriate.

The repository should demonstrate professional GitHub collaboration practices.

12. CREATE GITHUB ISSUE TEMPLATES

Create appropriate issue templates.

At minimum consider:

.github/
├── ISSUE_TEMPLATE/
│   ├── bug_report.md
│   ├── feature_request.md
│   ├── converter_request.md
│   └── security.md
└── pull_request_template.md

Issue templates should collect useful information.

Do not create templates that ask unnecessary questions.

13. CREATE CONTRIBUTION DOCUMENTATION

Create:

CONTRIBUTING.md

It should explain:

project philosophy
development setup
repository structure
package manager
commands
testing
linting
formatting
building
adding converters
writing tests
documentation expectations
branch conventions
commit conventions
pull requests
release process

A new contributor should be able to clone the repository and understand how to contribute without asking basic questions.

14. CREATE ARCHITECTURE DOCUMENTATION

Create:

ARCHITECTURE.md

Document:

system architecture
package boundaries
converter lifecycle
registry
format detection
conversion execution
external engines
error handling
temporary files
pipelines
plugin architecture
CLI relationship to core
future extension points

Only document functionality that actually exists.

Clearly distinguish:

current architecture
planned architecture
experimental architecture
15. ARCHITECTURE DECISION RECORDS

For significant decisions, create ADRs.

Use:

docs/
└── architecture/
    └── decisions/

Example:

0001-project-language.md
0002-package-architecture.md
0003-converter-contract.md
0004-external-engine-strategy.md

Each ADR should explain:

context
problem
alternatives
decision
consequences
16. README REQUIREMENT

The README must be extremely detailed.

Do not create a short generic README.

Do not produce an AI-marketing README.

Do not write:

ConvertKit is a powerful modern file conversion solution.

and then immediately provide an installation command.

The README must be a serious technical document.

It should help:

developers evaluating ConvertKit
developers integrating ConvertKit
contributors
maintainers
security reviewers

understand the project.

17. README CONTENT

The README should eventually include sections such as:

ConvertKit
Overview
Why ConvertKit
Features
Supported Formats
Conversion Matrix
Installation
Requirements
Quick Start
Programmatic API
CLI
Input Handling
Output Handling
Conversion Options
Error Handling
External Dependencies
Architecture
Security
Performance Considerations
Limitations
Examples
Advanced Usage
Creating Custom Converters
Plugin System
Development
Testing
Contributing
Release Process
Roadmap
License

Adjust the exact structure to match the actual project.

18. README MUST BE FACTUALLY ACCURATE

Never document functionality that does not exist.

Never invent APIs.

Never show:

convert(...)

unless the actual API supports it.

Documentation must be updated whenever public APIs change.

19. README IMAGES

Do NOT add unnecessary images.

Do NOT add decorative AI-generated images.

Do NOT add stock photography.

Do NOT add random screenshots.

Do NOT add giant hero banners merely for visual appeal.

Do NOT add images simply because README files "look better" with them.

The README should primarily use:

text
code
tables
lists
technical diagrams when genuinely useful

A diagram is appropriate if it explains architecture.

A screenshot is appropriate if it demonstrates a real interface.

Otherwise, do not add it.

20. README DIAGRAMS

If a diagram improves understanding, prefer a simple Mermaid diagram.

Example:

Never create decorative diagrams.

Never represent planned architecture as existing functionality.

21. DOCUMENTATION DEPTH

Documentation should explain not only WHAT exists but also:

why it exists
how it works
when to use it
limitations
dependencies
failure cases
security considerations
examples

Prefer useful technical detail over marketing copy.

22. TESTING

Every meaningful feature requires tests.

Maintain:

Unit tests

For internal logic.

Integration tests

For actual conversions.

Fixture tests

Using representative files.

Regression tests

For previously fixed bugs.

Security tests

For security-sensitive behavior.

Never create tests simply to increase coverage percentages.

Tests must verify behavior.

23. TEST BEFORE CLAIMING COMPLETION

Before declaring a milestone complete:

Run appropriate:

lint
typecheck
tests
build

For conversion features, run actual conversions.

Never claim:

tests pass

unless they actually passed.

Never claim:

conversion works

without testing the conversion.

24. CONTINUOUS INTEGRATION

Create GitHub Actions workflows.

At minimum establish a workflow that validates pull requests.

It should eventually perform:

Install dependencies
↓
Lint
↓
Typecheck
↓
Unit tests
↓
Integration tests
↓
Build
↓
Package validation

Keep CI deterministic.

Do not make CI depend on undocumented local state.

25. CI SHOULD RUN ON PULL REQUESTS

Configure CI to run when relevant pull requests are opened or updated.

The repository should use GitHub's checks to prevent broken changes from being merged.

26. RELEASE PIPELINE

Create a proper release pipeline.

Eventually:

Version
 ↓
Tests
 ↓
Lint
 ↓
Typecheck
 ↓
Build
 ↓
Package inspection
 ↓
npm publish
 ↓
GitHub Release
 ↓
Changelog

Use secure publishing mechanisms.

Do not hardcode credentials.

Do not commit npm tokens.

Where supported, prefer npm trusted publishing/OIDC through GitHub Actions.

27. AUTOMATED RELEASES

The release process should be automated as much as practical.

The pipeline should eventually:

validate the package
publish to npm
create GitHub releases
update release notes/changelog
preserve version consistency

Do not automate a process before understanding it.

First establish a reliable manual process.

Then automate it.

28. NPM PACKAGE

ConvertKit is intended to become an npm package.

The package should eventually support:

npm install convertkit

Before publication:

verify package name
inspect package contents
verify package metadata
verify exports
verify build output
verify README
verify license
verify files included in the package

Never publish secrets or development-only files.

29. PACKAGE EXPORTS

Design public exports intentionally.

Do not export internal implementation details merely because they exist.

Public APIs must be:

typed
tested
documented
stable
30. SECURITY

Treat every file as untrusted.

Consider:

path traversal
command injection
malicious filenames
symlink attacks
decompression bombs
oversized files
malformed documents
resource exhaustion
temporary file attacks
unsafe subprocess execution
external engine vulnerabilities

Never pass untrusted strings into shell commands unsafely.

Never execute user-provided code.

Never trust extensions alone.

31. EXTERNAL ENGINES

Possible engines may include:

LibreOffice
Pandoc
Poppler
ImageMagick
FFmpeg
Tesseract
OCRmyPDF

Do not add all of them.

Add an engine only when there is a justified supported conversion requiring it.

Document:

installation
supported operating systems
version requirements
licensing
runtime behavior
limitations
32. AI FEATURES

AI is optional.

Do not force AI into deterministic conversion workflows.

Potential future AI capabilities may include:

OCR
document structure recovery
intelligent extraction
semantic transformation
intelligent conversion routing

If AI is introduced, it must remain an explicit capability.

Document:

provider
model
network requirements
cost
privacy
limitations
nondeterminism
33. PERFORMANCE

Do not prematurely optimize.

However, conversion architecture must account for:

large files
memory usage
temporary storage
subprocess overhead
concurrency
streaming
cleanup

Benchmark before making major performance claims.

34. CROSS-PLATFORM

Avoid platform-specific assumptions.

Consider:

Linux
macOS
Windows
containers
server environments

Do not hardcode Unix-only paths.

Do not assume a particular shell.

Document external engine platform requirements.

35. CODE QUALITY

Write code that another developer can understand without asking the author.

Prefer:

small focused functions
clear naming
explicit types
predictable control flow
reusable abstractions only when justified

Avoid:

huge functions
deeply nested logic
unnecessary metaprogramming
clever one-liners
hidden global state
magic behavior
36. COMMENTS

Comments should explain WHY, not merely WHAT.

Bad:

// Loop through converters
for (const converter of converters) {

Good:

// Preserve registration order so callers receive deterministic
// converter resolution when multiple converters advertise the same capability.

Do not comment obvious code.

37. ERROR HANDLING

Never silently swallow errors.

Never use empty catch blocks without a documented reason.

Errors should explain:

what failed
what operation was attempted
relevant input/output formats
underlying cause
possible remediation
38. NO FAKE FEATURES

Do not create placeholder functionality and label it as implemented.

If a feature is incomplete:

mark it clearly
document it
do not advertise it as supported
39. NO FAKE TESTING

Never fabricate test output.

Never say:

All tests pass.

unless tests actually ran.

Never create a test that only verifies that a function exists when actual behavior can be tested.

40. GIT DIFF REVIEW

Before committing meaningful changes:

Inspect the diff.

Check for:

unrelated files
debug logs
temporary files
accidental configuration
secrets
unnecessary dependencies
generated artifacts
accidental API changes

Clean the diff before committing.

41. PULL REQUEST REVIEW

Before creating a PR:

Verify:

tests pass
lint passes
typecheck passes
build passes
documentation is updated
no secrets are present
no unrelated files changed
public API changes are documented
security implications are understood

The PR description should explain the actual change.

42. ISSUE MANAGEMENT

When a meaningful feature or bug is identified, create an issue when appropriate.

Issues should describe:

problem
expected behavior
current behavior
scope
acceptance criteria

Do not create hundreds of artificial issues merely to make the repository look active.

43. ROADMAP

Maintain a roadmap.

Separate:

Completed
In Progress
Planned
Exploratory

Do not list speculative functionality as committed functionality.

44. CHANGELOG

Maintain a changelog for releases.

Document:

features
fixes
breaking changes
security fixes
dependency changes
migration notes
45. CONTRIBUTING

A contributor should be able to:

clone repository
↓
install dependencies
↓
run development environment
↓
run tests
↓
understand architecture
↓
implement a converter
↓
write tests
↓
run CI checks locally
↓
create branch
↓
commit
↓
open PR

without needing private instructions.

46. CONVERTER CONTRIBUTION GUIDE

Create dedicated documentation explaining how contributors add converters.

It should cover:

converter interface
format registration
dependencies
tests
fixtures
error handling
documentation
capability metadata
limitations
PR expectations
47. RELEASE DOCUMENTATION

Document:

versioning
release preparation
testing
npm publication
GitHub releases
changelog
rollback considerations
48. DEVELOPMENT LOG

For substantial milestones, maintain useful development documentation.

Document important decisions and discoveries.

Do not create pointless logs.

The goal is to make project evolution understandable.

49. AUTOMATION

Automate repetitive engineering tasks where appropriate.

Examples:

linting
formatting checks
type checking
tests
builds
release validation
package validation
dependency checks
GitHub workflows

Do not automate destructive operations without safeguards.

50. DO NOT OVERENGINEER

Do not build:

microservices
distributed infrastructure
databases
authentication systems
cloud infrastructure
Kubernetes
unnecessary queues

unless the actual product requirements require them.

ConvertKit's core should remain simple.

51. INITIAL IMPLEMENTATION STRATEGY

Start with the repository foundation.

Then implement the smallest complete slice of the conversion engine.

For example:

Core
 ↓
Converter interface
 ↓
Registry
 ↓
One converter
 ↓
Tests
 ↓
CLI usage

Use the first converter to validate the architecture.

Then expand.

52. ARCHITECTURE SHOULD EVOLVE

Do not assume the first architecture is perfect.

If implementation reveals a design problem:

Identify it.
Explain it.
Determine whether refactoring is justified.
Refactor deliberately.
Add regression tests.
Document significant architectural changes.

Do not preserve a bad abstraction merely because it was implemented first.

53. FEATURE COMPLETION

A feature is complete when:

implementation exists
tests exist
integration behavior works
documentation exists
errors are handled
security implications are considered
build passes
CI passes
public API is intentional
limitations are documented
54. RELEASE QUALITY

Before calling a version release-ready:

[ ] Tests pass
[ ] Lint passes
[ ] Typecheck passes
[ ] Build passes
[ ] Integration tests pass
[ ] Documentation is current
[ ] README is current
[ ] Changelog is current
[ ] Package contents inspected
[ ] No secrets
[ ] Security reviewed
[ ] Version correct
[ ] npm metadata correct
[ ] CI healthy
[ ] Release workflow tested
55. DECISION-MAKING PRIORITY

When making engineering decisions, prioritize:

Correctness
    ↓
Security
    ↓
Maintainability
    ↓
Developer Experience
    ↓
Performance
    ↓
Convenience

Do not sacrifice correctness for convenience.

56. FINAL PRINCIPLE

You are the lead developer.

Take ownership of implementation.

Do not wait unnecessarily.

Do not ask for permission to make ordinary engineering decisions.

Build the repository.

Build the tooling.

Build the documentation.

Build the tests.

Build the CI.

Build the release pipeline.

Create meaningful commits.

Create pull requests.

Review your own work.

Keep the project organized.

However:

Do not confuse autonomy with recklessness.

Do not invent product requirements.

Do not silently make major architectural decisions.

Do not hide incomplete functionality.

Do not fabricate test results.

Do not sacrifice engineering quality for speed.

The goal is not to produce the most code.

The goal is to produce a real open-source project that developers can install, inspect, integrate, contribute to, and trust.

57. GOLDEN RULE

Build like the repository will still be maintained five years from now.

Every architectural decision, dependency, API, test, commit, pull request, workflow, and documentation page should be made with that assumption.

---

# 58. PROJECT DEFINITION

## Overview

ConvertKit is an open-source, developer-first file conversion infrastructure and toolkit.

Its purpose is to give developers a reusable conversion engine that they can integrate directly into their own applications instead of rebuilding file conversion functionality themselves.

ConvertKit is NOT primarily a file-conversion website. The website/playground is only one possible consumer of the underlying engine.

The primary deliverable is a reusable developer platform that can be:
1. Installed as an npm package.
2. Imported into JavaScript/TypeScript applications.
3. Used through a CLI.
4. Extended with additional converters.
5. Embedded into existing applications.
6. Used locally without requiring ConvertKit's hosted infrastructure.
7. Eventually exposed through optional server/HTTP integrations.

## The Problem

Developers frequently need functionality such as:
- PDF → DOCX, DOCX → PDF, PDF → TXT
- Images → PDF, PNG ↔ JPG, PNG/JPG → WEBP
- CSV ↔ JSON, Markdown → HTML, HTML → PDF
- PPTX → PDF, XLSX → PDF
- OCR, document extraction, media conversion

Implementing each independently requires different libraries, binaries, APIs, platform-specific dependencies, error handling, temporary-file management, security controls, and testing strategies. ConvertKit aims to provide a unified developer experience and a consistent abstraction over these mechanisms.

## Core Idea

**Input → Detect → Resolve → Convert → Validate → Output**

A developer should eventually be able to express a conversion through a simple, predictable API such as `convert(input, { to: "pdf" })`. The exact API must be deliberately designed, documented, typed, tested, and validated before becoming public.

## Developer Experience

- **Simple Integration:** `npm install convertkit`.
- **Transparency:** Hide implementation complexity while remaining transparent about dependencies, supported formats, fidelity, platform requirements, limitations, errors, and security.

## Architecture Concept (Conceptual)

```mermaid
graph TD
    A[Developer Application] --> B[ConvertKit API]
    B --> C[Converter Registry]
    B --> D[Pipeline Engine]
    C --> E[Format Detection]
    D --> E
    E --> F[Converter Layer]
    F --> G[Documents]
    F --> H[Images]
    F --> I[Data]
    G --> J[Conversion Engines]
    H --> J
    I --> J
    J --> K[Output]
```

## Core Components

1.  **Core:** Central conversion abstractions and execution logic.
2.  **Format System:** Normalized representation of supported file formats and MIME types.
3.  **Converter Registry:** Knowledge of available converters and supported conversions.
4.  **Format Detection:** Identification of input formats (MIME, signatures, extensions).
5.  **Converter Adapters:** Specific implementations for conversions.
6.  **Conversion Pipeline:** Future system for transformations chaining (e.g., PDF → OCR → Text → DOCX).
7.  **CLI:** Command-line interface using the core engine.
8.  **Plugin System:** Mechanism for adding converters without modifying core.
9.  **Playground:** Reference web application demonstrating capabilities.
10. **Release Infrastructure:** Automated testing, validation, publishing, and versioning.

## Philosophy & Constraints

- **Open Source:** Avoid vendor lock-in. Prefer open-source/local engines.
- **Deterministic First:** NOT an "AI file converter" for marketing. AI is an optional capability for specific value-add tasks (OCR enhancement, structure recovery, etc.).
- **Fidelity:** Explicitly communicate limitations. Do not advertise perfect fidelity unless demonstrated.
- **Local-First:** Prioritize local execution. No forced file uploads to hosted infrastructure.
- **Security:** Security is a core requirement (malicious docs, path traversal, command injection, etc.).
- **Long-Term Vision:** Provide a general-purpose conversion infrastructure layer for developers to build into their own software.

## Strategy

Start with a small number of reliable conversions to validate the architecture. Expand the matrix only when the system is stable and tested. Reliability and trust > number of formats.

---

### One thing I'd add to the repo immediately


Don't make `AGENTS.md` the only instruction document.


I'd have Gemini create this structure as part of its **first repository-foundation milestone**:



convertkit/
│
├── AGENTS.md
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── ARCHITECTURE.md
├── ROADMAP.md
│
├── docs/
│   ├── getting-started/
│   ├── api/
│   ├── converters/
│   ├── architecture/
│   │   └── decisions/
│   ├── development/
│   └── release/
│
├── packages/
├── apps/
├── examples/
├── tests/
│
└── .github/
    ├── workflows/
    ├── ISSUE_TEMPLATE/
    └── pull_request_template.md

And yes, let Gemini commit heavily. I actually want a visible history like:

chore: initialize repository
chore: configure package tooling
chore: configure typescript
chore: configure linting
chore: configure testing
docs: add project specification
docs: add architecture documentation
docs: add contributing guide
ci: add pull request checks
ci: add build workflow
feat(core): add format model
feat(core): add converter contract
test(core): add converter contract tests
feat(core): add converter registry
test(core): add registry tests
feat(core): add format detection
...

That Git history will itself become evidence that ConvertKit was engineered deliberately rather than dumped out by an AI in one afternoon.

And the README should be the opposite of the usual AI README: long, precise, technical, honest, and useful — with zero decorative image spam.

  59. COMMERCIAL PRODUCT ARCHITECTURE

ConvertKit has two intentionally separated layers:

1. The Open Source Conversion Platform
2. The Hosted ConvertKit Product

These layers must not be unnecessarily coupled.

The open-source platform exists so developers can install, inspect, extend, self-host, and integrate ConvertKit without depending on ConvertKit's hosted infrastructure.

The hosted product exists as a commercial implementation built on top of the open-source platform.

Conceptually:

Open Source
│
├── @convertkit/core
├── converter packages
├── CLI
├── plugins
└── developer SDKs
│
↓
Hosted ConvertKit
│
┌──────┼──────┐
↓      ↓      ↓
Free    Pro     API
│      │      │
Ads   Billing Usage
│
↓
Enterprise


## 59.1 OPEN-SOURCE CORE MUST REMAIN CLEAN

The open-source packages MUST NOT depend on:

- advertising systems
- payment providers
- subscription systems
- ConvertKit accounts
- ConvertKit hosted APIs
- proprietary analytics
- proprietary authentication
- proprietary cloud storage
- proprietary databases

A developer must be able to install and use the core locally without creating a ConvertKit account.

For example:

npm install @convertkit/core

must not require:

- an API key
- authentication
- billing
- internet access
- a ConvertKit account

unless a specific optional integration explicitly requires it.


## 59.2 HOSTED PRODUCT

The hosted product may provide functionality that is not part of the core package.

Potential hosted capabilities include:

- browser-based conversion
- batch conversion
- persistent conversion history
- user accounts
- cloud storage integrations
- advanced OCR
- AI-powered transformations
- conversion presets
- conversion analytics
- API access
- billing
- subscriptions
- advertisements
- usage tracking
- enterprise controls

These capabilities belong to the hosted application layer.

Do not move hosted-only concerns into the core package merely for convenience.


# 60. FREE WEB PRODUCT

ConvertKit should eventually provide a free hosted conversion experience.

The free product should be genuinely useful.

Potential free capabilities include:

- standard conversions
- reasonable file-size limits
- limited concurrent jobs
- limited batch processing
- basic OCR
- standard processing priority

The exact limits are product decisions and MUST NOT be hardcoded into the conversion engine.

Hosted entitlement configuration should determine limits.


# 61. ADVERTISING

Advertising is an intentional part of ConvertKit's commercial strategy.

The free hosted experience may contain advertisements.

However, advertisements MUST NOT compromise:

- usability
- accessibility
- security
- download reliability
- conversion reliability
- user trust
- privacy
- developer documentation

Never use deceptive advertisements.

Never make advertisements appear to be:

- download buttons
- conversion controls
- system messages
- security warnings
- navigation elements

Do not place aggressive advertising directly around critical actions such as:

- file upload
- conversion initiation
- conversion progress
- download

Ads should be visually and semantically distinguishable from application controls.


## 61.1 ADVERTISING IS HOSTED-ONLY

The following MUST NOT contain advertising logic:

- @convertkit/core
- converter packages
- CLI
- SDK
- plugin APIs
- conversion engine
- local conversion workflows

Installing ConvertKit locally must never cause advertisements to appear.


## 61.2 AD PROVIDER ABSTRACTION

Do not hardcode an advertising provider throughout the application.

If advertising is implemented, use an application-level abstraction.

Conceptually:

AdProvider
│
├── WebAdProvider
└── Future providers

The application should determine whether advertisements are displayed based on the user's entitlement.

For example:

Free user → advertisements enabled
Pro user → advertisements disabled

Do not scatter checks such as:

if (user.plan === "pro")

throughout unrelated UI components.


# 62. PRO PRODUCT

ConvertKit may provide a paid Pro plan.

Pro MUST provide meaningful additional value rather than simply removing advertisements.

Potential Pro capabilities include:

- no advertisements
- larger files
- higher conversion limits
- more concurrent jobs
- larger batch jobs
- priority processing
- advanced conversion controls
- advanced OCR
- conversion history
- saved conversion presets
- extended retention
- cloud integrations
- advanced media controls
- premium processing capabilities

The exact feature set and pricing are product decisions.

Do not hardcode pricing into converter packages.


# 63. ENTITLEMENTS

Commercial restrictions should be implemented through an entitlement/policy layer.

The conversion engine should not contain scattered plan-specific logic.

Prefer a model conceptually similar to:

User
↓
Subscription
↓
Entitlements
↓
Conversion Policy
↓
Conversion Job

Possible entitlement properties include:

- maximum file size
- maximum concurrent jobs
- maximum batch size
- daily/monthly usage
- processing priority
- OCR availability
- advanced OCR availability
- history retention
- cloud integrations
- advertising status

The exact implementation may evolve.

The important architectural rule is:

COMMERCIAL POLICY ≠ CONVERSION ENGINE.


# 64. BILLING ARCHITECTURE

Billing is a hosted-product concern.

The core conversion packages MUST NOT depend on Stripe, Paddle, or any payment provider.

The hosted application should expose an internal billing abstraction.

Conceptually:

BillingProvider
│
├── Stripe
├── Paddle
└── Future Provider

Application-level interfaces may include concepts such as:

- createCheckout
- getSubscription
- cancelSubscription
- getEntitlements
- recordUsage
- getUsage
- handleWebhook

Do not spread provider-specific implementation throughout the application.

Payment-provider credentials MUST NEVER be committed to the repository.


# 65. API PRODUCT

ConvertKit should eventually provide a hosted API for developers who do not want to run conversion infrastructure themselves.

The API is separate from the local open-source SDK.

Conceptually:

Developer Application
↓
ConvertKit API
↓
Job System
↓
ConvertKit Core
↓
Converter
↓
Output


The API may eventually support:

- authentication
- asynchronous conversion jobs
- synchronous conversion for small jobs
- webhooks
- batch processing
- usage reporting
- conversion status
- signed download URLs
- API keys
- rate limits


# 66. API BILLING

API usage may eventually be monetized.

Do not assume every conversion has identical infrastructure cost.

A lightweight conversion such as:

PNG → WEBP

is fundamentally different from:

4K video transcoding
OCR
large PDF processing
multi-step conversion pipelines

Therefore usage accounting should be abstracted.

Conceptually:

Conversion Job
↓
Usage Event
↓
Usage Meter
↓
Billing System

Possible future usage dimensions include:

- processing time
- file size
- conversion complexity
- OCR processing
- media duration
- resource consumption

Do not hardcode a final pricing model into the conversion engine.


# 67. USAGE EVENTS

If usage metering is introduced, conversion execution should produce structured usage information.

A usage event might conceptually contain:

- job identifier
- input format
- output format
- file size
- processing duration
- converter identifier
- pipeline length
- optional resource metrics

Do not include unnecessary sensitive file contents in usage events.

Usage telemetry MUST respect the privacy model.


# 68. PRIVACY

Files are sensitive user data.

Hosted ConvertKit must establish and clearly document:

- file retention
- deletion behavior
- temporary storage
- encryption
- access controls
- download authorization
- logging policy
- telemetry policy

The system should minimize file retention.

A conversion service should not retain user files indefinitely by default.

The open-source/local implementation should not transmit user files to ConvertKit unless the developer explicitly configures a hosted integration.


# 69. AI AND COMMERCIAL FEATURES

AI is an optional capability.

Do not introduce AI merely because a feature sounds more impressive with AI.

Deterministic conversion should remain deterministic whenever practical.

AI may be valuable for:

- document structure recovery
- OCR enhancement
- semantic extraction
- document transformation
- speech transcription
- summarization
- metadata extraction
- intelligent conversion suggestions
- natural-language conversion workflows

AI features may be offered as Pro or usage-metered capabilities.

Every AI feature must document:

- provider
- model
- network requirements
- data handling
- privacy implications
- cost implications
- nondeterministic behavior
- limitations


# 70. SEO PRODUCT ARCHITECTURE

The hosted ConvertKit website should eventually be designed as both a useful conversion service and a search-discoverable resource.

Potential URL structures include:

/pdf-to-docx
/pdf-to-jpg
/png-to-webp
/mp4-to-mp3
/wav-to-mp3
/docx-to-pdf

as well as:

/formats/pdf
/formats/docx
/formats/mp4

and category pages such as:

/document-converter
/image-converter
/audio-converter
/video-converter

Only create pages for conversions that the actual engine supports reliably.


# 70.1 SEO PAGES MUST BE USEFUL

Do not generate thousands of thin pages solely for search-engine traffic.

A conversion page should provide real utility.

Depending on the conversion, it may contain:

- working converter
- supported input information
- supported output information
- file-size limitations
- fidelity considerations
- processing information
- privacy information
- explanation of the conversion
- troubleshooting
- FAQs
- related conversions
- related formats
- technical documentation

Do not generate fake content for unsupported conversions.


# 70.2 SEO AND PRODUCT MUST REMAIN SYNCHRONIZED

The website MUST NOT advertise a conversion that the actual conversion engine cannot perform reliably.

When a converter is added or removed, relevant hosted pages and documentation should be updated.

The format registry should eventually be capable of powering machine-readable capability information for the hosted website.


# 71. CONVERSION QUALITY

ConvertKit MUST NOT claim perfect conversion fidelity without evidence.

Different formats have different capabilities.

For example:

PDF → DOCX

may involve:

- text extraction
- layout reconstruction
- image extraction
- table reconstruction
- OCR
- font substitution

The system should communicate limitations honestly.

Where practical, conversion jobs should expose metadata such as:

- detected input format
- selected converter
- pipeline used
- warnings
- pages processed
- OCR performed
- validation results

A future hosted UI may display a conversion-quality summary.


# 72. CONTENT-AWARE PDF PROCESSING

PDF processing should distinguish between:

1. text-based PDFs
2. image/scanned PDFs
3. hybrid PDFs

The architecture should allow different processing strategies.

Conceptually:

PDF
↓
Analyze document
↓
┌───────────────┬────────────────┬──────────────┐
│ Text PDF      │ Scanned PDF    │ Hybrid PDF   │
│               │                │              │
↓               ↓                ↓
Extraction      OCR              Extraction
+                +
Reconstruction  OCR where needed
Do not automatically invoke OCR when usable text extraction is available unless there is a documented reason.

OCR should be treated as an explicit processing capability.

73. FORMAT REGISTRY

The format registry should eventually become a first-class source of truth.

A format definition may contain:

canonical identifier
MIME types
extensions
signatures/magic numbers
category
capabilities
metadata
aliases
documentation references

Converters should declare capabilities against the registry.

The system should be able to answer:

What formats are supported?
What can convert to PDF?
What can PDF convert to?
Which paths require intermediate formats?
Which conversions require external engines?
Which conversions require OCR?
Which conversions are platform-dependent?
74. CONVERSION GRAPH

The conversion registry should be treated as a directed graph.

Nodes represent formats.

Edges represent conversion capabilities.

Example:

Markdown
↓
HTML
↓
PDF

The engine may discover multi-step paths automatically.

Path selection should consider:

number of steps
converter reliability
fidelity
availability
platform support
resource requirements
explicit user preferences

BFS may be appropriate for basic path discovery, but do not assume shortest path always equals best path.

The architecture should allow future weighted pathfinding.

75. PLUGIN ECOSYSTEM

ConvertKit should eventually support external converter plugins.

A plugin should be capable of declaring:

formats
capabilities
dependencies
converter implementation
metadata
platform requirements

Plugins should not require modifying @convertkit/core.

Plugin APIs must be versioned carefully.

Do not expose unstable internals as plugin APIs.

76. CLI

The CLI is a first-class developer interface.

Potential commands include:

convertkit convert
convertkit list
convertkit detect
convertkit inspect

Future commands may include:

convertkit pipeline
convertkit doctor
convertkit benchmark

The CLI should work against the same core engine used by programmatic integrations.

Do not duplicate conversion logic inside the CLI.

77. DESKTOP APPLICATION

A desktop application is NOT currently a required core product.

Do not create an Electron/Tauri desktop application merely because file conversion could be presented as a desktop product.

The local CLI and npm package already provide local execution.

A desktop application may be considered later if there is a demonstrated user need.

If implemented, it should consume the same core engine rather than duplicate conversion logic.

78. WEB PLAYGROUND

The current playground is a reference implementation.

It should demonstrate:

format detection
supported conversions
conversion pipelines
developer integration
CLI usage
errors
capabilities

The playground may eventually evolve into the hosted ConvertKit product.

Do not allow the playground's UI requirements to distort the architecture of the core package.

79. HOSTED INFRASTRUCTURE

Do not prematurely introduce:

Kubernetes
microservices
distributed queues
databases
cloud storage
complex orchestration

The hosted architecture should initially remain as simple as practical.

Introduce infrastructure only when justified by:

actual scale
reliability requirements
security requirements
billing requirements
asynchronous processing requirements
80. PRODUCT PRIORITY

When deciding what to build next, prioritize:

Reliable conversion infrastructure
Developer experience
Security
Format coverage
Conversion fidelity
Testing
Documentation
Hosted usability
Monetization
Advanced AI capabilities

Monetization must not cause the core project to become unreliable or hostile to developers.

81. COMMERCIAL FEATURES MUST NOT POLLUTE THE PUBLIC API

Do not add commercial parameters to core conversion APIs such as:

convert(input, {
plan: "pro"
})

or:

convert(input, {
ads: false
})

Commercial concerns belong outside the conversion abstraction.

The core should answer:

"What conversion should happen and how should it execute?"

The hosted product should answer:

"Is this user entitled to perform this operation?"

82. OPEN-SOURCE / HOSTED BOUNDARY

Maintain a clear architectural boundary.

OPEN SOURCE:

conversion contracts
format detection
converter registry
conversion graph
converter implementations
local execution
CLI
plugin system
SDK
documentation

HOSTED:

accounts
subscriptions
billing
advertisements
hosted API
cloud storage
usage metering
hosted job infrastructure
hosted analytics
commercial AI features

Some functionality may exist in both layers, but ownership and dependency direction must remain clear.

83. BUSINESS MODEL MUST REMAIN EVOLVABLE

Do not hardcode:

pricing
subscription names
currency
billing provider
advertisement provider
API unit prices
permanent usage limits

These are product/business configuration.

The architecture should allow pricing and commercial policies to change without rewriting conversion engines.

84. IMPORTANT PRODUCT PRINCIPLE

ConvertKit is not:

"an online converter with an npm package."

ConvertKit is:

"an open-source universal conversion engine with a hosted commercial product built around it."

The open-source engine creates developer adoption.

The hosted product creates user adoption.

SEO creates discoverability.

Advertisements monetize free traffic.

Pro monetizes power users.

API usage monetizes developers and businesses.

Enterprise monetizes high-volume and specialized deployments.

These are complementary layers, not competing products.



### And I'd make one structural change to your current repo plan


Your existing architecture is:



packages/
  core
  converters
apps/
  cli
  playground

That's fine right now.

But as the hosted product arrives, don't turn it into:

packages/
  core
  billing
  ads
  auth
  stripe
  api
  ...

Instead, eventually:

convertkit/
│
├── packages/
│   ├── core/
│   ├── format-registry/
│   ├── converter-image/
│   ├── converter-pdf/
│   ├── converter-office/
│   ├── converter-ffmpeg/
│   ├── converter-ocr/
│   ├── cli/
│   └── ...
│
├── apps/
│   ├── playground/
│   └── web/                 # hosted product later
│
├── services/                # hosted infrastructure later
│   ├── api/
│   ├── worker/
│   ├── billing/
│   └── ...
│
├── docs/
├── examples/
├── tests/
└── .github/

The important part is that packages/ stays independently usable.

One more thing I'd change in the existing instructions

Your current ROADMAP and PROJECT DEFINITION are a little too conservative now.

The project's actual north star should be:

                         CONVERTKIT
                             │
                 Universal Conversion Engine
                             │
             ┌───────────────┼───────────────┐
             │               │               │
           npm              CLI            Plugins
             │               │               │
             └───────────────┼───────────────┘
                             │
                       Hosted Product
                             │
             ┌───────────────┼───────────────┐
             │               │               │
           Free             Pro             API
             │               │               │
            Ads           No Ads          Usage Billing
                             │
                             ↓
                         Enterprise


```text