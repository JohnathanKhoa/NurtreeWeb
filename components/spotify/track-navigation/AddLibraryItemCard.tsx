"use client";
import { Playlist } from "@/types/types";
import Image from "next/image";

interface Props {
  playlistId: string;
  trackId: string;
  entity: Playlist;
}

async function handleClick(playlistId: string, trackId: string) {
  const response = await fetch(
    `/api/playlists/${playlistId}/tracks/${trackId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
export default function LibraryItemCard({
  playlistId,
  trackId,
  entity,
}: Props) {
  return (
    <div
      onClick={() => {
        handleClick(playlistId, trackId);
      }}
      className="flex items-center p-2 gap-3  rounded-md text-white cursor-pointer  hover:bg-indigo-100/50 "
    >
      <Image
        src={entity.images[0].url}
        alt={entity.name}
        height={50}
        width={50}
        className="rounded-md aspect-square object-cover"
      />
      <div className="truncate">
        <h6 className={` w-full text-sm truncate hover:text-white`}>
          {entity.name}
        </h6>
      </div>
    </div>
  );
}
