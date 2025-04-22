"use client";

import { Playlist } from "@/types/types";
import Image from "next/image";

interface Props {
  playlist: Playlist;
}

export default function LibraryItemCard({ playlist }: Props) {
  const href = `/playlists/${playlist.id}/0`;

  return (
    <a
      href={href}
      className={`flex items-center gap-3 p-2 rounded-md text-white hover:bg-indigo-100/50 cursor-pointer`}
    >
      <Image
        src={playlist.images[0]?.url || "/default-image.jpg"} // Fallback for missing images
        alt={playlist.name}
        height={50}
        width={50}
        className="aspect-square object-cover rounded-xs md:rounded"
      />

      <div className="truncate">
        <h6 className="w-full text-sm truncate hover:text-white">
          {playlist.name}
        </h6>

        <span className="mt-1 text-xs font-medium text-gray">
          {playlist.owner.display_name}
        </span>
      </div>
    </a>
  );
}
