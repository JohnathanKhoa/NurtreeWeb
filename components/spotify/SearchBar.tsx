"use client";
import { Link, Home, Search } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SearchBar() {
  const pathname = usePathname();

  const activeLink = "bg-paper-400 text-white";
  const inactiveLink = "bg-transparent text-gray";
  const linkStyle =
    "flex items-center gap-4 px-2 py-3 rounded-md cursor-pointer  hover:text-white";

  return (
    <a href="/search">
      <li
        className={`${linkStyle} ${
          pathname === "/search" ? activeLink : inactiveLink
        }`}
      >
        <Search size={25} />
        <span className="font-semibold">Search</span>
      </li>
    </a>
  );
}
