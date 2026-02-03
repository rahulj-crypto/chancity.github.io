---
name: error-resolver
description: Systematic error diagnosis and resolution using first-principle analysis. Use when encountering any error message, stack trace, or unexpected behavior. Supports replay functionality to record and reuse solutions.
---

# Error Resolver

A first-principle approach to diagnosing and resolving errors across all languages and frameworks.

## When to use this skill
- Any error message or stack trace
- Unexpected behavior or bugs
- Build or compilation failures
- Runtime exceptions
- Network or connection errors
- Permission or access issues

## Core Philosophy

**The 5-step Error Resolution Process:**

```
1. CLASSIFY  ->  2. PARSE  ->  3. MATCH  ->  4. ANALYZE  ->  5. RESOLVE
     |              |             |             |              |
  What type?    Extract key    Known       Root cause      Fix +
               information    pattern?     analysis       Prevent
```

## Quick Start

When you encounter an error:

1. **Paste the full error** (including stack trace if available)
2. **Provide context** (what were you trying to do?)
3. **Share relevant code** (the file/function involved)

## Error Classification Framework

### Primary Categories

| Category | Indicators | Common Causes |
|----------|------------|---------------|
| **Syntax** | Parse error, Unexpected token | Typos, missing brackets, invalid syntax |
| **Type** | TypeError, type mismatch | Wrong data type, null/undefined access |
| **Reference** | ReferenceError, NameError | Undefined variable, scope issues |
| **Runtime** | RuntimeError, Exception | Logic errors, invalid operations |
| **Network** | ECONNREFUSED, timeout, 4xx/5xx | Connection issues, wrong URL, server down |
| **Permission** | EACCES, PermissionError | File/directory access, sudo needed |
| **Dependency** | ModuleNotFound, Cannot find module | Missing package, version mismatch |
| **Configuration** | Config error, env missing | Wrong settings, missing env vars |
| **Database** | Connection refused, query error | DB down, wrong credentials, bad query |
| **Memory** | OOM, heap out of memory | Memory leak, large data processing |

### Secondary Attributes

- **Severity**: Fatal / Error / Warning / Info
- **Scope**: Build-time / Runtime / Test-time
- **Origin**: User code / Framework / Third-party / System

## Analysis Workflow

### Step 1: Classify

Identify the error category by examining:
- Error name/code (e.g., `ENOENT`, `TypeError`)
- Error message keywords
- Where it occurred (compile, runtime, test)

### Step 2: Parse

Extract key information:
```
- Error code: [specific code if any]
- File path: [where the error originated]
- Line number: [exact line if available]
- Function/method: [context of the error]
- Variable/value: [what was involved]
- Stack trace depth: [how deep is the call stack]
```

### Step 3: Match Patterns

Check against known error patterns:
- See `patterns/` directory for language-specific patterns
- Match error signatures to known solutions
- Check replay history for previous solutions

### Step 4: Root Cause Analysis

Apply the **5 Whys** technique:
```
Error: Cannot read property 'name' of undefined
  Why 1? -> user object is undefined
  Why 2? -> API call returned null
  Why 3? -> User ID doesn't exist in database
  Why 4? -> ID was from stale cache
  Why 5? -> Cache invalidation not implemented

Root Cause: Missing cache invalidation logic
```

### Step 5: Resolve

Generate actionable solution:
1. **Immediate fix** - Get it working now
2. **Proper fix** - The right way to solve it
3. **Prevention** - How to avoid in the future

## Output Format

When resolving an error, provide:

```
## Error Diagnosis

**Classification**: [Category] / [Severity] / [Scope]

**Error Signature**:
- Code: [error code]
- Type: [error type]
- Location: [file:line]

## Root Cause

[Explanation of why this error occurred]

**Contributing Factors**:
1. [Factor 1]
2. [Factor 2]

## Solution

### Immediate Fix
[Quick steps to resolve]

### Code Change
[Specific code to add/modify]

### Verification
[How to verify the fix works]

## Prevention

[How to prevent this error in the future]

## Replay Tag

[Unique identifier for this solution - for future reference]
```

## Replay System

The replay system records successful solutions for future reference.

### Solution Record Format

```yaml
# .claude/error-solutions/[error-signature].yaml
id: "nodejs-module-not-found-express"
created: "2024-01-15T10:30:00Z"

error:
  type: "dependency"
  category: "ModuleNotFound"
  language: "nodejs"
  pattern: "Cannot find module 'express'"

diagnosis:
  root_cause: "Package not installed or node_modules corrupted"
  factors:
    - "Missing npm install after git clone"
    - "Corrupted node_modules directory"

solution:
  immediate:
    - "Run: npm install express"
  proper:
    - "Check package.json has express listed"
    - "Run: rm -rf node_modules && npm install"

verification:
  - "Run the application again"
  - "Check express is in node_modules"

prevention:
  - "Add npm install to project setup docs"
  - "Use npm ci in CI/CD pipelines"
```

## Debug Commands

### Node.js
```bash
NODE_DEBUG=* node app.js      # Verbose output
node --inspect app.js          # Memory debugging
npm ls [package-name]          # Check packages
```

### Python
```bash
python -m pdb script.py        # Debug mode
pip show [package-name]        # Check packages
```

### General
```bash
ls -la [file]                  # Check permissions
lsof -i :[port]                # Check port usage
env | grep [VAR_NAME]          # Check env vars
df -h                          # Check disk space
free -m                        # Check memory (Linux)
```

## Common Debugging Patterns

### Pattern 1: Binary Search
Comment out half the code, narrow down until you find the exact line.

### Pattern 2: Minimal Reproduction
Create the smallest code that reproduces the error.

### Pattern 3: Rubber Duck Debugging
Explain: What should happen? What actually happens? What changed recently?

### Pattern 4: Git Bisect
```bash
git bisect start
git bisect bad                 # current is bad
git bisect good [commit]       # last known good
git bisect good/bad            # mark each commit
git bisect reset               # when done
```
