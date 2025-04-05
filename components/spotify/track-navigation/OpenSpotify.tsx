"use client";
import { Track } from "@/types/types";
import { ArrowLeftFromLine } from "lucide-react";
import SpotifyPrimaryImage from "@/public/images/Spotify_Primary_Logo_RGB_White.png";
import Image from "next/image";
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
export default function OpenSpotify({ track }: Props) {
  return (
    <a
      href={`https://open.spotify.com/track/${track.id}`} target="_blank"
      className="flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50 text-start cursor-pointer"
    >
      <div className="flex w-full justify-between items-between">
        <p className={`flex flex-row items-center justify-center gap-2`}>
          <Image
          src={SpotifyPrimaryImage}
          alt={track.name}
          height={20} />
          Open in Spotify
        </p>
      </div>
    </a>
  );
}
