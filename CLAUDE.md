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

## CI/CD

GitHub Actions workflow (`.github/workflows/test.yml`) runs on all PRs and pushes to main:
1. Runs linter (`bun run lint`)
2. Runs tests (`bun test`)
