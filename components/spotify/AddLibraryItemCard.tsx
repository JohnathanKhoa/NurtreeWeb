"use client";

import { Playlist } from "@/types/types";
import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
const fontFamily = Nunito_Sans({ preload: false });
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
  const router = useRouter();
  return (
    <div
      onClick={() => {
        handleClick(playlistId, trackId);
      }}
      className="flex items-center p-2 gap-3  rounded-md text-white cursor-pointer  hover:bg-zinc-50/50 "
    >
      <Image
        src={entity.images[0].url}
        alt={entity.name}
        height={50}
        width={50}
        className="rounded-md aspect-square object-cover"
      />

      <div className="truncate">
        <h6 className={fontFamily.className + "w-full "}>{entity.name}</h6>
      </div>
    </div>
  );
}
