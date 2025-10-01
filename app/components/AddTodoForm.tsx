"use client";

import { useState, FormEvent } from "react";
import { useTodoStore } from "@/app/lib/store/StoreProvider";

export function AddTodoForm() {
  const [text, setText] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Add
      </button>
    </form>
  );
}
