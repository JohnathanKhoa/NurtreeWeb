"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Playlist } from "@/types/types";
import { Menu as MenuIcon, Plus } from "lucide-react";
import { Fragment } from "react";
import LibraryItemCard from "./LibraryItemCard";
import clsx from "clsx";
import AddLibraryItemCard from "./AddLibraryItemCard";
import { useRouter } from "next/navigation";

interface Props {
  playlists: Playlist[];
  trackId: string;
  user: string;
}

async function handleClick(user: string, trackId: string) {
  const response = await fetch(`/api/users/${user}/playlists/${trackId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export default function AddLibrary({ playlists, trackId, user }: Props) {
  let keycount = 0;
  return (
    <div className="">
      <div>
        <Menu>
          <MenuButton as={Fragment}>
            {({ active }) => (
              <button onClick={() => {}} className={` ${clsx(active)}`}>
                <div className="flex flex-row p-4 gap-2 items-center  justify-center ">
                  <Plus size={25} />
                  Add to Playlist
                </div>
              </button>
            )}
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="overflow-auto scrollbar-hide bg-zinc-800 rounded-xl opacity-80"
          >
            <div
              onClick={() => {
                handleClick(user, trackId);
              }}
              className=" rounded-md text-white cursor-pointer  hover:bg-zinc-500"
            >
              <div className="flex flex-row p-4 gap-2 items-center  ">
                <Plus size={25} />
                New Playlist
              </div>
            </div>
            {playlists.map((playlist) => (
              <MenuItem key={keycount++}>
                <AddLibraryItemCard
                  key={playlist.id + keycount++}
                  entity={playlist}
                  playlistId={playlist.id}
                  trackId={trackId}
                />
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    </div>
  );
}
