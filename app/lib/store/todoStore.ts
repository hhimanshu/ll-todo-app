import { create } from "zustand";
import { Todo } from "@/app/lib/types/todo";
import { addTodo, deleteTodo, toggleTodo } from "@/app/lib/logic/todoLogic";

export interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

export const createTodoStore = () => {
  return create<TodoStore>((set) => ({
    todos: [],
    addTodo: (text: string) =>
      set((state) => ({ todos: addTodo(state.todos, text) })),
    deleteTodo: (id: string) =>
      set((state) => ({ todos: deleteTodo(state.todos, id) })),
    toggleTodo: (id: string) =>
      set((state) => ({ todos: toggleTodo(state.todos, id) })),
  }));
};

export type TodoStoreType = ReturnType<typeof createTodoStore>;
