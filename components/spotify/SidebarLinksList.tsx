"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLinksList() {
  const pathname = usePathname();

  const activeLink = "bg-paper-400 text-white";
  const inactiveLink = "bg-transparent text-gray";
  const linkStyle =
    "flex items-start gap-4 px-2 rounded-md cursor-pointer  hover:text-white";

  return (
    <ul className="">
      <Link href="/">
        <li
          className={`${linkStyle} ${
            pathname === "/" ? activeLink : inactiveLink
          }`}
        >
          <Home height={25} className=""/>
        </li>
      </Link>
    </ul>
    
  );
}
