"use client";

import { Todo } from "@/app/lib/types/todo";
import { useTodoStore } from "@/app/lib/store/StoreProvider";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  return (
    <li className="flex items-center gap-3 p-4 border-b border-border hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0"
      />
      <span
        className={`flex-1 ${
          todo.completed
            ? "line-through text-muted"
            : "text-foreground"
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="px-3 py-1 text-sm border border-border rounded hover:bg-black hover:text-white transition-colors"
      >
        Delete
      </button>
    </li>
  );
}
