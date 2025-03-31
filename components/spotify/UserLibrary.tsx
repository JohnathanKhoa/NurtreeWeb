"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { Fragment } from "react";
import { ChevronDown } from "lucide-react";
import LibraryItemCard from "./LibraryItemCard";
import clsx from "clsx";
import { Nunito_Sans } from "next/font/google";
const fontFamily = Nunito_Sans({ preload: true });
interface Props {
  playlists: Playlist[];
}

export default function UserLibrary({ playlists }: Props) {
  let keycount = 0;

  return (
    <Menu>
      <MenuButton as={Fragment}>
        {({ active }) => (
          <button
            className={
              clsx(active) +
              `${fontFamily.className} flex w-full rounded-sm pl-2 py-3 hover:bg-zinc-50/50  text-start cursor-pointer`
            }
          >
            {active === true ? (
              <div className="flex w-full justify-between items-between">
                <p>Playlists</p>

                <ChevronDown height={25} />
              </div>
            ) : (
              <div className="flex w-full justify-between items-between">
                <p>Playlists</p>
                <ChevronDown height={25} />
              </div>
            )}
          </button>
        )}
      </MenuButton>
      <MenuItems
        anchor="top"
        className="w-screen md:w-1/2 overflow-auto scrollbar scrollbar-thumb-rounded-full scrollbar-thumb-zinc-300 scrollbar-track-transparent rounded-sm bg-opacity-50 backdrop-blur-lg  shadow-2xl"
      >
        {playlists?.map((playlist) => (
          <MenuItem key={keycount++}>
            <LibraryItemCard
              key={playlist.id + keycount++}
              entity={playlist}
              type="playlists"
              subtitle={playlist.owner.display_name}
            />
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
