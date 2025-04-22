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

export default function ArtistList({ track }: Props) {
  return (
    <>
      <Menu>
        <MenuButton as={Fragment}>
          {({ active }) => (
            <button
              className={clsx(
                active && "bg-indigo-100/50",
                "flex w-full rounded-sm pl-2 py-3 text-start cursor-pointer hover:bg-indigo-100/50"
              )}
              aria-label="Open artists menu"
            >
              <div className="flex w-full justify-between items-center">
                <p className="flex flex-row items-center justify-center gap-2">
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
          className="w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg shadow-2xl"
        >
          {track.artists.map((artist) => (
            <MenuItem key={artist.id}>
              <GoToArtist artist={artist} />
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </>
  );
}
