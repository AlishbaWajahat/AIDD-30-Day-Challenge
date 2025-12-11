<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.0.0 (initial constitution for calculator project)
- Modified principles: None (new constitution)
- Added sections: All principles for calculator project
- Removed sections: None
- Templates requiring updates: ✅ Updated
- Follow-up TODOs: None
-->

# Calculator Constitution

## Core Principles

### I. Simplicity First
Calculator must implement only basic arithmetic operations (addition, subtraction, multiplication, division) with clean, understandable code. No advanced mathematical functions or complex features should be added beyond the core four operations.

### II. Correctness Over Features
Every calculation must produce mathematically accurate results with proper handling of edge cases like division by zero. Accuracy is prioritized over feature richness; correctness tests must pass before any release.

### III. Test-First (NON-NEGOTIABLE)
All calculator operations must have corresponding unit tests written before implementation. TDD approach: tests written → test cases validated → tests fail → implement functionality → tests pass → refactor if needed.

### IV. Error Handling
Calculator must gracefully handle invalid inputs and mathematical errors (like division by zero) with clear error messages. User-facing error messages should be intuitive and helpful.

### V. Minimal Dependencies
Calculator should have minimal external dependencies to ensure reliability and fast execution. Prefer standard library functions over third-party packages for basic arithmetic operations.

### VI. Clear User Interface
Calculator interface must be intuitive and straightforward for users to perform basic operations. Input/output should be predictable and consistent across all operations.

## Additional Constraints
- Language: Use JavaScript/TypeScript for implementation
- Operations limited to: +, -, *, /
- Input validation for numeric values only
- Handle floating point precision appropriately
- No memory functions or advanced features

## Development Workflow
- All code changes must include corresponding tests
- Code review required for all pull requests
- Calculator must pass all test suites before merging
- Maintain backward compatibility for basic operations

## Governance
Constitution governs all calculator development decisions. Amendments require team consensus and must be documented with rationale. All contributors must follow these principles when implementing features or fixing bugs.

**Version**: 1.0.0 | **Ratified**: 2025-12-12 | **Last Amended**: 2025-12-12
