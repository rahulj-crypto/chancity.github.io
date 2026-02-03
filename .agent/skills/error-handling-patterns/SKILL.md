---
name: error-handling-patterns
description: Master error handling patterns across languages including exceptions, Result types, error propagation, and graceful degradation to build resilient applications. Use when implementing error handling, designing APIs, or improving application reliability.
---

# Error Handling Patterns

Build resilient applications with robust error handling strategies that gracefully handle failures and provide excellent debugging experiences.

## When to use this skill
- Implementing error handling in new features
- Designing error-resilient APIs
- Debugging production issues
- Improving application reliability
- Creating better error messages for users and developers
- Implementing retry and circuit breaker patterns
- Handling async/concurrent errors
- Building fault-tolerant distributed systems

## Workflow

1.  **Identify Failure Modes**: Determine if errors are recoverable (network, input) or unrecoverable (OOM, bugs).
2.  **Choose Strategy**: Select the appropriate pattern (Exceptions vs Result Types) based on the language and error type.
3.  **Implement Handling**:
    - Use **Custom Error Classes** to preserve context.
    - Implement **Circuit Breakers** for external dependencies.
    - Use **Retry with Backoff** for transient network issues.
4.  **Graceful Degradation**: Plan for fallbacks when primary methods fail.
5.  **Clean Up**: Ensure resources are released (finally, context managers).
6.  **Log & Monitor**: Log meaningful messages with stack traces (but don't spam).

## Instructions

### 1. Core Concepts

#### Error Handling Philosophies
- **Exceptions**: Use for unexpected, exceptional conditions (Python, Java).
- **Result Types**: Use for expected errors and validation (Rust, Elm).
- **Error Codes**: Avoid unless necessary (C-style).

#### Error Categories
- **Recoverable**: Network timeouts, missing files, invalid input. -> **Handle & Retry/Report**
- **Unrecoverable**: Out of memory, stack overflow, bugs. -> **Crash Safely & Log**

### 2. Language-Specific Patterns

#### Python
- **Custom Hierarchy**: Inherit from `Exception` -> `ApplicationError`.
- **Context Managers**: Use `@contextmanager` for resource cleanup.
- **Retry Decorator**: Implement exponential backoff for network calls.
  ```python
  @retry(max_attempts=3, exceptions=(NetworkError,))
  def fetch_data(url): ...
  ```

#### TypeScript/JavaScript
- **Custom Classes**: Extend `Error` with `code` and `statusCode`.
- **Result Type**: Use a `Result<T, E>` union type for explicit handling.
- **Async Handling**: Use `try/catch` with specific error checks in `async` functions.

#### Rust
- **Result Type**: Use `Result<T, E>` and the `?` operator.
- **Custom Enums**: Define `enum AppError` to wrap various error types.
- **Option Type**: Use `Option<T>` for nullable values.

#### Go
- **Explicit Returns**: Return `(value, error)`.
- **Sentinel Errors**: Define `var ErrNotFound = errors.New(...)`.
- **Wrapping**: Use `fmt.Errorf("...: %w", err)` to wrap errors.

### 3. Universal Patterns

#### Circuit Breaker
Prevent cascading failures.
- **States**: Closed (Normal) -> Open (Failing) -> Half-Open (Testing).
- **Logic**: Fail fast if in Open state.

#### Error Aggregation
Collect multiple errors (e.g., form validation) instead of failing on the first one.
- Use a collector class to accumulate errors and throw an `AggregateError` at the end.

#### Graceful Degradation
Provide fallback functionality.
- Try primary -> Catch Error -> Return Fallback (Cache/Default).

### 4. Best Practices
- **Fail Fast**: Validate input early.
- **Preserve Context**: Include metadata and cause.
- **Meaningful Messages**: Explain *what* happened and *how* to fix it.
- **Clean Up**: Always use `finally` or `defer`.
- **Don't Swallow Errors**: Log or re-throw.

### 5. Common Pitfalls
- `except Exception:` (Python) or `catch (e)` without checking type.
- Empty catch blocks.
- Logging AND re-throwing (duplicate logs).
- "Error occurred" messages (vague).

## Resources
- `references/exception-hierarchy-design.md`: Designing error class hierarchies
- `references/error-recovery-strategies.md`: Recovery patterns for different scenarios
- `references/async-error-handling.md`: Handling errors in concurrent code
- `assets/error-handling-checklist.md`: Review checklist for error handling
- `assets/error-message-guide.md`: Writing helpful error messages
- `scripts/error-analyzer.py`: Analyze error patterns in logs
