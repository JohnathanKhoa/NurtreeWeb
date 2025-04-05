"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Track } from "@/types/types";
import { ChevronDown, UserRoundSearch } from "lucide-react";
import { Fragment } from "react";
import clsx from "clsx";
import GoToArtist from "./GoToArtist";

interface Props {
  track: Track;
}

async function handleClick(user: string, trackId: string) {
  const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default function GoToArtists({ track }: Props) {
  let keycount = 0;
  return (
    <>
      <Menu>
        <MenuButton as={Fragment}>
          {({ active }) => (
            <button
              onClick={() => {}}
              className={` ${clsx(active)} +
              "flex w-full rounded-sm pl-2 py-3 hover:bg-indigo-100/50  text-start cursor-pointer`}
            >
              <div className={` flex w-full justify-between items-between`}>
                <p className="flex flex-row items-center justify-center gap-2">
                  {" "}
                  <UserRoundSearch size={20} />
                  Go To Artist
                </p>
                <ChevronDown height={25} />
              </div>
            </button>
          )}
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className={
            "w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"
          }
        >
          {track.artists.map((artist) => (
            <MenuItem key={keycount++}>
              <GoToArtist key={artist.id + keycount++} artist={artist} />
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
}
