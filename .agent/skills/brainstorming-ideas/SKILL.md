---
name: brainstorming-ideas
description: Use before creative work to explore user intent, requirements, and design. Validates ideas before implementation.
---

# Brainstorming Ideas

## When to use this skill
- Before starting any new feature or component.
- When requirements are vague or ambiguous.
- To explore design alternatives and trade-offs.

## Workflow

1.  **Understand**: Query the user and codebase to grasp the context.
2.  **Explore**: Propose 2-3 approaches with trade-offs.
3.  **Refine**: Ask clarifying questions (one at a time).
4.  **Design**: Present a detailed design in small sections for validation.
5.  **Document**: Save the valid design to a markdown file.

## Instructions

### 1. Understanding the Idea
- Check current project state (files, docs).
- Ask **one question per message**.
- Focus on purpose, constraints, and success criteria.

### 2. Exploring Approaches
- Propose 2-3 distinct approaches.
- Explain trade-offs (Pros/Cons).
- Recommend one and explain why.

### 3. Presenting the Design
- Break design into sections of 200-300 words.
- **Incremental Validation**: Ask "Does this look right so far?" after each section.
- Cover: Architecture, Components, Data Flow, Error Handling, Testing.

### 4. Documentation
- Write the validated design to `docs/plans/YYYY-MM-DD-<topic>-design.md`.
- Commit the design document.

## Key Principles
- **YAGNI**: Remove unnecessary features.
- **One Question at a Time**: Don't overwhelm.
- **Multiple Choice**: easy for user to answer.
