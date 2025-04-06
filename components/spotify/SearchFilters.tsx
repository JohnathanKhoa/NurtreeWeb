"use client";

import { searchFilterTags } from "@/util/clientUtils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function SearchFilters() {
  const pathname = usePathname();
  const params = useParams();
  const query = params.query as string;
  const activeStyles = "bg-white text-black";
  const inactiveStyles = "bg-paper-600 hover:bg-paper-400 text-white";

  return (
    <div className="flex items-center gap-2 mb-8 pb-2 text-sm">
      {searchFilterTags.map((tag) => {
        const href = `/search/${query}${tag.link}`;
        return (
          <Link
            key={tag.label}
            className={`px-2 py-1 font-medium transition-colors rounded-full ${
              pathname === href ? activeStyles : inactiveStyles
            }`}
            href={href}
          >
            {tag.label}
          </Link>
        );
      })}
    </div>
  );
}
