"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist, Track } from "@/types/types";
import { ArrowLeftFromLine } from "lucide-react";
import { Fragment } from "react";
import clsx from "clsx";
import AddLibraryItemCard from "./AddLibraryItemCard";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({ preload: false });
interface Props {
  playlists: Playlist[];
  track: Track;
  user: string;
}

// async function handleClick(user: string, track: Track) {
//   const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }
export default function GoToArtist({ playlists, track, user }: Props) {
  let keycount = 0;
  return (
    <a
      href={`/artists/${track.artists[0].id}`}
      className="flex w-full rounded-sm pl-2 py-3 hover:bg-zinc-50/50  text-start cursor-pointer"
    >
      <div className="flex w-full justify-between items-between">
        <p className="flex flex-row items-center justify-center gap-2">
          <ArrowLeftFromLine size={25} />
          Go to Artist
        </p>
      </div>
    </a>
  );
}
