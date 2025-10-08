import { describe, test, expect } from "bun:test";
import { searchTodos } from "@/app/lib/logic/searchLogic";
import type { Todo } from "@/app/lib/types/todo";

describe("searchLogic", () => {
  describe("searchTodos", () => {
    const mockTodos: Todo[] = [
      { id: "1", text: "Buy groceries", completed: false, createdAt: 1 },
      { id: "2", text: "Write code", completed: true, createdAt: 2 },
      { id: "3", text: "Read a book", completed: false, createdAt: 3 },
      { id: "4", text: "GROCERY shopping list", completed: false, createdAt: 4 },
    ];

    test("returns all todos when search query is empty", () => {
      const result = searchTodos(mockTodos, "");
      expect(result).toEqual(mockTodos);
    });

    test("returns all todos when search query is whitespace only", () => {
      const result = searchTodos(mockTodos, "   ");
      expect(result).toEqual(mockTodos);
    });

    test("filters todos by search query (case-insensitive)", () => {
      const result = searchTodos(mockTodos, "grocery");
      expect(result).toHaveLength(2);
      expect(result[0].id).toBe("1");
      expect(result[1].id).toBe("4");
    });

    test("performs case-insensitive search", () => {
      const result = searchTodos(mockTodos, "WRITE");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    test("returns empty array when no matches found", () => {
      const result = searchTodos(mockTodos, "nonexistent");
      expect(result).toHaveLength(0);
    });

    test("matches partial text", () => {
      const result = searchTodos(mockTodos, "book");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("3");
    });

    test("does not mutate original array", () => {
      const original = [...mockTodos];
      searchTodos(mockTodos, "code");
      expect(mockTodos).toEqual(original);
    });

    test("returns empty array when searching empty todo list", () => {
      const result = searchTodos([], "test");
      expect(result).toHaveLength(0);
    });

    test("handles special characters in search query", () => {
      const todosWithSpecialChars: Todo[] = [
        { id: "1", text: "Buy milk & eggs", completed: false, createdAt: 1 },
        { id: "2", text: "Read book", completed: false, createdAt: 2 },
      ];
      const result = searchTodos(todosWithSpecialChars, "&");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });
  });
});
