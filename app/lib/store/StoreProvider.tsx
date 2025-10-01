"use client";

import { type ReactNode, createContext, useRef, useContext, useState } from "react";
import { useStore } from "zustand";
import { createTodoStore, type TodoStoreType } from "./todoStore";

export const TodoStoreContext = createContext<TodoStoreType | null>(null);

export interface TodoStoreProviderProps {
  children: ReactNode;
}

export function TodoStoreProvider({ children }: TodoStoreProviderProps) {
  const [store] = useState(() => createTodoStore());

  return (
    <TodoStoreContext.Provider value={store}>
      {children}
    </TodoStoreContext.Provider>
  );
}

export function useTodoStore<T>(selector: (store: ReturnType<typeof createTodoStore>["getState"]) => T): T {
  const todoStoreContext = useContext(TodoStoreContext);

  if (!todoStoreContext) {
    throw new Error("useTodoStore must be used within TodoStoreProvider");
  }

  return useStore(todoStoreContext, selector);
}
