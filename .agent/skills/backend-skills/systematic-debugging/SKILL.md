---
name: systematic-debugging
description: Comprehensive debugging methodology for systematically diagnosing and fixing errors. Use when encountering bugs, errors, or unexpected behavior that requires thorough investigation.
---

# Systematically Debug and Fix Errors

A comprehensive debugging methodology to resolve errors systematically.

## When to use this skill
- Complex bugs requiring thorough investigation
- Errors that are hard to reproduce
- Production issues needing root cause analysis
- Performance problems or memory issues
- Concurrency and race condition bugs

## Debugging Workflow

### Phase 1: Information Gathering

- [ ] Collect complete error message and stack trace
- [ ] Note timing, conditions, and frequency
- [ ] Identify environment (dev, staging, prod)
- [ ] Gather relevant logs

### Phase 2: Reproduction

- [ ] Create minimal test case
- [ ] Document exact steps to trigger
- [ ] Test in different environments
- [ ] Note patterns affecting occurrence

### Phase 3: Stack Trace Analysis

- [ ] Read stack trace bottom to top
- [ ] Identify exact error line
- [ ] Trace execution path
- [ ] Look for obvious issues

### Phase 4: Code Investigation

- [ ] Examine code around error
- [ ] Check recent changes
- [ ] Review variable state
- [ ] Analyze function params

### Phase 5: Hypothesis Formation

Form hypotheses considering:
- Null pointer / undefined reference
- Type mismatches
- Race conditions
- Resource exhaustion
- Logic errors
- External dependency failures

### Phase 6: Systematic Investigation

- [ ] Test each hypothesis methodically
- [ ] Binary search to isolate problem
- [ ] Add strategic logging
- [ ] Check data flow step by step

### Phase 7: Deep Analysis

**Data Validation:**
- Verify input format and validity
- Check edge cases and boundaries
- Validate data assumptions

**Dependency Analysis:**
- Check external dependencies/versions
- Verify network/API availability
- Review config and env vars
- Test database connections

**Resource Analysis:**
- Check for memory leaks
- Monitor CPU and I/O
- Analyze GC patterns
- Check for deadlocks

**Concurrency Issues:**
- Look for race conditions
- Check synchronization
- Analyze async operations
- Test under load

### Phase 8: Root Cause & Fix

- [ ] Identify root cause
- [ ] Design fix addressing root cause
- [ ] Implement with error handling
- [ ] Add validation and defensive code

### Phase 9: Testing

- [ ] Test against original error
- [ ] Test edge cases
- [ ] Run regression tests
- [ ] Test under stress

### Phase 10: Prevention

- [ ] Add unit/integration tests
- [ ] Improve error handling
- [ ] Add input validation
- [ ] Update documentation

### Phase 11: Monitoring

- [ ] Set up monitoring
- [ ] Add metrics and health checks
- [ ] Configure alerts
- [ ] Improve observability

### Phase 12: Documentation

- [ ] Document error and solution
- [ ] Update troubleshooting guides
- [ ] Share learnings with team
- [ ] Update code comments

## Debugging Techniques

### Binary Search
Comment out half the code, narrow down to exact line.

### Minimal Reproduction
Create smallest code that reproduces error.

### Rubber Duck
Explain: What should happen? What actually happens? What changed?

### Git Bisect
```bash
git bisect start
git bisect bad
git bisect good [commit]
```

## Common Root Causes Checklist

- [ ] Null/undefined values
- [ ] Off-by-one errors
- [ ] Uninitialized variables
- [ ] Missing error handling
- [ ] Race conditions
- [ ] Incorrect assumptions
- [ ] Environment differences
- [ ] Dependency version mismatch
- [ ] Resource exhaustion
- [ ] Incorrect data types

Maintain detailed notes throughout and consider wider implications of both the error and the fix.
