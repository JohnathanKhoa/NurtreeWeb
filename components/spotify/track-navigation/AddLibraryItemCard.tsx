"use client";

import { Playlist } from "@/types/types";
import Image from "next/image";

interface Props {
  trackId: string;
  playlist: Playlist;
}

async function handleAddTrackToPlaylist(playlistId: string, trackId: string) {
  await fetch(`/api/playlists/${playlistId}/tracks/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export default function AddLibraryItemCard({ trackId, playlist }: Props) {
  const handleClick = () => {
    handleAddTrackToPlaylist(playlist.id, trackId);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center p-2 gap-3 rounded-md text-white cursor-pointer hover:bg-indigo-100/50"
    >
      <Image
        src={playlist.images[0]?.url || "/placeholder-image.jpg"} // Added fallback for missing images
        alt={playlist.name || "Playlist Image"} // Added fallback for alt text
        height={50}
        width={50}
        className="rounded-xs md:rounded aspect-square object-cover"
      />
      <div className="truncate">
        <h6 className="w-full text-sm truncate hover:text-white">
          {playlist.name || "Unnamed Playlist"} {/* Added fallback for missing playlist name */}
        </h6>
      </div>
    </div>
  );
}