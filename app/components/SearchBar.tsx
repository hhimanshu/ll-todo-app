"use client";

import { useTodoStore } from "@/app/lib/store/StoreProvider";

export function SearchBar() {
  const searchQuery = useTodoStore((state) => state.searchQuery);
  const setSearchQuery = useTodoStore((state) => state.setSearchQuery);

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search todos..."
        className="flex-1 px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-black"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
