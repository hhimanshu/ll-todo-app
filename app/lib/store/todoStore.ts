import { create } from "zustand";
import { Todo, FilterType } from "@/app/lib/types/todo";
import { addTodo, deleteTodo, toggleTodo, editTodo } from "@/app/lib/logic/todoLogic";
import { clearCompleted as clearCompletedLogic } from "@/app/lib/logic/filterLogic";

export interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  searchQuery: string;
  addTodo: (text: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  editTodo: (id: string, newText: string) => void;
  setFilter: (filter: FilterType) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
}

export const createTodoStore = () => {
  return create<TodoStore>((set) => ({
    todos: [],
    filter: "all",
    searchQuery: "",
    addTodo: (text: string) =>
      set((state) => ({ todos: addTodo(state.todos, text) })),
    deleteTodo: (id: string) =>
      set((state) => ({ todos: deleteTodo(state.todos, id) })),
    toggleTodo: (id: string) =>
      set((state) => ({ todos: toggleTodo(state.todos, id) })),
    editTodo: (id: string, newText: string) =>
      set((state) => ({ todos: editTodo(state.todos, id, newText) })),
    setFilter: (filter: FilterType) =>
      set({ filter }),
    setSearchQuery: (query: string) =>
      set({ searchQuery: query }),
    clearCompleted: () =>
      set((state) => ({ todos: clearCompletedLogic(state.todos) })),
  }));
};

export type TodoStoreType = ReturnType<typeof createTodoStore>;
