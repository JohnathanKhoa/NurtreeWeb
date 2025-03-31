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
      className="flex items-center 1/3 justify-between md:w-1/5  mx-3 px-3 py-1.5 bg-opacity-50 backdrop-blur-lg  shadow-2xl rounded-full bg-black  focus:bg-zinc-300 transition duration-700"
      onSubmit={handleSubmit}
    >
      <Search className="min-w-5 text-zinc-300" />

      <input
        className="flex-grow w-full  text-sm font-normal bg-transparent text-white focus:outline-none"
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
