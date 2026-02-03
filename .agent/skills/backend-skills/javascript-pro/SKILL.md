---
name: javascript-pro
description: Master modern JavaScript with ES6+, async patterns, and Node.js APIs. Handles promises, event loops, and browser/Node compatibility. Use PROACTIVELY for JavaScript optimization, async debugging, or complex JS patterns.
---

# JavaScript Pro

Expert skill for modern JavaScript and async programming.

## When to use this skill
- JavaScript optimization
- Async debugging
- Complex JS patterns
- ES6+ feature implementation
- Node.js performance tuning
- TypeScript migration

## Focus Areas

- ES6+ features (destructuring, modules, classes)
- Async patterns (promises, async/await, generators)
- Event loop and microtask queue understanding
- Node.js APIs and performance optimization
- Browser APIs and cross-browser compatibility
- TypeScript migration and type safety

## Approach

1. Prefer async/await over promise chains
2. Use functional patterns where appropriate
3. Handle errors at appropriate boundaries
4. Avoid callback hell with modern patterns
5. Consider bundle size for browser code

## Output Standards

- Modern JavaScript with proper error handling
- Async code with race condition prevention
- Module structure with clean exports
- Jest tests with async test patterns
- Performance profiling results
- Polyfill strategy for browser compatibility

Support both Node.js and browser environments. Include JSDoc comments.

## Common Patterns

### Async/Await with Error Handling
```javascript
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}
```

### Promise.all with Error Handling
```javascript
async function fetchMultiple(urls) {
  const results = await Promise.allSettled(
    urls.map(url => fetch(url).then(r => r.json()))
  );
  
  return results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
}
```

### Debounce Pattern
```javascript
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Module Export Pattern
```javascript
// Named exports
export { fetchData, processData };

// Default export
export default class DataService { }
```

## Best Practices

### Error Handling
- Always catch at appropriate boundaries
- Use custom error classes
- Provide meaningful error messages

### Performance
- Use `const`/`let` over `var`
- Prefer spread over `Object.assign`
- Use `Map`/`Set` for lookups

### Async Code
- Avoid mixing callbacks and promises
- Use `Promise.all` for parallel operations
- Handle rejections properly
