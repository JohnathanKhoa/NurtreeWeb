"use client";
import { Artist } from "@/types/types";
import { UserRound } from "lucide-react";

interface Props {
  artist: Artist;
}

export default function GoToArtist({ artist }: Props) {
  return (
    <a
      href={`/artists/${artist.id}`}
      className="flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50 text-start cursor-pointer"
      aria-label={`Go to artist: ${artist.name || "Unknown Artist"}`} // Accessibility improvement
    >
      <div className="flex w-full justify-between items-center">
        <p className="flex flex-row items-center justify-center gap-2">
          <UserRound size={25} />
          {artist.name || "Unknown Artist"} {/* Added fallback for missing artist name */}
        </p>
      </div>
    </a>
  );
}
