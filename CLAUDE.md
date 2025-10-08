# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Development server:**
```bash
bun dev
```

**Build for production:**
```bash
bun build
```

**Run tests:**
```bash
bun test
```

**Run a specific test file:**
```bash
bun test tests/logic/todoLogic.test.ts
```

**Lint code:**
```bash
bun run lint
```

**Install dependencies:**
```bash
bun install --frozen-lockfile
```

## Technology Stack

- **Runtime:** Bun (not Node.js)
- **Framework:** Next.js 15 with App Router
- **React:** Version 19 (RC)
- **State Management:** Zustand with React Context provider pattern for SSR compatibility
- **Styling:** Tailwind CSS
- **Testing:** Bun's built-in test framework
- **TypeScript:** Strict mode enabled

## Architecture Overview

### State Management Pattern

This project uses **Zustand with a provider pattern** to ensure SSR compatibility with Next.js App Router:

1. **Store Factory** (`app/lib/store/todoStore.ts`): Exports `createTodoStore()` function that creates a new Zustand store instance
2. **Provider** (`app/lib/store/StoreProvider.tsx`): React Context provider that wraps the app and creates store instance
3. **Hook** (`useTodoStore`): Custom hook for accessing store with proper typing and error handling

**Critical:** Always use the `useTodoStore` hook from `StoreProvider.tsx` to access state, NOT the direct `useStore` hook from Zustand.

### Separation of Concerns

The codebase follows a strict separation between UI and business logic:

- **`app/components/`**: React components (UI layer, client components)
- **`app/lib/logic/`**: Pure functions for business logic (framework-agnostic)
- **`app/lib/store/`**: Zustand store definitions
- **`app/lib/types/`**: TypeScript type/interface definitions
- **`tests/`**: Test files mirroring the source structure

**Key principle:** Business logic functions in `app/lib/logic/` are pure, immutable, and independently testable. Store actions delegate to these pure functions.

Example pattern from `todoStore.ts`:
```typescript
addTodo: (text: string) =>
  set((state) => ({ todos: addTodo(state.todos, text) }))
```

The store action calls the pure `addTodo` function from `app/lib/logic/todoLogic.ts`.

### Path Aliases

Uses `@/` prefix for absolute imports (configured in `tsconfig.json`):
```typescript
import { Todo } from "@/app/lib/types/todo";
import { useTodoStore } from "@/app/lib/store/StoreProvider";
```

### Immutability

All state mutations return new objects/arrays. Functions never mutate input parameters. This is enforced through tests that verify original data remains unchanged.

## Code Patterns & Conventions

### Component Pattern

```tsx
"use client";

import { ComponentProps } from "react";
import { useTodoStore } from "@/app/lib/store/StoreProvider";

interface ComponentNameProps {
  // Explicit props interface
}

export function ComponentName({ prop }: ComponentNameProps) {
  // Use specific selectors, not entire state
  const method = useTodoStore((state) => state.method);

  return <div className="tailwind-classes">{/* content */}</div>;
}
```

### Pure Function Pattern

```typescript
/**
 * JSDoc comment describing function purpose
 * @param param1 - Description
 * @returns Description
 */
export function functionName(param1: Type): ReturnType {
  // Pure logic that doesn't mutate inputs
  return newValue;
}
```

### Test Pattern

```typescript
import { describe, test, expect } from "bun:test";
import { functionName } from "@/app/lib/logic/moduleName";

describe("moduleName", () => {
  describe("functionName", () => {
    test("describes expected behavior", () => {
      // Arrange
      const input = /* ... */;

      // Act
      const result = functionName(input);

      // Assert
      expect(result).toBe(expected);
    });

    test("does not mutate original array", () => {
      // Always test immutability
    });
  });
});
```

## File Naming & Organization

- **Components:** PascalCase (e.g., `AddTodoForm.tsx`, `TodoItem.tsx`)
- **Logic/Utils:** camelCase (e.g., `todoLogic.ts`, `filterLogic.ts`)
- **Types:** camelCase (e.g., `todo.ts`)
- **Tests:** Mirror source structure with `.test.ts` suffix

## Styling

- **Only Tailwind CSS utility classes** - no custom CSS or styled-components
- **Custom color tokens:** `background`, `foreground`, `border`, `muted`
- Mobile-first responsive design
- Semantic HTML with proper accessibility attributes

## Import/Export Conventions

