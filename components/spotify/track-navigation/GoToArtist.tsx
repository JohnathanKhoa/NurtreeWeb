"use client";
import { Track } from "@/types/types";
import { ArrowLeftFromLine } from "lucide-react";

interface Props {
  track: Track;
}

// async function handleClick(user: string, track: Track) {
//   const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }
export default function GoToArtist({ track }: Props) {
  return (
    <a
      href={`/artists/${track.artists[0].id}`}
      className="flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50 text-start cursor-pointer"
    >
      <div className="flex w-full justify-between items-between">
        <p className={`flex flex-row items-center justify-center gap-2`}>
          <ArrowLeftFromLine size={25} />
          Go to Artist
        </p>
      </div>
    </a>
  );
}
