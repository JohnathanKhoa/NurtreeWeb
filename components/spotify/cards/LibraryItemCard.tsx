"use client";
import { Album, Artist, Playlist } from "@/types/types";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingDots from "../LoadingDots";

interface Props {
  type: "artists" | "playlists" | "albums";
  entity: Album | Artist | Playlist;
  subtitle?: string;
}

export default function LibraryItemCard({ type, entity, subtitle }: Props) {
  const pathname = usePathname();

  const href = `${type}/${entity.id}`;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <a
      onClick={() => setIsOpen(true)}
      href={`/${href}/0`}
      className={`${
        pathname === href ? "bg-paper-400" : ""
      } flex items-center p-2 gap-3 rounded-md text-white cursor-pointer  hover:bg-indigo-100/50 `}
    >
      {isOpen && <LoadingDots />}
      <Image
        src={entity.images[0]?.url}
        alt={entity.name}
        height={50}
        width={50}
        className={`${
          type === "artists" ? "rounded-full" : "rounded-md"
        } aspect-square object-cover`}
      />

      <div className="truncate">
        <h6 className={`w-full text-sm truncate hover:text-white`}>
          {entity.name}
        </h6>
        {type !== "artists" && (
          <span className="mt-1 text-xs font-medium text-gray">{subtitle}</span>
        )}
      </div>
    </a>
  );
}
