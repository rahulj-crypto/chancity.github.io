---
name: planning-work
description: Use when you have a spec or requirements for a multi-step task, before touching code. Create comprehensive implementation plans.
---

# Planning Work

## When to use this skill
- When you have a clear spec or requirements but haven't started coding.
- When creating a detailed implementation plan for complex features.
- Before executing a multi-step task.

## Workflow

1.  **Understand the Goal**: Read requirements and identify the "definition of done".
2.  **Create Plan Header**: Start with the standard header defining goal, architecture, and stack.
3.  **Break Down Tasks**: Decompose the work into bite-sized (2-5 min) steps.
4.  **Detail Each Task**: For every task, list exact file paths, code changes, and test verification steps.
5.  **Review**: Ensure the plan is DRY, follows YAGNI, and includes TDD steps.

## Instructions

### 1. Bite-Sized Task Granularity
Each step should be atomic:
- "Write the failing test"
- "Run it to make sure it fails"
- "Implement the minimal code"
- "Run the tests and make sure they pass"
- "Commit"

### 2. Plan Document Header
Start every plan with:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]

---
```

### 3. Task Structure
Format each task like this:

```markdown
### Task N: [Component Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Step 1: Write the failing test**
[Code block]

**Step 2: Run test to verify it fails**
[Expected output]

**Step 3: Write minimal implementation**
[Code block]

**Step 4: Run test to verify it passes**
[Expected output]

**Step 5: Commit**
[Git commands]
```

## Resources
- [See existing plans in docs/plans/ if available]
