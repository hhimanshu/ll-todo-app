# GitHub Copilot Instructions for Todo App

## Project Overview
This is a modern Todo application built with Next.js 15, React 19, TypeScript, and Zustand for state management. The project uses Bun as the runtime and package manager, with Tailwind CSS for styling.

## Architecture & Patterns

### Project Structure
- **App Router**: Using Next.js App Router with TypeScript
- **State Management**: Zustand with provider pattern for SSR compatibility
- **Styling**: Tailwind CSS with custom color tokens
- **Testing**: Bun test framework
- **Runtime**: Bun for development and package management

### Core Patterns to Follow

#### 1. File Organization
```
app/
├── components/          # React components (PascalCase)
├── lib/
│   ├── logic/          # Pure business logic functions
│   ├── store/          # Zustand store definitions
│   └── types/          # TypeScript type definitions
└── tests/              # Test files mirroring source structure
```

#### 2. Component Architecture
- **Client Components**: Mark with `"use client"` when using hooks or browser APIs
- **Server Components**: Default for static content and layouts
- **Component Naming**: PascalCase with descriptive names (`AddTodoForm`, `TodoItem`)
- **Props Interface**: Always define explicit props interfaces

#### 3. State Management Pattern
```typescript
// Store Definition Pattern
export interface TodoStore {
  // State
  todos: Todo[];
  // Actions
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

// Provider Pattern for SSR
export const createTodoStore = () => {
  return create<TodoStore>((set) => ({
    // Implementation
  }));
};
```

#### 4. Business Logic Separation
- Keep pure functions in `lib/logic/` directory
- Functions should be immutable and testable
- Always include JSDoc comments for function documentation
- Return new arrays/objects instead of mutating existing ones

## Code Style Guidelines

### TypeScript
- Use explicit interface definitions for all props and data structures
- Prefer `interface` over `type` for object shapes
- Use strict type checking - avoid `any` types
- Import types with `import type` when only used for typing

### React Components
```tsx
// Good component pattern
"use client";

import { ComponentProps } from "react";
import { useTodoStore } from "@/app/lib/store/StoreProvider";

interface ComponentNameProps {
  prop: string;
}

export function ComponentName({ prop }: ComponentNameProps) {
  const storeMethod = useTodoStore((state) => state.method);
  
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  );
}
```

### Styling Conventions
- Use Tailwind CSS utility classes exclusively
- Follow the custom color tokens: `background`, `foreground`, `border`, `muted`
- Responsive design with mobile-first approach
- Consistent spacing using Tailwind's spacing scale
- Use semantic color names from the theme configuration

### Import/Export Patterns
- Use absolute imports with `@/` prefix for internal modules
- Named exports for components and utilities
- Default exports only for page components
- Group imports: external libraries first, then internal modules

## Testing Standards

### Test Structure
```typescript
import { describe, test, expect } from "bun:test";
import { functionName } from "@/path/to/module";

describe("ModuleName", () => {
  describe("functionName", () => {
    test("should describe expected behavior", () => {
      // Test implementation
    });
  });
});
```

### Testing Principles
- Test pure functions in isolation
- Focus on behavior, not implementation details
- Test edge cases (empty inputs, invalid data)
- Ensure immutability by testing original data isn't mutated
- Use descriptive test names that explain the expected behavior

## Code Review Guidelines

### What to Look For

#### ✅ Good Practices
- **Immutability**: Functions return new objects/arrays instead of mutating
- **Type Safety**: Proper TypeScript usage with explicit types
- **Component Isolation**: Components focus on single responsibilities
- **Pure Functions**: Business logic separated from UI concerns
- **Consistent Naming**: PascalCase for components, camelCase for functions
- **Proper State Management**: Using Zustand store correctly through provider
- **Accessibility**: Proper semantic HTML and ARIA attributes where needed

#### ❌ Red Flags
- **Direct State Mutation**: Modifying arrays/objects in place
- **Mixed Concerns**: Business logic mixed with UI components
- **Type Anys**: Using `any` instead of proper typing
- **Missing Error Handling**: No validation for user inputs
- **Inconsistent Styling**: Not using Tailwind or custom CSS mixed in
- **Client/Server Boundary Issues**: Using client-side APIs in server components

### Performance Considerations
- **Zustand Selectors**: Use specific selectors instead of selecting entire state
- **Component Re-renders**: Minimize unnecessary re-renders with proper state selection
- **Bundle Size**: Avoid importing entire libraries when tree-shaking is possible
- **Image Optimization**: Use Next.js Image component for images

### Security & Best Practices
- **Input Validation**: Always validate and sanitize user inputs
- **XSS Prevention**: Avoid dangerouslySetInnerHTML without sanitization
- **Environment Variables**: Use proper environment variable handling
- **Error Boundaries**: Implement error boundaries for client components

## Development Workflow

### Scripts
- `bun dev`: Development server
- `bun build`: Production build
- `bun test`: Run test suite
- `bun lint`: ESLint checking

### File Creation Guidelines
1. **Components**: Create in `app/components/` with PascalCase naming
2. **Logic**: Pure functions in `app/lib/logic/` with camelCase naming
3. **Types**: Interface definitions in `app/lib/types/` with camelCase files
4. **Tests**: Mirror source structure in `tests/` directory
5. **Stores**: State management in `app/lib/store/` with camelCase naming

### Code Generation Preferences
When generating new code:
- Follow the established patterns in existing components
- Use the project's TypeScript configuration
- Include proper JSDoc comments for functions
- Add corresponding test files for new logic
- Use the established import patterns and file structure
- Follow Tailwind CSS conventions for styling
- Implement proper error handling and input validation

## Common Patterns to Suggest

### Form Handling
```tsx
const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  if (inputValue.trim()) {
    storeAction(inputValue);
    setInputValue("");
  }
};
```

### Store Hook Usage
```tsx
const todos = useTodoStore((state) => state.todos);
const addTodo = useTodoStore((state) => state.addTodo);
```

### Conditional Rendering
```tsx
{todos.length === 0 ? (
  <div className="text-center py-12 text-muted">
    No todos yet. Add one to get started!
  </div>
) : (
  <TodoList todos={todos} />
)}
```

This project emphasizes clean architecture, type safety, and maintainable code patterns. Always prioritize readability, testability, and following the established conventions when suggesting or reviewing code changes.