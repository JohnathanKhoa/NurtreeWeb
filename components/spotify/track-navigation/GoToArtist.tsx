"use client";
import { Artist } from "@/types/types";
import { UserRound } from "lucide-react";

interface Props {
  artist: Artist;
}

// async function handleClick(user: string, track: Track) {
//   const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }
export default function GoToArtist({ artist }: Props) {
  return (
    <a
      href={`/artists/${artist.id}`}
      className="flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50 text-start cursor-pointer"
    >
      <div className="flex w-full justify-between items-between">
        <p className={`flex flex-row items-center justify-center gap-2`}>
          <UserRound size={25} />
          {artist.name}
        </p>
      </div>
    </a>
  );
}