1. External libraries first, then internal modules
2. Named exports for components and utilities
3. Default exports only for page components (Next.js requirement)
4. Use `import type` for type-only imports

## Testing Principles

- Test pure functions in `app/lib/logic/` thoroughly
- Focus on behavior and edge cases
- Always test immutability
- Use descriptive test names
- Mirror source directory structure in `tests/`

## Pull Requests & Code Reviews

### Creating Pull Requests

**Before creating a PR:**
1. Ensure all tests pass: `bun test`
2. Ensure linting passes: `bun run lint`

**PR Title Convention:**
Use clear, descriptive titles that indicate the type of change:
- `feat: Add todo sorting functionality`
- `fix: Resolve todo deletion bug`
- `refactor: Simplify filter logic`
- `test: Add tests for edit functionality`
- `docs: Update CLAUDE.md with review guidelines`

**PR Description Should Include:**
- Summary of changes (what and why)
- Testing approach
- Any breaking changes
- Screenshots/videos for UI changes

### Code Review Checklist

#### ✅ Architecture & Patterns
- [ ] Business logic is in `app/lib/logic/` as pure functions
- [ ] UI components are in `app/components/`
- [ ] State management uses `useTodoStore` hook correctly
- [ ] Zustand selectors are specific (not selecting entire state)
- [ ] File naming follows conventions (PascalCase for components, camelCase for logic)
- [ ] Absolute imports use `@/` prefix

#### ✅ TypeScript
- [ ] Explicit interface definitions for all props and data structures
- [ ] No `any` types (use proper typing)
- [ ] Type-only imports use `import type`
- [ ] Prefer `interface` over `type` for object shapes

#### ✅ React Components
- [ ] Client components marked with `"use client"`
- [ ] Components have explicit props interfaces
- [ ] No mixed concerns (UI logic separate from business logic)
- [ ] Proper semantic HTML and accessibility attributes
- [ ] Only Tailwind CSS classes (no custom CSS)

#### ✅ Immutability
- [ ] Functions return new arrays/objects instead of mutating
- [ ] No direct state mutation
- [ ] Tests verify original data isn't mutated

#### ✅ Testing
- [ ] New logic functions have corresponding tests
- [ ] Tests cover edge cases (empty inputs, invalid data)
- [ ] Test names are descriptive
- [ ] Tests verify immutability

#### ✅ Code Quality
- [ ] JSDoc comments for all functions in `app/lib/logic/`
- [ ] Descriptive variable and function names
- [ ] No commented-out code
- [ ] Consistent code formatting

### Good Practices vs Red Flags

#### ✅ Good Practices
- **Immutability**: Functions return new objects/arrays
  ```typescript
  return todos.filter((todo) => todo.id !== id);
  ```
- **Type Safety**: Explicit TypeScript interfaces
  ```typescript
  interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
  }
  ```
- **Component Isolation**: Single responsibility components
- **Pure Functions**: Business logic separated from UI
- **Proper State Management**: Using Zustand through provider pattern
- **Specific Selectors**: Only selecting needed state
  ```typescript
  const addTodo = useTodoStore((state) => state.addTodo);
  ```

#### ❌ Red Flags
- **Direct State Mutation**: Modifying arrays/objects in place
  ```typescript
  // BAD
  todos.push(newTodo);
  ```
- **Mixed Concerns**: Business logic in UI components
  ```typescript
  // BAD - logic should be in app/lib/logic/
  function TodoItem() {
    const newTodo = { id: Date.now(), ... };
  }
  ```
- **Type Anys**: Using `any` instead of proper types
- **Missing Validation**: No input validation for user data
- **Inconsistent Styling**: Custom CSS instead of Tailwind
- **Client/Server Issues**: Using client APIs in server components
- **Selecting Entire State**: Not using specific selectors
  ```typescript
  // BAD
  const store = useTodoStore((state) => state);
  ```

### Performance Considerations
- Use specific Zustand selectors to minimize re-renders
- Avoid importing entire libraries when tree-shaking is possible
- Use Next.js Image component for images
- Keep bundle size in check

### Security & Validation
- Always validate and sanitize user inputs
- Avoid `dangerouslySetInnerHTML` without sanitization
- Use proper environment variable handling for sensitive data
- Implement error boundaries for client components

## CI/CD

GitHub Actions workflow (`.github/workflows/test.yml`) runs on all PRs and pushes to main:
1. Runs linter (`bun run lint`)
2. Runs tests (`bun test`)
