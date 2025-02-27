"use client";

import { useStore } from "@/providers/zustand";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();

  const { searchQuery, setSearchQuery } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${searchQuery}`);
  };

  return (
    <form
      className="flex items-center justify-between md:w-1/5 w-3/5 gap-3 px-3 py-1.5 bg-zinc-500 bg-opacity-50 rounded-full"
      onSubmit={handleSubmit}
    >
      <Search className="text-paper-600" />

      <input
        className="flex-grow w-full text-sm font-semibold bg-transparent text-white focus:outline-none"
        placeholder=""
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        spellCheck={false}
      />

      <button
        type="button"
        className={`flex items-center focus:outline-none ${
          searchQuery ? "visible" : "invisible"
        }`}
        onClick={() => setSearchQuery("")}
      >
        <X size={20} className="text-paper-600 hover:text-paper-400" />
      </button>
    </form>
  );
}
