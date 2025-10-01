"use client";

import { useTodoStore } from "@/app/lib/store/StoreProvider";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 text-muted">
        No todos yet. Add one to get started!
      </div>
    );
  }

  return (
    <ul className="border border-border rounded overflow-hidden">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
