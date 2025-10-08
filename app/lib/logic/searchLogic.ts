import { Todo } from "@/app/lib/types/todo";

/**
 * Searches todos by text (case-insensitive)
 * @param todos - List of todos to search
 * @param searchQuery - Search query string
 * @returns Filtered array of todos matching the search query
 */
export function searchTodos(todos: Todo[], searchQuery: string): Todo[] {
  if (!searchQuery.trim()) {
    return todos;
  }

  const lowerQuery = searchQuery.toLowerCase();
  return todos.filter((todo) =>
    todo.text.toLowerCase().includes(lowerQuery)
  );
}
